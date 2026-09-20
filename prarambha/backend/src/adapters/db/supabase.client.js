import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfiguration } from "../../config/environment.js";

let client;

export function getSupabaseClient() {
  if (client) return client;

  const { url, serviceRoleKey } = getSupabaseConfiguration();

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
