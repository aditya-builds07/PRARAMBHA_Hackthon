/**
 * PRARAMBHA 2.0 - Water Engine
 * Pure deterministic water calculations, unit conversions, and productivity metrics.
 */

import { getCropParameters } from './crop.parameters.js';

/**
 * Volumetric water conversion factor:
 * 1 mm of water depth over 1 acre (4046.856 m²) = 4.046856 m³ of water volume.
 */
export const MM_TO_M3_PER_ACRE_CONVERSION_FACTOR = 4.046856;

/**
 * Helper clamp function.
 * @param {number} val
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

/**
 * Calculate WaterFactor (0.0 to 1.0).
 * Linear clamp guarantee: 100% -> 1.0, 75% -> 0.75, 50% -> 0.50, 25% -> 0.25, 0% -> 0.0.
 * Satisfies Invariant: More water cannot reduce the water factor.
 * 
 * @param {number} waterAvailabilityPercent - Water availability (0 to 100)
 * @returns {number} WaterFactor between 0.0 and 1.0
 */
export function calculateWaterFactor(waterAvailabilityPercent) {
  const percent = Number(waterAvailabilityPercent);
  if (isNaN(percent)) return 0;
  const raw = percent / 100;
  return clamp(raw, 0, 1);
}

/**
 * Calculate required water volume in cubic meters (m³).
 * requiredWaterM3 = waterRequirementMm × areaAcres × 4.046856
 * 
 * @param {number} waterRequirementMm - Crop water requirement in mm
 * @param {number} areaAcres - Farm area in acres
 * @returns {number} Required water in m³
 */
export function calculateRequiredWaterM3(waterRequirementMm, areaAcres) {
  const reqMm = Math.max(0, Number(waterRequirementMm) || 0);
  const area = Math.max(0, Number(areaAcres) || 0);
  const totalM3 = reqMm * area * MM_TO_M3_PER_ACRE_CONVERSION_FACTOR;
  return Math.round(totalM3 * 1000) / 1000;
}

/**
 * Calculate estimated water drawn in m³.
 * waterDrawnM3 = requiredWaterM3 × waterFactor
 * 
 * @param {number} requiredWaterM3 - Total required water in m³
 * @param {number} waterFactor - Water availability factor (0.0 to 1.0)
 * @returns {number} Water drawn in m³
 */
export function calculateWaterDraw(requiredWaterM3, waterFactor) {
  const reqM3 = Math.max(0, Number(requiredWaterM3) || 0);
  const factor = clamp(Number(waterFactor) || 0, 0, 1);
  const drawn = reqM3 * factor;
  return Math.round(drawn * 1000) / 1000;
}

/**
 * Calculate water productivity in kg/m³.
 * Safe calculation: returns 0 if waterDrawnM3 is 0 or if yield is 0/missing.
 * 
 * @param {number|null|undefined} totalYieldKg - Total crop yield in kg
 * @param {number} waterDrawnM3 - Total water drawn in m³
 * @returns {number|null} Productivity in kg/m³ or null if totalYieldKg is null/undefined
 */
export function calculateWaterProductivity(totalYieldKg, waterDrawnM3) {
  if (totalYieldKg === null || totalYieldKg === undefined) {
    return null;
  }
  const yieldKg = Number(totalYieldKg);
  const drawnM3 = Number(waterDrawnM3);

  if (isNaN(yieldKg) || isNaN(drawnM3) || drawnM3 <= 0 || yieldKg <= 0) {
    return 0;
  }

  const productivity = yieldKg / drawnM3;
  return Math.round(productivity * 10000) / 10000;
}

/**
 * Main Water Engine execution function.
 * Calculates transparent water metrics for a given scenario input.
 * 
 * @param {Object} input - ScenarioInput object containing crop, areaAcres, waterAvailabilityPercent, etc.
 * @param {Object} [customCropParams=null] - Optional crop parameters override
 * @returns {Object} Plain JavaScript water engine output object
 */
export function calculateWater(input, customCropParams = null) {
  const cropKey = input?.crop || 'wheat';
  const cropParams = getCropParameters(cropKey, customCropParams || {});

  const areaAcres = Math.max(0, Number(input?.areaAcres) || 0);
  const waterAvailabilityPercent = Math.max(0, Number(input?.waterAvailabilityPercent) || 0);
  const availableWaterM3 = input?.availableWaterM3 !== undefined && input?.availableWaterM3 !== null
    ? Math.max(0, Number(input.availableWaterM3) || 0)
    : null;
  const irrigation = input?.irrigation || 'flood';

  const waterRequirementMm = cropParams?.waterRequirementMm ?? 0;
  const requiredWaterM3 = calculateRequiredWaterM3(waterRequirementMm, areaAcres);
  const waterFactor = calculateWaterFactor(waterAvailabilityPercent);
  const waterDrawnM3 = calculateWaterDraw(requiredWaterM3, waterFactor);

  const totalYieldKg = input?.totalYieldKg !== undefined && input?.totalYieldKg !== null
    ? Number(input.totalYieldKg)
    : null;
  const waterProductivityKgPerM3 = calculateWaterProductivity(totalYieldKg, waterDrawnM3);

  return {
    crop: cropKey,
    areaAcres,
    waterRequirementMm,
    requiredWaterM3,
    waterAvailabilityPercent,
    availableWaterM3,
    waterFactor,
    waterDrawnM3,
    totalYieldKg,
    waterProductivityKgPerM3,
    irrigation
  };
}
