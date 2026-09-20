/**
 * supabase.admin.client.js — WHITELISTED service-role Supabase client.
 *
 * PURPOSE: This singleton client bypasses Row-Level Security (RLS).
 * It exists ONLY for operations where RLS cannot be used:
 *   - audit_logs INSERT: audit rows reference auth.users rows that the
 *     anon/user-scoped client cannot verify before inserting. The audit
 *     table has no permissive RLS policy by design; only the service role
 *     can write to it. This is intentional: audit records must be
 *     immutable from the perspective of the user's own credentials.
 *
 * RULES:
 *   1. This file must NEVER be imported by route handlers, controllers,
 *      or service files other than audit.service.js.
 *   2. Every new use must include a comment explaining why RLS cannot be used.
 *   3. This key must NEVER reach the frontend bundle.
 *   4. The service-role key is read from environment only — never hardcoded.
 *
 * ANTI-CHEATING: If you are tempted to import this in a new service to
 * "fix" an RLS failure, STOP — the correct fix is to update the RLS policy
 * or use the user-scoped client (supabase.client.js).
 */

import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdminConfiguration } from '../../config/environment.js';

let _adminClient = null;

/**
 * Returns the singleton service-role Supabase client.
 * Call this ONLY from audit.service.js (see whitelist above).
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getAdminClient() {
  if (_adminClient) return _adminClient;
  const { url, serviceRoleKey } = getSupabaseAdminConfiguration();
  _adminClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _adminClient;
}
