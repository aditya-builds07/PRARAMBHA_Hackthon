/**
 * PRARAMBHA 2.0 - Risk Engine
 * Pure deterministic risk component calculations, weighted overall risk, and risk levels.
 */

/**
 * Approved Overall Risk Component Weights:
 * - Water Risk: 35% (0.35)
 * - Weather Risk: 20% (0.20)
 * - Planting Risk: 20% (0.20)
 * - Financial Risk: 25% (0.25)
 */
export const RISK_WEIGHTS = {
  water: 0.35,
  weather: 0.20,
  planting: 0.20,
  financial: 0.25
};

/**
 * Weather Risk Mapping (MVP Approved Constants):
 * - Good: 10
 * - Normal: 30
 * - Poor: 80
 */
export const WEATHER_RISK_MAP = {
  good: 10,
  normal: 30,
  poor: 80
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
 * Calculate WaterRisk (0 to 100).
 * WaterRisk = (1 - waterFactor) × 100
 * 
 * @param {number} waterFactor - Water factor (0.0 to 1.0)
 * @returns {number} WaterRisk between 0 and 100
 */
export function calculateWaterRisk(waterFactor) {
  const factor = clamp(Number(waterFactor) || 0, 0, 1);
  const rawRisk = (1.0 - factor) * 100;
  return clamp(rawRisk, 0, 100);
}

/**
 * Calculate WeatherRisk (0 to 100).
 * Good = 10, Normal = 30, Poor = 80
 * 
 * @param {string} weather - 'good' | 'normal' | 'poor'
 * @returns {number} WeatherRisk between 0 and 100
 */
export function calculateWeatherRisk(weather) {
  if (!weather || typeof weather !== 'string') {
    return WEATHER_RISK_MAP.normal;
  }
  const key = weather.toLowerCase().trim();
  return WEATHER_RISK_MAP[key] ?? WEATHER_RISK_MAP.normal;
}

/**
 * Calculate PlantingRisk (0 to 100).
 * Formula: min(100, delayDays × 3.5)
 * 0 days -> 0, 10 days -> 35, 20 days -> 70, 30+ days -> 100.
 * 
 * @param {Object|number} planting - { delayDays } or delayDays number
 * @returns {number} PlantingRisk between 0 and 100
 */
export function calculatePlantingRisk(planting) {
  let delayDays = 0;
  if (typeof planting === 'number') {
    delayDays = Math.max(0, planting);
  } else if (typeof planting === 'object' && planting !== null) {
    delayDays = Math.max(0, Number(planting.delayDays) || 0);
  }
  const rawRisk = delayDays * 3.5;
  return clamp(rawRisk, 0, 100);
}

/**
 * Calculate FinancialRisk (0 to 100) - MVP Rule.
 * Transparent Rule:
 * - If totalCost <= 0: FinancialRisk = 0
 * - If profit < 0: FinancialRisk = 100
 * - Otherwise (profit >= 0): FinancialRisk = 0
 * 
 * @param {Object|number} financial - { profit, totalCost } or profit number (with optional second totalCost param)
 * @param {number} [totalCostParam] - Optional total cost number
 * @returns {number} FinancialRisk (0 or 100)
 */
export function calculateFinancialRisk(financial, totalCostParam) {
  let profit = 0;
  let totalCost = 0;

  if (typeof financial === 'object' && financial !== null) {
    profit = Number(financial.profit) || 0;
    totalCost = Number(financial.totalCost !== undefined ? financial.totalCost : financial.cost) || 0;
  } else {
    profit = Number(financial) || 0;
    totalCost = Number(totalCostParam) || 0;
  }

  if (totalCost <= 0) {
    return 0;
  }
  if (profit < 0) {
    return 100;
  }
  return 0;
}

/**
 * Determine risk level from overall risk score.
 * Thresholds:
 * - Low: OverallRisk < 35
 * - Medium: 35 <= OverallRisk <= 65
 * - High: OverallRisk > 65
 * 
 * @param {number} overallRisk - Score between 0 and 100
 * @returns {'low'|'medium'|'high'} Risk level string
 */
export function getRiskLevel(overallRisk) {
  const score = clamp(Number(overallRisk) || 0, 0, 100);
  if (score < 35) {
    return 'low';
  }
  if (score <= 65) {
    return 'medium';
  }
  return 'high';
}

/**
 * Calculate OverallRisk and determine Risk Level.
 * Formula: OverallRisk = 0.35 × WaterRisk + 0.20 × WeatherRisk + 0.20 × PlantingRisk + 0.25 × FinancialRisk
 * 
 * @param {Object} input - Plain JS object containing waterFactor, weather, planting, financial
 * @returns {Object} Plain JS risk result object
 */
export function calculateOverallRisk(input) {
  const waterFactor = input?.waterFactor !== undefined ? Number(input.waterFactor) : 1.0;
  const weather = input?.weather || 'normal';
  const planting = input?.planting || { delayDays: 0 };
  const financial = input?.financial || { profit: 0, totalCost: 0 };

  const waterRisk = calculateWaterRisk(waterFactor);
  const weatherRisk = calculateWeatherRisk(weather);
  const plantingRisk = calculatePlantingRisk(planting);
  const financialRisk = calculateFinancialRisk(financial, input?.cost ?? input?.totalCost);

  const rawOverall =
    (RISK_WEIGHTS.water * waterRisk) +
    (RISK_WEIGHTS.weather * weatherRisk) +
    (RISK_WEIGHTS.planting * plantingRisk) +
    (RISK_WEIGHTS.financial * financialRisk);

  const overallRisk = clamp(rawOverall, 0, 100);
  const riskLevel = getRiskLevel(overallRisk);

  return {
    components: {
      waterRisk,
      weatherRisk,
      plantingRisk,
      financialRisk
    },
    overallRisk,
    riskLevel,
    weights: { ...RISK_WEIGHTS }
  };
}
