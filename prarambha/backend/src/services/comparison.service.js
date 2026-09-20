import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { calculateAttribution } from '../simulation/attribution.engine.js';

const METRICS = [
  ["profit", "profit_inr"],
  ["cost", "cost_inr"],
  ["revenue", "revenue_inr"],
  ["yield", "yield_total_q"],
  ["waterDrawn", "water_drawn_m3"],
  ["waterProductivity", "water_productivity_kg_m3"],
  ["risk", "overall_risk"],
  ["decisionScore", "decision_score"],
];

function latestResultsByScenario(results) {
  return new Map(results.reduce((latest, result) => {
    if (!latest.some((item) => item.scenario_id === result.scenario_id)) latest.push(result);
    return latest;
  }, []).map((result) => [result.scenario_id, result]));
}

function toScenarioInput(scenario) {
  return {
    id: scenario.id,
    crop: scenario.crop_code,
    areaAcres: Number(scenario.area_acres),
    sowingDate: scenario.sowing_date,
    waterAvailabilityPercent: Number(scenario.water_availability_percent),
    availableWaterM3: scenario.available_water_m3 === null ? null : Number(scenario.available_water_m3),
    weather: scenario.weather,
    planting: { type: scenario.planting_type, delayDays: Number(scenario.delay_days) },
    inputCostMultiplier: Number(scenario.input_cost_multiplier),
    irrigation: scenario.irrigation,
    priorityProfile: scenario.priority_profile,
  };
}

import { assertFarmOwnership } from "./authorization.service.js";

export async function compareScenarios(farmId, scenarioIds, userId) {
  if (userId) {
    await assertFarmOwnership(farmId, userId);
  }
  const supabase = getSupabaseClient();
  let scenariosQuery = supabase
    .from("scenarios")
    .select("*")
    .eq("farm_id", farmId)
    .order("created_at", { ascending: true });

  if (scenarioIds.length > 0) scenariosQuery = scenariosQuery.in("id", scenarioIds);

  const { data: scenarios, error: scenariosError } = await scenariosQuery;
  if (scenariosError) throw new Error(`Unable to load scenarios for comparison: ${scenariosError.message}`);
  if (scenarios.length < 2 || scenarios.length > 4) {
    throw new Error("Comparison requires between 2 and 4 scenarios.");
  }

  const ids = scenarios.map((scenario) => scenario.id);
  const { data: results, error: resultsError } = await supabase
    .from("simulation_results")
    .select("*")
    .in("scenario_id", ids)
    .order("created_at", { ascending: false });

  if (resultsError) throw new Error(`Unable to load simulation results: ${resultsError.message}`);

  const latest = latestResultsByScenario(results);
  const missingResult = scenarios.find((scenario) => !latest.has(scenario.id));
  if (missingResult) throw new Error(`Scenario '${missingResult.name}' has no saved simulation result.`);

  const compared = scenarios.map((scenario) => ({
    id: scenario.id,
    name: scenario.name,
    cropCode: scenario.crop_code,
    isBaseline: scenario.is_baseline,
    result: latest.get(scenario.id),
  }));

  const baseline = compared.find((scenario) => scenario.isBaseline) ?? compared[0];
  // Keep attribution in Member 1's domain engine; this service only connects
  // persisted scenarios and results to the API contract used by the Why panel.
  const attributions = compared
    .filter((scenario) => scenario.id !== baseline.id)
    .map((alternative) => ({
      baselineScenarioId: baseline.id,
      alternativeScenarioId: alternative.id,
      ...calculateAttribution({
        baseline: { scenario: toScenarioInput(baseline), result: baseline.result.result_json },
        alternative: { scenario: toScenarioInput(alternative), result: alternative.result.result_json },
      }),
    }));

  return {
    scenarios: compared,
    differences: METRICS.map(([metric, column]) => ({
      metric,
      values: Object.fromEntries(compared.map((scenario) => [scenario.id, Number(scenario.result[column])])),
    })),
    baselineScenarioId: baseline.id,
    attributions,
  };
}
