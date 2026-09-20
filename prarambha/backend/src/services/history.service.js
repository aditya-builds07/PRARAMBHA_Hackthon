/**
 * history.service.js — Read-only view of scenario history for a farm.
 * Accepts a supabase parameter (per-request user-scoped client, D2).
 * The user-scoped client + .eq('auth_user_id', userId) on farms provides
 * defense-in-depth ownership enforcement (D4).
 */

export async function listScenarioHistory(supabase, farmId, userId) {
  // Ownership check: only return history for farms owned by this user.
  const { data: farm } = await supabase
    .from('farms').select('id').eq('id', farmId).eq('auth_user_id', userId).maybeSingle();
  if (!farm) throw new Error('Farm not found.');

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
