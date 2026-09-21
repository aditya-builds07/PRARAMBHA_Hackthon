import { getUserScopedClient } from '../adapters/db/supabase.client.js';
import { sendError } from '../utils/response.js';

/**
 * requireAuthenticatedUser — Express middleware (D1).
 *
 * 1. Extracts the Bearer JWT from the Authorization header.
 * 2. Verifies it against Supabase Auth (using user-scoped client).
 * 3. Attaches req.user = { id, email } for downstream handlers.
 * 4. Attaches req.supabase and req.supabaseClient = getUserScopedClient(token) so all downstream
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
    return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
  }

  try {
    const supabase = getUserScopedClient(token);
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user?.id) {
      return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    }

    // Attach verified identity to request
    request.user = { id: data.user.id, email: data.user.email ?? null };

    // Attach per-request user-scoped client (req.supabase and alias req.supabaseClient)
    request.supabase = supabase;
    request.supabaseClient = supabase;

    next();
  } catch (_error) {
    return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
  }
}
