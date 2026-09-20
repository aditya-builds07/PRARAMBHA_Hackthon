/**
 * PRARAMBHA 2.0 - Simulation Input Validator
 * Pure deterministic validation layer for scenario inputs prior to simulation execution.
 * 
 * Architectural Boundary:
 * The validator verifies input data integrity, data types, ranges, enums, and required fields.
 * It strictly DOES NOT compute water factors, yield estimates, financial metrics, risks, or decision scores.
 * All numerical calculations remain owned by the simulation engines.
 */

import { getCropParameters } from '../simulation/crop.parameters.js';
import { normalizePriorityProfile } from '../simulation/decision.engine.js';

/**
 * Standard machine-readable validation error codes.
 */
export const SIMULATION_ERROR_CODES = {
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_VALUE: 'INVALID_VALUE',
  UNKNOWN_CROP: 'UNKNOWN_CROP',
  INVALID_ENUM: 'INVALID_ENUM',
  INVALID_DATE: 'INVALID_DATE'
};

/**
 * Validates a simulation scenario input object.
 * Returns a structured result object with boolean status, deterministic error list, and warning list.
 * 
 * Deterministic Execution Order:
 * Errors are evaluated and appended in fixed field sequence:
 * 1. id / farmId
 * 2. crop
 * 3. areaAcres
 * 4. sowingDate
 * 5. waterAvailabilityPercent
 * 6. availableWaterM3
 * 7. weather
 * 8. planting (type, delayDays)
 * 9. inputCostMultiplier
 * 10. irrigation
 * 11. priorityProfile
 * 
 * @param {Object} input - Scenario input object to validate
 * @returns {{ valid: boolean, errors: Array<Object>, warnings: Array<Object> }}
 */
