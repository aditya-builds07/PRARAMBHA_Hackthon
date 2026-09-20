import {
  createScenario,
  deleteScenarioById,
  getScenarioById,
  listScenariosByFarm,
  updateScenario,
} from "../services/scenario.service.js";
import { writeAuditLogSafely } from "../services/audit.service.js";
import { validateScenarioInput } from "../validators/scenario.validator.js";
import { sendError, sendSuccess } from '../utils/response.js';

function isValidationError(error) {
  return error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be");
}

function scenarioId(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('scenario id is required.');
  return value.trim();
}

export async function getScenarios(request, response, next) {
  try {
    const farmId = request.query.farmId;
    if (typeof farmId !== "string" || !farmId.trim()) {
      sendError(response, 400, 'VALIDATION_ERROR', 'farmId query parameter is required.');
      return;
    }
    sendSuccess(response, 200, await listScenariosByFarm(request.supabaseClient, farmId.trim(), request.user.id));
  } catch (error) {
    next(error);
  }
}

export async function postScenario(request, response, next) {
  try {
    const created = await createScenario(request.supabaseClient, validateScenarioInput(request.body), request.user.id);
    await writeAuditLogSafely({ action: 'CREATE_SCENARIO', userId: request.user.id, farmId: created.farm_id, scenarioId: created.id, inputSnapshot: request.body, outputSnapshot: created });
    sendSuccess(response, 201, created);
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      sendError(response, 400, 'VALIDATION_ERROR', error.message);
      return;
    }
    next(error);
  }
}

export async function getScenario(request, response, next) {
  try { sendSuccess(response, 200, await getScenarioById(request.supabaseClient, scenarioId(request.params.id), request.user.id)); }
  catch (error) {
    if (error.message === 'Scenario not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}

export async function putScenario(request, response, next) {
  try {
    const updated = await updateScenario(request.supabaseClient, scenarioId(request.params.id), validateScenarioInput(request.body), request.user.id);
    await writeAuditLogSafely({ action: 'UPDATE_SCENARIO', userId: request.user.id, farmId: updated.farm_id, scenarioId: updated.id, inputSnapshot: request.body, outputSnapshot: updated });
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === 'Scenario not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.startsWith('Scenario has saved results')) return sendError(response, 409, 'CONFLICT', error.message);
    if (isValidationError(error)) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}

export async function deleteScenario(request, response, next) {
  try {
    const id = scenarioId(request.params.id);
    const existing = await getScenarioById(request.supabaseClient, id, request.user.id);
    await writeAuditLogSafely({ action: 'DELETE_SCENARIO', userId: request.user.id, farmId: existing.farm_id, scenarioId: id, inputSnapshot: existing });
    const deleted = await deleteScenarioById(request.supabaseClient, id, request.user.id);
    sendSuccess(response, 200, deleted);
  }
  catch (error) {
    if (error.message === 'Scenario not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}
