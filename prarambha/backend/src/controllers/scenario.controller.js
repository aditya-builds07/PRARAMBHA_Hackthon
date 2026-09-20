import { createScenario, listScenariosByFarm } from "../services/scenario.service.js";
import { validateScenarioInput } from "../validators/scenario.validator.js";

export async function getScenarios(request, response, next) {
  try {
    const farmId = request.query.farmId;
    if (typeof farmId !== "string" || !farmId.trim()) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "farmId query parameter is required." } });
      return;
    }
    response.status(200).json({ data: await listScenariosByFarm(farmId.trim()) });
  } catch (error) {
    next(error);
  }
}

export async function postScenario(request, response, next) {
  try {
    response.status(201).json({ data: await createScenario(validateScenarioInput(request.body)) });
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.message } });
      return;
    }
    next(error);
  }
}
