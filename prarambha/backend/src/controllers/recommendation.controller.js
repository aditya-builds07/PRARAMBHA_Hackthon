import { generateRecommendations } from "../services/recommendation.service.js";
import { getRecommendationsForScenario } from '../services/scenario-recommendation.service.js';

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

export async function getScenarioRecommendations(request, response, next) {
  try {
    const scenarioId = typeof request.params.scenarioId === 'string' ? request.params.scenarioId.trim() : '';
    if (!scenarioId) {
      response.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'scenarioId is required.' } });
      return;
    }
    response.status(200).json({ data: await getRecommendationsForScenario(scenarioId) });
  } catch (error) {
    if (error.message === 'Scenario not found.') {
      response.status(404).json({ error: { code: 'SCENARIO_NOT_FOUND', message: error.message } });
      return;
    }
    if (error.message.startsWith('No saved simulation result')) {
      response.status(404).json({ error: { code: 'RESULT_NOT_FOUND', message: error.message } });
      return;
    }
    next(error);
  }
}
