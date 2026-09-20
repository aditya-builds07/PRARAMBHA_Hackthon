/**
 * History Service - Member 4 (Frontend UX / Scenario Management)
 * Provides saved simulation history, renaming, deletion, cloning, filtering, and sorting.
 *
 * Pattern: Real fetch to backend endpoints with robust in-memory mock fallback.
 */

const API_BASE_URL = "/api";

export const MOCK_HISTORY_SCENARIOS = [
  {
    id: "sc-001",
    name: "Baseline Precision Drip Plan",
    timestamp: "2026-03-15T10:30:00Z",
    createdAt: "2026-03-15T10:30:00Z",
    crop: "Wheat (HD-2967)",
    area: 4.0,
    profit: 145000,
    risk: "Low",
    modelVersion: "v1.9.4",
  },
  {
    id: "sc-002",
    name: "Canal Flood Irrigation Alternative",
    timestamp: "2026-03-18T14:15:00Z",
    createdAt: "2026-03-18T14:15:00Z",
    crop: "Wheat (HD-2967)",
    area: 4.0,
    profit: 108000,
    risk: "Medium",
    modelVersion: "v2.0.0",
  },
  {
    id: "sc-003",
    name: "High-Yield Intensive Input Strategy",
    timestamp: "2026-03-22T09:45:00Z",
    createdAt: "2026-03-22T09:45:00Z",
    crop: "Rice (Paddy PR-126)",
    area: 5.0,
    profit: 192000,
    risk: "High",
    modelVersion: "v2.0.1",
  },
  {
    id: "sc-004",
    name: "Deficit Irrigation Drought Contingency",
    timestamp: "2026-04-02T16:20:00Z",
    createdAt: "2026-04-02T16:20:00Z",
    crop: "Wheat (HD-2967)",
    area: 4.0,
    profit: 94000,
    risk: "Critical",
    modelVersion: "v2.0.3",
  },
  {
    id: "sc-005",
    name: "Organic Low-Cost Resilient Sowing",
    timestamp: "2026-04-10T11:00:00Z",
    createdAt: "2026-04-10T11:00:00Z",
    crop: "Cotton (Bt Hybrid)",
    area: 3.5,
    profit: 135000,
    risk: "Low",
    modelVersion: "v2.1.0",
  },
];

// In-memory working copy for mock updates
let localHistoryStore = JSON.parse(JSON.stringify(MOCK_HISTORY_SCENARIOS));

/**
 * Filter scenarios by query (name, crop, tagline).
 */
export function filterScenarios(scenarios, query) {
  if (!Array.isArray(scenarios)) return [];
  if (!query || typeof query !== "string" || !query.trim()) return [...scenarios];

  const cleanQuery = query.toLowerCase().trim();
  return scenarios.filter((s) => {
    const nameMatch = s?.name && s.name.toLowerCase().includes(cleanQuery);
    const cropText = s?.crop || s?.cropName || s?.inputs?.crop || "";
    const cropMatch = cropText.toLowerCase().includes(cleanQuery);
    const taglineMatch = s?.tagline && s.tagline.toLowerCase().includes(cleanQuery);
    return nameMatch || cropMatch || taglineMatch;
  });
}

/**
 * Toggle scenario selection for comparison up to maxLimit.
 */
export function toggleCompareSelection(selectedIds, id, maxLimit = 4) {
  const current = Array.isArray(selectedIds) ? [...selectedIds] : [];
  if (!id) return current;

  if (current.includes(id)) {
    return current.filter((item) => item !== id);
  }
  if (current.length >= maxLimit) {
    return current;
  }
  return [...current, id];
}

/**
 * Validate compare selection count (2 to 4).
 */
export function validateCompareSelection(selectedIds) {
  const count = Array.isArray(selectedIds) ? selectedIds.length : 0;
  if (count < 2) {
    return { isValid: false, message: "Select at least 2 scenarios to compare." };
  }
  if (count > 4) {
    return { isValid: false, message: "Maximum 4 scenarios can be compared." };
  }
  return { isValid: true, message: "Selection valid." };
}

/**
 * Rename scenario in list (pure helper).
 */
export function renameScenario(scenarios, id, newName) {
  if (!Array.isArray(scenarios)) return [];
  if (!id || !newName || typeof newName !== "string" || !newName.trim()) return [...scenarios];

  return scenarios.map((s) => (s.id === id ? { ...s, name: newName.trim() } : s));
}

/**
 * Delete scenario from list (pure helper).
 */
export function deleteScenario(scenarios, id) {
  if (!Array.isArray(scenarios)) return [];
  if (!id) return [...scenarios];
  return scenarios.filter((s) => s.id !== id);
}

/**
 * Clone scenario in list (pure helper).
 */
export function cloneScenario(scenarios, id) {
  if (!Array.isArray(scenarios)) return [];
  const target = scenarios.find((s) => s.id === id);
  if (!target) return [...scenarios];

  const cloned = {
    ...JSON.parse(JSON.stringify(target)),
    id: `sc-copy-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: `${target.name || "Scenario"} (Copy)`,
    timestamp: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  return [cloned, ...scenarios];
}

/**
 * Sort scenarios by sortBy key.
 */
export function sortScenarios(scenarios, sortBy) {
  if (!Array.isArray(scenarios)) return [];
  const list = [...scenarios];

  return list.sort((a, b) => {
    const timeA = new Date(a.createdAt || a.timestamp || 0).getTime();
    const timeB = new Date(b.createdAt || b.timestamp || 0).getTime();

    const profitA = a.results?.economics?.profit ?? a.profit ?? 0;
    const profitB = b.results?.economics?.profit ?? b.profit ?? 0;

    const riskA = a.results?.risk?.overall ?? (a.risk === "Low" ? 20 : a.risk === "Medium" ? 50 : 80);
    const riskB = b.results?.risk?.overall ?? (b.risk === "Low" ? 20 : b.risk === "Medium" ? 50 : 80);

    switch (sortBy) {
      case "oldest":
        return timeA - timeB;
      case "profit_high":
        return profitB - profitA;
      case "risk_low":
        return riskA - riskB;
      case "newest":
      default:
        return timeB - timeA;
    }
  });
}

/**
 * Async API method to fetch history.
 */
export async function getScenarioHistory() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE_URL}/scenarios/history`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
      if (data?.scenarios && Array.isArray(data.scenarios)) {
        return data.scenarios;
      }
    }
    return JSON.parse(JSON.stringify(localHistoryStore));
  } catch (_err) {
    clearTimeout(timeoutId);
    return JSON.parse(JSON.stringify(localHistoryStore));
  }
}

/**
 * Reset in-memory mock store for testing.
 */
export function resetMockHistoryStore() {
  localHistoryStore = JSON.parse(JSON.stringify(MOCK_HISTORY_SCENARIOS));
}
