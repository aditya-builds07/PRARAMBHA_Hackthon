import {
  createFarm,
  deleteFarmById,
  getFarmById,
  listFarms,
  updateFarm,
} from "../services/farm.service.js";
import { writeAuditLogSafely } from "../services/audit.service.js";
import { validateFarmInput } from "../validators/farm.validator.js";
import { sendError, sendSuccess } from '../utils/response.js';

function farmId(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('farm id is required.');
  return value.trim();
}

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
    await writeAuditLogSafely({ action: 'CREATE_FARM', userId: request.user.id, farmId: created.id, inputSnapshot: farm, outputSnapshot: created });
    sendSuccess(response, 201, created);
  } catch (error) {
    if (error.message.includes("must") || error.message.includes("required")) {
      sendError(response, 400, 'VALIDATION_ERROR', error.message);
      return;
    }
    next(error);
  }
}

export async function putFarm(request, response, next) {
  try {
    const id = farmId(request.params.id);
    const updated = await updateFarm(id, validateFarmInput(request.body), request.user.id);
    await writeAuditLogSafely({ action: 'CREATE_FARM', userId: request.user.id, farmId: updated.id, inputSnapshot: request.body, outputSnapshot: updated });
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === 'Farm not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('must') || error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}

export async function deleteFarm(request, response, next) {
  try {
    const id = farmId(request.params.id);
    const existing = await getFarmById(id);
    if (existing) await writeAuditLogSafely({ action: 'DELETE_SCENARIO', userId: request.user.id, farmId: id, inputSnapshot: existing });
    const deleted = await deleteFarmById(id, request.user.id);
    sendSuccess(response, 200, deleted);
  } catch (error) {
    if (error.message === 'Farm not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}
