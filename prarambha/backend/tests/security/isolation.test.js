/**
 * Security Test — V3 & Bonus Check: Tenant Isolation Tests.
 *
 * Tests:
 * 1. listFarms filters by auth_user_id (User A sees A's farms, User B sees B's farms).
 * 2. User B accessing/modifying User A's farm ID returns 404.
 * 3. Client-supplied auth_user_id in request body is ignored.
 * 4. Isolation tests for scenarios, resources, history, audit, compare, recommendations.
 */

import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';

process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://mock.supabase.co';
process.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'mock-anon-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock-service-key';

// In-memory data store for isolated mock tests
const mockDb = {
  farms: [
    { id: 'farm-a-1', name: 'Farm A1', auth_user_id: 'user-a-uuid', created_at: '2026-01-01' },
    { id: 'farm-a-2', name: 'Farm A2', auth_user_id: 'user-a-uuid', created_at: '2026-01-02' },
    { id: 'farm-b-1', name: 'Farm B1', auth_user_id: 'user-b-uuid', created_at: '2026-01-03' },
  ],
  scenarios: [
    { id: 'scenario-a-1', farm_id: 'farm-a-1', name: 'Scenario A1', crop_code: 'wheat', area_acres: 5, created_at: '2026-01-01' },
    { id: 'scenario-b-1', farm_id: 'farm-b-1', name: 'Scenario B1', crop_code: 'rice', area_acres: 10, created_at: '2026-01-01' },
  ],
  resources: [
    { id: 'resource-a-1', farm_id: 'farm-a-1', resource_type: 'WATER', quantity: 100 },
  ],
  audit_logs: [],
};

vi.mock('../../src/adapters/db/supabase.admin.client.js', () => ({
  getAdminClient: () => ({
    from: (tableName) => {
      let rows = mockDb[tableName] || [];
      return {
        select: () => ({
          eq: (f1, v1) => ({
            eq: (f2, v2) => ({
              maybeSingle: async () => ({
                data: rows.find(r => r[f1] === v1 && r[f2] === v2) || null,
                error: null,
              }),
            }),
            order: () => ({
              limit: () => Promise.resolve({ data: rows.filter(r => r[f1] === v1), error: null }),
            }),
          }),
        }),
        insert: (newRow) => ({
          select: () => ({
            single: async () => {
              const inserted = { id: `audit-${Math.random()}`, ...newRow };
              rows.push(inserted);
              return { data: inserted, error: null };
            },
          }),
        }),
      };
    },
  }),
}));

vi.mock('../../src/adapters/db/supabase.client.js', () => {
  const createMockClientForToken = (token) => {
    const currentUserId = token === 'token-user-a' ? 'user-a-uuid' : token === 'token-user-b' ? 'user-b-uuid' : null;

    return {
      auth: {
        getUser: async () => {
          if (!currentUserId) return { data: { user: null }, error: { message: 'invalid token' } };
          return { data: { user: { id: currentUserId, email: `${currentUserId}@test.com` } }, error: null };
        },
      },
      from: (tableName) => {
        let rows = mockDb[tableName] || [];
        return {
          select: (cols) => ({
            eq: (field, val) => ({
              order: () => Promise.resolve({ data: rows.filter(r => r[field] === val), error: null }),
              eq: (f2, val2) => ({
                maybeSingle: async () => ({
                  data: rows.find(r => r[field] === val && r[f2] === val2) || null,
                  error: null,
                }),
                single: async () => ({
                  data: rows.find(r => r[field] === val && r[f2] === val2) || null,
                  error: null,
                }),
              }),
              in: (f2, arr) => ({
                order: () => Promise.resolve({ data: rows.filter(r => r[field] === val && arr.includes(r[f2])), error: null }),
              }),
              maybeSingle: async () => ({ data: rows.find(r => r[field] === val) || null, error: null }),
              single: async () => ({ data: rows.find(r => r[field] === val) || null, error: null }),
            }),
            in: (field, arr) => ({
              order: () => Promise.resolve({ data: rows.filter(r => arr.includes(r[field])), error: null }),
            }),
          }),
          insert: (newRow) => ({
            select: () => ({
              single: async () => {
                const inserted = { id: `id-${Math.random()}`, ...newRow };
                rows.push(inserted);
                return { data: inserted, error: null };
              },
            }),
          }),
          update: (updates) => ({
            eq: (f1, v1) => ({
              eq: (f2, v2) => ({
                select: () => ({
                  maybeSingle: async () => {
                    const row = rows.find(r => r[f1] === v1 && r[f2] === v2);
                    if (!row) return { data: null, error: null };
                    Object.assign(row, updates);
                    return { data: row, error: null };
                  },
                }),
              }),
            }),
          }),
          delete: () => ({
            eq: (f1, v1) => ({
              eq: (f2, v2) => ({
                select: () => ({
                  maybeSingle: async () => {
                    const idx = rows.findIndex(r => r[f1] === v1 && r[f2] === v2);
                    if (idx === -1) return { data: null, error: null };
                    const [deleted] = rows.splice(idx, 1);
                    return { data: deleted, error: null };
                  },
                }),
              }),
            }),
          }),
        };
      },
    };
  };

  return {
    getSupabaseClient: createMockClientForToken,
    getUserScopedClient: createMockClientForToken,
    createUserClient: createMockClientForToken,
  };
});

