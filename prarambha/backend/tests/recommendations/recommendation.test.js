/**
 * PRARAMBHA 2.0 - Recommendation Service Test Suite (Step 12)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateSimulation } from '../../src/simulation/simulation.engine.js';
import { generateRecommendations } from '../../src/services/recommendation.service.js';

describe('Recommendation Service Suite (Step 12)', () => {

  function createBaseScenario(overrides = {}) {
    return {
      id: 'scenario-rec-001',
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

  // --- A. Basic Behavior & Output Contract ---

  it('1. Valid optimal simulation result produces no high/medium risk recommendations', () => {
    const sim = calculateSimulation(createBaseScenario());
    const res = generateRecommendations(sim);
    assert.ok(res);
    assert.ok(Array.isArray(res.recommendations));
    assert.strictEqual(res.recommendations.length, 0);
  });

  it('2. Null simulation input produces empty recommendations object safely', () => {
    const res = generateRecommendations(null);
    assert.ok(res);
    assert.deepStrictEqual(res.recommendations, []);
  });

  it('3. Undefined simulation input produces empty recommendations object safely', () => {
    const res = generateRecommendations(undefined);
    assert.ok(res);
    assert.deepStrictEqual(res.recommendations, []);
  });

  it('4. Non-object simulation input produces empty recommendations object safely', () => {
    assert.deepStrictEqual(generateRecommendations('invalid').recommendations, []);
    assert.deepStrictEqual(generateRecommendations(123).recommendations, []);
  });

  it('5. Empty simulation result object returns empty recommendations safely', () => {
    const res = generateRecommendations({});
    assert.ok(res);
    assert.deepStrictEqual(res.recommendations, []);
  });

  // --- B. Water Category Rules ---

  it('6. Critical water deficit (<50%) triggers RULE_WATER_AVAILABILITY_CRITICAL', () => {
    const sim = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 40 }));
    const res = generateRecommendations(sim);
    const waterRec = res.recommendations.find(r => r.ruleId === 'RULE_WATER_AVAILABILITY_CRITICAL');
    assert.ok(waterRec);
    assert.strictEqual(waterRec.category, 'water');
    assert.strictEqual(waterRec.priority, 'high');
    assert.strictEqual(waterRec.threshold, 50);
  });

  it('7. Moderate water deficit (60%) triggers RULE_WATER_AVAILABILITY_MODERATE', () => {
    const sim = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 60 }));
    const res = generateRecommendations(sim);
    const waterRec = res.recommendations.find(r => r.ruleId === 'RULE_WATER_AVAILABILITY_MODERATE');
    assert.ok(waterRec);
    assert.strictEqual(waterRec.category, 'water');
    assert.strictEqual(waterRec.priority, 'medium');
  });

  it('8. Optimal water (100%) produces no water deficit recommendations', () => {
    const sim = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 100 }));
    const res = generateRecommendations(sim);
    const waterRec = res.recommendations.find(r => r.category === 'water');
    assert.strictEqual(waterRec, undefined);
  });

  it('9. Low water productivity (<0.50 kg/m3) triggers RULE_WATER_PRODUCTIVITY_LOW', () => {
    // Rice crop under low yield conditions has low water productivity per m3
    const sim = calculateSimulation(createBaseScenario({ crop: 'rice', waterAvailabilityPercent: 40 }));
    const res = generateRecommendations(sim);
    const prodRec = res.recommendations.find(r => r.ruleId === 'RULE_WATER_PRODUCTIVITY_LOW');
    assert.ok(prodRec);
    assert.strictEqual(prodRec.category, 'water');
    assert.strictEqual(prodRec.threshold, 0.50);
  });

  // --- C. Weather Category Rules ---

  it('10. Poor weather triggers RULE_WEATHER_POOR with high priority', () => {
    const sim = calculateSimulation(createBaseScenario({ weather: 'poor' }));
    const res = generateRecommendations(sim);
    const weatherRec = res.recommendations.find(r => r.ruleId === 'RULE_WEATHER_POOR');
    assert.ok(weatherRec);
    assert.strictEqual(weatherRec.category, 'weather');
    assert.strictEqual(weatherRec.priority, 'high');
    assert.strictEqual(weatherRec.currentValue, 'poor');
  });

  it('11. Good weather triggers no adverse weather recommendations', () => {
    const sim = calculateSimulation(createBaseScenario({ weather: 'good' }));
    const res = generateRecommendations(sim);
    const weatherRec = res.recommendations.find(r => r.category === 'weather');
    assert.strictEqual(weatherRec, undefined);
  });

  it('12. Normal weather under elevated overall risk triggers RULE_WEATHER_NORMAL_STRESS', () => {
    const sim = calculateSimulation(createBaseScenario({ weather: 'normal', waterAvailabilityPercent: 40, planting: { type: 'delayed', delayDays: 20 } }));
    const res = generateRecommendations(sim);
    const weatherRec = res.recommendations.find(r => r.ruleId === 'RULE_WEATHER_NORMAL_STRESS');
    assert.ok(weatherRec);
    assert.strictEqual(weatherRec.category, 'weather');
    assert.strictEqual(weatherRec.priority, 'medium');
  });

  // --- D. Planting Category Rules ---

  it('13. Significant delay (20 days) triggers RULE_PLANTING_DELAY_HIGH', () => {
    const sim = calculateSimulation(createBaseScenario({ planting: { type: 'delayed', delayDays: 20 } }));
    const res = generateRecommendations(sim);
    const plantRec = res.recommendations.find(r => r.ruleId === 'RULE_PLANTING_DELAY_HIGH');
    assert.ok(plantRec);
    assert.strictEqual(plantRec.category, 'planting');
    assert.strictEqual(plantRec.priority, 'high');
    assert.strictEqual(plantRec.currentValue, 20);
  });

  it('14. Minor delay (5 days) triggers RULE_PLANTING_DELAY_MODERATE', () => {
    const sim = calculateSimulation(createBaseScenario({ planting: { type: 'delayed', delayDays: 5 } }));
    const res = generateRecommendations(sim);
    const plantRec = res.recommendations.find(r => r.ruleId === 'RULE_PLANTING_DELAY_MODERATE');
    assert.ok(plantRec);
    assert.strictEqual(plantRec.category, 'planting');
    assert.strictEqual(plantRec.priority, 'medium');
  });

  it('15. On-time planting (0 days delay) produces no delay recommendations', () => {
    const sim = calculateSimulation(createBaseScenario({ planting: { type: 'on_time', delayDays: 0 } }));
    const res = generateRecommendations(sim);
    const plantRec = res.recommendations.find(r => r.category === 'planting');
    assert.strictEqual(plantRec, undefined);
  });

  // --- E. Financial Category Rules ---

  it('16. High cost multiplier causing loss triggers RULE_FINANCIAL_NEGATIVE_PROFIT', () => {
    const sim = calculateSimulation(createBaseScenario({ inputCostMultiplier: 3.5 }));
    const res = generateRecommendations(sim);
    const finRec = res.recommendations.find(r => r.ruleId === 'RULE_FINANCIAL_NEGATIVE_PROFIT');
    assert.ok(finRec);
    assert.strictEqual(finRec.category, 'financial');
    assert.strictEqual(finRec.priority, 'high');
    assert.ok(finRec.currentValue < 0);
  });

  it('17. Low ROI triggers RULE_FINANCIAL_LOW_ROI', () => {
    // Scenario with positive profit but ROI below 15% benchmark
    const sim = {
      scenario: createBaseScenario(),
      economics: { profit: 1000, cost: 20000, revenue: 21000, roi: 5.0 },
      risk: { components: {} }
    };
    const res = generateRecommendations(sim);
    const finRec = res.recommendations.find(r => r.ruleId === 'RULE_FINANCIAL_LOW_ROI');
    assert.ok(finRec);
    assert.strictEqual(finRec.category, 'financial');
    assert.strictEqual(finRec.priority, 'medium');
  });

  // --- F. Input Cost Category Rules ---

  it('18. Elevated input cost multiplier (1.5x) triggers RULE_INPUT_COST_ELEVATED', () => {
    const sim = calculateSimulation(createBaseScenario({ inputCostMultiplier: 1.5 }));
    const res = generateRecommendations(sim);
    const costRec = res.recommendations.find(r => r.ruleId === 'RULE_INPUT_COST_ELEVATED');
    assert.ok(costRec);
    assert.strictEqual(costRec.category, 'input_cost');
    assert.strictEqual(costRec.currentValue, 1.5);
  });

  it('19. Baseline input cost multiplier (1.0x) produces no input cost recommendations', () => {
    const sim = calculateSimulation(createBaseScenario({ inputCostMultiplier: 1.0 }));
    const res = generateRecommendations(sim);
    const costRec = res.recommendations.find(r => r.category === 'input_cost');
    assert.strictEqual(costRec, undefined);
  });

  // --- G. Irrigation Category Rules ---

  it('20. Flood irrigation under water constraint triggers RULE_IRRIGATION_FLOOD_HIGH_COST', () => {
    const sim = calculateSimulation(createBaseScenario({ irrigation: 'flood', waterAvailabilityPercent: 70 }));
    const res = generateRecommendations(sim);
    const irrRec = res.recommendations.find(r => r.ruleId === 'RULE_IRRIGATION_FLOOD_HIGH_COST');
    assert.ok(irrRec);
    assert.strictEqual(irrRec.category, 'irrigation');
    assert.strictEqual(irrRec.currentValue, 'flood');
  });

  it('21. Drip irrigation under water constraint produces no flood irrigation advisory', () => {
    const sim = calculateSimulation(createBaseScenario({ irrigation: 'drip', waterAvailabilityPercent: 70 }));
    const res = generateRecommendations(sim);
    const irrRec = res.recommendations.find(r => r.ruleId === 'RULE_IRRIGATION_FLOOD_HIGH_COST');
    assert.strictEqual(irrRec, undefined);
  });

  // --- H. Decision Profile Category Rules ---

  it('22. Max profit profile under high risk triggers RULE_PROFILE_HIGH_RISK_MISMATCH', () => {
    const sim = calculateSimulation(createBaseScenario({ priorityProfile: 'max_profit', weather: 'poor', waterAvailabilityPercent: 30 }));
    const res = generateRecommendations(sim);
    const profRec = res.recommendations.find(r => r.ruleId === 'RULE_PROFILE_HIGH_RISK_MISMATCH');
    assert.ok(profRec);
    assert.strictEqual(profRec.category, 'decision_profile');
    assert.strictEqual(profRec.priority, 'high');
  });

  it('23. Play safe profile under low risk and high ROI triggers RULE_PROFILE_PLAY_SAFE_OPPORTUNITY', () => {
    const sim = calculateSimulation(createBaseScenario({ priorityProfile: 'play_safe', weather: 'good', waterAvailabilityPercent: 100 }));
    const res = generateRecommendations(sim);
    const profRec = res.recommendations.find(r => r.ruleId === 'RULE_PROFILE_PLAY_SAFE_OPPORTUNITY');
    assert.ok(profRec);
    assert.strictEqual(profRec.category, 'decision_profile');
    assert.strictEqual(profRec.priority, 'low');
  });

  // --- I. Determinism & Immutability ---

  it('24. Same simulation output produces exact same recommendations', () => {
    const sim = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 50, weather: 'poor' }));
    const res1 = generateRecommendations(sim);
    const res2 = generateRecommendations(sim);
    assert.deepStrictEqual(res1, res2);
  });

  it('25. Recommendation generator does NOT mutate simulationResult or scenarioInput', () => {
    const sim = calculateSimulation(createBaseScenario({ waterAvailabilityPercent: 50 }));
    const simCopy = JSON.parse(JSON.stringify(sim));
    generateRecommendations(sim);
    assert.deepStrictEqual(sim, simCopy);
  });

  // --- J. Priority & Sorting Verification ---

  it('26. Recommendations are strictly sorted by priority (high before medium before low)', () => {
    const sim = calculateSimulation(createBaseScenario({
      priorityProfile: 'play_safe',
      weather: 'poor', // High risk weather
      waterAvailabilityPercent: 70, // Medium water risk
    }));
    const res = generateRecommendations(sim);
    assert.ok(res.recommendations.length >= 2);
    
    // Check that high priority comes before medium/low
    for (let i = 0; i < res.recommendations.length - 1; i++) {
      const p1 = res.recommendations[i].priority;
      const p2 = res.recommendations[i + 1].priority;
      if (p1 === 'high') {
        assert.ok(p2 === 'high' || p2 === 'medium' || p2 === 'low');
      } else if (p1 === 'medium') {
        assert.ok(p2 === 'medium' || p2 === 'low');
      }
    }
  });

  // --- K. Traceability & Field Completeness ---

  it('27. Every recommendation contains required traceable fields', () => {
    const sim = calculateSimulation(createBaseScenario({ weather: 'poor', waterAvailabilityPercent: 40 }));
    const res = generateRecommendations(sim);
    assert.ok(res.recommendations.length > 0);

    for (const rec of res.recommendations) {
      assert.ok(rec.id);
      assert.ok(rec.ruleId);
      assert.ok(rec.category);
      assert.ok(rec.priority);
      assert.ok(rec.title);
      assert.ok(rec.message);
      assert.ok(rec.reason);
      assert.ok(rec.metric);
      assert.ok(rec.currentValue !== undefined);
      assert.ok(rec.threshold !== undefined);
      assert.ok(rec.action);
    }
  });

  // --- L. Duplicate Suppression ---

  it('28. Duplicate rules are suppressed in final recommendation output', () => {
    const sim = calculateSimulation(createBaseScenario({ weather: 'poor' }));
    const res = generateRecommendations(sim);
    const ruleIds = res.recommendations.map(r => r.ruleId);
    const uniqueIds = new Set(ruleIds);
    assert.strictEqual(ruleIds.length, uniqueIds.size);
  });

  // --- M. Edge Cases & Missing Fields ---

  it('29. Handles simulation result missing optional economics safely', () => {
    const partialSim = {
      scenario: createBaseScenario(),
      water: { waterAvailabilityPercent: 50 },
      risk: { components: {} }
    };
    const res = generateRecommendations(partialSim);
    assert.ok(res);
    assert.ok(Array.isArray(res.recommendations));
  });

  it('30. Handles simulation result missing optional risk components safely', () => {
    const partialSim = {
      scenario: createBaseScenario(),
      economics: { profit: -1000, cost: 5000 }
    };
    const res = generateRecommendations(partialSim);
    assert.ok(res);
    const finRec = res.recommendations.find(r => r.ruleId === 'RULE_FINANCIAL_NEGATIVE_PROFIT');
    assert.ok(finRec);
  });

});
