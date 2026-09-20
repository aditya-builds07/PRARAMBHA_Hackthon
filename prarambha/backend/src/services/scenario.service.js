import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listScenariosByFarm(farmId) {
  const { data, error } = await getSupabaseClient()
    .from("scenarios")
    .select("*")
    .eq("farm_id", farmId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Unable to load scenarios: ${error.message}`);
  return data;
}

export async function createScenario(scenario) {
  const { data, error } = await getSupabaseClient()
    .from("scenarios")
    .insert(scenario)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create scenario: ${error.message}`);
  return data;
}
