import { saveSimulationResult } from "../services/simulation-result.service.js";
import { validateSimulationResultInput } from "../validators/simulation-result.validator.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function postSimulationResult(request, response, next) {
  try {
    const result = validateSimulationResultInput(request.body);
    if (!request.user?.id) {
      return sendError(response, 401, "UNAUTHORIZED", "Authentication required");
    }
    sendSuccess(response, 201, await saveSimulationResult(result, request.user.id));
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      sendError(response, 400, "VALIDATION_ERROR", error.message);
      return;
    }
    if (error.message === "Farm not found." || error.message === "Scenario not found.") {
      sendError(response, 404, "NOT_FOUND", error.message);
      return;
    }
    next(error);
  }
}
