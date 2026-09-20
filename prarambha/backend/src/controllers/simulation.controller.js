import { runSimulation } from "../services/simulation.service.js";
import { recordAuditSafely } from "../services/audit.service.js";
import { validateSimulationInput } from "../validators/simulation.validator.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function postSimulation(request, response, next) {
  try {
    const validation = validateSimulationInput(request.body);
    if (!validation.valid) {
      const message = validation.errors?.map((e) => e.message).join("; ") || "Invalid simulation input.";
      sendError(response, 400, "VALIDATION_ERROR", message);
      return;
    }

    const result = await runSimulation(request.body);
    await recordAuditSafely({
      farmId: request.body.farmId ?? null,
      action: "SIMULATE",
      modelVersion: result.modelVersion,
      inputSnapshot: request.body,
      outputSnapshot: result,
    });
    sendSuccess(response, 200, result);
  } catch (error) {
    if (error.message.startsWith("No active crop")) {
      sendError(response, 404, "CROP_NOT_FOUND", error.message);
      return;
    }
    next(error);
  }
}
