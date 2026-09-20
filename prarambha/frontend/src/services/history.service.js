/**
 * History Service - Member 4 (Frontend UX / Scenario Management)
 * Provides saved simulation history, renaming, and deletion.
 *
 * Pattern: Real fetch to backend endpoints with robust in-memory mock fallback.
 */

const API_BASE_URL = "/api";

export const MOCK_HISTORY_SCENARIOS = [
  {
    id: "sc-001",
    name: "Baseline Precision Drip Plan",
    timestamp: "2026-03-15T10:30:00Z",
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
 * Fetch all saved scenario simulations.
 * @returns {Promise<Array>} List of historical scenarios
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

export function filterScenarios(scenarios, query) {
  if (!Array.isArray(scenarios)) return [];
  const q = (query || "").trim().toLowerCase();
  if (!q) return scenarios;
  return scenarios.filter((s) => {
    const name = (s.name || s.label || "").toLowerCase();
    const rawCrop = s.crop || s.inputs?.crop || s.cropCode || "";
    const crop = (typeof rawCrop === "string" ? rawCrop : rawCrop?.name || "").toLowerCase();
    const tagline = (s.tagline || s.notes || s.description || "").toLowerCase();
    return name.includes(q) || crop.includes(q) || tagline.includes(q);
  });
}

export function toggleCompareSelection(currentSelection, scenarioId, max = 4) {
  if (!Array.isArray(currentSelection)) currentSelection = [];
  if (!scenarioId) return currentSelection;
  if (currentSelection.includes(scenarioId)) {
    return currentSelection.filter((id) => id !== scenarioId);
  }
  if (currentSelection.length >= max) {
    return currentSelection;
  }
  return [...currentSelection, scenarioId];
}

export function validateCompareSelection(selection) {
  if (!Array.isArray(selection) || selection.length < 2) {
    return { isValid: false, message: "Select at least 2 scenarios to compare." };
  }
  if (selection.length > 4) {
    return { isValid: false, message: "You can compare a maximum of 4 scenarios." };
  }
  return { isValid: true, message: null };
}

export function cloneScenario(scenarios, id) {
  if (!Array.isArray(scenarios)) return [];
  const target = scenarios.find((s) => s.id === id);
  if (!target) return scenarios;
  const cloned = {
    ...target,
    id: `sc-clone-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: `${target.name} (Copy)`,
    createdAt: new Date().toISOString(),
    timestamp: new Date().toISOString(),
    modelVersion: target.modelVersion || "v2.0-deterministic",
    assumptionVersion: target.assumptionVersion || "2026.1",
  };
  return [cloned, ...scenarios];
}

export function sortScenarios(scenarios, sortBy = "newest") {
  if (!Array.isArray(scenarios)) return [];
  const list = [...scenarios];
  switch (sortBy) {
    case "newest":
      return list.sort((a, b) => new Date(b.createdAt || b.timestamp || 0) - new Date(a.createdAt || a.timestamp || 0));
    case "oldest":
      return list.sort((a, b) => new Date(a.createdAt || a.timestamp || 0) - new Date(b.createdAt || b.timestamp || 0));
    case "profit_high":
      return list.sort((a, b) => {
        const pA = a.results?.economics?.profit ?? a.profit ?? 0;
        const pB = b.results?.economics?.profit ?? b.profit ?? 0;
        return pB - pA;
      });
    case "risk_low":
      return list.sort((a, b) => {
        const rA = a.results?.risk?.overall ?? (typeof a.risk === "number" ? a.risk : a.risk === "Low" ? 20 : a.risk === "Medium" ? 50 : 80);
        const rB = b.results?.risk?.overall ?? (typeof b.risk === "number" ? b.risk : b.risk === "Low" ? 20 : b.risk === "Medium" ? 50 : 80);
        return rA - rB;
      });
    default:
      return list;
  }
}

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
    if (!newName || !newName.trim()) return targetOrList;
    return targetOrList.map((sc) => (sc.id === id ? { ...sc, name: newName.trim() } : sc));
  }
  return renameScenarioApi(targetOrList, newNameOrId);
}

/**
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
    return targetOrList.filter((sc) => sc.id !== id);
  }
  return deleteScenarioApi(targetOrList);
}

/**
 * Helper to reset in-memory mock store for testing.
 */
export function resetMockHistoryStore() {
  localHistoryStore = JSON.parse(JSON.stringify(MOCK_HISTORY_SCENARIOS));
}
