import { generateRecommendations } from "../services/recommendation.service.js";

export function postRecommendations(request, response) {
  const simulationResult = request.body?.simulationResult;
  const scenarioInput = request.body?.scenarioInput;

  if (!simulationResult || typeof simulationResult !== "object" || Array.isArray(simulationResult)) {
    response.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "simulationResult is required." },
    });
    return;
  }

  // The recommendation service only consumes the deterministic output. It never recalculates it.
  response.status(200).json({ data: generateRecommendations(simulationResult, scenarioInput) });
}
