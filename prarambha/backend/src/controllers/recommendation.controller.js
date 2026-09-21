import { generateRecommendations } from "../services/recommendation.service.js";
import { getRecommendationsForScenario } from '../services/scenario-recommendation.service.js';
import { sendError, sendSuccess } from "../utils/response.js";

export function postRecommendations(request, response) {
  const simulationResult = request.body?.simulationResult;
  const scenarioInput = request.body?.scenarioInput;

  if (!simulationResult || typeof simulationResult !== "object" || Array.isArray(simulationResult)) {
    return sendError(response, 400, "VALIDATION_ERROR", "simulationResult is required.");
  }

  // The recommendation service only consumes the deterministic output. It never recalculates it.
  sendSuccess(response, 200, generateRecommendations(simulationResult, scenarioInput));
}

export async function getScenarioRecommendations(request, response, next) {
  try {
    const scenarioId = typeof request.params.scenarioId === 'string' ? request.params.scenarioId.trim() : '';
    if (!scenarioId) {
      return sendError(response, 400, "VALIDATION_ERROR", "scenarioId is required.");
    }
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    sendSuccess(response, 200, await getRecommendationsForScenario(request.supabaseClient, scenarioId, request.user.id));
  } catch (error) {
    if (error.message === 'Scenario not found.' || error.message === 'Farm not found.') {
      return sendError(response, 404, "NOT_FOUND", error.message);
    }
    if (error.message.startsWith('No saved simulation result')) {
      return sendError(response, 404, "RESULT_NOT_FOUND", error.message);
    }
    next(error);
  }
}
