import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { assertScenarioOwnership } from "./authorization.service.js";

export async function saveSimulationResult(result, userId) {
  if (userId && result.scenarioId) {
    await assertScenarioOwnership(result.scenarioId, userId);
  }

  const { data, error } = await getSupabaseClient()
    .from("simulation_results")
    .insert(result)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to save simulation result: ${error.message}`);
  return data;
}
