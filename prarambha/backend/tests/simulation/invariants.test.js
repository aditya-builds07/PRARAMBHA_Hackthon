import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateSimulation } from '../../src/simulation/simulation.engine.js';
import { calculateAttribution } from '../../src/simulation/attribution.engine.js';

function scenario(overrides = {}) {
  return {
    id: 'invariant-scenario',
    crop: 'wheat',
    areaAcres: 2,
    sowingDate: '2026-10-15',
    waterAvailabilityPercent: 75,
    weather: 'normal',
    planting: { type: 'on_time', delayDays: 0 },
    inputCostMultiplier: 1,
    irrigation: 'flood',
    priorityProfile: 'balanced',
    ...overrides
  };
}

describe('Mandatory Simulation Invariants Suite', () => {
  it('1. more water never reduces yield', () => {
    const constrained = calculateSimulation(scenario({ waterAvailabilityPercent: 40 }));
    const supplied = calculateSimulation(scenario({ waterAvailabilityPercent: 80 }));

    assert.ok(supplied.yield.total >= constrained.yield.total);
  });

  it('2. poorer weather never improves yield', () => {
    const good = calculateSimulation(scenario({ weather: 'good' }));
    const normal = calculateSimulation(scenario({ weather: 'normal' }));
    const poor = calculateSimulation(scenario({ weather: 'poor' }));

    assert.ok(good.yield.total >= normal.yield.total);
    assert.ok(normal.yield.total >= poor.yield.total);
  });

  it('3. a longer planting delay never improves yield', () => {
    const onTime = calculateSimulation(scenario({ planting: { type: 'on_time', delayDays: 0 } }));
    const delayed = calculateSimulation(scenario({ planting: { type: 'delayed', delayDays: 20 } }));

    assert.ok(onTime.yield.total >= delayed.yield.total);
  });

  it('4. zero-water scenarios remain valid and finite', () => {
    const result = calculateSimulation(scenario({ waterAvailabilityPercent: 0 }));

    assert.ok(result);
    assert.equal(result.water.waterDrawnM3, 0);
    assert.equal(result.yield.total, 0);
    assert.equal(result.water.waterProductivityKgPerM3, 0);
  });

  it('5. area scales totals without changing per-acre yield', () => {
    const oneAcre = calculateSimulation(scenario({ areaAcres: 1 }));
    const tenAcres = calculateSimulation(scenario({ areaAcres: 10 }));

    assert.equal(tenAcres.yield.perAcre, oneAcre.yield.perAcre);
    assert.equal(tenAcres.yield.total, oneAcre.yield.total * 10);
  });

  it('6. higher input cost reduces profit without changing yield', () => {
    const baseline = calculateSimulation(scenario({ inputCostMultiplier: 1 }));
    const expensive = calculateSimulation(scenario({ inputCostMultiplier: 1.5 }));

    assert.equal(expensive.yield.total, baseline.yield.total);
    assert.ok(expensive.economics.profit < baseline.economics.profit);
  });

  it('7. risk is always bounded between 0 and 100', () => {
    const lowRisk = calculateSimulation(scenario({
      waterAvailabilityPercent: 100,
      weather: 'good'
    }));
    const highRisk = calculateSimulation(scenario({
      waterAvailabilityPercent: 0,
      weather: 'poor',
      planting: { type: 'delayed', delayDays: 100 },
      inputCostMultiplier: 10
    }));

    for (const result of [lowRisk, highRisk]) {
      assert.ok(result.risk.overallRisk >= 0 && result.risk.overallRisk <= 100);
    }
  });

  it('8. decision score is always bounded between 0 and 100', () => {
    for (const priorityProfile of ['balanced', 'max_profit', 'play_safe']) {
      const result = calculateSimulation(scenario({
        priorityProfile,
        waterAvailabilityPercent: 0,
        weather: 'poor',
        planting: { type: 'delayed', delayDays: 100 },
        inputCostMultiplier: 10
      }));

      assert.ok(result.decision.decisionScore >= 0 && result.decision.decisionScore <= 100);
    }
  });

  it('9. single-input attribution reconciles to actual metric differences', () => {
    const baseline = calculateSimulation(scenario({ waterAvailabilityPercent: 100 }));
    const alternative = calculateSimulation(scenario({ waterAvailabilityPercent: 50 }));
    const attribution = calculateAttribution({ baseline, alternative });
    const yieldDelta = attribution.metricDeltas.find((metric) => metric.metric === 'totalYield');
    const waterImpact = attribution.attributions.find((entry) => entry.category === 'water');

    assert.equal(yieldDelta.delta, alternative.yield.total - baseline.yield.total);
    assert.ok(waterImpact.impacts.some((impact) => impact.metric === 'totalYield'));
  });

  it('10. every yield output is explicitly labelled as an estimate', () => {
    const result = calculateSimulation(scenario());

    // The API contract makes the non-guaranteed nature of the projection machine-readable.
    assert.equal(result.yield.estimated, true);
  });
});
