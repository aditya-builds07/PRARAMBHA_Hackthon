import { createResource, listResourcesByFarm, updateResource } from "../services/resource.service.js";
import { validateResourceInput } from "../validators/resource.validator.js";
import { sendError, sendSuccess } from '../utils/response.js';
import { recordAudit } from '../services/audit.service.js';

export async function getResources(request, response, next) {
  try {
    const requestedFarmId = request.params.farmId ?? request.query.farmId;
    const farmId = typeof requestedFarmId === "string" ? requestedFarmId.trim() : "";
    if (!farmId) {
      sendError(response, 400, 'VALIDATION_ERROR', 'farmId is required.');
      return;
    }
    sendSuccess(response, 200, await listResourcesByFarm(farmId, request.user.id));
  } catch (error) {
    next(error);
  }
}

export async function postResource(request, response, next) {
  try {
    const created = await createResource(validateResourceInput(request.body), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'resource', entityId: created.id, action: 'CREATE' });
    sendSuccess(response, 201, created);
  } catch (error) {
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
    const updated = await updateResource(id, validateResourceInput(request.body), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'resource', entityId: updated.id, action: 'UPDATE' });
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === 'Resource not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required') || error.message.includes('invalid') || error.message.includes('must be')) {
      return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    }
    next(error);
  }
}
