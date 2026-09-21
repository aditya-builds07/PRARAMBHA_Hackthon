import { getUserScopedClient } from '../adapters/db/supabase.client.js';
import { generateRecommendations } from './recommendation.service.js';

function toScenarioInput(scenario) {
  return {
    id: scenario.id, farmId: scenario.farm_id, crop: scenario.crop_code,
    areaAcres: Number(scenario.area_acres), sowingDate: scenario.sowing_date,
    waterAvailabilityPercent: Number(scenario.water_availability_percent),
    availableWaterM3: scenario.available_water_m3 === null ? null : Number(scenario.available_water_m3),
    weather: scenario.weather,
    planting: { type: scenario.planting_type, delayDays: Number(scenario.delay_days) },
    inputCostMultiplier: Number(scenario.input_cost_multiplier), irrigation: scenario.irrigation,
    priorityProfile: scenario.priority_profile,
  };
}

export async function getRecommendationsForScenario(supabaseParam, scenarioIdParam, userIdParam) {
  const supabase = (typeof supabaseParam === 'object' && supabaseParam !== null && typeof supabaseParam.from === 'function')
    ? supabaseParam
    : getUserScopedClient();
  const scenarioId = typeof supabaseParam === 'string' ? supabaseParam : scenarioIdParam;
  const userId = typeof supabaseParam === 'string' ? scenarioIdParam : userIdParam;

  const { data: scenario, error: scenarioError } = await supabase.from('scenarios').select('*').eq('id', scenarioId).maybeSingle();
  if (scenarioError) throw new Error(`Unable to load scenario: ${scenarioError.message}`);
  if (!scenario) throw new Error('Scenario not found.');

  if (userId) {
    const { data: farm } = await supabase.from('farms').select('id').eq('id', scenario.farm_id).eq('auth_user_id', userId).maybeSingle();
    if (!farm) throw new Error('Farm not found.');
  }

  const { data: result, error: resultError } = await supabase
    .from('simulation_results').select('result_json').eq('scenario_id', scenarioId)
    .order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (resultError) throw new Error(`Unable to load simulation result: ${resultError.message}`);
  if (!result?.result_json || typeof result.result_json !== 'object') {
    throw new Error('No saved simulation result exists for this scenario.');
  }
  return generateRecommendations(result.result_json, toScenarioInput(scenario)).recommendations;
}
