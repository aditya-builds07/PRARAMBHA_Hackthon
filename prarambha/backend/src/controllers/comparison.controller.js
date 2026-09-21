import { compareScenarios } from "../services/comparison.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

function parseScenarioIds(value) {
  if (value === undefined) return [];
  if (typeof value !== "string") throw new Error("scenarioIds must be a comma-separated list.");
  const ids = [...new Set(value.split(",").map((id) => id.trim()).filter(Boolean))];
  if (ids.length < 2 || ids.length > 4) throw new Error("scenarioIds must contain between 2 and 4 IDs.");
  return ids;
}

function parseScenarioIdArray(value) {
  if (!Array.isArray(value)) throw new Error("scenarioIds must be an array.");
  const ids = [...new Set(value.map((id) => (typeof id === "string" ? id.trim() : "")).filter(Boolean))];
  if (ids.length < 2 || ids.length > 4) throw new Error("scenarioIds must contain between 2 and 4 IDs.");
  return ids;
}

export async function getComparison(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    if (!farmId) throw new Error("farmId query parameter is required.");
    const scenarioIds = parseScenarioIds(request.query.scenarioIds);
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    sendSuccess(response, 200, await compareScenarios(request.supabaseClient, farmId, scenarioIds, request.user.id));
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("must") || error.message.includes("requires")) {
      sendError(response, 400, "VALIDATION_ERROR", error.message);
      return;
    }
    if (error.message.includes("has no saved")) {
      sendError(response, 409, "RESULT_MISSING", error.message);
      return;
    }
    if (error.message === "Farm not found.") {
      sendError(response, 404, "NOT_FOUND", error.message);
      return;
    }
    next(error);
  }
}

export async function postComparison(request, response, next) {
  try {
    const farmId = typeof request.body?.farmId === "string" ? request.body.farmId.trim() : "";
    if (!farmId) throw new Error("farmId is required.");
    const scenarioIds = parseScenarioIdArray(request.body?.scenarioIds);
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    sendSuccess(response, 200, await compareScenarios(request.supabaseClient, farmId, scenarioIds, request.user.id));
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("must") || error.message.includes("array")) {
      sendError(response, 400, "VALIDATION_ERROR", error.message);
      return;
    }
    if (error.message.includes("has no saved")) {
      sendError(response, 409, "RESULT_MISSING", error.message);
      return;
    }
    if (error.message === "Farm not found.") {
      sendError(response, 404, "NOT_FOUND", error.message);
      return;
    }
    next(error);
  }
}
