/**
 * Security Test — V1: Authentication enforcement on every API route.
 *
 * RED before fix: routes without requireAuthenticatedUser return 200/400/404.
 * GREEN after fix: every protected route returns 401 for missing/bad tokens.
 *
 * Run:  npx vitest run tests/security/auth.test.js
 *
 * These tests do NOT need a real Supabase instance — they verify only that
 * the middleware layer rejects unauthenticated requests before hitting the DB.
 * The Supabase client is mocked so no network calls are made.
 */

import { describe, it, expect, vi, beforeAll } from 'vitest';
import request from 'supertest';

// ── Mock the Supabase client BEFORE importing the app ────────────────────────
// We need to mock the authentication call. When a token is provided but
// invalid/expired, auth.getUser() should return an error.
vi.mock('../../src/adapters/db/supabase.client.js', () => {
  const mockGetUser = vi.fn(async (token) => {
    if (token === 'valid-test-token-user-a') {
      return { data: { user: { id: 'user-a-uuid', email: 'a@test.com' } }, error: null };
    }
    // expired or wrong-secret tokens
    return { data: { user: null }, error: { message: 'invalid JWT' } };
  });
  return {
    getSupabaseClient: () => ({
      auth: { getUser: mockGetUser },
      from: () => ({
        select: () => ({
          eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }),
        }),
      }),
    }),
  };
});

// ── Mock external adapters so tests don't call real APIs ─────────────────────
vi.mock('../../src/adapters/weather/weather.adapter.js', () => ({
  fetchWeatherForecast: vi.fn(async () => ({ temperature: 25, rainfall: 50 })),
}));

// Import app AFTER mocks are set up
const { createApp } = await import('../../src/app.js');
const app = createApp();

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Routes that must require authentication (method + path). */
const PROTECTED_ROUTES = [
  // Farms
  { method: 'get',    path: '/api/farms' },
  { method: 'post',   path: '/api/farms' },
  { method: 'put',    path: '/api/farms/00000000-0000-0000-0000-000000000001' },
  { method: 'delete', path: '/api/farms/00000000-0000-0000-0000-000000000001' },

  // Scenarios
  { method: 'get',    path: '/api/scenarios?farmId=00000000-0000-0000-0000-000000000001' },
  { method: 'post',   path: '/api/scenarios' },
  { method: 'get',    path: '/api/scenarios/00000000-0000-0000-0000-000000000001' },
  { method: 'put',    path: '/api/scenarios/00000000-0000-0000-0000-000000000001' },
  { method: 'delete', path: '/api/scenarios/00000000-0000-0000-0000-000000000001' },

  // Simulate — CRITICAL: currently unprotected
  { method: 'post',   path: '/api/simulate' },
  { method: 'post',   path: '/api/simulate-and-save' },
  { method: 'post',   path: '/api/simulation-results' },

  // Resources
  { method: 'get',    path: '/api/resources?farmId=00000000-0000-0000-0000-000000000001' },
  { method: 'post',   path: '/api/resources' },
  { method: 'get',    path: '/api/resources/00000000-0000-0000-0000-000000000001/readiness' },
  { method: 'get',    path: '/api/farms/00000000-0000-0000-0000-000000000001/resources/readiness' },
  { method: 'get',    path: '/api/resources/00000000-0000-0000-0000-000000000001' },
  { method: 'put',    path: '/api/resources/00000000-0000-0000-0000-000000000001' },
  { method: 'put',    path: '/api/resource/00000000-0000-0000-0000-000000000001' },

  // Recommendations — currently unprotected
  { method: 'post',   path: '/api/recommendations' },
  { method: 'get',    path: '/api/scenarios/00000000-0000-0000-0000-000000000001/recommendations' },

  // History — currently unprotected
  { method: 'get',    path: '/api/history?farmId=00000000-0000-0000-0000-000000000001' },

  // Compare — currently unprotected
  { method: 'get',    path: '/api/compare?farmId=00000000-0000-0000-0000-000000000001&scenarioIds=id1,id2' },
  { method: 'post',   path: '/api/compare' },

  // Audit
  { method: 'get',    path: '/api/audit?farmId=00000000-0000-0000-0000-000000000001' },

  // Crops, Assumptions, Weather — currently unprotected
  { method: 'get',    path: '/api/crops' },
  { method: 'get',    path: '/api/assumptions' },
  { method: 'get',    path: '/api/weather' },
];

/** The ONE public route — must NOT require auth. */
const PUBLIC_ROUTES = [
  { method: 'get', path: '/api/health' },
];

// ── Test: No token → 401 ─────────────────────────────────────────────────────
describe('V1 — Authentication: no token → 401', () => {
  for (const { method, path } of PROTECTED_ROUTES) {
    it(`${method.toUpperCase()} ${path}`, async () => {
      const res = await request(app)[method](path).send({});
      expect(res.status, `Expected 401 but got ${res.status} for ${method.toUpperCase()} ${path}`).toBe(401);
      expect(res.body?.error?.code).toBe('UNAUTHORIZED');
    });
  }
});

// ── Test: Malformed token (not a Bearer) → 401 ───────────────────────────────
describe('V1 — Authentication: malformed Authorization header → 401', () => {
  const badHeaders = [
    'Basic dXNlcjpwYXNz',        // wrong scheme
    'Bearer',                     // missing token after Bearer
    'bearer valid-test-token-user-a', // wrong case (lowercase 'bearer')
    'Token valid-test-token-user-a',  // wrong scheme
  ];

  for (const { method, path } of PROTECTED_ROUTES.slice(0, 3)) {
    for (const header of badHeaders) {
      it(`${method.toUpperCase()} ${path} with "${header.substring(0, 30)}"`, async () => {
        const res = await request(app)[method](path)
          .set('Authorization', header)
          .send({});
        expect(res.status).toBe(401);
      });
    }
  }
});

// ── Test: Invalid/expired token → 401 ───────────────────────────────────────
describe('V1 — Authentication: invalid/expired token → 401', () => {
  for (const { method, path } of PROTECTED_ROUTES.slice(0, 5)) {
    it(`${method.toUpperCase()} ${path} with expired token`, async () => {
      const res = await request(app)[method](path)
        .set('Authorization', 'Bearer expired.jwt.token')
        .send({});
      expect(res.status).toBe(401);
      expect(res.body?.error?.code).toBe('UNAUTHORIZED');
    });
  }
});

// ── Test: Valid token → NOT 401 ───────────────────────────────────────────────
describe('V1 — Authentication: valid token passes auth layer (not 401)', () => {
  // Only test a subset; the actual handler may return 400/404/500 depending
  // on missing body/params, but it must NOT return 401.
  const routesToCheck = [
    { method: 'get',  path: '/api/farms' },
    { method: 'get',  path: '/api/crops' },
    { method: 'get',  path: '/api/assumptions' },
    { method: 'get',  path: '/api/scenarios?farmId=00000000-0000-0000-0000-000000000001' },
  ];
  for (const { method, path } of routesToCheck) {
    it(`${method.toUpperCase()} ${path} with valid token is not 401`, async () => {
      const res = await request(app)[method](path)
        .set('Authorization', 'Bearer valid-test-token-user-a')
        .send({});
      expect(res.status).not.toBe(401);
    });
  }
});

// ── Test: Public routes require NO token ─────────────────────────────────────
describe('V1 — Authentication: public routes accessible without token', () => {
  for (const { method, path } of PUBLIC_ROUTES) {
    it(`${method.toUpperCase()} ${path} returns 200 without token`, async () => {
      const res = await request(app)[method](path);
      expect(res.status).toBe(200);
    });
  }
});
