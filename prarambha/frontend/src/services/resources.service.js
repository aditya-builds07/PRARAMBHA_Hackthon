/**
 * Resources Service - Member 4 (PRARAMBHA 2.0 Hackathon)
 * Compares required vs available resources for simulated scenarios,
 * with deterministic mock fallback when backend endpoint is unavailable.
 */

/**
 * Calculate the deficit gap for a resource (required - available).
 * @param {number} required
 * @param {number} available
 * @returns {number} Non-negative gap
 */
export function calculateGap(required, available) {
  const req = Number(required) || 0;
  const avail = Number(available) || 0;
  return Math.max(0, req - avail);
}

/**
 * Determine the status for a resource:
 * - 'available': gap is 0 or required <= 0
 * - 'critical': gap >= 25% of required
 * - 'shortage': deficit exists but is < 25% of required
 *
 * @param {number} required
 * @param {number} available
 * @returns {"available" | "shortage" | "critical"}
 */
export function determineStatus(required, available) {
  const req = Number(required) || 0;
  const avail = Number(available) || 0;

  if (req <= 0) return "available";
  const gap = Math.max(0, req - avail);
  if (gap === 0) return "available";

  const gapRatio = gap / req;
  return gapRatio >= 0.25 ? "critical" : "shortage";
}

/**
 * Calculate the overall feasibility verdict from a list of resource check items:
 * - if ANY resource status is "critical" → "Not Feasible"
 * - if ANY is "shortage" (and none critical) → "Feasible with Gaps"
 * - if ALL are "available" → "Feasible"
 *
 * @param {Array<Object>} resources
 * @returns {{
 *   verdict: "not_feasible" | "feasible_with_gaps" | "feasible",
 *   label: string,
 *   icon: string,
 *   colorClass: string,
 *   summaryText: string
 * }}
 */
export function calculateFeasibility(resources = []) {
  if (!Array.isArray(resources) || resources.length === 0) {
    return {
      verdict: "feasible",
      label: "Feasible",
      icon: "✓",
      colorClass: "bg-emerald-50 border-emerald-300 text-emerald-950",
      summaryText: "All required resources are available on the farm.",
    };
  }

  const hasCritical = resources.some((r) => r.status === "critical");
  const hasShortage = resources.some((r) => r.status === "shortage");

  const shortItems = resources
    .filter((r) => r.status === "critical" || r.status === "shortage")
    .map((r) => `${r.resourceType} short by ${Number(r.gap || 0).toLocaleString("en-IN")} ${r.unit}`);

  if (hasCritical) {
    return {
      verdict: "not_feasible",
      label: "Not Feasible",
      icon: "✕",
      colorClass: "bg-rose-50 border-rose-300 text-rose-950",
      summaryText: shortItems.length > 0 ? shortItems.join(", ") : "Critical resource deficits identified.",
    };
  }

  if (hasShortage) {
    return {
      verdict: "feasible_with_gaps",
      label: "Feasible with Gaps",
      icon: "⚠️",
      colorClass: "bg-amber-50 border-amber-300 text-amber-950",
      summaryText: shortItems.length > 0 ? shortItems.join(", ") : "Moderate resource gaps identified.",
    };
  }

  return {
    verdict: "feasible",
    label: "Feasible",
    icon: "✓",
    colorClass: "bg-emerald-50 border-emerald-300 text-emerald-950",
    summaryText: "All required resources are fully covered by farm reserves.",
  };
}

export const MOCK_RESOURCE_DATA = [
  {
    resourceType: "Budget",
    required: 125000,
    available: 140000,
    gap: 0,
    unit: "₹",
    status: "available",
    explanation: "Working capital reserves comfortably cover all operational expenditures.",
  },
  {
    resourceType: "Water",
    required: 4500,
    available: 3200,
    gap: 1300,
    unit: "m³",
    status: "shortage",
    explanation: "Canal allocation and tube-well capacity falls short during flowering stage.",
  },
  {
    resourceType: "Seed",
    required: 160,
    available: 160,
    gap: 0,
    unit: "kg",
    status: "available",
    explanation: "Full certified wheat seed stock is in storage and ready for treatment.",
  },
  {
    resourceType: "Fertilizer / Inputs",
    required: 320,
    available: 240,
    gap: 80,
    unit: "kg",
    status: "shortage",
    explanation: "Deficit in water-soluble micronutrients and urea requires local cooperative booking.",
  },
  {
    resourceType: "Machinery / Labor",
    required: 16,
    available: 12,
    gap: 4,
    unit: "Hours",
    status: "shortage",
    explanation: "Tractor hours short during peak sowing week; consider booking custom hiring center.",
  },
];

/**
 * Fetch resource readiness comparison for a farm and scenario.
 * Attempts real API call first, falling back to mock data if unavailable.
 *
 * @param {string} farmId
 * @param {string} scenarioId
 * @param {Object} [options]
 * @param {number} [options.timeoutMs=3000]
 * @returns {Promise<{
 *   farmId: string,
 *   scenarioId: string,
 *   resources: Array<Object>,
 *   feasibility: Object
 * }>}
 */
export async function getResourceReadiness(farmId = "farm-001", scenarioId = "sc-001", { timeoutMs = 3000 } = {}) {
  const endpoint = `/api/farms/${encodeURIComponent(farmId)}/resources/readiness?scenarioId=${encodeURIComponent(scenarioId)}`;

  try {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller?.signal,
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      const rawResources = json?.data?.resources || json?.resources || json?.data;
      if (Array.isArray(rawResources) && rawResources.length > 0) {
        const normalized = rawResources.map((item) => {
          const req = Number(item.required) || 0;
          const avail = Number(item.available) || 0;
          const gap = item.gap !== undefined ? Number(item.gap) : calculateGap(req, avail);
          const status = item.status || determineStatus(req, avail);
          return {
            resourceType: item.resourceType || item.name || "Resource",
            required: req,
            available: avail,
            gap,
            unit: item.unit || "",
            status,
            explanation: item.explanation || "",
          };
        });

        return {
          farmId,
          scenarioId,
          resources: normalized,
          feasibility: calculateFeasibility(normalized),
        };
      }
    }
  } catch {
    // Fallback to local mock data
  }

  // Clone mock data to prevent mutation
  const resources = MOCK_RESOURCE_DATA.map((item) => ({
    ...item,
    gap: calculateGap(item.required, item.available),
  }));

  return {
    farmId,
    scenarioId,
    resources,
    feasibility: calculateFeasibility(resources),
  };
}
