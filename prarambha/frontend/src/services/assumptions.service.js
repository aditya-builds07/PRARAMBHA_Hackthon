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
  lastUpdated: "April 2025",
  disclaimer: "Estimated values are model-based and are not guaranteed future results.",
  cropParameters: [
    { crop: "Wheat (HD-2967)", parameter: "Baseline Yield Potential", value: "22.5", unit: "Quintals / Acre" },
    { crop: "Wheat (HD-2967)", parameter: "Optimal Water Requirement", value: "3,800", unit: "m³ / Acre" },
    { crop: "Wheat (HD-2967)", parameter: "Min Survival Water Threshold", value: "1,800", unit: "m³ / Acre" },
    { crop: "Wheat (HD-2967)", parameter: "Reference MSP Price", value: "₹2,275", unit: "per Quintal" },
    { crop: "Rice (Paddy PR-126)", parameter: "Baseline Yield Potential", value: "28.0", unit: "Quintals / Acre" },
    { crop: "Rice (Paddy PR-126)", parameter: "Optimal Water Requirement", value: "6,200", unit: "m³ / Acre" },
    { crop: "Rice (Paddy PR-126)", parameter: "Min Survival Water Threshold", value: "3,500", unit: "m³ / Acre" },
    { crop: "Rice (Paddy PR-126)", parameter: "Reference MSP Price", value: "₹2,320", unit: "per Quintal" },
    { crop: "Cotton (Bt Hybrid)", parameter: "Baseline Yield Potential", value: "12.0", unit: "Quintals / Acre" },
    { crop: "Cotton (Bt Hybrid)", parameter: "Optimal Water Requirement", value: "4,500", unit: "m³ / Acre" },
    { crop: "Cotton (Bt Hybrid)", parameter: "Reference MSP Price", value: "₹7,120", unit: "per Quintal" }
  ],
  riskWeights: [
    { factor: "Water Deficit Stress Weight", weight: 0.40 },
    { factor: "Weather / Temperature Anomaly", weight: 0.25 },
    { factor: "Sowing Window Delay Penalty", weight: 0.20 },
    { factor: "Working Capital Exposure", weight: 0.15 }
  ],
  priorityWeights: [
    { factor: "Balanced Multi-Objective", weight: 0.35 },
    { factor: "Profit Maximization Focus", weight: 0.30 },
    { factor: "Water Conservation Priority", weight: 0.20 },
    { factor: "Risk Aversion Buffer", weight: 0.15 }
  ],
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
