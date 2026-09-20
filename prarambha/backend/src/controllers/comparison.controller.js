import { compareScenarios } from "../services/comparison.service.js";

function parseScenarioIds(value) {
  if (value === undefined) return [];
  if (typeof value !== "string") throw new Error("scenarioIds must be a comma-separated list.");
  const ids = [...new Set(value.split(",").map((id) => id.trim()).filter(Boolean))];
  if (ids.length < 2 || ids.length > 4) throw new Error("scenarioIds must contain between 2 and 4 IDs.");
  return ids;
}

export async function getComparison(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    if (!farmId) throw new Error("farmId query parameter is required.");
    const scenarioIds = parseScenarioIds(request.query.scenarioIds);
    response.status(200).json({ data: await compareScenarios(farmId, scenarioIds) });
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("must") || error.message.includes("requires")) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.message } });
      return;
    }
    if (error.message.includes("has no saved")) {
      response.status(409).json({ error: { code: "RESULT_MISSING", message: error.message } });
      return;
    }
    next(error);
  }
}
