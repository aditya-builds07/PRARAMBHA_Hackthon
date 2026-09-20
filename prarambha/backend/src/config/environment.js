function requiredEnvironmentValue(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required server configuration: ${name}. Add it to prarambha/.env.`);
  }
  return value;
}

/**
 * Centralises server-only configuration so adapters do not each interpret
 * environment variables differently or accidentally expose credentials to clients.
 */
export function getSupabaseConfiguration() {
  const url = requiredEnvironmentValue('SUPABASE_URL');
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_SECRET_KEY?.trim();
  if (!serviceRoleKey) {
    throw new Error('Missing required server configuration: SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY). Add it to prarambha/.env.');
  }
  return {
    url,
    serviceRoleKey,
  };
}

export function getServerPort() {
  const port = Number(process.env.PORT ?? 3001);
  return Number.isInteger(port) && port > 0 && port <= 65535 ? port : 3001;
}
