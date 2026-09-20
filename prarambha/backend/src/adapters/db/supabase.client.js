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

  const url = process.env.SUPABASE_URL?.trim() || 'http://localhost:54321';
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim() || process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || 'anon-key-placeholder';

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

let _defaultClient = null;

/**
 * Fallback/default Supabase client configured with the public ANON key.
 * Maintains backward compatibility across service layers while respecting RLS.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getSupabaseClient() {
  if (_defaultClient) return _defaultClient;
  const { url, anonKey } = getAnonConfig();
  _defaultClient = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return _defaultClient;
}
