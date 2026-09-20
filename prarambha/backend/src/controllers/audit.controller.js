import { listAuditByFarm } from "../services/audit.service.js";

export async function getAudit(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    const limit = Number(request.query.limit ?? 100);

    if (!farmId) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "farmId query parameter is required." } });
      return;
    }
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "limit must be an integer between 1 and 100." } });
      return;
    }

    response.status(200).json({ data: await listAuditByFarm(farmId, limit) });
  } catch (error) {
    next(error);
  }
}
