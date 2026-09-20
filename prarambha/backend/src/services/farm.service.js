import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listFarms() {
  const { data, error } = await getSupabaseClient()
    .from("farms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Unable to load farms: ${error.message}`);
  return data;
}

export async function createFarm(farm) {
  const { data, error } = await getSupabaseClient()
    .from("farms")
    .insert(farm)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create farm: ${error.message}`);
  return data;
}
