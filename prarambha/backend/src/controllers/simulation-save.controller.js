import { simulateAndSave } from "../services/simulation-save.service.js";
import { recordAuditSafely } from "../services/audit.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function postSimulateAndSave(request, response, next) {
  try {
    const scenarioId = typeof request.body?.scenarioId === "string" ? request.body.scenarioId.trim() : "";
    if (!scenarioId) {
      sendError(response, 400, "VALIDATION_ERROR", "scenarioId is required.");
      return;
    }
    if (!request.user?.id) {
      return sendError(response, 401, "UNAUTHORIZED", "Authentication required");
    }
    const saved = await simulateAndSave(request.supabaseClient, scenarioId, request.user.id);
    await recordAuditSafely({
      farmId: saved.farmId,
      scenarioId,
      action: "SAVE_SCENARIO",
      modelVersion: saved.simulation.modelVersion,
      outputSnapshot: saved.savedResult,
    });
    sendSuccess(response, 201, saved);
  } catch (error) {
    if (error.message === "Scenario not found.") {
      sendError(response, 404, "SCENARIO_NOT_FOUND", error.message);
      return;
    }
    if (error.message === "Farm not found.") {
      sendError(response, 404, "NOT_FOUND", error.message);
      return;
    }
    next(error);
  }
}
