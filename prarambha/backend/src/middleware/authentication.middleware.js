import { getSupabaseClient } from '../adapters/db/supabase.client.js';
import { sendError } from '../utils/response.js';

export async function requireAuthenticatedUser(request, response, next) {
  const header = request.headers.authorization;
  const token = typeof header === 'string' && header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) return sendError(response, 401, 'UNAUTHORIZED', 'A Bearer access token is required.');

  try {
    const { data, error } = await getSupabaseClient().auth.getUser(token);
    if (error || !data?.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'The access token is invalid or expired.');
    request.user = { id: data.user.id };
    next();
  } catch (error) {
    next(error);
  }
}
