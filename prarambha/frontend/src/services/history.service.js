/**
 * Scenario History Service - Member 4
 * Pure helper utilities for filtering, managing, and preparing scenarios for comparison.
 */

/**
 * Filter scenarios by text query matching name, crop, or tagline.
 * @param {Array<Object>} scenarios
 * @param {string} query
 * @returns {Array<Object>}
 */
export function filterScenarios(scenarios = [], query = "") {
  if (!Array.isArray(scenarios)) return [];
  const q = String(query).trim().toLowerCase();
  if (!q) return scenarios;

  return scenarios.filter((s) => {
    const nameMatch = (s?.name || "").toLowerCase().includes(q);
    const cropMatch = (s?.inputs?.crop || "").toLowerCase().includes(q);
    const taglineMatch = (s?.tagline || "").toLowerCase().includes(q);
    return nameMatch || cropMatch || taglineMatch;
  });
}

/**
 * Toggle scenario selection for multi-scenario comparison.
 * Enforces maximum limit of 4 scenarios (PRD Section 12).
 * @param {Array<string>} selectedIds
 * @param {string} idToToggle
 * @param {number} maxAllowed - Defaults to 4
 * @returns {Array<string>} Updated array of selected IDs
 */
export function toggleCompareSelection(selectedIds = [], idToToggle, maxAllowed = 4) {
  if (!idToToggle) return selectedIds;
  const list = Array.isArray(selectedIds) ? [...selectedIds] : [];

  if (list.includes(idToToggle)) {
    return list.filter((id) => id !== idToToggle);
  }

  if (list.length >= maxAllowed) {
    return list; // Ignore addition if limit reached
  }

  return [...list, idToToggle];
}

/**
 * Validates whether the current selection meets PRD comparison requirements (2 to 4).
 * @param {Array<string>} selectedIds
 * @returns {{ isValid: boolean, error: string|null }}
 */
export function validateCompareSelection(selectedIds = []) {
  const count = Array.isArray(selectedIds) ? selectedIds.length : 0;
  if (count < 2) {
    return {
      isValid: false,
      error: "Please select at least 2 scenarios to compare.",
    };
  }
  if (count > 4) {
    return {
      isValid: false,
      error: "A maximum of 4 scenarios can be compared simultaneously.",
    };
  }
  return {
    isValid: true,
    error: null,
  };
}

/**
 * Renames a scenario by ID immutably.
 * @param {Array<Object>} scenarios
 * @param {string} id
 * @param {string} newName
 * @returns {Array<Object>}
 */
export function renameScenario(scenarios = [], id, newName) {
  if (!Array.isArray(scenarios)) return [];
  const trimmed = String(newName || "").trim();
  if (!trimmed) return scenarios;

  return scenarios.map((s) => (s?.id === id ? { ...s, name: trimmed } : s));
}

/**
 * Deletes a scenario by ID immutably.
 * @param {Array<Object>} scenarios
 * @param {string} id
 * @returns {Array<Object>}
 */
export function deleteScenario(scenarios = [], id) {
  if (!Array.isArray(scenarios)) return [];
  return scenarios.filter((s) => s?.id !== id);
}
