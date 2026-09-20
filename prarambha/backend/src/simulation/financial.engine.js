/**
 * PRARAMBHA 2.0 - Financial Engine
 * Pure deterministic financial calculations: revenue, cost, profit, and safe ROI.
 */

import { getCropParameters } from './crop.parameters.js';

/**
 * Irrigation operational overhead cost per acre (Documented Assumptions):
 * - Flood: ₹0/acre (Standard baseline)
 * - Sprinkler: ₹1,200/acre (Pump operation & sprinkler line maintenance)
 * - Drip: ₹2,500/acre (Micro-irrigation & filter/drip line operational cost)
 */
export const IRRIGATION_COST_PER_ACRE = {
  flood: 0,
  sprinkler: 1200,
  drip: 2500
};

/**
 * Calculate total irrigation cost for a given area.
 * @param {number} areaAcres - Farm area in acres
 * @param {string} irrigationType - 'flood' | 'sprinkler' | 'drip'
 * @returns {number} Total irrigation cost in ₹
 */
export function calculateIrrigationCost(areaAcres, irrigationType = 'flood') {
  const area = Math.max(0, Number(areaAcres) || 0);
  const costPerAcre = IRRIGATION_COST_PER_ACRE[irrigationType?.toLowerCase()?.trim()] ?? 0;
  return area * costPerAcre;
}

/**
 * Calculate base input cost for a given area and multiplier.
 * BaseCost = BaseCostPerAcre × InputCostMultiplier × Area
 * 
 * @param {number} baseCostPerAcre - Baseline cost per acre (₹/acre)
 * @param {number} inputCostMultiplier - Input cost multiplier (e.g. 1.0, 1.25)
 * @param {number} areaAcres - Farm area in acres
 * @returns {number} Base input cost in ₹
 */
export function calculateBaseCost(baseCostPerAcre, inputCostMultiplier, areaAcres) {
  const basePerAcre = Math.max(0, Number(baseCostPerAcre) || 0);
  const multiplier = Math.max(0, Number(inputCostMultiplier !== undefined ? inputCostMultiplier : 1.0) || 0);
  const area = Math.max(0, Number(areaAcres) || 0);
  return basePerAcre * multiplier * area;
}

/**
 * Calculate total cost.
 * TotalCost = BaseCost + IrrigationCost
 * 
 * @param {number} baseCostPerAcre - Baseline cost per acre
 * @param {number} inputCostMultiplier - Multiplier
 * @param {number} areaAcres - Area in acres
 * @param {string} irrigationType - Irrigation system
 * @returns {number} Total cost in ₹
 */
export function calculateTotalCost(baseCostPerAcre, inputCostMultiplier, areaAcres, irrigationType = 'flood') {
  const baseCost = calculateBaseCost(baseCostPerAcre, inputCostMultiplier, areaAcres);
  const irrCost = calculateIrrigationCost(areaAcres, irrigationType);
  return baseCost + irrCost;
}

/**
 * Calculate total revenue.
 * Revenue = TotalYieldQuintals × PricePerQuintal
 * 
 * @param {number} totalYield - Total yield in quintals (q)
 * @param {number} pricePerUnit - Price per quintal (₹/q)
 * @returns {number} Revenue in ₹
 */
export function calculateRevenue(totalYield, pricePerUnit) {
  const yieldQuintals = Math.max(0, Number(totalYield) || 0);
  const price = Math.max(0, Number(pricePerUnit) || 0);
  return yieldQuintals * price;
}

/**
 * Calculate profit.
 * Profit = Revenue - TotalCost
 * Note: Negative profit is valid and is NOT clamped to zero.
 * 
 * @param {number} revenue - Total revenue in ₹
 * @param {number} totalCost - Total cost in ₹
 * @returns {number} Profit in ₹
 */
export function calculateProfit(revenue, totalCost) {
  const rev = Number(revenue) || 0;
  const cost = Number(totalCost) || 0;
  return rev - cost;
}

/**
 * Calculate ROI (Return on Investment) percentage.
 * ROI = (Profit / TotalCost) × 100
 * Safe calculation: Returns 0 if TotalCost === 0. Never returns NaN or Infinity.
 * 
 * @param {number} profit - Profit in ₹
 * @param {number} totalCost - Total cost in ₹
 * @returns {number} ROI percentage
 */
export function calculateROI(profit, totalCost) {
  const p = Number(profit) || 0;
  const c = Number(totalCost) || 0;
  if (c <= 0) {
    return 0;
  }
  return (p / c) * 100;
}

/**
 * Main Financial Engine execution function.
 * Accepts plain JavaScript input and returns transparent financial metrics object.
 * Does NOT mutate input or crop parameters.
 * 
 * @param {Object} input - Plain JS object containing crop, areaAcres, totalYield, inputCostMultiplier, irrigation
 * @param {Object} [customCropParams=null] - Optional custom crop parameters override
 * @returns {Object|null} Financial metrics object or null if crop is unknown
 */
export function calculateEconomics(input, customCropParams = null) {
  const cropKey = input?.crop || 'wheat';
  const cropParams = getCropParameters(cropKey, customCropParams || {});
  if (!cropParams) {
    return null;
  }

  const areaAcres = Math.max(0, Number(input?.areaAcres) || 0);
  const multiplier = Math.max(0, Number(input?.inputCostMultiplier !== undefined ? input?.inputCostMultiplier : 1.0) || 0);
  const irrigation = input?.irrigation || 'flood';

  const totalYield = input?.totalYield !== undefined
    ? Math.max(0, Number(input.totalYield) || 0)
    : (input?.total !== undefined ? Math.max(0, Number(input.total) || 0) : 0);

  const baseCost = calculateBaseCost(cropParams.baseCostPerAcre, multiplier, areaAcres);
  const irrigationCost = calculateIrrigationCost(areaAcres, irrigation);
  const cost = baseCost + irrigationCost;

  const revenue = calculateRevenue(totalYield, cropParams.pricePerUnit);
  const profit = calculateProfit(revenue, cost);
  const roi = calculateROI(profit, cost);

  return {
    cost,
    revenue,
    profit,
    roi,
    breakdown: {
      baseCost,
      irrigationCost
    }
  };
}
