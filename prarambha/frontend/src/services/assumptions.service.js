/**
 * Assumptions Service - Member 4 (Frontend UX / Transparency)
 * Provides model equations, crop parameters, risk weights, and data sources.
 *
 * Pattern: Real fetch to GET /api/assumptions with robust mock fallback.
 */

const API_BASE_URL = "/api";

export const MOCK_ASSUMPTIONS_DATA = {
  modelVersion: "v2.1.0-deterministic",
  assumptionVersion: "ICAR-2025.04",
  lastUpdated: "2025-04-01T00:00:00Z",
  disclaimer: "Estimated values are model-based approximations for scenario planning and do not constitute guaranteed future results.",
  cropParameters: {
    crop: "Wheat (HD-2967)",
    baseYieldPerAcreQuintals: 22.5,
    minWaterRequirementM3PerAcre: 1800,
    optimalWaterRequirementM3PerAcre: 3800,
    mspPricePerQuintal: 2275,
  },
  riskWeights: {
    waterStress: 0.40,
    weatherAnomaly: 0.25,
    sowingDelay: 0.20,
    financialExposure: 0.15,
  },
  priorityProfiles: {
    balanced: { name: "Balanced Strategy", yieldWeight: 0.35, profitWeight: 0.35, safetyWeight: 0.30 },
    max_profit: { name: "Profit Maximization", yieldWeight: 0.25, profitWeight: 0.55, safetyWeight: 0.20 },
    play_safe: { name: "Risk Aversion Buffer", yieldWeight: 0.30, profitWeight: 0.20, safetyWeight: 0.50 },
  },
  formulas: [
    {
      name: "Net Profit Formulation",
      expression: "Net Profit = (Simulated Yield × Reference Market Price) - Total Production Cost",
      formula: "Net Profit = (Simulated Yield × Reference Market Price) - Total Production Cost",
      description: "Deterministic economic return before government subsidies or post-harvest storage costs."
    },
    {
      name: "Water Stress Yield Penalty",
      expression: "Yield Penalty = Baseline Yield × max(0, 1 - (Allocated Water / Optimal Crop Water Demand))",
      formula: "Yield Penalty = Baseline Yield × max(0, 1 - (Allocated Water / Optimal Crop Water Demand))",
      description: "Empirical deficit irrigation yield reduction factor derived from FAO-33 water-yield response."
    },
    {
      name: "Composite Risk Index (0-100)",
      expression: "Risk Index = (w_water × S_water) + (w_weather × S_weather) + (w_delay × S_delay) + (w_finance × S_finance)",
      formula: "Risk Index = (w_water × S_water) + (w_weather × S_weather) + (w_delay × S_delay) + (w_finance × S_finance)",
      description: "Normalized 4-factor composite weighted index assessing systemic agronomic and financial vulnerability."
    }
  ],
  dataSources: [
    {
      name: "ICAR Agronomic Baseline Handbook (2024-2025)",
      description: "Indian Council of Agricultural Research zonal baseline crop water and yield potential indices.",
      url: "https://icar.org.in"
    },
    {
      name: "CACP Minimum Support Price (MSP) Gazette",
      description: "Commission for Agricultural Costs and Prices statutory reference pricing benchmarks.",
      url: "https://cacp.dacnet.nic.in"
    },
    {
      name: "IMD Agro-Meteorological Advisory Service",
      description: "India Meteorological Department gridded rainfall and seasonal climate anomaly weights.",
      url: "https://imdagrimet.gov.in"
    }
  ]
};

/**
 * Format risk weight as percentage string (e.g. 0.40 -> "40%")
 */
export function formatRiskWeightPercent(weight) {
  if (typeof weight !== "number" || isNaN(weight)) return "0%";
  return `${Math.round(weight * 100)}%`;
}

/**
 * Validate assumptions dataset structure and invariants.
 */
export function validateAssumptions(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["Assumptions data must be a non-null object."] };
  }

  if (!data.disclaimer) {
    errors.push("Missing mandatory disclaimer statement.");
  }

  if (data.riskWeights && typeof data.riskWeights === "object") {
    const weights = Object.values(data.riskWeights).map((w) => Number(w) || 0);
    const sum = weights.reduce((acc, w) => acc + w, 0);
    if (Math.abs(sum - 1.0) > 1e-4) {
      errors.push(`Risk weights sum invariant failed: expected 1.0, received ${sum.toFixed(2)}`);
    }
  } else {
    errors.push("Missing riskWeights section.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get active assumptions data (async API with mock fallback).
 */
export async function getActiveAssumptions() {
  return getAssumptions();
}

/**
 * Fetch transparency assumptions from backend API with local mock fallback.
 * @returns {Promise<Object>} Assumptions dataset
 */
export async function getAssumptions() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE_URL}/assumptions`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        return data;
      }
    }
    return MOCK_ASSUMPTIONS_DATA;
  } catch (_err) {
    clearTimeout(timeoutId);
    return MOCK_ASSUMPTIONS_DATA;
  }
}

/**
 * Validate assumptions metadata and invariants.
 */
export function validateAssumptions(data) {
  const errors = [];
  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["Data must be an object."] };
  }
  if (!data.disclaimer || typeof data.disclaimer !== "string" || data.disclaimer.trim().length === 0) {
    errors.push("Missing required non-guarantee agricultural disclaimer.");
  }
  if (data.riskWeights) {
    const weights = Array.isArray(data.riskWeights)
      ? data.riskWeights.map((w) => (typeof w === "number" ? w : w.weight ?? 0))
      : Object.values(data.riskWeights);
    const sum = weights.reduce((acc, curr) => acc + (typeof curr === "number" ? curr : 0), 0);
    if (Math.abs(sum - 1.0) > 0.01) {
      errors.push(`Risk weights sum invariant must equal 1.0 (100%), got ${sum.toFixed(2)}.`);
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Alias for getAssumptions to retrieve active assumptions.
 */
export async function getActiveAssumptions() {
  return getAssumptions();
}
