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

/**
 * Rename a historical scenario.
 * @param {string} id - Scenario ID
 * @param {string} newName - Updated scenario title
 * @returns {Promise<Object>} Updated scenario record
 */
export async function renameScenario(id, newName) {
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
      // Update local mock store as well
      localHistoryStore = localHistoryStore.map((sc) =>
        sc.id === id ? { ...sc, name: newName } : sc
      );
      return updated;
    }
    throw new Error(`Failed to rename scenario with status: ${res.status}`);
  } catch (_err) {
    clearTimeout(timeoutId);
    // Mock fallback: update local store and return updated record
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
 * Delete a historical scenario.
 * @param {string} id - Scenario ID
 * @returns {Promise<Object>} Success status
 */
export async function deleteScenario(id) {
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
    // Mock fallback: remove from local store
    localHistoryStore = localHistoryStore.filter((sc) => sc.id !== id);
    return { success: true, id };
  }
}

/**
 * Helper to reset in-memory mock store for testing.
 */
export function resetMockHistoryStore() {
  localHistoryStore = JSON.parse(JSON.stringify(MOCK_HISTORY_SCENARIOS));
}
