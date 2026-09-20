import { saveSimulationResult } from "../services/simulation-result.service.js";
import { validateSimulationResultInput } from "../validators/simulation-result.validator.js";

export async function postSimulationResult(request, response, next) {
  try {
    const result = validateSimulationResultInput(request.body);
    response.status(201).json({ data: await saveSimulationResult(result) });
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.message } });
      return;
    }
    next(error);
  }
}
