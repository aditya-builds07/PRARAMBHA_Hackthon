const RESOURCE_TYPES = new Set(["budget", "water", "seed", "fertilizer", "other"]);

export function validateResourceInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("A resource object is required.");
  }

  const farmId = typeof input.farmId === "string" ? input.farmId.trim() : "";
  const label = typeof input.label === "string" ? input.label.trim() : "";
  const unit = typeof input.unit === "string" ? input.unit.trim() : "";
  const quantity = Number(input.availableQuantity);

  if (!farmId) throw new Error("farmId is required.");
  if (!RESOURCE_TYPES.has(input.resourceType)) throw new Error("resourceType is invalid.");
  if (!label || label.length > 80) throw new Error("label is required and must be 80 characters or fewer.");
  if (!unit || unit.length > 30) throw new Error("unit is required and must be 30 characters or fewer.");
  if (!Number.isFinite(quantity) || quantity < 0) throw new Error("availableQuantity must be a non-negative number.");

  return {
    farm_id: farmId,
    resource_type: input.resourceType,
    label,
    available_quantity: quantity,
    unit,
  };
}
