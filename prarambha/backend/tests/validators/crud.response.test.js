import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateFarmInput } from '../../src/validators/farm.validator.js';
import { validateScenarioInput } from '../../src/validators/scenario.validator.js';
import { validateResourceInput } from '../../src/validators/resource.validator.js';
import { sendError, sendSuccess } from '../../src/utils/response.js';

function responseSpy() {
  return {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

describe('CRUD validation and response contract', () => {
  it('validates complete farm updates and rejects invalid values', () => {
    assert.equal(validateFarmInput({ name: 'Farm', areaAcres: 1 }).area_acres, 1);
    assert.throws(() => validateFarmInput({ name: 'Farm', areaAcres: 0 }), /areaAcres/);
  });

  it('validates a full scenario input snapshot', () => {
    const scenario = validateScenarioInput({
      farmId: 'farm-1', name: 'Baseline', crop: 'wheat', areaAcres: 1,
      waterAvailabilityPercent: 100, weather: 'normal',
      planting: { type: 'on_time', delayDays: 0 }, inputCostMultiplier: 1,
      irrigation: 'flood', priorityProfile: 'balanced',
    });
    assert.equal(scenario.crop_code, 'wheat');
    assert.throws(() => validateScenarioInput({}), /name is required/);
  });

  it('validates supported resource values and rejects negative quantities', () => {
    assert.equal(validateResourceInput({ farmId: 'farm-1', resourceType: 'seed', label: 'Wheat seed', availableQuantity: 2, unit: 'kg' }).available_quantity, 2);
    assert.throws(() => validateResourceInput({ farmId: 'farm-1', resourceType: 'water', label: 'Well', availableQuantity: -1, unit: 'm3' }), /non-negative/);
  });

  it('uses the standard success and error envelope', () => {
    const success = responseSpy();
    sendSuccess(success, 200, { id: 'farm-1' });
    assert.deepEqual(success.body, { success: true, data: { id: 'farm-1' } });

    const failure = responseSpy();
    sendError(failure, 404, 'NOT_FOUND', 'Farm not found.');
    assert.deepEqual(failure.body, { success: false, error: { code: 'NOT_FOUND', message: 'Farm not found.' } });
  });
});
