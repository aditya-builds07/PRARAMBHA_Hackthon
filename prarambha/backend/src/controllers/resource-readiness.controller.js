import { getResourceReadiness } from "../services/resource-readiness.service.js";

export async function getReadiness(request, response, next) {
  try {
    const farmId = typeof request.params.farmId === "string" ? request.params.farmId.trim() : "";
    const scenarioId = typeof request.query.scenarioId === "string" ? request.query.scenarioId.trim() : "";
    if (!farmId || !scenarioId) {
      response.status(400).json({
        error: { code: "VALIDATION_ERROR", message: "farmId and scenarioId are required." },
      });
      return;
    }
    response.status(200).json({ data: await getResourceReadiness(farmId, scenarioId) });
  } catch (error) {
    if (error.message.startsWith("No saved simulation")) {
      response.status(404).json({ error: { code: "RESULT_NOT_FOUND", message: error.message } });
      return;
    }
    next(error);
  }
}
