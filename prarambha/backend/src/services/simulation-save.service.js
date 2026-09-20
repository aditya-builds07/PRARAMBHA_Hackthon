import { runSimulation } from "./simulation.service.js";
import { saveSimulationResult } from "./simulation-result.service.js";
import { validateSimulationResultInput } from "../validators/simulation-result.validator.js";
import { getSupabaseClient } from "../adapters/db/supabase.client.js";

function toSimulationInput(scenario) {
  return {
    id: scenario.id,
    farmId: scenario.farm_id,
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

export function toPersistedResult(result) {
  return {
    scenarioId: result.scenarioId,
    modelVersion: result.modelVersion,
    assumptionsVersion: result.assumptionsVersion,
    estimated: true,
    yield: result.yield,
    economics: result.economics,
    water: {
      drawnM3: result.water.waterDrawnM3,
      productivity: result.water.waterProductivityKgPerM3,
    },
    risk: {
      components: {
        water: result.risk.components.waterRisk,
        weather: result.risk.components.weatherRisk,
        planting: result.risk.components.plantingRisk,
        financial: result.risk.components.financialRisk,
      },
      overall: result.risk.overallRisk,
      level: result.risk.riskLevel,
    },
    decisionScore: result.decision.decisionScore,
  };
}

import { assertScenarioOwnership } from "./authorization.service.js";

export async function simulateAndSave(scenarioId, userId) {
  const scenario = await assertScenarioOwnership(scenarioId, userId);

  const result = await runSimulation(toSimulationInput(scenario));
  const stored = await saveSimulationResult(validateSimulationResultInput(toPersistedResult(result)), userId);
  return { farmId: scenario.farm_id, simulation: result, savedResult: stored };
}
