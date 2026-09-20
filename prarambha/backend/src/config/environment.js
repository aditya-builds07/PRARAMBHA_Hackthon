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



export function getServerPort() {
  const port = Number(process.env.PORT ?? 3001);
  return Number.isInteger(port) && port > 0 && port <= 65535 ? port : 3001;
}

export function getAllowedCorsOrigins() {
  const envOrigins = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || process.env.CLIENT_URL;
  const defaultOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ];
  if (!envOrigins) return defaultOrigins;
  const parsed = envOrigins.split(',').map((o) => o.trim()).filter(Boolean);
  return [...new Set([...parsed, ...defaultOrigins])];
}
