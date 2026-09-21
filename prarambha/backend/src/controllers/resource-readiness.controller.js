import { getResourceReadiness } from "../services/resource-readiness.service.js";
import { sendError, sendSuccess } from '../utils/response.js';

export async function getReadiness(request, response, next) {
  try {
    const farmId = typeof request.params.farmId === "string" ? request.params.farmId.trim() : "";
    const scenarioId = typeof request.query.scenarioId === "string" ? request.query.scenarioId.trim() : "";
    if (!farmId || !scenarioId) {
      return sendError(response, 400, 'VALIDATION_ERROR', 'farmId and scenarioId are required.');
    }
    sendSuccess(response, 200, await getResourceReadiness(request.supabaseClient, farmId, scenarioId, request.user.id));
  } catch (error) {
    if (error.message.startsWith("No saved simulation")) {
      return sendError(response, 404, 'NOT_FOUND', error.message);
    }
    if (error.message === 'Farm not found.') {
      return sendError(response, 404, 'NOT_FOUND', error.message);
    }
    next(error);
  }
}
