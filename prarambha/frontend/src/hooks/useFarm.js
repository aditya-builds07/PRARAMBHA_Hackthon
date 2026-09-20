/**
 * useFarm.js — hook for farm CRUD operations.
 * Talks to farm.service.js; keeps store in sync.
 */
import { useState, useCallback } from "react"
import { useAppStore } from "../state/store.js"
import { listFarms, createFarm, updateFarm, deleteFarm, listCrops } from "../services/farm.service.js"

export function useFarm() {
  const [fetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState(null)

  const setFarms     = useAppStore((s) => s.setFarms)
  const addFarm      = useAppStore((s) => s.addFarm)
  const _updateFarm  = useAppStore((s) => s.updateFarm)
  const removeFarm   = useAppStore((s) => s.removeFarm)
  const setActiveFarm = useAppStore((s) => s.setActiveFarm)
  const setCropsCache = useAppStore((s) => s.setCropsCache)

  const fetchFarms = useCallback(async () => {
    setFetching(true)
    setFetchError(null)
    const { data, error } = await listFarms()
    if (error) {
      setFetchError(error)
    } else {
      setFarms(data ?? [])
    }
    setFetching(false)
  }, [setFarms])

  const fetchCrops = useCallback(async () => {
    const { data } = await listCrops()
    if (data) setCropsCache(data)
  }, [setCropsCache])

  const create = useCallback(async (farmData) => {
    const { data, error } = await createFarm(farmData)
    if (!error && data) addFarm(data)
    return { data, error }
  }, [addFarm])

  const update = useCallback(async (farmId, patch) => {
    const { data, error } = await updateFarm(farmId, patch)
    if (!error && data) _updateFarm(farmId, data)
    return { data, error }
  }, [_updateFarm])

  const remove = useCallback(async (farmId) => {
    const { error } = await deleteFarm(farmId)
    if (!error) removeFarm(farmId)
    return { error }
  }, [removeFarm])

  const select = useCallback((farmId) => {
    setActiveFarm(farmId)
  }, [setActiveFarm])

  return { fetching, fetchError, fetchFarms, fetchCrops, create, update, remove, select }
}
