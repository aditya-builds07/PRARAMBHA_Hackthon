import { createClient } from '@supabase/supabase-js';

/**
 * Creates a per-request Supabase client scoped to the authenticated user's JWT.
 * RLS policies will enforce that this client can only read/write rows owned by
 * the user whose JWT is provided.
 *
 * @param {string} userJwt - The user's Supabase access token
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function createUserClient(userJwt) {
  const url = process.env.SUPABASE_URL?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();

  if (!url) throw new Error('SUPABASE_URL is required.');
  if (!anonKey) throw new Error('SUPABASE_ANON_KEY is required for the user-scoped client.');

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
