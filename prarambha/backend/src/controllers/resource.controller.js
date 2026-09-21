import {
  createResource,
  listResourcesByFarm,
  updateResource,
  upsertResourceForFarm,
} from "../services/resource.service.js";
import { writeAuditLogSafely } from "../services/audit.service.js";
import { validateResourceInput } from "../validators/resource.validator.js";
import { sendError, sendSuccess } from '../utils/response.js';

export async function getResources(request, response, next) {
  try {
    const requestedFarmId = request.params.farmId ?? request.query.farmId;
    const farmId = typeof requestedFarmId === "string" ? requestedFarmId.trim() : "";
    if (!farmId) {
      sendError(response, 400, 'VALIDATION_ERROR', 'farmId is required.');
      return;
    }
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    sendSuccess(response, 200, await listResourcesByFarm(request.supabaseClient, farmId, request.user.id));
  } catch (error) {
    if (error.message === "Farm not found.") return sendError(response, 404, "NOT_FOUND", error.message);
    next(error);
  }
}

export async function postResource(request, response, next) {
  try {
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    const created = await createResource(request.supabaseClient, validateResourceInput(request.body), request.user.id);
    await writeAuditLogSafely({ action: 'CREATE_RESOURCE', userId: request.user.id, farmId: created.farm_id, inputSnapshot: request.body, outputSnapshot: created });
    sendSuccess(response, 201, created);
  } catch (error) {
    if (error.message === "Farm not found.") return sendError(response, 404, "NOT_FOUND", error.message);
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      sendError(response, 400, 'VALIDATION_ERROR', error.message);
      return;
    }
    next(error);
  }
}

export async function getResourcesForFarm(request, response, next) {
  try {
    const farmId = typeof request.params.farmId === "string" ? request.params.farmId.trim() : "";
    if (!farmId) {
      sendError(response, 400, "VALIDATION_ERROR", "farmId is required.");
      return;
    }
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    sendSuccess(response, 200, await listResourcesByFarm(request.supabaseClient, farmId, request.user.id));
  } catch (error) {
    if (error.message === "Farm not found.") return sendError(response, 404, "NOT_FOUND", error.message);
    next(error);
  }
}

export async function putResourceForFarm(request, response, next) {
  try {
    const farmId = typeof request.params.farmId === "string" ? request.params.farmId.trim() : "";
    if (!farmId) throw new Error("farmId is required.");
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    const resource = validateResourceInput({ ...request.body, farmId });
    const updated = await upsertResourceForFarm(request.supabaseClient, farmId, resource, request.user.id);
    await writeAuditLogSafely({ action: 'UPDATE_RESOURCE', userId: request.user.id, farmId, inputSnapshot: request.body, outputSnapshot: updated });
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === "Farm not found.") return sendError(response, 404, "NOT_FOUND", error.message);
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      sendError(response, 400, 'VALIDATION_ERROR', error.message);
      return;
    }
    next(error);
  }
}

export async function putResource(request, response, next) {
  try {
    const id = typeof request.params.id === 'string' ? request.params.id.trim() : '';
    if (!id) throw new Error('resource id is required.');
    if (!request.user?.id) return sendError(response, 401, 'UNAUTHORIZED', 'Authentication required');
    const updated = await updateResource(request.supabaseClient, id, validateResourceInput(request.body), request.user.id);
    await writeAuditLogSafely({ action: 'UPDATE_RESOURCE', userId: request.user.id, farmId: updated.farm_id, inputSnapshot: request.body, outputSnapshot: updated });
    sendSuccess(response, 200, updated);
    sendSuccess(response, 200, updated);
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === 'Resource not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required') || error.message.includes('invalid') || error.message.includes('must be')) {
      return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    }
    next(error);
  }
}
