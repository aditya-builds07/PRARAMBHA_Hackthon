import { simulateAndSave } from "../services/simulation-save.service.js";

export async function postSimulateAndSave(request, response, next) {
  try {
    const scenarioId = typeof request.body?.scenarioId === "string" ? request.body.scenarioId.trim() : "";
    if (!scenarioId) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "scenarioId is required." } });
      return;
    }
    response.status(201).json({ data: await simulateAndSave(scenarioId) });
  } catch (error) {
    if (error.message === "Scenario not found.") {
      response.status(404).json({ error: { code: "SCENARIO_NOT_FOUND", message: error.message } });
      return;
    }
    next(error);
  }
}
