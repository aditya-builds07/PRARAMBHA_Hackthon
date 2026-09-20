import { api } from "./api.js"

/**
 * scenario.service.js — save / load / delete named scenarios.
 * The scenario input shape must match the SCENARIO INPUT CONTRACT.
 */

/** @returns {Promise<{data: Scenario[], error: string|null}>} */
export async function listScenarios(farmId) {
  return api.get(`/api/scenarios?farmId=${farmId}`)
}

/** @returns {Promise<{data: Scenario, error: string|null}>} */
export async function saveScenario(scenarioData) {
  return api.post("/api/scenarios", scenarioData)
}

/** @returns {Promise<{data: null, error: string|null}>} */
export async function deleteScenario(scenarioId) {
  return api.delete(`/api/scenarios/${scenarioId}`)
}
