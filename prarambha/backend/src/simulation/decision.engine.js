/**
 * PRARAMBHA 2.0 - Decision Engine
 * Pure deterministic calculation of YieldIndex, ProfitIndex, SafetyIndex,
 * and profile-weighted Decision Score (0-100).
 */

/**
 * Approved Decision Profiles and Component Weights:
 * - balanced: Yield 35%, Profit 30%, Safety 35%
 * - max_profit: Yield 25%, Profit 50%, Safety 25%
 * - play_safe: Yield 20%, Profit 20%, Safety 60%
 */
export const DECISION_PROFILES = {
  balanced: {
    yield: 0.35,
    profit: 0.30,
    safety: 0.35
  },
  max_profit: {
    yield: 0.25,
    profit: 0.50,
    safety: 0.25
  },
  play_safe: {
    yield: 0.20,
    profit: 0.20,
    safety: 0.60
  }
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
 * Normalize priority profile string and map human-readable aliases to standard key.
 * Standard keys: 'balanced' | 'max_profit' | 'play_safe'
 * Default fallback: 'balanced'
 * 
 * @param {string} priorityProfile
 * @returns {'balanced'|'max_profit'|'play_safe'}
 */
export function normalizePriorityProfile(priorityProfile) {
  if (!priorityProfile || typeof priorityProfile !== 'string') {
    return 'balanced';
  }

  const clean = priorityProfile.toLowerCase().trim().replace(/[\s\-_]+/g, '');
  if (clean === 'maxprofit') return 'max_profit';
  if (clean === 'playsafe') return 'play_safe';
  if (clean === 'balanced') return 'balanced';

  return 'balanced';
}

/**
 * Calculate Yield Index (0 to 100).
 * Formula: YieldIndex = (TotalYield / (PotentialYield × AreaAcres)) × 100
 * 
 * @param {Object|number} input
 * @returns {number} YieldIndex between 0 and 100
 */
export function calculateYieldIndex(input) {
  if (typeof input === 'number') {
    if (isNaN(input) || !isFinite(input)) return 0;
    return clamp(input, 0, 100);
  }

  if (!input || typeof input !== 'object') {
    return 0;
  }

  // Check if precomputed index was provided
  if (typeof input.indices?.yield === 'number' && !isNaN(input.indices.yield) && isFinite(input.indices.yield)) {
    return clamp(input.indices.yield, 0, 100);
  }
  if (typeof input.yieldIndex === 'number' && !isNaN(input.yieldIndex) && isFinite(input.yieldIndex)) {
    return clamp(input.yieldIndex, 0, 100);
  }

  const yieldObj = typeof input.yield === 'object' && input.yield !== null ? input.yield : {};

  if (typeof yieldObj.yieldIndex === 'number' && !isNaN(yieldObj.yieldIndex) && isFinite(yieldObj.yieldIndex)) {
    return clamp(yieldObj.yieldIndex, 0, 100);
  }

  const totalYield = Number(yieldObj.total ?? yieldObj.totalYield ?? yieldObj.totalYieldQuintals ?? input.totalYield ?? input.totalYieldQuintals ?? 0);
  const potentialYield = Number(yieldObj.potentialYield ?? input.potentialYield ?? 0);
  const areaAcres = Number(yieldObj.areaAcres ?? yieldObj.area ?? input.areaAcres ?? input.area ?? 0);

  if (isNaN(totalYield) || isNaN(potentialYield) || isNaN(areaAcres) ||
      !isFinite(totalYield) || !isFinite(potentialYield) || !isFinite(areaAcres) ||
      potentialYield <= 0 || areaAcres <= 0) {
    return 0;
  }

  const potentialTotalYield = potentialYield * areaAcres;
  if (potentialTotalYield <= 0) {
    return 0;
  }

  const rawIndex = (totalYield / potentialTotalYield) * 100;
  if (isNaN(rawIndex) || !isFinite(rawIndex)) {
    return 0;
  }

  return clamp(rawIndex, 0, 100);
}

/**
 * Calculate Profit Index (0 to 100) based on ROI.
 * Formula: ProfitIndex = clamp((ROI + 100) / 2, 0, 100)
 * 
 * @param {Object|number} input
 * @returns {number} ProfitIndex between 0 and 100
 */
export function calculateProfitIndex(input) {
  let roiVal = undefined;

  if (typeof input === 'number') {
    roiVal = input;
  } else if (typeof input === 'object' && input !== null) {
    if (typeof input.indices?.profit === 'number' && !isNaN(input.indices.profit) && isFinite(input.indices.profit)) {
      return clamp(input.indices.profit, 0, 100);
    }
    if (typeof input.profitIndex === 'number' && !isNaN(input.profitIndex) && isFinite(input.profitIndex)) {
      return clamp(input.profitIndex, 0, 100);
    }

    const econ = input.economics ?? input.financial;
    if (typeof econ === 'object' && econ !== null) {
      if (econ.roi !== undefined) roiVal = econ.roi;
    }
    if (roiVal === undefined && input.roi !== undefined) {
      roiVal = input.roi;
    }
  }

  if (roiVal === undefined || roiVal === null) {
    return 0;
  }

  const roi = Number(roiVal);
  if (isNaN(roi) || !isFinite(roi)) {
    return 0;
  }

  const rawIndex = (roi + 100) / 2;
  return clamp(rawIndex, 0, 100);
}

/**
 * Calculate Safety Index (0 to 100) from OverallRisk.
 * Formula: SafetyIndex = clamp(100 - OverallRisk, 0, 100)
 * 
 * @param {Object|number} input
 * @returns {number} SafetyIndex between 0 and 100
 */
export function calculateSafetyIndex(input) {
  let riskVal = undefined;

  if (typeof input === 'number') {
    riskVal = input;
  } else if (typeof input === 'object' && input !== null) {
    if (typeof input.indices?.safety === 'number' && !isNaN(input.indices.safety) && isFinite(input.indices.safety)) {
      return clamp(input.indices.safety, 0, 100);
    }
    if (typeof input.safetyIndex === 'number' && !isNaN(input.safetyIndex) && isFinite(input.safetyIndex)) {
      return clamp(input.safetyIndex, 0, 100);
    }

    const riskObj = input.risk;
    if (typeof riskObj === 'number') {
      riskVal = riskObj;
    } else if (typeof riskObj === 'object' && riskObj !== null) {
      riskVal = riskObj.overallRisk ?? riskObj.score ?? riskObj.overall ?? undefined;
    }
    if (riskVal === undefined && input.overallRisk !== undefined) {
      riskVal = input.overallRisk;
    }
  }

  if (riskVal === undefined || riskVal === null) {
    return 0;
  }

  const overallRisk = Number(riskVal);
  if (isNaN(overallRisk) || !isFinite(overallRisk)) {
    return 0;
  }

  const clampedRisk = clamp(overallRisk, 0, 100);
  const rawSafety = 100 - clampedRisk;
  return clamp(rawSafety, 0, 100);
}

/**
 * Calculate numerical Decision Score (0 to 100).
 * Formula: DecisionScore = YieldWeight × YieldIndex + ProfitWeight × ProfitIndex + SafetyWeight × SafetyIndex
 * 
 * @param {Object} input
 * @returns {number} DecisionScore between 0 and 100
 */
export function calculateDecisionScore(input) {
  const result = calculateDecision(input);
  return result.decisionScore;
}

/**
 * Complete Decision Engine calculation returning transparent breakdown.
 * 
 * @param {Object} input - Input scenario object containing priorityProfile, yield, financial/economics, risk
 * @returns {Object} Plain JS object with priorityProfile, weights, indices, and decisionScore
 */
export function calculateDecision(input) {
  const rawProfile = input?.priorityProfile ?? input?.profile;
  const normalizedProfile = normalizePriorityProfile(rawProfile);
  const weights = DECISION_PROFILES[normalizedProfile];

  const yieldIndex = calculateYieldIndex(input);
  const profitIndex = calculateProfitIndex(input);
  const safetyIndex = calculateSafetyIndex(input);

  const rawScore =
    (weights.yield * yieldIndex) +
    (weights.profit * profitIndex) +
    (weights.safety * safetyIndex);

  const decisionScore = clamp(rawScore, 0, 100);

  return {
    priorityProfile: normalizedProfile,
    weights: { ...weights },
    indices: {
      yield: yieldIndex,
      profit: profitIndex,
      safety: safetyIndex
    },
    decisionScore
  };
}
