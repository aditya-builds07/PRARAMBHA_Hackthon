import { listScenarioHistory } from "../services/history.service.js";

export async function getHistory(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    if (!farmId) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "farmId query parameter is required." } });
      return;
    }
    response.status(200).json({ data: await listScenarioHistory(farmId) });
  } catch (error) {
    next(error);
  }
}
