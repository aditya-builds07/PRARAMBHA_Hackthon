import { getSupabaseClient } from '../adapters/db/supabase.client.js';
import { generateRecommendations } from './recommendation.service.js';
import { assertScenarioOwnership } from './authorization.service.js';

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

/** Loads saved deterministic output; it never creates a second recommendation path. */
export async function getRecommendationsForScenario(scenarioId, userId) {
  if (userId) {
    await assertScenarioOwnership(scenarioId, userId);
  }
  const supabase = getSupabaseClient();
  const { data: scenario, error: scenarioError } = await supabase.from('scenarios').select('*').eq('id', scenarioId).maybeSingle();
  if (scenarioError) throw new Error(`Unable to load scenario: ${scenarioError.message}`);
  if (!scenario) throw new Error('Scenario not found.');

  const { data: result, error: resultError } = await supabase
    .from('simulation_results').select('result_json').eq('scenario_id', scenarioId)
    .order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (resultError) throw new Error(`Unable to load simulation result: ${resultError.message}`);
  if (!result?.result_json || typeof result.result_json !== 'object') {
    throw new Error('No saved simulation result exists for this scenario.');
  }
  return generateRecommendations(result.result_json, toScenarioInput(scenario)).recommendations;
}