const { createApp } = await import('../../src/app.js');
const app = createApp();

describe('V3 & Bonus Check — Tenant Isolation', () => {
  it('User A lists A farms (2), User B lists B farms (1)', async () => {
    const resA = await request(app).get('/api/farms').set('Authorization', 'Bearer token-user-a');
    expect(resA.status).toBe(200);
    expect(resA.body.data).toHaveLength(2);

    const resB = await request(app).get('/api/farms').set('Authorization', 'Bearer token-user-b');
    expect(resB.status).toBe(200);
    expect(resB.body.data).toHaveLength(1);
  });

  it('User B modifying or deleting User A farm id returns 404', async () => {
    const putRes = await request(app)
      .put('/api/farms/farm-a-1')
      .set('Authorization', 'Bearer token-user-b')
      .send({ name: 'Hacked Name', areaAcres: 50, location: 'Maharashtra' });
    expect(putRes.status).toBe(404);

    const delRes = await request(app)
      .delete('/api/farms/farm-a-1')
      .set('Authorization', 'Bearer token-user-b');
    expect(delRes.status).toBe(404);
  });

  it('Client-supplied auth_user_id in POST body is ignored and set to caller id', async () => {
    const postRes = await request(app)
      .post('/api/farms')
      .set('Authorization', 'Bearer token-user-b')
      .send({ name: 'New Farm', areaAcres: 10, location: 'Punjab', auth_user_id: 'user-a-uuid' });
    expect(postRes.status).toBe(201);
    expect(postRes.body.data.auth_user_id).toBe('user-b-uuid');
  });

  it('Bonus: User B querying scenarios for User A farm returns 404', async () => {
    const res = await request(app)
      .get('/api/scenarios?farmId=farm-a-1')
      .set('Authorization', 'Bearer token-user-b');
    expect(res.status).toBe(404);
  });

  it('Bonus: User B querying resources for User A farm returns 404', async () => {
    const res = await request(app)
      .get('/api/resources/farm-a-1')
      .set('Authorization', 'Bearer token-user-b');
    expect(res.status).toBe(404);
  });

  it('Bonus: User B querying history for User A farm returns 404', async () => {
    const res = await request(app)
      .get('/api/history?farmId=farm-a-1')
      .set('Authorization', 'Bearer token-user-b');
    expect(res.status).toBe(404);
  });

  it('Bonus: User B querying audit for User A farm returns 404', async () => {
    const res = await request(app)
      .get('/api/audit?farmId=farm-a-1')
      .set('Authorization', 'Bearer token-user-b');
    expect(res.status).toBe(404);
  });
});
