import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listActiveCrops() {
  const { data, error } = await getSupabaseClient()
    .from("crop_params")
    .select("*")
    .eq("active", true)
    .order("display_name", { ascending: true });

  if (error) {
    throw new Error(`Unable to load crop parameters: ${error.message}`);
  }

  return data;
}
