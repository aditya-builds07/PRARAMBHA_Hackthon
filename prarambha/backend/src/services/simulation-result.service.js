import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function saveSimulationResult(result) {
  const { data, error } = await getSupabaseClient()
    .from("simulation_results")
    .insert(result)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to save simulation result: ${error.message}`);
  return data;
}
