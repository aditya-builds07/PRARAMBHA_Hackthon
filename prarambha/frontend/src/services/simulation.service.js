import { api } from "./api.js"

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true"

// ─── Mock result matching the ENGINE OUTPUT CONTRACT exactly ───────────────
const MOCK_RESULT = {
  modelVersion: "mock-1.0",
  estimated: true,
  yield: {
    perAcre: 18.5,
    total: 92.5,
    low: 78.0,
    high: 107.0,
  },
  economics: {
    cost: 42000,
    revenue: 74000,
    profit: 32000,
    roi: 76.2,
  },
  water: {
    requiredM3: 2400,
    drawnM3: 2400,
    productivity: 0.0386,
  },
  risk: {
    components: {
      water: 20,
      weather: 25,
      planting: 15,
      financial: 18,
    },
    overall: 22,
    level: "Low",
  },
  decisionScore: 74,
}

/**
 * Simulate a scenario against the backend (or mock).
 *
 * @param {object} scenarioInput  — must match SCENARIO INPUT CONTRACT
 * @param {AbortSignal} [signal]  — pass to cancel stale requests
 * @returns {Promise<{data: SimulationResult|null, error: string|null}>}
 */
export async function simulate(scenarioInput, signal) {
  if (USE_MOCK) {
    // MOCK: simulated network delay so debounce/stale-cancel tests are realistic
    await new Promise((res) => setTimeout(res, 200))
    if (signal?.aborted) return { data: null, error: "AbortError" }
    // Vary mock numbers slightly so UI changes are visible when inputs change
    const noise = (scenarioInput.waterAvailabilityPercent ?? 100) / 100
    return {
      data: {
        ...MOCK_RESULT,
        yield: {
          ...MOCK_RESULT.yield,
          perAcre: +(MOCK_RESULT.yield.perAcre * noise).toFixed(2),
          total:   +(MOCK_RESULT.yield.total   * noise).toFixed(2),
          low:     +(MOCK_RESULT.yield.low      * noise).toFixed(2),
          high:    +(MOCK_RESULT.yield.high     * noise).toFixed(2),
        },
        economics: {
          ...MOCK_RESULT.economics,
          revenue: Math.round(MOCK_RESULT.economics.revenue * noise),
          profit:  Math.round(MOCK_RESULT.economics.profit  * noise),
          roi:     +(MOCK_RESULT.economics.roi * noise).toFixed(1),
        },
      },
      error: null,
    }
  }

  // Real API — Member 1/2 implement POST /api/simulate
  return api.post("/api/simulate", scenarioInput, signal)
}

/**
 * Whether the mock layer is currently active.
 * Used to show a "MOCK" label in dev mode.
 */
export const isMockMode = USE_MOCK
