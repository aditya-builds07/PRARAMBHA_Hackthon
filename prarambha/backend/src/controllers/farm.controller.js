import { createFarm, deleteFarmById, listFarms, updateFarm } from "../services/farm.service.js";
import { validateFarmInput } from "../validators/farm.validator.js";
import { sendError, sendSuccess } from '../utils/response.js';
import { recordAudit } from '../services/audit.service.js';

export async function getFarms(request, response, next) {
  try {
    sendSuccess(response, 200, await listFarms(request.user.id));
  } catch (error) {
    next(error);
  }
}

export async function postFarm(request, response, next) {
  try {
    const farm = validateFarmInput(request.body);
    const created = await createFarm(farm, request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'farm', entityId: created.id, action: 'CREATE' });
    sendSuccess(response, 201, created);
  } catch (error) {
    if (error.message.includes("must") || error.message.includes("required")) {
      sendError(response, 400, 'VALIDATION_ERROR', error.message);
      return;
    }
    next(error);
  }
}

function farmId(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('farm id is required.');
  return value.trim();
}

export async function putFarm(request, response, next) {
  try {
    const updated = await updateFarm(farmId(request.params.id), validateFarmInput(request.body), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'farm', entityId: updated.id, action: 'UPDATE' });
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === 'Farm not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('must') || error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}

export async function deleteFarm(request, response, next) {
  try {
    const deleted = await deleteFarmById(farmId(request.params.id), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'farm', entityId: deleted.id, action: 'DELETE' });
    sendSuccess(response, 200, deleted);
  } catch (error) {
    if (error.message === 'Farm not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}
