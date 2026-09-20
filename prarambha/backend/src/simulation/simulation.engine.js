/**
 * PRARAMBHA 2.0 - Simulation Engine (Orchestrator)
 * Pure deterministic orchestrator combining Water, Yield, Financial, Risk, and Decision engines.
 */

import { MODEL_VERSION, ASSUMPTIONS_VERSION } from './model.version.js';
import { getCropParameters } from './crop.parameters.js';
import { calculateWater, calculateWaterProductivity } from './water.engine.js';
import { calculateYield } from './yield.engine.js';
import { calculateEconomics } from './financial.engine.js';
import { calculateOverallRisk } from './risk.engine.js';
import { calculateDecision } from './decision.engine.js';

/**
 * Main public orchestrator function for PRARAMBHA 2.0 simulation.
 * Accepts a scenario input and produces a complete, transparent deterministic simulation output.
 * 
 * @param {Object} input - Scenario input object
 * @returns {Object|null} Complete simulation result object or null if crop is unknown/invalid
 */
export function calculateSimulation(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }

  const cropKey = input.crop;
  const cropParams = getCropParameters(cropKey, input.customCropParams || {});
  if (!cropParams) {
    return null;
  }

  // Phase 2: Water Engine
  const water = calculateWater(input, cropParams);

  // Phase 3: Yield Engine
  const yieldResult = calculateYield({
    ...input,
    waterFactor: water.waterFactor
  }, cropParams);

  if (!yieldResult) {
    return null;
  }

  // Update water productivity using calculated yield (1 quintal = 100 kg)
  const totalYieldKg = yieldResult.total * 100;
  const waterProductivityKgPerM3 = calculateWaterProductivity(totalYieldKg, water.waterDrawnM3);

  const updatedWater = {
    ...water,
    totalYieldKg,
    waterProductivityKgPerM3
  };

  // Phase 4: Financial Engine
  const economics = calculateEconomics({
    ...input,
    totalYield: yieldResult.total
  }, cropParams);

  // Phase 5: Risk Engine
  const risk = calculateOverallRisk({
    waterFactor: updatedWater.waterFactor,
    weather: input.weather,
    planting: input.planting,
    financial: economics
  });

  // Phase 6: Decision Engine
  const decision = calculateDecision({
    priorityProfile: input.priorityProfile ?? input.profile,
    yield: {
      total: yieldResult.total,
      potentialYield: cropParams.potentialYield,
      areaAcres: input.areaAcres ?? input.area ?? 1
    },
    economics,
    risk
  });

  // Phase 7: Result Assembly
  return {
    scenarioId: input.id ?? input.scenarioId ?? null,
    modelVersion: MODEL_VERSION,
    assumptionsVersion: ASSUMPTIONS_VERSION,
    scenario: { ...input },
    crop: cropParams,
    water: updatedWater,
    yield: yieldResult,
    economics,
    risk,
    decision
  };
}
