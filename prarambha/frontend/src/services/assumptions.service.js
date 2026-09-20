import { MOCK_ASSUMPTIONS } from "./mockData.js";

/**
 * Assumptions & Transparency Service - Member 4 (Section 15 of Task_Distribution.md)
 * Manages simulation model provenance, agronomic baseline parameters,
 * risk weights, priority profiles, transparent formulas, and non-guarantee guidance.
 */

export const MANDATORY_DISCLAIMER_TEXT =
  "Estimated values are model-based and are not guaranteed future results. Actual yields and financial returns depend on localized weather dynamics, pest pressures, and market prices.";

/**
 * Validate that an assumptions data object satisfies transparency contracts.
 * @param {Object} data
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateAssumptions(data) {
  const errors = [];
  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["Assumptions payload must be a non-null object"] };
  }

  if (!data.modelVersion || typeof data.modelVersion !== "string") {
    errors.push("Missing or invalid modelVersion");
  }

  if (!data.assumptionVersion || typeof data.assumptionVersion !== "string") {
    errors.push("Missing or invalid assumptionVersion");
  }

  if (!data.disclaimer || typeof data.disclaimer !== "string") {
    errors.push("Missing mandatory legal/guidance disclaimer");
  }

  if (data.riskWeights && typeof data.riskWeights === "object") {
    const weights = Object.values(data.riskWeights).map(Number);
    const sum = weights.reduce((acc, w) => acc + w, 0);
    if (Math.abs(sum - 1.0) > 1e-4) {
      errors.push(`Risk weights sum invariant violated: expected 1.0, got ${sum.toFixed(4)}`);
    }
  } else {
    errors.push("Missing riskWeights dictionary");
  }

  if (data.cropParameters) {
    const cp = data.cropParameters;
    if (Number(cp.baseYieldPerAcreQuintals) <= 0) {
      errors.push("baseYieldPerAcreQuintals must be greater than 0");
    }
    if (Number(cp.minWaterRequirementM3PerAcre) <= 0) {
      errors.push("minWaterRequirementM3PerAcre must be greater than 0");
    }
    if (
      Number(cp.optimalWaterRequirementM3PerAcre) < Number(cp.minWaterRequirementM3PerAcre)
    ) {
      errors.push("optimalWaterRequirement cannot be lower than minWaterRequirement");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Format a fractional risk weight (0.0 - 1.0) to integer percentage string.
 * @param {number} weight
 * @returns {string} E.g., "35%"
 */
export function formatRiskWeightPercent(weight) {
  const num = Number(weight) || 0;
  return `${Math.round(num * 100)}%`;
}

/**
 * Retrieve active assumptions model with fallback to vetted agronomic benchmarks.
 * @param {Function} [apiFetcher] - Optional API client fetcher
 * @returns {Promise<Object>}
 */
export async function getActiveAssumptions(apiFetcher = null) {
  if (typeof apiFetcher === "function") {
    try {
      const response = await apiFetcher();
      if (response && response.data) {
        return response.data;
      }
    } catch {
      // Fallback to validated local mock benchmarks
    }
  }
  return MOCK_ASSUMPTIONS;
}
