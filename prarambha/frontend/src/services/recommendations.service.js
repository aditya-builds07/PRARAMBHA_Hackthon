/**
 * Recommendations Service - Member 4
 * Fetches rule-based recommendations from the backend simulation engine,
 * with deterministic mock fallback when the endpoint is unavailable.
 */
import { api } from "./api.js";

export const MOCK_RECOMMENDATIONS = [
  {
    id: "rec-001",
    trigger: "Water Stress",
    condition: "Water availability is below crop requirements.",
    impact: "Estimated yield and water risk are affected.",
    action: "Evaluate a water-efficient irrigation scenario.",
    reason: "The selected scenario has significant water stress.",
    severity: "critical",
  },
  {
    id: "rec-002",
    trigger: "Sowing Window Vulnerability",
    condition: "Sowing scheduled after November 1st encounters severe terminal heat during grain filling.",
    impact: "Expected profit decrease of ~₹19,000 across 4 acres.",
    action: "Advance sowing to optimal window (October 20 - October 28) or switch to short-duration variety (e.g., HD-2967).",
    reason: "Every 7 days delay after November 10 cuts wheat yield potential by 4.5 quintals/hectare.",
    severity: "warning",
  },
  {
    id: "rec-003",
    trigger: "Cost-Return Optimization",
    condition: "Input cost multiplier is 1.15x while priority is 'max_profit'.",
    impact: "Net ROI remains high at 151% due to premium grade harvest offsetting input expenditure.",
    action: "Lock in wholesale rates early for water-soluble NPK fertilizers to preserve working capital.",
    reason: "High fertilizer efficacy under drip delivers net positive gain despite +₹8,000 higher input cost.",
    severity: "info",
  },
  {
    id: "rec-004",
    trigger: "Irrigation Efficiency Opportunity",
    condition: "Current flood irrigation exhibits high conveyance and percolation losses in sandy-loam soil.",
    impact: "Water productivity is constrained to 0.017 quintals/m³.",
    action: "Upgrade to drip lateral lines or solar-powered micro-sprinklers.",
    reason: "Drip irrigation reduces evaporative loss by up to 40% while maintaining uniform root zone moisture.",
    severity: "warning",
  },
];

const SCENARIO_RECOMMENDATIONS_MAP = {
  "sc-001": [MOCK_RECOMMENDATIONS[3], MOCK_RECOMMENDATIONS[2]],
  "sc-002": [MOCK_RECOMMENDATIONS[2]],
  "sc-003": [MOCK_RECOMMENDATIONS[0], MOCK_RECOMMENDATIONS[1]],
  "sc-004": [MOCK_RECOMMENDATIONS[0]],
};

/**
 * Fetch rule-based recommendations for a specific scenario.
 * Attempts real API call first, falling back to mock data if unavailable.
 *
 * @param {string} scenarioId
 * @param {Object} [options]
 * @param {number} [options.timeoutMs=3000]
 * @returns {Promise<Array<Object>>}
 */
export async function getRecommendations(scenarioId, { timeoutMs = 3000 } = {}) {
  if (import.meta?.env?.VITE_USE_MOCK === "true") {
    return SCENARIO_RECOMMENDATIONS_MAP[scenarioId] || MOCK_RECOMMENDATIONS;
  }

  const endpoint = `/api/scenarios/${encodeURIComponent(scenarioId)}/recommendations`;

  try {
    const { data, error } = await api.get(endpoint);
    if (!error && data) {
      const list = data?.recommendations || data?.data || data;
      if (Array.isArray(list) && list.length > 0) {
        return list;
      }
    }
  } catch (_err) {
    // Return mock fallback on network failure
  }

  return SCENARIO_RECOMMENDATIONS_MAP[scenarioId] || MOCK_RECOMMENDATIONS;
}
