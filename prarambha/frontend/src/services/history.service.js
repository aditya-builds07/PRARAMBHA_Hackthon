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
    modelVersion: target.modelVersion || "v2.0-deterministic",
    assumptionVersion: target.assumptionVersion || "2026.1",
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

    const riskA = a.results?.risk?.overall ?? (typeof a.risk === "number" ? a.risk : a.risk === "Low" ? 20 : a.risk === "Medium" ? 50 : 80);
    const riskB = b.results?.risk?.overall ?? (typeof b.risk === "number" ? b.risk : b.risk === "Low" ? 20 : b.risk === "Medium" ? 50 : 80);

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
 * Internal API call for scenario renaming.
 */
async function renameScenarioApi(id, newName) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE_URL}/scenarios/${id}`, {
      method: "PATCH",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const updated = await res.json();
      localHistoryStore = localHistoryStore.map((sc) =>
        sc.id === id ? { ...sc, name: newName } : sc
      );
      return updated;
    }
    throw new Error(`Failed to rename scenario with status: ${res.status}`);
  } catch (_err) {
    clearTimeout(timeoutId);
    const target = localHistoryStore.find((sc) => sc.id === id);
    if (!target) {
      throw new Error(`Scenario with ID ${id} not found.`);
    }
    const updated = { ...target, name: newName };
    localHistoryStore = localHistoryStore.map((sc) => (sc.id === id ? updated : sc));
    return updated;
  }
}

/**
 * Rename a historical scenario.
 * Supports both pure list modification renameScenario(list, id, newName)
 * and async API call renameScenario(id, newName).
 */
export function renameScenario(targetOrList, newNameOrId, maybeNewName) {
  if (Array.isArray(targetOrList)) {
    const id = newNameOrId;
    const newName = maybeNewName;
    if (!id || !newName || typeof newName !== "string" || !newName.trim()) return [...targetOrList];
    return targetOrList.map((sc) => (sc.id === id ? { ...sc, name: newName.trim() } : sc));
  }
  return renameScenarioApi(targetOrList, newNameOrId);
}

/**
 * Internal API call for scenario deletion.
 */
async function deleteScenarioApi(id) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE_URL}/scenarios/${id}`, {
      method: "DELETE",
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      localHistoryStore = localHistoryStore.filter((sc) => sc.id !== id);
      return { success: true, id };
    }
    throw new Error(`Failed to delete scenario with status: ${res.status}`);
  } catch (_err) {
    clearTimeout(timeoutId);
    localHistoryStore = localHistoryStore.filter((sc) => sc.id !== id);
    return { success: true, id };
  }
}

/**
 * Delete a historical scenario.
 * Supports both pure list modification deleteScenario(list, id)
 * and async API call deleteScenario(id).
 */
export function deleteScenario(targetOrList, maybeId) {
  if (Array.isArray(targetOrList)) {
    const id = maybeId;
    if (!id) return [...targetOrList];
    return targetOrList.filter((sc) => sc.id !== id);
  }
  return deleteScenarioApi(targetOrList);
}

/**
 * Async API method to fetch history.
 */
export async function getScenarioHistory() {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return JSON.parse(JSON.stringify(localHistoryStore));
  }

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
