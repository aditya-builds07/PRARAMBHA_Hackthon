/**
 * PRARAMBHA 2.0 - Yield Engine
 * Pure deterministic yield calculations, weather factor, planting factor, and yield range estimation.
 */

import { getCropParameters } from './crop.parameters.js';

/**
 * Deterministic Weather Factors (MVP Approved Values):
 * - Good: 1.00
 * - Normal: 0.90
 * - Poor: 0.65
 * Monotonicity Guarantee: good (1.00) >= normal (0.90) >= poor (0.65)
 */
export const WEATHER_FACTORS = {
  good: 1.00,
  normal: 0.90,
  poor: 0.65
};

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
 * Calculate WeatherFactor (0.65 to 1.00).
 * Satisfies Invariant: Poor weather must never improve yield compared to good weather.
 * 
 * @param {string} weather - 'good' | 'normal' | 'poor'
 * @returns {number} WeatherFactor
 */
export function calculateWeatherFactor(weather) {
  if (!weather || typeof weather !== 'string') {
    return WEATHER_FACTORS.normal;
  }
  const key = weather.toLowerCase().trim();
  return WEATHER_FACTORS[key] ?? WEATHER_FACTORS.normal;
}

/**
 * Calculate PlantingFactor (0.40 to 1.00).
 * Deterministic penalty for delayed planting: 1.5% yield reduction per delay day.
 * Formula: clamp(1.0 - (delayDays * 0.015), 0.4, 1.0)
 * On-time or early planting: 1.0 (neutral factor, no extra bonus or hidden penalty).
 * Satisfies Invariant: Increasing delay must never improve the factor.
 * 
 * @param {Object|number|string} planting - { type, delayDays } or delayDays number
 * @returns {number} PlantingFactor
 */
export function calculatePlantingFactor(planting) {
  let delayDays = 0;
  let type = 'on_time';

  if (typeof planting === 'number') {
    delayDays = Math.max(0, planting);
  } else if (typeof planting === 'object' && planting !== null) {
    type = planting.type?.toLowerCase()?.trim() || 'on_time';
    delayDays = Math.max(0, Number(planting.delayDays) || 0);
  }

  if (type === 'early' || (type === 'on_time' && delayDays === 0)) {
    return 1.0;
  }

  const rawFactor = 1.0 - (delayDays * 0.015);
  return clamp(rawFactor, 0.4, 1.0);
}

/**
 * Calculate estimated yield per acre.
 * YieldPerAcre = PotentialYield × WaterFactor × WeatherFactor × PlantingFactor
 * 
 * @param {number} potentialYield - Crop potential yield per acre (q/acre)
 * @param {number} waterFactor - Water factor (0.0 to 1.0)
 * @param {number} weatherFactor - Weather factor (0.65 to 1.00)
 * @param {number} plantingFactor - Planting factor (0.40 to 1.00)
 * @returns {number} Estimated yield per acre in q/acre
 */
export function calculateYieldPerAcre(potentialYield, waterFactor, weatherFactor, plantingFactor) {
  const potYield = Math.max(0, Number(potentialYield) || 0);
  const wFactor = clamp(Number(waterFactor) || 0, 0, 1);
  const weaFactor = clamp(Number(weatherFactor) || 0, 0, 1);
  const pFactor = clamp(Number(plantingFactor) || 0, 0, 1);

  return potYield * wFactor * weaFactor * pFactor;
}

/**
 * Main Yield Engine execution function.
 * Calculates estimated perAcre, total, low, high yield range, and factor breakdown.
 * 
 * @param {Object} input - Input object containing crop, areaAcres, waterFactor, weather, planting
 * @param {Object} [customCropParams=null] - Optional crop parameters override
 * @returns {Object|null} Plain JavaScript yield output object or null if crop is unknown
 */
export function calculateYield(input, customCropParams = null) {
  const cropKey = input?.crop || 'wheat';
  const cropParams = getCropParameters(cropKey, customCropParams || {});
  if (!cropParams) {
    return null;
  }

  const areaAcres = Math.max(0, Number(input?.areaAcres) || 0);
  const waterFactor = clamp(Number(input?.waterFactor) || 0, 0, 1);
  const weatherFactor = calculateWeatherFactor(input?.weather);
  const plantingFactor = calculatePlantingFactor(input?.planting);

  const perAcre = calculateYieldPerAcre(
    cropParams.potentialYield,
    waterFactor,
    weatherFactor,
    plantingFactor
  );

  const total = perAcre * areaAcres;
  const low = total * 0.90;
  const high = total * 1.10;

  return {
    estimated: true,
    perAcre,
    total,
    low,
    high,
    unit: cropParams.unit || 'quintal',
    factors: {
      water: waterFactor,
      weather: weatherFactor,
      planting: plantingFactor
    }
  };
}
