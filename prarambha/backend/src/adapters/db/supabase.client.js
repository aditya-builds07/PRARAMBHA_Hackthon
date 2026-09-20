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

import { createClient } from '@supabase/supabase-js';

let _anonUrl = null;
let _anonKey = null;

function getAnonConfig() {
  if (_anonUrl && _anonKey) return { url: _anonUrl, anonKey: _anonKey };

  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!url) throw new Error('SUPABASE_URL is required.');
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY is required for the user-scoped client.');

  _anonUrl = url;
  _anonKey = anonKey;
  return { url, anonKey };
}

/**
 * Creates a per-request Supabase client scoped to the authenticated user's JWT.
 * RLS policies will enforce that this client can only read/write rows owned by
 * the user whose JWT is provided.
 *
 * @param {string} userJwt - The user's Supabase access token (from req.headers.authorization)
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getUserScopedClient(userJwt) {
  const { url, anonKey } = getAnonConfig();
  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${userJwt}`,
      },
    },
  });
}
