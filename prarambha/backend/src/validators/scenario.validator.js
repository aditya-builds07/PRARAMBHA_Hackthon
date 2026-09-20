const ALLOWED_WEATHER = new Set(["good", "normal", "poor"]);
const ALLOWED_PLANTING = new Set(["early", "on_time", "delayed"]);
const ALLOWED_IRRIGATION = new Set(["flood", "sprinkler", "drip"]);
const ALLOWED_PROFILES = new Set(["balanced", "max_profit", "play_safe"]);

function numberInRange(value, field, minimum, maximum) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < minimum || number > maximum) {
    throw new Error(`${field} must be between ${minimum} and ${maximum}.`);
  }
  return number;
}

function optionalNumber(value, field) {
  if (value === undefined || value === null || value === "") return null;
  return numberInRange(value, field, 0, Number.MAX_SAFE_INTEGER);
}

function requiredString(value, field, allowedValues) {
  if (typeof value !== "string" || !allowedValues.has(value)) {
    throw new Error(`${field} is invalid.`);
  }
  return value;
}

export function validateScenarioInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("A scenario object is required.");
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name || name.length > 80) throw new Error("name is required and must be 80 characters or fewer.");
  if (typeof input.farmId !== "string" || !input.farmId.trim()) throw new Error("farmId is required.");
  if (typeof input.crop !== "string" || !input.crop.trim()) throw new Error("crop is required.");

  const planting = input.planting ?? {};
  const plantingType = requiredString(planting.type, "planting.type", ALLOWED_PLANTING);
  const delayDays = plantingType === "delayed"
    ? numberInRange(planting.delayDays, "planting.delayDays", 1, 90)
    : 0;

  const sowingDate = input.sowingDate ?? null;
  if (sowingDate !== null && (typeof sowingDate !== "string" || Number.isNaN(Date.parse(sowingDate)))) {
    throw new Error("sowingDate must be an ISO date string.");
  }

  return {
    farm_id: input.farmId.trim(),
    name,
    is_baseline: Boolean(input.isBaseline),
    crop_code: input.crop.trim(),
    area_acres: numberInRange(input.areaAcres, "areaAcres", 0.01, 10000),
    sowing_date: sowingDate,
    water_availability_percent: numberInRange(input.waterAvailabilityPercent, "waterAvailabilityPercent", 0, 120),
    available_water_m3: optionalNumber(input.availableWaterM3, "availableWaterM3"),
    weather: requiredString(input.weather, "weather", ALLOWED_WEATHER),
    planting_type: plantingType,
    delay_days: delayDays,
    input_cost_multiplier: numberInRange(input.inputCostMultiplier, "inputCostMultiplier", 0.5, 3),
    irrigation: requiredString(input.irrigation, "irrigation", ALLOWED_IRRIGATION),
    priority_profile: requiredString(input.priorityProfile, "priorityProfile", ALLOWED_PROFILES),
  };
}
