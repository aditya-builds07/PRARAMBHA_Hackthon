import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listScenarioHistory(farmId) {
  const supabase = getSupabaseClient();
  const { data: scenarios, error: scenariosError } = await supabase
    .from("scenarios")
    .select("id, name, crop_code, area_acres, is_baseline, created_at, updated_at")
    .eq("farm_id", farmId)
    .order("updated_at", { ascending: false });

  if (scenariosError) throw new Error(`Unable to load scenario history: ${scenariosError.message}`);
  if (scenarios.length === 0) return [];

  const { data: results, error: resultsError } = await supabase
    .from("simulation_results")
    .select("scenario_id, model_version, assumptions_version, profit_inr, overall_risk, risk_level, decision_score, created_at")
    .in("scenario_id", scenarios.map((scenario) => scenario.id))
    .order("created_at", { ascending: false });

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
