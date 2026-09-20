const MAX_NAME_LENGTH = 80;

function optionalText(value, field) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || value.trim().length > 120) {
    throw new Error(`${field} must be text of 120 characters or fewer.`);
  }
  return value.trim();
}

function optionalNonNegativeNumber(value, field) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`${field} must be a non-negative number.`);
  }
  return number;
}

export function validateFarmInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("A farm object is required.");
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name || name.length > MAX_NAME_LENGTH) {
    throw new Error(`name is required and must be ${MAX_NAME_LENGTH} characters or fewer.`);
  }

  const areaAcres = Number(input.areaAcres);
  if (!Number.isFinite(areaAcres) || areaAcres <= 0 || areaAcres > 10000) {
    throw new Error("areaAcres must be a number greater than 0 and no more than 10000.");
  }

  return {
    name,
    area_acres: areaAcres,
    region: optionalText(input.region, "region"),
    water_profile: optionalText(input.waterProfile, "waterProfile"),
    available_water_m3: optionalNonNegativeNumber(input.availableWaterM3, "availableWaterM3"),
    budget_inr: optionalNonNegativeNumber(input.budgetInr, "budgetInr"),
  };
}
