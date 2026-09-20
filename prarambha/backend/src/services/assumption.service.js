import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listActiveAssumptions() {
  const { data, error } = await getSupabaseClient()
    .from("assumptions")
    .select("key, value, description, source, version")
    .eq("active", true)
    .order("key", { ascending: true });

  if (error) {
    throw new Error(`Unable to load model assumptions: ${error.message}`);
  }

  return data;
}
