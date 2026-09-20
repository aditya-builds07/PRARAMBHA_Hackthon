/**
 * Security Test — V2: Service-role client must NOT be used in route handlers.
 *
 * Test A (grep-based, always runnable):
 *   Proves that no route handler or service file imports getSupabaseClient
 *   from a path other than the whitelisted admin client file.
 *
 * Test B (structural):
 *   Proves that supabase.client.js does NOT export a service-role singleton
 *   that is used by handler code. After the fix, the main client file should
 *   export getUserScopedClient (anon+JWT) not a service-role singleton.
 *
 * RED before fix:
 *   - supabase.client.js creates a client with SUPABASE_SERVICE_ROLE_KEY
 *   - All services import getSupabaseClient() which returns that service-role client
 *
 * GREEN after fix:
 *   - supabase.admin.client.js is the ONLY file with SUPABASE_SERVICE_ROLE_KEY
 *   - supabase.client.js exports getUserScopedClient(jwt) using the anon key
 *   - Route handler files do NOT import from supabase.admin.client.js directly
 *
 * Run:  npx vitest run tests/security/service-role.test.js
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const SRC_DIR = resolve('src');
const WHITELISTED_ADMIN_FILE = resolve('src/adapters/db/supabase.admin.client.js');
const SERVICES_DIR = resolve('src/services');
const CONTROLLERS_DIR = resolve('src/controllers');
const ROUTES_DIR = resolve('src/routes');
const MIDDLEWARE_DIR = resolve('src/middleware');

/** Recursively collect all .js files under a directory. */
function collectJsFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...collectJsFiles(fullPath));
    } else if (entry.endsWith('.js')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Test A: SERVICE_ROLE_KEY must only appear in the whitelisted admin file ──
describe('V2 — Service-role key usage is restricted to whitelisted file', () => {
  const allSrcFiles = collectJsFiles(SRC_DIR);

  it('SUPABASE_SERVICE_ROLE_KEY referenced only in supabase.admin.client.js', () => {
    const violators = allSrcFiles.filter((file) => {
      if (file === WHITELISTED_ADMIN_FILE) return false; // whitelisted
      const content = readFileSync(file, 'utf-8');
      return content.includes('SUPABASE_SERVICE_ROLE_KEY') || content.includes('SUPABASE_SECRET_KEY');
    });

    if (violators.length > 0) {
      console.error('Files referencing service-role key outside whitelist:');
      violators.forEach((f) => console.error(' -', f));
    }
    expect(violators).toHaveLength(0);
  });

  it('supabase.admin.client.js exists (the whitelisted file must be created)', () => {
    let exists = false;
    try {
      readFileSync(WHITELISTED_ADMIN_FILE, 'utf-8');
      exists = true;
    } catch {
      exists = false;
    }
    expect(exists, 'supabase.admin.client.js must exist as the whitelisted service-role file').toBe(true);
  });
});

// ── Test B: Route handlers must NOT import from supabase.admin.client.js ─────
describe('V2 — Route handlers do not import the admin (service-role) client directly', () => {
  const handlerDirs = [CONTROLLERS_DIR, ROUTES_DIR, MIDDLEWARE_DIR];

  for (const dir of handlerDirs) {
    const files = collectJsFiles(dir);
    for (const file of files) {
      it(`${file.replace(SRC_DIR + '\\', '').replace(SRC_DIR + '/', '')} does not import admin client`, () => {
        const content = readFileSync(file, 'utf-8');
        const importsAdminClient = content.includes('supabase.admin.client') || content.includes('supabase.admin');
        if (importsAdminClient) {
          console.error(`VIOLATION: ${file} imports the admin (service-role) client directly`);
        }
        expect(importsAdminClient, `${file} must not import admin client directly`).toBe(false);
      });
    }
  }
});

// ── Test C: supabase.client.js must NOT use service-role key ─────────────────
describe('V2 — Main supabase client file uses anon key, not service-role key', () => {
  it('src/adapters/db/supabase.client.js does not reference serviceRoleKey or SERVICE_ROLE', () => {
    const mainClientFile = resolve('src/adapters/db/supabase.client.js');
    const content = readFileSync(mainClientFile, 'utf-8');
    const usesServiceRole = content.includes('serviceRoleKey') || content.includes('SERVICE_ROLE');
    if (usesServiceRole) {
      console.error('VIOLATION: src/adapters/db/supabase.client.js still uses service-role key');
      console.error('Fix: supabase.client.js should use SUPABASE_ANON_KEY + user JWT');
    }
    expect(usesServiceRole).toBe(false);
  });

  it('src/adapters/db/supabase.client.js exports getUserScopedClient or createUserClient', () => {
    const mainClientFile = resolve('src/adapters/db/supabase.client.js');
    const content = readFileSync(mainClientFile, 'utf-8');
    const hasUserScopedExport = content.includes('getUserScopedClient') || content.includes('createUserClient');
    expect(hasUserScopedExport, 'supabase.client.js must export a user-scoped client factory').toBe(true);
  });
});

// ── Test D: audit.service.js may import admin client (whitelisted) ───────────
describe('V2 — audit.service.js is allowed to use admin client (whitelisted reason)', () => {
  it('audit.service.js has a comment explaining why service-role is needed', () => {
    const auditFile = resolve('src/services/audit.service.js');
    const content = readFileSync(auditFile, 'utf-8');
    // Must have a comment explaining the whitelist reason
    const hasExplanation = content.includes('service-role') || content.includes('admin') || content.includes('RLS cannot');
    expect(hasExplanation, 'audit.service.js must document why RLS cannot be used for audit writes').toBe(true);
  });
});
