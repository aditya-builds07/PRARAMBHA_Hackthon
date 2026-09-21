import { api } from "./api.js"

function normalizeFarm(farm) {
  if (!farm || typeof farm !== "object") return farm
  return {
    ...farm,
    areaAcres: farm.areaAcres ?? farm.area_acres,
    waterProfile: farm.waterProfile ?? farm.water_profile,
    waterM3: farm.waterM3 ?? farm.available_water_m3,
    budgetInr: farm.budgetInr ?? farm.budget_inr,
    cropCycle: farm.cropCycle ?? farm.crop_cycle,
  }
}

function normalizeFarmResult(result) {
  if (result.error || !result.data) return result
  const data = Array.isArray(result.data)
    ? result.data.map(normalizeFarm)
    : normalizeFarm(result.data)
  return { ...result, data }
}

/**
 * farm.service.js — CRUD for farms.
 * Farm fields: id, name, region, areaAcres, cropCycle, waterProfile,
 *              budget (INR), waterM3, seedKg, fertilizerKg
 */

/** @returns {Promise<{data: Farm[]|null, error: string|null}>} */
export async function listFarms() {
  return normalizeFarmResult(await api.get("/api/farms"))
}

/** @returns {Promise<{data: Farm|null, error: string|null}>} */
export async function getFarm(farmId) {
  return normalizeFarmResult(await api.get(`/api/farms/${farmId}`))
}

/** @returns {Promise<{data: Farm|null, error: string|null}>} */
export async function createFarm(farmData) {
  return normalizeFarmResult(await api.post("/api/farms", farmData))
}

/** @returns {Promise<{data: Farm|null, error: string|null}>} */
export async function updateFarm(farmId, farmData) {
  return normalizeFarmResult(await api.put(`/api/farms/${farmId}`, farmData))
}

/** @returns {Promise<{data: null, error: string|null}>} */
export async function deleteFarm(farmId) {
  return api.delete(`/api/farms/${farmId}`)
}

/** @returns {Promise<{data: string[], error: string|null}>} Crop list from backend */
export async function listCrops() {
  return api.get("/api/crops")
}
