/**
 * store.js — Zustand store for PRARAMBHA 2.0 (Member 3 owns this file).
 *
 * State shape:
 *   activeFarmId        string|null
 *   farms               Farm[]
 *   scenarios           Record<farmId, ScenarioInput[]>
 *   activeScenarioId    Record<farmId, string|null>
 *   results             Record<scenarioId, SimulationResult>
 *   loading             Record<scenarioId, boolean>
 *   errors              Record<scenarioId, string|null>
 *   selectedForComparison  string[]   (up to 4 scenarioIds — for Member 4)
 *   cropsCache          string[]    (fetched from GET /api/crops)
 *
 * RULE: Data for different farms must NEVER mix.
 *       Scenario inputs are immutable-updated (spread).
 *       No simulation math here — only shape management.
 */

import { create } from "zustand"

// ─── ID helpers ─────────────────────────────────────────────────────────────
let _id = 0
export function nextId(prefix = "id") {
  return `${prefix}-${Date.now()}-${++_id}`
}

// ─── Default scenario input (matches SCENARIO INPUT CONTRACT) ────────────────
export function defaultScenarioInput(farmId, overrides = {}) {
  return {
    id:                      nextId("scenario"),
    farmId,
    label:                   "Scenario A",
    crop:                    "",               // loaded from /api/crops
    areaAcres:               5,
    sowingDate:              "",
    waterAvailabilityPercent: 100,
    availableWaterM3:        null,
    weather:                 "normal",
    planting:                { type: "on_time", delayDays: 0 },
    inputCostMultiplier:     1.0,
    irrigation:              "flood",
    priorityProfile:         "balanced",
    ...overrides,
  }
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const useAppStore = create((set, get) => ({
  // ── Farm state ──────────────────────────────────────────────────────────
  activeFarmId:  null,
  farms:         [],

  setFarms(farms) {
    set({ farms })
  },

  setActiveFarm(farmId) {
    set({ activeFarmId: farmId })
    // Ensure scenario list exists for this farm
    if (!get().scenarios[farmId]) {
      set((s) => ({
        scenarios: {
          ...s.scenarios,
          [farmId]: [defaultScenarioInput(farmId)],
        },
        activeScenarioId: {
          ...s.activeScenarioId,
          [farmId]: null,
        },
      }))
    }
  },

  addFarm(farm) {
    set((s) => ({ farms: [...s.farms, farm] }))
  },

  updateFarm(farmId, patch) {
    set((s) => ({
      farms: s.farms.map((f) => (f.id === farmId ? { ...f, ...patch } : f)),
    }))
  },

  removeFarm(farmId) {
    set((s) => {
      const farms = s.farms.filter((f) => f.id !== farmId)
      const scenarios = { ...s.scenarios }
      const activeScenarioId = { ...s.activeScenarioId }
      const results = { ...s.results }
      const loading = { ...s.loading }
      const errors = { ...s.errors }
      // Clean up all farm-specific data
      delete scenarios[farmId]
      delete activeScenarioId[farmId]
      if (s.scenarios[farmId]) {
        s.scenarios[farmId].forEach((sc) => {
          delete results[sc.id]
          delete loading[sc.id]
          delete errors[sc.id]
        })
      }
      return {
        farms,
        scenarios,
        activeScenarioId,
        results,
        loading,
        errors,
        activeFarmId: s.activeFarmId === farmId ? (farms[0]?.id ?? null) : s.activeFarmId,
      }
    })
  },

  // ── Scenario state ───────────────────────────────────────────────────────
  scenarios:         {},   // farmId → ScenarioInput[]
  activeScenarioId:  {},   // farmId → scenarioId|null

  setActiveScenario(farmId, scenarioId) {
    set((s) => ({
      activeScenarioId: { ...s.activeScenarioId, [farmId]: scenarioId },
    }))
  },

  addScenario(farmId, overrides = {}) {
    const existing = get().scenarios[farmId] ?? []
    const labels = ["A", "B", "C", "D"]
    const label = `Scenario ${labels[existing.length] ?? existing.length + 1}`
    const scenario = defaultScenarioInput(farmId, { label, ...overrides })
    set((s) => ({
      scenarios: {
        ...s.scenarios,
        [farmId]: [...(s.scenarios[farmId] ?? []), scenario],
      },
    }))
    return scenario
  },

  cloneScenario(farmId, sourceId) {
    const source = (get().scenarios[farmId] ?? []).find((s) => s.id === sourceId)
    if (!source) return null
    const existing = get().scenarios[farmId] ?? []
    const labels = ["A", "B", "C", "D"]
    const label = `Scenario ${labels[existing.length] ?? existing.length + 1}`
    const clone = { ...source, id: nextId("scenario"), label }
    set((s) => ({
      scenarios: {
        ...s.scenarios,
        [farmId]: [...(s.scenarios[farmId] ?? []), clone],
      },
    }))
    return clone
  },

  updateScenario(farmId, scenarioId, patch) {
    set((s) => ({
      scenarios: {
        ...s.scenarios,
        [farmId]: (s.scenarios[farmId] ?? []).map((sc) =>
          sc.id === scenarioId ? { ...sc, ...patch } : sc
        ),
      },
    }))
  },

  removeScenario(farmId, scenarioId) {
    set((s) => {
      const results = { ...s.results }
      const loading = { ...s.loading }
      const errors = { ...s.errors }
      delete results[scenarioId]
      delete loading[scenarioId]
      delete errors[scenarioId]
      return {
        scenarios: {
          ...s.scenarios,
          [farmId]: (s.scenarios[farmId] ?? []).filter((sc) => sc.id !== scenarioId),
        },
        results,
        loading,
        errors,
      }
    })
  },

  // ── Result state ─────────────────────────────────────────────────────────
  results:  {},   // scenarioId → SimulationResult
  loading:  {},   // scenarioId → boolean
  errors:   {},   // scenarioId → string|null

  setResult(scenarioId, result) {
    set((s) => ({
      results: { ...s.results, [scenarioId]: result },
      loading: { ...s.loading, [scenarioId]: false },
      errors:  { ...s.errors,  [scenarioId]: null },
    }))
  },

  setLoading(scenarioId, value) {
    set((s) => ({ loading: { ...s.loading, [scenarioId]: value } }))
  },

  setError(scenarioId, error) {
    set((s) => ({
      errors:  { ...s.errors,  [scenarioId]: error },
      loading: { ...s.loading, [scenarioId]: false },
    }))
  },

  // ── Comparison selection (for Member 4) ─────────────────────────────────
  selectedForComparison: [],

  toggleComparisonSelection(scenarioId) {
    set((s) => {
      const sel = s.selectedForComparison
      if (sel.includes(scenarioId)) {
        return { selectedForComparison: sel.filter((id) => id !== scenarioId) }
      }
      if (sel.length >= 4) return {}  // max 4
      return { selectedForComparison: [...sel, scenarioId] }
    })
  },

  clearComparisonSelection() {
    set({ selectedForComparison: [] })
  },

  // ── Crops cache ──────────────────────────────────────────────────────────
  cropsCache: [],

  setCropsCache(crops) {
    set({ cropsCache: crops })
  },
}))

// ─── Selectors (stable references — import these in components) ──────────────

/** All scenarios for a farm */
export const getScenarios = (farmId) => (s) => s.scenarios[farmId] ?? []

/** A single scenario input */
export const getScenario = (farmId, scenarioId) => (s) =>
  (s.scenarios[farmId] ?? []).find((sc) => sc.id === scenarioId) ?? null

/** Simulation result for a scenario */
export const getResult = (scenarioId) => (s) => s.results[scenarioId] ?? null

/** Loading flag for a scenario */
export const isLoading = (scenarioId) => (s) => s.loading[scenarioId] ?? false

/** Error string for a scenario */
export const getError = (scenarioId) => (s) => s.errors[scenarioId] ?? null

/** Scenario IDs selected for comparison (Member 4 hook) */
export const getSelectedForComparison = (s) => s.selectedForComparison

/** Active farm object */
export const getActiveFarm = (s) =>
  s.farms.find((f) => f.id === s.activeFarmId) ?? null
