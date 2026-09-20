import { runSimulation } from "../services/simulation.service.js";
import { recordAuditSafely } from "../services/audit.service.js";
import { validateSimulationInput } from "../validators/simulation.validator.js";

export async function postSimulation(request, response, next) {
  try {
    const validation = validateSimulationInput(request.body);
    if (!validation.valid) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", details: validation.errors } });
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
    response.status(200).json({ data: result, warnings: validation.warnings });
  } catch (error) {
    if (error.message.startsWith("No active crop")) {
      response.status(404).json({ error: { code: "CROP_NOT_FOUND", message: error.message } });
      return;
    }
    next(error);
  }
}
