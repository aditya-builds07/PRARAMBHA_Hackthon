import { api } from "./api.js"

/**
 * farm.service.js — CRUD for farms.
 * Farm fields: id, name, region, areaAcres, cropCycle, waterProfile,
 *              budget (INR), waterM3, seedKg, fertilizerKg
 */

/** @returns {Promise<{data: Farm[]|null, error: string|null}>} */
export async function listFarms() {
  return api.get("/api/farms")
}

/** @returns {Promise<{data: Farm|null, error: string|null}>} */
export async function getFarm(farmId) {
  return api.get(`/api/farms/${farmId}`)
}

/** @returns {Promise<{data: Farm|null, error: string|null}>} */
export async function createFarm(farmData) {
  return api.post("/api/farms", farmData)
}

/** @returns {Promise<{data: Farm|null, error: string|null}>} */
export async function updateFarm(farmId, farmData) {
  return api.put(`/api/farms/${farmId}`, farmData)
}

/** @returns {Promise<{data: null, error: string|null}>} */
export async function deleteFarm(farmId) {
  return api.delete(`/api/farms/${farmId}`)
}

/** @returns {Promise<{data: string[], error: string|null}>} Crop list from backend */
export async function listCrops() {
  return api.get("/api/crops")
}
