/**
 * PRARAMBHA 2.0 - Simulation Engine Integration & Orchestration Test Suite (Step 10)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MODEL_VERSION, ASSUMPTIONS_VERSION } from '../../src/simulation/model.version.js';
import { getCropParameters } from '../../src/simulation/crop.parameters.js';
import { calculateWater } from '../../src/simulation/water.engine.js';
import { calculateYield } from '../../src/simulation/yield.engine.js';
import { calculateEconomics } from '../../src/simulation/financial.engine.js';
import { calculateOverallRisk } from '../../src/simulation/risk.engine.js';
import { calculateDecision } from '../../src/simulation/decision.engine.js';
import { calculateSimulation } from '../../src/simulation/simulation.engine.js';

describe('Simulation Engine Suite (Step 10)', () => {
  // Helper base scenario for clean test construction
  function createBaseScenario(overrides = {}) {
    return {
      id: 'scenario-test-001',
      crop: 'wheat',
      areaAcres: 5,
      sowingDate: '2026-10-15',
      waterAvailabilityPercent: 100,
      availableWaterM3: null,
      weather: 'normal',
      planting: {
        type: 'on_time',
        delayDays: 0
      },
      inputCostMultiplier: 1.0,
      irrigation: 'flood',
      priorityProfile: 'balanced',
      ...overrides
    };
  }

  // --- A. Basic Execution for All 6 Crops ---
  it('1. Valid wheat scenario execution', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat' }));
    assert.ok(res);
    assert.strictEqual(res.crop.crop, 'wheat');
  });

  it('2. Valid rice scenario execution', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'rice' }));
    assert.ok(res);
    assert.strictEqual(res.crop.crop, 'rice');
  });

  it('3. Valid maize scenario execution', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'maize' }));
    assert.ok(res);
    assert.strictEqual(res.crop.crop, 'maize');
  });

  it('4. Valid sugarcane scenario execution', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'sugarcane' }));
    assert.ok(res);
    assert.strictEqual(res.crop.crop, 'sugarcane');
  });

  it('5. Valid soybean scenario execution', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'soybean' }));
    assert.ok(res);
    assert.strictEqual(res.crop.crop, 'soybean');
  });

  it('6. Valid cotton scenario execution', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'cotton' }));
    assert.ok(res);
    assert.strictEqual(res.crop.crop, 'cotton');
  });

  // --- B. Output Structure & Versioning ---
  it('7. scenarioId is preserved when supplied', () => {
    const res = calculateSimulation(createBaseScenario({ id: 'custom-id-999' }));
    assert.strictEqual(res.scenarioId, 'custom-id-999');
  });

  it('8. modelVersion returned matches MODEL_VERSION constant', () => {
    const res = calculateSimulation(createBaseScenario());
    assert.strictEqual(res.modelVersion, MODEL_VERSION);
    assert.strictEqual(res.modelVersion, '2.0.0');
  });

  it('9. assumptionsVersion returned matches ASSUMPTIONS_VERSION constant', () => {
    const res = calculateSimulation(createBaseScenario());
    assert.strictEqual(res.assumptionsVersion, ASSUMPTIONS_VERSION);
    assert.strictEqual(res.assumptionsVersion, '2026.1');
  });

  it('10. Crop information object returned correctly', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat' }));
    assert.ok(res.crop);
    assert.strictEqual(res.crop.potentialYield, 16);
    assert.strictEqual(res.crop.waterRequirementMm, 450);
  });

  it('11. Water result object returned correctly', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 80 }));
    assert.ok(res.water);
    assert.strictEqual(res.water.waterAvailabilityPercent, 80);
    assert.strictEqual(res.water.waterFactor, 0.8);
    assert.ok(res.water.requiredWaterM3 > 0);
    assert.ok(res.water.waterDrawnM3 > 0);
  });

  it('12. Yield result object returned correctly', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat', areaAcres: 5 }));
    assert.ok(res.yield);
    assert.strictEqual(res.yield.estimated, true);
    assert.ok(res.yield.perAcre > 0);
    assert.ok(res.yield.total > 0);
  });

  it('13. Economics result object returned correctly', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat', areaAcres: 5 }));
    assert.ok(res.economics);
    assert.ok(res.economics.cost > 0);
    assert.ok(res.economics.revenue > 0);
    assert.ok(!isNaN(res.economics.profit));
    assert.ok(!isNaN(res.economics.roi));
  });

  it('14. Risk result object returned correctly', () => {
    const res = calculateSimulation(createBaseScenario());
    assert.ok(res.risk);
    assert.ok(res.risk.components);
    assert.ok(res.risk.overallRisk >= 0 && res.risk.overallRisk <= 100);
    assert.ok(['low', 'medium', 'high'].includes(res.risk.riskLevel));
  });

  it('15. Decision result object returned correctly', () => {
    const res = calculateSimulation(createBaseScenario({ priorityProfile: 'balanced' }));
    assert.ok(res.decision);
    assert.strictEqual(res.decision.priorityProfile, 'balanced');
    assert.ok(res.decision.indices);
    assert.ok(res.decision.decisionScore >= 0 && res.decision.decisionScore <= 100);
  });

  // --- C. Data Flow Integration ---
  it('16. Water Engine output waterFactor reaches Yield Engine', () => {
    const res80 = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 80 }));
    const res100 = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 100 }));
    assert.strictEqual(res80.yield.factors.water, 0.8);
    assert.strictEqual(res100.yield.factors.water, 1.0);
    assert.ok(res100.yield.total > res80.yield.total);
  });

  it('17. Yield Engine total yield reaches Financial Engine', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat', areaAcres: 5 }));
    const expectedRevenue = res.yield.total * res.crop.pricePerUnit;
    assert.strictEqual(res.economics.revenue, expectedRevenue);
  });

  it('18. Financial Engine output (profit, cost) reaches Risk Engine', () => {
    const res = calculateSimulation(createBaseScenario({ inputCostMultiplier: 3.0 })); // Causes loss / negative profit
    assert.ok(res.economics.profit < 0);
    assert.strictEqual(res.risk.components.financialRisk, 100);
  });

  it('19. Risk/Yield/Financial outputs reach Decision Engine', () => {
    const res = calculateSimulation(createBaseScenario());
    assert.ok(res.decision.indices.yield > 0);
    assert.ok(res.decision.indices.profit > 0);
    assert.ok(res.decision.indices.safety > 0);
  });

  // --- D. Scenario Sensitivity ---
  it('20. Reducing waterAvailabilityPercent reduces yield and profit', () => {
    const res100 = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 100 }));
    const res50 = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 50 }));
    assert.ok(res100.yield.total > res50.yield.total);
    assert.ok(res100.economics.profit > res50.economics.profit);
  });

  it('21. Changing weather from normal to poor reduces yield and increases weatherRisk', () => {
    const resNorm = calculateSimulation(createBaseScenario({ weather: 'normal' }));
    const resPoor = calculateSimulation(createBaseScenario({ weather: 'poor' }));
    assert.ok(resNorm.yield.total > resPoor.yield.total);
    assert.strictEqual(resNorm.risk.components.weatherRisk, 30);
    assert.strictEqual(resPoor.risk.components.weatherRisk, 80);
  });

  it('22. Increasing planting delay reduces yield and increases plantingRisk', () => {
    const resOnTime = calculateSimulation(createBaseScenario({ planting: { type: 'on_time', delayDays: 0 } }));
    const resDelayed = calculateSimulation(createBaseScenario({ planting: { type: 'delayed', delayDays: 10 } }));
    assert.ok(resOnTime.yield.total > resDelayed.yield.total);
    assert.strictEqual(resOnTime.risk.components.plantingRisk, 0);
    assert.strictEqual(resDelayed.risk.components.plantingRisk, 35);
  });

  it('23. Increasing inputCostMultiplier increases totalCost and reduces profit', () => {
    const resBase = calculateSimulation(createBaseScenario({ inputCostMultiplier: 1.0 }));
    const resHigh = calculateSimulation(createBaseScenario({ inputCostMultiplier: 1.5 }));
    assert.ok(resHigh.economics.cost > resBase.economics.cost);
    assert.ok(resHigh.economics.profit < resBase.economics.profit);
  });

  it('24. Changing irrigation from flood to drip increases irrigationCost', () => {
    const resFlood = calculateSimulation(createBaseScenario({ irrigation: 'flood' }));
    const resDrip = calculateSimulation(createBaseScenario({ irrigation: 'drip' }));
    assert.strictEqual(resFlood.economics.breakdown.irrigationCost, 0);
    assert.strictEqual(resDrip.economics.breakdown.irrigationCost, 2500 * 5);
  });

  it('25. Changing priorityProfile changes decisionScore but leaves physical outputs unchanged', () => {
    const scenarioBal = createBaseScenario({ priorityProfile: 'balanced' });
    const scenarioMaxP = createBaseScenario({ priorityProfile: 'max_profit' });

    const resBal = calculateSimulation(scenarioBal);
    const resMaxP = calculateSimulation(scenarioMaxP);

    assert.strictEqual(resBal.yield.total, resMaxP.yield.total);
    assert.strictEqual(resBal.economics.profit, resMaxP.economics.profit);
    assert.strictEqual(resBal.risk.overallRisk, resMaxP.risk.overallRisk);

    assert.notStrictEqual(resBal.decision.decisionScore, resMaxP.decision.decisionScore);
  });

  // --- E. Determinism & Immutability ---
  it('26. Same input produces exact same simulation output', () => {
    const scenario = createBaseScenario();
    const res1 = calculateSimulation(scenario);
    const res2 = calculateSimulation(scenario);
    assert.deepStrictEqual(res1, res2);
  });

  it('27. Scenario input object and nested objects are not mutated', () => {
    const scenario = createBaseScenario();
    const copy = JSON.parse(JSON.stringify(scenario));
    calculateSimulation(scenario);
    assert.deepStrictEqual(scenario, copy);
  });

  it('28. No random IDs or timestamps injected into calculation', () => {
    const res1 = calculateSimulation(createBaseScenario({ id: 'stable-id' }));
    const res2 = calculateSimulation(createBaseScenario({ id: 'stable-id' }));
    assert.strictEqual(res1.scenarioId, 'stable-id');
    assert.deepStrictEqual(res1, res2);
  });

  // --- F. Edge Cases & Safety ---
  it('29. 0% water availability produces 0 yield and 100 water risk', () => {
    const res = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 0 }));
    assert.strictEqual(res.water.waterFactor, 0);
    assert.strictEqual(res.yield.total, 0);
    assert.strictEqual(res.risk.components.waterRisk, 100);
  });

  it('30. 100% water availability produces max potential yield under good weather', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 100, weather: 'good' }));
    assert.strictEqual(res.yield.perAcre, 16); // 16 * 1 * 1 * 1 = 16
    assert.strictEqual(res.yield.total, 80);
  });

  it('31. Delayed planting (20 days delay) applies correct factors and risk', () => {
    const res = calculateSimulation(createBaseScenario({ planting: { type: 'delayed', delayDays: 20 } }));
    assert.strictEqual(res.yield.factors.planting, 0.7); // 1.0 - 20*0.015 = 0.7
    assert.strictEqual(res.risk.components.plantingRisk, 70); // 20 * 3.5 = 70
  });

  it('32. Poor weather scenario reduces yield by 35% compared to optimal', () => {
    const resGood = calculateSimulation(createBaseScenario({ weather: 'good' }));
    const resPoor = calculateSimulation(createBaseScenario({ weather: 'poor' }));
    assert.strictEqual(resGood.yield.factors.weather, 1.0);
    assert.strictEqual(resPoor.yield.factors.weather, 0.65);
    assert.strictEqual(resPoor.yield.total, resGood.yield.total * 0.65);
  });

  it('33. Negative profit scenario is handled safely without crashing or clamping profit to zero', () => {
    const res = calculateSimulation(createBaseScenario({ inputCostMultiplier: 3.0 }));
    assert.ok(res.economics.profit < 0);
    assert.strictEqual(res.risk.components.financialRisk, 100);
    assert.ok(!isNaN(res.decision.decisionScore));
  });

  it('34. Zero-cost behavior when totalCost = 0', () => {
    const res = calculateSimulation(createBaseScenario({ inputCostMultiplier: 0, irrigation: 'flood' }));
    assert.strictEqual(res.economics.cost, 0);
    assert.strictEqual(res.economics.roi, 0);
    assert.strictEqual(res.risk.components.financialRisk, 0);
  });

  it('35. Missing optional availableWaterM3 handled safely', () => {
    const res = calculateSimulation(createBaseScenario({ availableWaterM3: null }));
    assert.ok(res);
    assert.strictEqual(res.water.availableWaterM3, null);
  });

  // --- G. Crop & Parameter Failure Contract ---
  it('36. Unknown crop returns null safely according to crop-parameter contract', () => {
    const res = calculateSimulation(createBaseScenario({ crop: 'unknown_crop_xyz' }));
    assert.strictEqual(res, null);
  });

  it('37. Missing or non-object input returns null safely', () => {
    assert.strictEqual(calculateSimulation(null), null);
    assert.strictEqual(calculateSimulation(undefined), null);
    assert.strictEqual(calculateSimulation('invalid'), null);
  });

  // --- H. Numerical Safety ---
  it('38. No NaN in any simulation output result field', () => {
    const res = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 0, inputCostMultiplier: 0 }));
    assert.ok(!isNaN(res.water.waterFactor));
    assert.ok(!isNaN(res.yield.total));
    assert.ok(!isNaN(res.economics.profit));
    assert.ok(!isNaN(res.economics.roi));
    assert.ok(!isNaN(res.risk.overallRisk));
    assert.ok(!isNaN(res.decision.decisionScore));
  });

  it('39. No Infinity in any simulation output result field', () => {
    const res = calculateSimulation(createBaseScenario({ areaAcres: 1000, waterAvailabilityPercent: 100 }));
    assert.ok(isFinite(res.water.requiredWaterM3));
    assert.ok(isFinite(res.yield.total));
    assert.ok(isFinite(res.economics.cost));
    assert.ok(isFinite(res.economics.revenue));
    assert.ok(isFinite(res.economics.profit));
    assert.ok(isFinite(res.economics.roi));
    assert.ok(isFinite(res.decision.decisionScore));
  });

  it('40. No -Infinity in any simulation output result field', () => {
    const res = calculateSimulation(createBaseScenario({ inputCostMultiplier: 5.0 }));
    assert.ok(res.economics.profit !== -Infinity);
    assert.ok(res.economics.roi !== -Infinity);
  });

  // --- I. Cross-Engine Result Consistency Invariants ---
  it('41. Invariant 1: Simulation result water equals direct Water Engine result', () => {
    const scenario = createBaseScenario({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 75 });
    const simRes = calculateSimulation(scenario);
    const directWater = calculateWater(scenario, getCropParameters('wheat'));

    assert.strictEqual(simRes.water.waterFactor, directWater.waterFactor);
    assert.strictEqual(simRes.water.requiredWaterM3, directWater.requiredWaterM3);
    assert.strictEqual(simRes.water.waterDrawnM3, directWater.waterDrawnM3);
  });

  it('42. Invariant 2: Simulation result yield equals direct Yield Engine result', () => {
    const scenario = createBaseScenario({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 80, weather: 'normal' });
    const simRes = calculateSimulation(scenario);
    const directWater = calculateWater(scenario, getCropParameters('wheat'));
    const directYield = calculateYield({ ...scenario, waterFactor: directWater.waterFactor }, getCropParameters('wheat'));

    assert.strictEqual(simRes.yield.perAcre, directYield.perAcre);
    assert.strictEqual(simRes.yield.total, directYield.total);
    assert.strictEqual(simRes.yield.low, directYield.low);
    assert.strictEqual(simRes.yield.high, directYield.high);
  });

  it('43. Invariant 3: Simulation result economics equals direct Financial Engine result', () => {
    const scenario = createBaseScenario({ crop: 'wheat', areaAcres: 5, inputCostMultiplier: 1.2 });
    const simRes = calculateSimulation(scenario);
    const directEcon = calculateEconomics({ ...scenario, totalYield: simRes.yield.total }, getCropParameters('wheat'));

    assert.strictEqual(simRes.economics.cost, directEcon.cost);
    assert.strictEqual(simRes.economics.revenue, directEcon.revenue);
    assert.strictEqual(simRes.economics.profit, directEcon.profit);
    assert.strictEqual(simRes.economics.roi, directEcon.roi);
  });

  it('44. Invariant 4: Simulation result risk equals direct Risk Engine result', () => {
    const scenario = createBaseScenario({ crop: 'wheat', areaAcres: 5 });
    const simRes = calculateSimulation(scenario);
    const directRisk = calculateOverallRisk({
      waterFactor: simRes.water.waterFactor,
      weather: scenario.weather,
      planting: scenario.planting,
      financial: simRes.economics
    });

    assert.strictEqual(simRes.risk.overallRisk, directRisk.overallRisk);
    assert.strictEqual(simRes.risk.riskLevel, directRisk.riskLevel);
  });

  it('45. Invariant 5: Simulation result decision equals direct Decision Engine result', () => {
    const scenario = createBaseScenario({ crop: 'wheat', areaAcres: 5, priorityProfile: 'balanced' });
    const simRes = calculateSimulation(scenario);
    const directDecision = calculateDecision({
      priorityProfile: scenario.priorityProfile,
      yield: {
        total: simRes.yield.total,
        potentialYield: simRes.crop.potentialYield,
        areaAcres: 5
      },
      economics: simRes.economics,
      risk: simRes.risk
    });

    assert.strictEqual(simRes.decision.decisionScore, directDecision.decisionScore);
    assert.strictEqual(simRes.decision.priorityProfile, directDecision.priorityProfile);
  });
});
