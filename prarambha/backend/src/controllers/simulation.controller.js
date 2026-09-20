import { runSimulation } from "../services/simulation.service.js";
import { validateSimulationInput } from "../validators/simulation.validator.js";

export async function postSimulation(request, response, next) {
  try {
    const validation = validateSimulationInput(request.body);
    if (!validation.valid) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", details: validation.errors } });
      return;
    }

    response.status(200).json({ data: await runSimulation(request.body), warnings: validation.warnings });
  } catch (error) {
    if (error.message.startsWith("No active crop")) {
      response.status(404).json({ error: { code: "CROP_NOT_FOUND", message: error.message } });
      return;
    }
    next(error);
  }
}
