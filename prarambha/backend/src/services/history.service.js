import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { assertFarmOwnership } from "./authorization.service.js";

/**
 * history.service.js — Read-only view of scenario history for a farm.
 * Supports both listScenarioHistory(supabase, farmId, userId) and listScenarioHistory(farmId, userId).
 */
export async function listScenarioHistory(supabaseOrFarmId, farmIdOrUserId, maybeUserId) {
  let supabase, farmId, userId;
  if (typeof supabaseOrFarmId === "string") {
    supabase = getSupabaseClient();
    farmId = supabaseOrFarmId;
    userId = farmIdOrUserId;
  } else {
    supabase = supabaseOrFarmId || getSupabaseClient();
    farmId = farmIdOrUserId;
    userId = maybeUserId;
  }

  if (userId) {
    await assertFarmOwnership(farmId, userId);
  }
  const { data: scenarios, error: scenariosError } = await supabase
    .from('scenarios')
    .select('id, name, crop_code, area_acres, is_baseline, created_at, updated_at')
    .eq('farm_id', farmId)
    .order('updated_at', { ascending: false });

  if (scenariosError) throw new Error(`Unable to load scenario history: ${scenariosError.message}`);
  if (scenarios.length === 0) return [];

  const { data: results, error: resultsError } = await supabase
    .from('simulation_results')
    .select('scenario_id, model_version, assumptions_version, profit_inr, overall_risk, risk_level, decision_score, created_at')
    .in('scenario_id', scenarios.map((scenario) => scenario.id))
    .order('created_at', { ascending: false });

  if (resultsError) throw new Error(`Unable to load history results: ${resultsError.message}`);

  const latestResult = new Map();
  for (const result of results) {
    if (!latestResult.has(result.scenario_id)) latestResult.set(result.scenario_id, result);
  }

  return scenarios.map((scenario) => ({
    ...scenario,
    latestResult: latestResult.get(scenario.id) ?? null,
  }));
}
