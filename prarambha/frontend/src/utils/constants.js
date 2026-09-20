/**
 * constants.js — shared constants for the UI layer.
 * Business logic (thresholds, weights) belongs in the backend engine.
 */

/** Risk level display thresholds (matches backend contract: Low < 35, Medium 35-65, High > 65) */
export const RISK_THRESHOLDS = { LOW: 35, MEDIUM: 65 }

/** Maximum scenarios allowed per farm */
export const MAX_SCENARIOS = 4

/** Crop priority profiles */
export const PRIORITY_PROFILES = ["balanced", "max_profit", "play_safe"]

/** Weather options */
export const WEATHER_OPTIONS = ["normal", "poor", "good"]

/** Irrigation types */
export const IRRIGATION_TYPES = ["flood", "drip", "sprinkler"]

/** Planting types */
export const PLANTING_TYPES = ["on_time", "delayed"]

/**
 * DEMO PRESET INPUTS — exactly matching the judge demo flow.
 * These are scenario *inputs* only. The engine computes the outputs.
 */
export const DEMO_PRESETS = {
  a: {
    label: "A — Baseline",
    input: {
      crop: "wheat",
      areaAcres: 5,
      sowingDate: "2026-10-15",
      waterAvailabilityPercent: 100,
      availableWaterM3: null,
      weather: "normal",
      planting: { type: "on_time", delayDays: 0 },
      inputCostMultiplier: 1.0,
      irrigation: "flood",
      priorityProfile: "balanced",
    },
  },
  b: {
    label: "B — Reduced Water (60%)",
    input: {
      crop: "wheat",
      areaAcres: 5,
      sowingDate: "2026-10-15",
      waterAvailabilityPercent: 60,
      availableWaterM3: null,
      weather: "normal",
      planting: { type: "on_time", delayDays: 0 },
      inputCostMultiplier: 1.0,
      irrigation: "flood",
      priorityProfile: "balanced",
    },
  },
  c: {
    label: "C — Poor weather + delay + high cost",
    input: {
      crop: "wheat",
      areaAcres: 5,
      sowingDate: "2026-10-15",
      waterAvailabilityPercent: 100,
      availableWaterM3: null,
      weather: "poor",
      planting: { type: "delayed", delayDays: 14 },
      inputCostMultiplier: 1.3,
      irrigation: "flood",
      priorityProfile: "play_safe",
    },
  },
  d: {
    label: "D — On-time + Drip + controlled cost",
    input: {
      crop: "wheat",
      areaAcres: 5,
      sowingDate: "2026-10-15",
      waterAvailabilityPercent: 100,
      availableWaterM3: null,
      weather: "normal",
      planting: { type: "on_time", delayDays: 0 },
      inputCostMultiplier: 0.9,
      irrigation: "drip",
      priorityProfile: "max_profit",
    },
  },
}
