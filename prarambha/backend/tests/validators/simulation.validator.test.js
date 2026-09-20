/**
 * PRARAMBHA 2.0 - Simulation Input Validator Test Suite (Step 11)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  SIMULATION_ERROR_CODES,
  validateSimulationInput,
  validateScenarioInput,
  assertValidScenarioInput
} from '../../src/validators/simulation.validator.js';
import { calculateSimulation } from '../../src/simulation/simulation.engine.js';

describe('Simulation Validator Suite (Step 11)', () => {
  // Helper base scenario object
  function createValidScenario(overrides = {}) {
    return {
      id: 'scen-101',
      farmId: 'farm-1',
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

  // --- 1. Basic Validation ---
  it('1. Valid complete scenario passes validation', () => {
    const res = validateSimulationInput(createValidScenario());
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.errors.length, 0);
  });

  it('2. Minimal valid scenario passes validation', () => {
    const minScenario = {
      crop: 'rice',
      areaAcres: 2,
      waterAvailabilityPercent: 80,
      planting: { type: 'on_time', delayDays: 0 }
    };
    const res = validateSimulationInput(minScenario);
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.errors.length, 0);
  });

  it('3. Null input fails validation with REQUIRED_FIELD error', () => {
    const res = validateSimulationInput(null);
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'input');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.REQUIRED_FIELD);
  });

  it('4. Undefined input fails validation', () => {
    const res = validateSimulationInput(undefined);
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.REQUIRED_FIELD);
  });

  it('5. Empty object fails validation with multiple missing required fields', () => {
    const res = validateSimulationInput({});
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors.some(e => e.field === 'crop'));
    assert.ok(res.errors.some(e => e.field === 'areaAcres'));
    assert.ok(res.errors.some(e => e.field === 'waterAvailabilityPercent'));
    assert.ok(res.errors.some(e => e.field === 'planting'));
  });

  // --- 2. Crop Validation ---
  it('6. All six supported crops pass validation', () => {
    const crops = ['wheat', 'rice', 'maize', 'sugarcane', 'soybean', 'cotton'];
    for (const crop of crops) {
      const res = validateSimulationInput(createValidScenario({ crop }));
      assert.strictEqual(res.valid, true, `Crop ${crop} should be valid`);
    }
  });

  it('7. Unknown crop fails validation with UNKNOWN_CROP code', () => {
    const res = validateSimulationInput(createValidScenario({ crop: 'banana' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'crop');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.UNKNOWN_CROP);
  });

  it('8. Missing crop fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ crop: undefined }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'crop');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.REQUIRED_FIELD);
  });

  // --- 3. Area Validation ---
  it('9. Positive area passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ areaAcres: 10 }));
    assert.strictEqual(res.valid, true);
  });

  it('10. Zero area fails validation with INVALID_VALUE code', () => {
    const res = validateSimulationInput(createValidScenario({ areaAcres: 0 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'areaAcres');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('11. Negative area fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ areaAcres: -5 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'areaAcres');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('12. NaN area fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ areaAcres: NaN }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'areaAcres');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('13. Infinity area fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ areaAcres: Infinity }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'areaAcres');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('14. Non-numeric string area fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ areaAcres: 'five' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'areaAcres');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  // --- 4. Water Availability Percent Validation ---
  it('15. 0% water availability passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: 0 }));
    assert.strictEqual(res.valid, true);
  });

  it('16. 50% water availability passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: 50 }));
    assert.strictEqual(res.valid, true);
  });

  it('17. 100% water availability passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: 100 }));
    assert.strictEqual(res.valid, true);
  });

  it('18. Negative water availability percentage fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: -10 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'waterAvailabilityPercent');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('19. > 100% water availability percentage fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: 150 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'waterAvailabilityPercent');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('20. NaN water availability percentage fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: NaN }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'waterAvailabilityPercent');
  });

  it('21. Infinity water availability percentage fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ waterAvailabilityPercent: Infinity }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'waterAvailabilityPercent');
  });

  // --- 5. Available Water M3 Validation ---
  it('22. null availableWaterM3 passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ availableWaterM3: null }));
    assert.strictEqual(res.valid, true);
  });

  it('23. zero availableWaterM3 passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ availableWaterM3: 0 }));
    assert.strictEqual(res.valid, true);
  });

  it('24. positive availableWaterM3 passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ availableWaterM3: 5000 }));
    assert.strictEqual(res.valid, true);
  });

  it('25. negative availableWaterM3 fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ availableWaterM3: -100 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'availableWaterM3');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('26. invalid non-numeric availableWaterM3 fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ availableWaterM3: 'many' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'availableWaterM3');
  });

  // --- 6. Weather Enum Validation ---
  it('27. good weather passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ weather: 'good' }));
    assert.strictEqual(res.valid, true);
  });

  it('28. normal weather passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ weather: 'normal' }));
    assert.strictEqual(res.valid, true);
  });

  it('29. poor weather passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ weather: 'poor' }));
    assert.strictEqual(res.valid, true);
  });

  it('30. invalid weather enum fails validation with INVALID_ENUM code', () => {
    const res = validateSimulationInput(createValidScenario({ weather: 'stormy' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'weather');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_ENUM);
  });

  // --- 7. Planting Object & Subfields Validation ---
  it('31. early planting type passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'early', delayDays: 0 } }));
    assert.strictEqual(res.valid, true);
  });

  it('32. on_time planting type passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'on_time', delayDays: 0 } }));
    assert.strictEqual(res.valid, true);
  });

  it('33. delayed planting type passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'delayed', delayDays: 10 } }));
    assert.strictEqual(res.valid, true);
  });

  it('34. delayDays = 0 passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'on_time', delayDays: 0 } }));
    assert.strictEqual(res.valid, true);
  });

  it('35. positive delayDays passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'delayed', delayDays: 15 } }));
    assert.strictEqual(res.valid, true);
  });

  it('36. negative delayDays fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'delayed', delayDays: -5 } }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'planting.delayDays');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('37. invalid delayDays type fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: { type: 'delayed', delayDays: 'ten' } }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'planting.delayDays');
  });

  it('38. missing planting object fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ planting: undefined }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'planting');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.REQUIRED_FIELD);
  });

  // --- 8. Financial Multiplier Validation ---
  it('39. inputCostMultiplier = 1.0 passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ inputCostMultiplier: 1.0 }));
    assert.strictEqual(res.valid, true);
  });

  it('40. inputCostMultiplier > 1.0 passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ inputCostMultiplier: 1.5 }));
    assert.strictEqual(res.valid, true);
  });

  it('41. zero inputCostMultiplier fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ inputCostMultiplier: 0 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'inputCostMultiplier');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('42. negative inputCostMultiplier fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ inputCostMultiplier: -1 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'inputCostMultiplier');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_VALUE);
  });

  it('43. invalid string inputCostMultiplier fails validation', () => {
    const res = validateSimulationInput(createValidScenario({ inputCostMultiplier: 'double' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'inputCostMultiplier');
  });

  // --- 9. Irrigation Enum Validation ---
  it('44. flood irrigation passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ irrigation: 'flood' }));
    assert.strictEqual(res.valid, true);
  });

  it('45. sprinkler irrigation passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ irrigation: 'sprinkler' }));
    assert.strictEqual(res.valid, true);
  });

  it('46. drip irrigation passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ irrigation: 'drip' }));
    assert.strictEqual(res.valid, true);
  });

  it('47. invalid irrigation enum fails validation with INVALID_ENUM code', () => {
    const res = validateSimulationInput(createValidScenario({ irrigation: 'hydroponic' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'irrigation');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_ENUM);
  });

  // --- 10. Priority Profile Validation ---
  it('48. balanced profile passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ priorityProfile: 'balanced' }));
    assert.strictEqual(res.valid, true);
  });

  it('49. max_profit profile passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ priorityProfile: 'max_profit' }));
    assert.strictEqual(res.valid, true);
  });

  it('50. play_safe profile passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ priorityProfile: 'play_safe' }));
    assert.strictEqual(res.valid, true);
  });

  it('51. valid profile aliases pass validation', () => {
    const alias1 = validateSimulationInput(createValidScenario({ priorityProfile: 'max profit' }));
    const alias2 = validateSimulationInput(createValidScenario({ priorityProfile: 'playSafe' }));
    assert.strictEqual(alias1.valid, true);
    assert.strictEqual(alias2.valid, true);
  });

  it('52. invalid profile fails validation with INVALID_ENUM code', () => {
    const res = validateSimulationInput(createValidScenario({ priorityProfile: 'risky_all_in' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'priorityProfile');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_ENUM);
  });

  // --- 11. Sowing Date Validation ---
  it('53. valid ISO calendar date string passes validation', () => {
    const res = validateSimulationInput(createValidScenario({ sowingDate: '2026-10-15' }));
    assert.strictEqual(res.valid, true);
  });

  it('54. invalid calendar date string fails validation with INVALID_DATE code', () => {
    const res = validateSimulationInput(createValidScenario({ sowingDate: 'invalid-date-string' }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'sowingDate');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_DATE);
  });

  it('55. non-string sowingDate type fails validation with INVALID_TYPE code', () => {
    const res = validateSimulationInput(createValidScenario({ sowingDate: 20261015 }));
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors[0].field, 'sowingDate');
    assert.strictEqual(res.errors[0].code, SIMULATION_ERROR_CODES.INVALID_TYPE);
  });

  // --- 12. Robustness & Determinism ---
  it('56. Input immutability check (validator does NOT mutate input)', () => {
    const scenario = createValidScenario();
    const copy = JSON.parse(JSON.stringify(scenario));
    validateSimulationInput(scenario);
    assert.deepStrictEqual(scenario, copy);
  });

  it('57. Deterministic repeated validation produces identical result', () => {
    const scenario = createValidScenario({ crop: 'maize', areaAcres: -1, weather: 'invalid' });
    const res1 = validateSimulationInput(scenario);
    const res2 = validateSimulationInput(scenario);
    assert.deepStrictEqual(res1, res2);
  });

  it('58. Multiple simultaneous errors returned in single result object', () => {
    const multiErrScenario = createValidScenario({
      crop: 'invalid_crop',
      areaAcres: -5,
      waterAvailabilityPercent: 150
    });
    const res = validateSimulationInput(multiErrScenario);
    assert.strictEqual(res.valid, false);
    assert.strictEqual(res.errors.length, 3);
  });

  it('59. Stable error ordering in fixed field sequence', () => {
    const multiErrScenario = createValidScenario({
      crop: 'unknown',
      areaAcres: -1,
      waterAvailabilityPercent: 200,
      weather: 'invalid_weather'
    });
    const res = validateSimulationInput(multiErrScenario);
    const fields = res.errors.map(e => e.field);
    assert.deepStrictEqual(fields, ['crop', 'areaAcres', 'waterAvailabilityPercent', 'weather']);
  });

  it('60. assertValidScenarioInput throws on invalid input and returns true on valid input', () => {
    const validScenario = createValidScenario();
    assert.strictEqual(assertValidScenarioInput(validScenario), true);

    const invalidScenario = createValidScenario({ areaAcres: -1 });
    assert.throws(() => {
      assertValidScenarioInput(invalidScenario);
    }, /Invalid scenario input/);
  });

  // --- 13. Integration Test with Simulation Engine ---
  it('61. Invalid scenario fails validator and prevents simulation execution', () => {
    const invalidScenario = createValidScenario({ crop: 'nonexistent_crop' });
    const validation = validateSimulationInput(invalidScenario);

    assert.strictEqual(validation.valid, false);

    // Architectural Integration Pattern: If validation fails, simulation should NOT run or should handle safely
    let simResult = null;
    if (validation.valid) {
      simResult = calculateSimulation(invalidScenario);
    }
    assert.strictEqual(simResult, null);
  });

  it('62. Valid scenario passes validator and executes simulation successfully', () => {
    const validScenario = createValidScenario({ crop: 'wheat', areaAcres: 5 });
    const validation = validateSimulationInput(validScenario);

    assert.strictEqual(validation.valid, true);

    const simResult = calculateSimulation(validScenario);
    assert.ok(simResult);
    assert.strictEqual(simResult.crop.crop, 'wheat');
    assert.ok(simResult.yield.total > 0);
  });
});
