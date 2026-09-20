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
  return {
    url: requiredEnvironmentValue('SUPABASE_URL'),
    serviceRoleKey: requiredEnvironmentValue('SUPABASE_SERVICE_ROLE_KEY'),
  };
}

export function getServerPort() {
  const port = Number(process.env.PORT ?? 3001);
  return Number.isInteger(port) && port > 0 && port <= 65535 ? port : 3001;
}
