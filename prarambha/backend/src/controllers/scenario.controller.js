import { createScenario, deleteScenarioById, getScenarioById, listScenariosByFarm, updateScenario } from "../services/scenario.service.js";
import { validateScenarioInput } from "../validators/scenario.validator.js";
import { sendError, sendSuccess } from '../utils/response.js';
import { recordAudit } from '../services/audit.service.js';

export async function getScenarios(request, response, next) {
  try {
    const farmId = request.query.farmId;
    if (typeof farmId !== "string" || !farmId.trim()) {
      sendError(response, 400, 'VALIDATION_ERROR', 'farmId query parameter is required.');
      return;
    }
    sendSuccess(response, 200, await listScenariosByFarm(farmId.trim(), request.user.id));
  } catch (error) {
    next(error);
  }
}

export async function postScenario(request, response, next) {
  try {
    const created = await createScenario(validateScenarioInput(request.body), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'scenario', entityId: created.id, action: 'CREATE' });
    sendSuccess(response, 201, created);
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      sendError(response, 400, 'VALIDATION_ERROR', error.message);
      return;
    }
    next(error);
  }
}

function scenarioId(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('scenario id is required.');
  return value.trim();
}

export async function getScenario(request, response, next) {
  try { sendSuccess(response, 200, await getScenarioById(scenarioId(request.params.id), request.user.id)); }
  catch (error) {
    if (error.message === 'Scenario not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}

export async function putScenario(request, response, next) {
  try {
    // Stored scenarios are the input snapshot used to reproduce their saved results.
    const updated = await updateScenario(scenarioId(request.params.id), validateScenarioInput(request.body), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'scenario', entityId: updated.id, action: 'UPDATE' });
    sendSuccess(response, 200, updated);
  } catch (error) {
    if (error.message === 'Scenario not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.startsWith('Scenario has saved results')) return sendError(response, 409, 'CONFLICT', error.message);
    if (error.message.includes('required') || error.message.includes('invalid') || error.message.includes('must be')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}

export async function deleteScenario(request, response, next) {
  try {
    const deleted = await deleteScenarioById(scenarioId(request.params.id), request.user.id);
    await recordAudit({ userId: request.user.id, entityType: 'scenario', entityId: deleted.id, action: 'DELETE' });
    sendSuccess(response, 200, deleted);
  }
  catch (error) {
    if (error.message === 'Scenario not found.') return sendError(response, 404, 'NOT_FOUND', error.message);
    if (error.message.includes('required')) return sendError(response, 400, 'VALIDATION_ERROR', error.message);
    next(error);
  }
}
