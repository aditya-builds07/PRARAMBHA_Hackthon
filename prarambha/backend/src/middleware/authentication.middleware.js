import { getUserScopedClient } from '../adapters/db/supabase.client.js';
import { getAdminClient } from '../adapters/db/supabase.admin.client.js';
import { sendError } from '../utils/response.js';

/**
 * requireAuthenticatedUser — Express middleware (D1).
 *
 * 1. Extracts the Bearer JWT from the Authorization header.
 * 2. Verifies it against Supabase Auth (using admin client for the getUser call).
 * 3. Attaches req.user = { id, email } for downstream handlers.
 * 4. Attaches req.supabaseClient = getUserScopedClient(jwt) so all downstream
 *    DB queries run as the authenticated user, subject to RLS.
 * 5. Returns 401 with a generic body for any auth failure (D6 — no leakage).
 *
 * Missing token, wrong scheme, expired token, and wrong-secret tokens all
 * produce identical 401 responses — no information about which check failed.
 */
export async function requireAuthenticatedUser(request, response, next) {
  const header = request.headers.authorization;
  const token =
    typeof header === 'string' && header.startsWith('Bearer ')
      ? header.slice(7).trim()
      : '';

  if (!token) {
    return sendError(response, 401, 'UNAUTHORIZED', 'A Bearer access token is required.');
  }

  try {
    // Use admin client for getUser() — the anon client also works but admin is
    // already a singleton and avoids creating a Supabase client just for verification.
    const { data, error } = await getAdminClient().auth.getUser(token);
    if (error || !data?.user?.id) {
      return sendError(response, 401, 'UNAUTHORIZED', 'The access token is invalid or expired.');
    }

    // Attach verified identity to request
    request.user = { id: data.user.id, email: data.user.email ?? null };

    // Attach a per-request user-scoped client. All service calls must use this
    // client so RLS policies are enforced on every DB operation (D2).
    request.supabaseClient = getUserScopedClient(token);

    next();
  } catch (error) {
    next(error);
  }
}
