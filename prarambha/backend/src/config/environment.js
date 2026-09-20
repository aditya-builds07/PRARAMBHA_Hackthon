function requiredEnvironmentValue(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required server configuration: ${name}. Add it to prarambha/.env.`);
  }
  return value;
}

/**
 * Returns the Supabase URL and ANON key for per-request user-scoped clients.
 * The anon key is safe to use with RLS — it respects Row-Level Security policies.
 */
export function getSupabaseAnonConfiguration() {
  return {
    url: requiredEnvironmentValue('SUPABASE_URL'),
    anonKey: requiredEnvironmentValue('SUPABASE_ANON_KEY'),
  };
}

/**
 * Returns the Supabase service-role key for the whitelisted admin client only.
 * NEVER call this from route handlers or services — only from supabase.admin.client.js.
 * Using the service-role key bypasses Row-Level Security (RLS).
 */
export function getSupabaseAdminConfiguration() {
  const url = requiredEnvironmentValue('SUPABASE_URL');
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();
  if (!serviceRoleKey) {
    throw new Error(
      'Missing required server configuration: SUPABASE_SERVICE_ROLE_KEY. Add it to prarambha/.env.'
    );
  }
  return { url, serviceRoleKey };
}

export function getServerPort() {
  const port = Number(process.env.PORT ?? 3001);
  return Number.isInteger(port) && port > 0 && port <= 65535 ? port : 3001;
}