export function validateSimulationInput(input) {
  const errors = [];
  const warnings = [];

  // Top-level structure validation
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return {
      valid: false,
      errors: [
        {
          field: 'input',
          code: SIMULATION_ERROR_CODES.REQUIRED_FIELD,
          message: 'Simulation scenario input must be a valid non-null object.'
        }
      ],
      warnings: []
    };
  }

  // 1. ID & Farm ID (Optional; if supplied, must be non-empty string or number)
  if (input.id !== undefined && input.id !== null) {
    if ((typeof input.id === 'string' && input.id.trim() === '') || (typeof input.id !== 'string' && typeof input.id !== 'number')) {
      errors.push({
        field: 'id',
        code: SIMULATION_ERROR_CODES.INVALID_VALUE,
        message: 'Scenario id must be a non-empty string or number if provided.'
      });
    }
  }

  if (input.farmId !== undefined && input.farmId !== null) {
    if ((typeof input.farmId === 'string' && input.farmId.trim() === '') || (typeof input.farmId !== 'string' && typeof input.farmId !== 'number')) {
      errors.push({
        field: 'farmId',
        code: SIMULATION_ERROR_CODES.INVALID_VALUE,
        message: 'farmId must be a non-empty string or number if provided.'
      });
    }
  }

  // 2. Crop Validation (Required; must map to supported crop parameters)
  if (input.crop === undefined || input.crop === null || (typeof input.crop === 'string' && input.crop.trim() === '')) {
    errors.push({
      field: 'crop',
      code: SIMULATION_ERROR_CODES.REQUIRED_FIELD,
      message: 'crop is required.'
    });
  } else if (typeof input.crop !== 'string') {
    errors.push({
      field: 'crop',
      code: SIMULATION_ERROR_CODES.INVALID_TYPE,
      message: 'crop must be a string.'
    });
  } else {
    const cropParams = getCropParameters(input.crop);
    if (!cropParams) {
      errors.push({
        field: 'crop',
        code: SIMULATION_ERROR_CODES.UNKNOWN_CROP,
        message: `Unknown crop '${input.crop}'. Supported crops: wheat, rice, maize, sugarcane, soybean, cotton.`
      });
    }
  }

  // 3. Farm Area Validation (Required; must be finite number > 0)
  const areaVal = input.areaAcres ?? input.area;
  if (areaVal === undefined || areaVal === null) {
    errors.push({
      field: 'areaAcres',
      code: SIMULATION_ERROR_CODES.REQUIRED_FIELD,
      message: 'areaAcres is required.'
    });
  } else {
    const area = Number(areaVal);
    if (typeof areaVal !== 'number' || isNaN(area) || !isFinite(area) || area <= 0) {
      errors.push({
        field: 'areaAcres',
        code: SIMULATION_ERROR_CODES.INVALID_VALUE,
        message: 'areaAcres must be a finite number greater than 0.'
      });
    }
  }

  // 4. Sowing Date Validation (Optional; if supplied, must be valid calendar date string)
  if (input.sowingDate !== undefined && input.sowingDate !== null) {
    if (typeof input.sowingDate !== 'string') {
      errors.push({
        field: 'sowingDate',
        code: SIMULATION_ERROR_CODES.INVALID_TYPE,
        message: 'sowingDate must be a string if provided.'
      });
    } else {
      const parsedTime = Date.parse(input.sowingDate);
      if (isNaN(parsedTime)) {
        errors.push({
          field: 'sowingDate',
          code: SIMULATION_ERROR_CODES.INVALID_DATE,
          message: 'sowingDate must be a valid calendar date string.'
        });
      }
    }
  }

  // 5. Water Availability Percent Validation (Required; finite number between 0 and 100)
  if (input.waterAvailabilityPercent === undefined || input.waterAvailabilityPercent === null) {
    errors.push({
      field: 'waterAvailabilityPercent',
      code: SIMULATION_ERROR_CODES.REQUIRED_FIELD,
      message: 'waterAvailabilityPercent is required.'
    });
  } else {
    const waterPercent = Number(input.waterAvailabilityPercent);
    if (typeof input.waterAvailabilityPercent !== 'number' || isNaN(waterPercent) || !isFinite(waterPercent) || waterPercent < 0 || waterPercent > 100) {
      errors.push({
        field: 'waterAvailabilityPercent',
        code: SIMULATION_ERROR_CODES.INVALID_VALUE,
        message: 'waterAvailabilityPercent must be a finite number between 0 and 100.'
      });
    }
  }

  // 6. Available Water M3 Validation (Optional; can be null or non-negative finite number)
  if (input.availableWaterM3 !== undefined && input.availableWaterM3 !== null) {
    const waterM3 = Number(input.availableWaterM3);
    if (typeof input.availableWaterM3 !== 'number' || isNaN(waterM3) || !isFinite(waterM3) || waterM3 < 0) {
      errors.push({
        field: 'availableWaterM3',
        code: SIMULATION_ERROR_CODES.INVALID_VALUE,
        message: 'availableWaterM3 must be a non-negative finite number or null.'
      });
    }
  }

  // 7. Weather Enum Validation (Optional/Required; must be good, normal, or poor if supplied)
  if (input.weather !== undefined && input.weather !== null) {
    if (typeof input.weather !== 'string') {
      errors.push({
        field: 'weather',
        code: SIMULATION_ERROR_CODES.INVALID_TYPE,
        message: 'weather must be a string.'
      });
    } else {
      const weatherKey = input.weather.toLowerCase().trim();
      if (!['good', 'normal', 'poor'].includes(weatherKey)) {
        errors.push({
          field: 'weather',
          code: SIMULATION_ERROR_CODES.INVALID_ENUM,
          message: "weather must be one of: 'good', 'normal', 'poor'."
        });
      }
    }
  }

  // 8. Planting Object & Subfield Validation (Required object)
  if (input.planting === undefined || input.planting === null) {
    errors.push({
      field: 'planting',
      code: SIMULATION_ERROR_CODES.REQUIRED_FIELD,
      message: 'planting object is required.'
    });
  } else if (typeof input.planting !== 'object' || Array.isArray(input.planting)) {
    errors.push({
      field: 'planting',
      code: SIMULATION_ERROR_CODES.INVALID_TYPE,
      message: 'planting must be an object containing type and delayDays.'
    });
  } else {
    // Validate planting.type
    if (input.planting.type !== undefined && input.planting.type !== null) {
      if (typeof input.planting.type !== 'string') {
        errors.push({
          field: 'planting.type',
          code: SIMULATION_ERROR_CODES.INVALID_TYPE,
          message: 'planting.type must be a string.'
        });
      } else {
        const pType = input.planting.type.toLowerCase().trim();
        if (!['early', 'on_time', 'delayed'].includes(pType)) {
          errors.push({
            field: 'planting.type',
            code: SIMULATION_ERROR_CODES.INVALID_ENUM,
            message: "planting.type must be one of: 'early', 'on_time', 'delayed'."
          });
        }
      }
    }

    // Validate planting.delayDays
    if (input.planting.delayDays !== undefined && input.planting.delayDays !== null) {
      const delay = Number(input.planting.delayDays);
      if (typeof input.planting.delayDays !== 'number' || isNaN(delay) || !isFinite(delay) || delay < 0) {
        errors.push({
          field: 'planting.delayDays',
          code: SIMULATION_ERROR_CODES.INVALID_VALUE,
          message: 'planting.delayDays must be a non-negative finite number.'
        });
      }
    }
  }

  // 9. Input Cost Multiplier Validation (Optional; finite number > 0)
  if (input.inputCostMultiplier !== undefined && input.inputCostMultiplier !== null) {
    const mult = Number(input.inputCostMultiplier);
    if (typeof input.inputCostMultiplier !== 'number' || isNaN(mult) || !isFinite(mult) || mult <= 0) {
      errors.push({
        field: 'inputCostMultiplier',
        code: SIMULATION_ERROR_CODES.INVALID_VALUE,
        message: 'inputCostMultiplier must be a finite number greater than 0.'
      });
    }
  }

  // 10. Irrigation Enum Validation (Optional; must be flood, sprinkler, or drip)
  if (input.irrigation !== undefined && input.irrigation !== null) {
    if (typeof input.irrigation !== 'string') {
      errors.push({
        field: 'irrigation',
        code: SIMULATION_ERROR_CODES.INVALID_TYPE,
        message: 'irrigation must be a string.'
      });
    } else {
      const irrKey = input.irrigation.toLowerCase().trim();
      if (!['flood', 'sprinkler', 'drip'].includes(irrKey)) {
        errors.push({
          field: 'irrigation',
          code: SIMULATION_ERROR_CODES.INVALID_ENUM,
          message: "irrigation must be one of: 'flood', 'sprinkler', 'drip'."
        });
      }
    }
  }

  // 11. Priority Profile Enum & Alias Validation (Optional; must map to supported profile)
  const profVal = input.priorityProfile ?? input.profile;
  if (profVal !== undefined && profVal !== null) {
    if (typeof profVal !== 'string') {
      errors.push({
        field: 'priorityProfile',
        code: SIMULATION_ERROR_CODES.INVALID_TYPE,
        message: 'priorityProfile must be a string.'
      });
    } else {
      const validProfiles = ['balanced', 'max_profit', 'max profit', 'maxprofit', 'play_safe', 'play safe', 'playsafe'];
      const cleanProf = profVal.toLowerCase().trim();
      if (!validProfiles.includes(cleanProf)) {
        errors.push({
          field: 'priorityProfile',
          code: SIMULATION_ERROR_CODES.INVALID_ENUM,
          message: "priorityProfile must be one of: 'balanced', 'max_profit', 'play_safe' (or supported aliases)."
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Alias export for backward compatibility.
 * @param {Object} input 
 * @returns {Object} Validation result
 */
export function validateScenarioInput(input) {
  return validateSimulationInput(input);
}

/**
 * Asserts that a scenario input is valid; throws Error if invalid.
 * @param {Object} input 
 * @returns {boolean} True if valid
 */
export function assertValidScenarioInput(input) {
  const result = validateSimulationInput(input);
  if (!result.valid) {
    const firstErr = result.errors[0];
    throw new Error(`Invalid scenario input [${firstErr.field}]: ${firstErr.message}`);
  }
  return true;
}
