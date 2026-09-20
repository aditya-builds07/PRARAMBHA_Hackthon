import { listAuditByFarm } from "../services/audit.service.js";
import { sendError, sendSuccess } from "../utils/response.js";

export async function getAudit(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    const limit = Number(request.query.limit ?? 100);

    if (!farmId) {
      return sendError(response, 400, "VALIDATION_ERROR", "farmId query parameter is required.");
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      return sendError(response, 400, "VALIDATION_ERROR", "limit must be an integer between 1 and 100.");
    }

    sendSuccess(response, 200, await listAuditByFarm(farmId, limit, request.user?.id));
  } catch (error) {
    if (error.message === "Farm not found.") {
      return sendError(response, 404, "NOT_FOUND", error.message);
    }
    next(error);
  }
}
