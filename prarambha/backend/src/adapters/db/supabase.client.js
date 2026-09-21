/**
 * supabase.client.js — Per-request user-scoped Supabase client.
 *
 * Creates a Supabase client using the ANON key + the caller's JWT.
 * This client is subject to Row-Level Security (RLS) policies, which
 * means database queries are automatically filtered to data the
 * authenticated user owns.
 *
 * IMPORTANT: This is NOT a singleton. A new client is created for each
 * request so the Authorization header (user JWT) is fresh every time.
 * Do NOT cache or reuse across requests.
 *
 * For the whitelisted service-role client (audit_logs only), see
 * supabase.admin.client.js.
 */

import { createUserClient } from './supabase.user.client.js';

export { createUserClient };

/**
 * Creates a per-request Supabase client scoped to the authenticated user's JWT.
 * RLS policies will enforce that this client can only read/write rows owned by
 * the user whose JWT is provided.
 *
 * @param {string} userJwt - The user's Supabase access token (from req.headers.authorization)
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getUserScopedClient(userJwt) {
  return createUserClient(userJwt);
}
