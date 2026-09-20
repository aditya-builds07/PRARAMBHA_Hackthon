import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { assertFarmOwnership as authAssertFarmOwnership } from "./authorization.service.js";

/**
 * scenario.service.js — Data access for the scenarios table.
 * All functions accept a `supabase` parameter (per-request user-scoped client).
 * RLS + assertFarmOwnership provide defense-in-depth (D2, D4).
 */
async function assertFarmOwnership(supabase, farmId, userId) {
  if (supabase) {
    const { data, error } = await supabase
      .from('farms').select('id').eq('id', farmId).eq('auth_user_id', userId).maybeSingle();
    if (error) throw new Error(`Unable to verify farm ownership: ${error.message}`);
    if (!data) throw new Error('Farm not found.');
  } else {
    await authAssertFarmOwnership(farmId, userId);
  }
}

export async function listScenariosByFarm(supabase, farmId, userId) {
  await assertFarmOwnership(supabase, farmId, userId);
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('farm_id', farmId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Unable to load scenarios: ${error.message}`);
  return data;
}

export async function createScenario(supabase, scenario, userId) {
  await assertFarmOwnership(supabase, scenario.farm_id, userId);
  const { data, error } = await supabase
    .from('scenarios').insert(scenario).select('*').single();
  if (error) throw new Error(`Unable to create scenario: ${error.message}`);
  return data;
}

export async function getScenarioById(supabase, id, userId) {
  const { data, error } = await supabase.from('scenarios').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(`Unable to load scenario: ${error.message}`);
  if (!data) throw new Error('Scenario not found.');
  if (userId) await assertFarmOwnership(supabase, data.farm_id, userId);
  return data;
}

export async function updateScenario(supabase, id, scenario, userId) {
  const current = await getScenarioById(supabase, id, userId);
  await assertFarmOwnership(supabase, scenario.farm_id, userId);
  const { data: savedResult, error: resultError } = await supabase
    .from('simulation_results').select('id').eq('scenario_id', current.id).limit(1).maybeSingle();
  if (resultError) throw new Error(`Unable to verify scenario history: ${resultError.message}`);
  if (savedResult) {
    throw new Error('Scenario has saved results and cannot be changed; create a new scenario instead.');
  }
  const { data, error } = await supabase
    .from('scenarios').update(scenario).eq('id', id).select('*').maybeSingle();
  if (error) throw new Error(`Unable to update scenario: ${error.message}`);
  if (!data) throw new Error('Scenario not found.');
  return data;
}

export async function deleteScenarioById(supabase, id, userId) {
  await getScenarioById(supabase, id, userId);
  const { data, error } = await supabase
    .from('scenarios').delete().eq('id', id).select('id').maybeSingle();
  if (error) throw new Error(`Unable to delete scenario: ${error.message}`);
  if (!data) throw new Error('Scenario not found.');
  return data;
}
