import { formatCurrency, formatNumber } from "./comparison.service.js";

/**
 * Resource Readiness & Gap Calculation Service - Member 4
 * Evaluates farm resource sufficiency (budget, water, seeds, fertilizers, machinery)
 * against scenario requirements, matching the backend resource-readiness engine.
 */

/**
 * Calculate the deficit gap for a resource.
 * @param {number} required - Quantity required by scenario
 * @param {number} available - Quantity available on the farm
 * @returns {number} Non-negative gap amount
 */
export function calculateResourceGap(required, available) {
  const req = Number(required) || 0;
  const avail = Number(available) || 0;
  return Math.max(0, req - avail);
}

/**
 * Determine the readiness status category for a specific resource.
 * - 'available': gap is 0 (or required <= 0)
 * - 'critical': gap is >= 25% of required
 * - 'shortage': deficit exists but is < 25% of required
 * 
 * @param {number} required
 * @param {number} available
 * @returns {"available" | "shortage" | "critical"}
 */
export function determineResourceStatus(required, available) {
  const req = Number(required) || 0;
  const avail = Number(available) || 0;

  if (req <= 0) return "available";

  const gap = Math.max(0, req - avail);
  if (gap === 0) return "available";

  const gapRatio = gap / req;
  return gapRatio >= 0.25 ? "critical" : "shortage";
}

/**
 * Calculate the aggregated overall status from individual resource statuses.
 * Follows the most-severe precedence: critical > shortage > available.
 * 
 * @param {Array<{ status: string }>} resourceItems
 * @returns {"available" | "shortage" | "critical"}
 */
export function calculateOverallStatus(resourceItems = []) {
  if (!Array.isArray(resourceItems) || resourceItems.length === 0) {
    return "available";
  }

  if (resourceItems.some((item) => item?.status === "critical")) {
    return "critical";
  }
  if (resourceItems.some((item) => item?.status === "shortage")) {
    return "shortage";
  }
  return "available";
}

/**
 * Format a resource quantity for display with appropriate units.
 * @param {number} val
 * @param {string} unit
 * @param {boolean} isCurrency
 * @returns {string}
 */
export function formatResourceValue(val, unit = "", isCurrency = false) {
  if (isCurrency) {
    return formatCurrency(val);
  }
  const formatted = formatNumber(val, 0);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Build a structured resource readiness evaluation object.
 * @param {Object} params
 * @param {string} params.farmId
 * @param {string} params.farmName
 * @param {Object} params.requirements - { budget, water, seed, fertilizer, otherInputs }
 * @param {Object} params.inventory - { budget, water, seed, fertilizer, otherInputs }
 * @returns {Object} Structured readiness model
 */
export function evaluateResourceReadiness({
  farmId = "farm-default",
  farmName = "Farm",
  requirements = {},
  inventory = {},
} = {}) {
  const buildItem = (reqVal = 0, availVal = 0, unit = "") => {
    const required = Number(reqVal) || 0;
    const available = Number(availVal) || 0;
    const gap = calculateResourceGap(required, available);
    const status = determineResourceStatus(required, available);
    return { required, available, gap, status, unit };
  };

  const budget = buildItem(requirements.budget, inventory.budget, "₹");
  const water = buildItem(requirements.water, inventory.water, "m³");
  const seed = buildItem(requirements.seed, inventory.seed, "kg");
  const fertilizer = buildItem(requirements.fertilizer, inventory.fertilizer, "kg");

  const otherInputs = (requirements.otherInputs || []).map((reqItem, idx) => {
    const availItem = (inventory.otherInputs || [])[idx] || {};
    const itemReq = Number(reqItem.required) || 0;
    const itemAvail = Number(availItem.available ?? reqItem.available) || 0;
    const gap = calculateResourceGap(itemReq, itemAvail);
    const status = determineResourceStatus(itemReq, itemAvail);
    return {
      name: reqItem.name || `Input #${idx + 1}`,
      required: itemReq,
      available: itemAvail,
      gap,
      status,
      unit: reqItem.unit || "units",
    };
  });

  const allItems = [budget, water, seed, fertilizer, ...otherInputs];
  const overallStatus = calculateOverallStatus(allItems);

  return {
    farmId,
    farmName,
    overallStatus,
    budget,
    water,
    seed,
    fertilizer,
    otherInputs,
  };
}
