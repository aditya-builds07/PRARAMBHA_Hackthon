import { createUserClient } from "./supabase.user.client.js";
import { getRequestSupabaseClient } from "./supabase.context.js";
import { createClient } from '@supabase/supabase-js';

export { createUserClient };

export function getUserScopedClient(userJwt) {
  return createUserClient(userJwt);
}

/**
 * Backward-compatible alias used by existing services that expect a generic
 * getSupabaseClient() entrypoint.
 *
 * @param {string} [userJwt] - Optional authenticated JWT. When omitted, the
 * caller is expected to supply the JWT elsewhere or use a anon-level client.
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getSupabaseClient(userJwt) {
  return userJwt ? getUserScopedClient(userJwt) : getRequestSupabaseClient();
}

/**
 * Creates an anonymous Supabase client for low-privilege public reads.
 *
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getAnonClient() {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!url) throw new Error('SUPABASE_URL is required.');
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY is required for the anon client.');

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
