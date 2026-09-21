import { listScenarioHistory } from "../services/history.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function getHistory(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    if (!farmId) {
      sendError(response, 400, "VALIDATION_ERROR", "farmId query parameter is required.");
      return;
    }
    if (!request.user?.id) {
      sendError(response, 401, "UNAUTHORIZED", "Authentication required");
      return;
    }
    sendSuccess(response, 200, await listScenarioHistory(request.supabaseClient, farmId, request.user.id));
  } catch (error) {
    if (error.message === "Farm not found.") {
      sendError(response, 404, "NOT_FOUND", error.message);
      return;
    }
    next(error);
  }
}
