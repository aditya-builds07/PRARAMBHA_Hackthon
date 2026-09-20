/**
 * validate.js — client-side input validation (mirrors backend constraints).
 * Returns an object of { field: errorMessage } or {} for valid input.
 */

export function validateScenarioInput(input) {
  const errors = {}

  if (!input.crop) {
    errors.crop = "Please select a crop."
  }
  if (!input.areaAcres || Number(input.areaAcres) <= 0) {
    errors.areaAcres = "Area must be greater than 0."
  }
  if (!input.sowingDate) {
    errors.sowingDate = "Sowing date is required."
  }
  if (input.waterAvailabilityPercent === undefined || input.waterAvailabilityPercent === null
      || Number(input.waterAvailabilityPercent) < 0) {
    errors.waterAvailabilityPercent = "Water availability must be 0 or more."
  }
  if (input.planting?.delayDays !== undefined && Number(input.planting.delayDays) < 0) {
    errors.delayDays = "Delay days must be 0 or more."
  }
  if (!input.inputCostMultiplier || Number(input.inputCostMultiplier) <= 0) {
    errors.inputCostMultiplier = "Cost multiplier must be greater than 0."
  }

  return errors
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0
}

export function validateFarm(farm) {
  const errors = {}
  if (!farm.name?.trim()) errors.name = "Farm name is required."
  if (!farm.areaAcres || Number(farm.areaAcres) <= 0) errors.areaAcres = "Area must be greater than 0."
  return errors
}
