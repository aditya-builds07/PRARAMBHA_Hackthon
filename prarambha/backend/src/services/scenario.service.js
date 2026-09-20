import { getSupabaseClient } from "../adapters/db/supabase.client.js";

async function assertFarmOwnership(farmId, userId) {
  const { data, error } = await getSupabaseClient()
    .from('farms').select('id').eq('id', farmId).eq('auth_user_id', userId).maybeSingle();
  if (error) throw new Error(`Unable to verify farm ownership: ${error.message}`);
  if (!data) throw new Error('Farm not found.');
}

export async function listScenariosByFarm(farmId, userId) {
  await assertFarmOwnership(farmId, userId);
  const { data, error } = await getSupabaseClient()
    .from("scenarios")
    .select("*")
    .eq("farm_id", farmId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Unable to load scenarios: ${error.message}`);
  return data;
}

export async function createScenario(scenario, userId) {
  await assertFarmOwnership(scenario.farm_id, userId);
  const { data, error } = await getSupabaseClient()
    .from("scenarios")
    .insert(scenario)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create scenario: ${error.message}`);
  return data;
}

export async function getScenarioById(id, userId) {
  const { data, error } = await getSupabaseClient().from('scenarios').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(`Unable to load scenario: ${error.message}`);
  if (!data) throw new Error('Scenario not found.');
  await assertFarmOwnership(data.farm_id, userId);
  return data;
}

export async function updateScenario(id, scenario, userId) {
  const current = await getScenarioById(id, userId);
  await assertFarmOwnership(scenario.farm_id, userId);
  const { data: savedResult, error: resultError } = await getSupabaseClient()
    .from('simulation_results').select('id').eq('scenario_id', current.id).limit(1).maybeSingle();
  if (resultError) throw new Error(`Unable to verify scenario history: ${resultError.message}`);
  if (savedResult) {
    // A saved result references this input and model version; require a new
    // scenario rather than changing the historical input beneath that result.
    throw new Error('Scenario has saved results and cannot be changed; create a new scenario instead.');
  }
  const { data, error } = await getSupabaseClient()
    .from('scenarios').update(scenario).eq('id', id).select('*').maybeSingle();
  if (error) throw new Error(`Unable to update scenario: ${error.message}`);
  if (!data) throw new Error('Scenario not found.');
  return data;
}

export async function deleteScenarioById(id, userId) {
  await getScenarioById(id, userId);
  const { data, error } = await getSupabaseClient()
    .from('scenarios').delete().eq('id', id).select('id').maybeSingle();
  if (error) throw new Error(`Unable to delete scenario: ${error.message}`);
  if (!data) throw new Error('Scenario not found.');
  return data;
}
