import { getUserScopedClient } from "../adapters/db/supabase.client.js";

export async function saveSimulationResult(supabaseParam, resultParam, userIdParam) {
  const supabase = (typeof supabaseParam === 'object' && supabaseParam !== null && typeof supabaseParam.from === 'function')
    ? supabaseParam
    : getUserScopedClient();
  const result = (typeof supabaseParam === 'object' && supabaseParam !== null && typeof supabaseParam.from === 'function')
    ? resultParam
    : supabaseParam;
  const userId = (typeof supabaseParam === 'object' && supabaseParam !== null && typeof supabaseParam.from === 'function')
    ? userIdParam
    : resultParam;

  if (userId && result.scenario_id) {
    const { data: scenario } = await supabase.from('scenarios').select('farm_id').eq('id', result.scenario_id).maybeSingle();
    if (!scenario) throw new Error('Scenario not found.');
    const { data: farm } = await supabase.from('farms').select('id').eq('id', scenario.farm_id).eq('auth_user_id', userId).maybeSingle();
    if (!farm) throw new Error('Farm not found.');
  }

  const { data, error } = await supabase
    .from("simulation_results")
    .insert(result)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to save simulation result: ${error.message}`);
  return data;
}
