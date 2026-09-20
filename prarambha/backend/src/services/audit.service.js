import { getSupabaseClient } from "../adapters/db/supabase.client.js";

/**
 * Allowed audit action values. This list is the single source of truth — any
 * caller that passes an unrecognised action gets a loud, immediate error so
 * mistakes are caught in development rather than silently dropped in production.
 */
const ALLOWED_ACTIONS = new Set([
  "CREATE_FARM",
  "UPDATE_FARM",
  "DELETE_FARM",
  "CREATE_SCENARIO",
  "SIMULATE",
  "SAVE_SCENARIO",
  "UPDATE_SCENARIO",
  "DELETE_SCENARIO",
  "CREATE_RESOURCE",
  "UPDATE_RESOURCE",
  "GENERATE_REPORT",
]);

/**
 * Inserts one row into audit_logs using the service-role Supabase client.
 * created_at is set by the database default; do not pass it from JS.
 *
 * Throws immediately if `action` is not in the allowed set — fail loud so
 * callers catch typos at development time.
 *
 * @param {object} params
 * @param {string} params.action - One of the ALLOWED_ACTIONS strings.
 * @param {string|null} [params.userId] - UUID of the authenticated user.
 * @param {string|null} [params.farmId] - UUID of the farm involved.
 * @param {string|null} [params.scenarioId] - UUID of the scenario involved.
 * @param {string|null} [params.modelVersion] - Model version string.
 * @param {object|null} [params.inputSnapshot] - JSONB snapshot of inputs.
 * @param {object|null} [params.outputSnapshot] - JSONB snapshot of outputs.
 */
export async function writeAuditLog({
  action,
  userId = null,
  farmId = null,
  scenarioId = null,
  modelVersion = null,
  inputSnapshot = null,
  outputSnapshot = null,
}) {
  if (!ALLOWED_ACTIONS.has(action)) {
    throw new Error(
      `Invalid audit action "${action}". Allowed values: ${[...ALLOWED_ACTIONS].join(", ")}.`
    );
  }

  const { data, error } = await getSupabaseClient()
    .from("audit_logs")
    .insert({
      user_id: userId,
      farm_id: farmId,
      scenario_id: scenarioId,
      action,
      model_version: modelVersion,
      input_snapshot: inputSnapshot,
      output_snapshot: outputSnapshot,
    })
    .select("*")
    .single();

  if (error) throw new Error(`Unable to record audit event: ${error.message}`);
  return data;
}

/**
 * Fire-and-forget wrapper around writeAuditLog.
 *
 * INTENTIONALLY catches and logs errors rather than re-throwing them.
 * A logging failure must never surface to the caller or break the user-facing
 * response — audit is a side effect, not a prerequisite for correctness.
 * Errors are written to stderr so they remain visible in server logs.
 */
export async function writeAuditLogSafely(event) {
  try {
    await writeAuditLog(event);
  } catch (error) {
    console.warn(`[audit] Audit event was not recorded (action=${event?.action}): ${error.message}`);
  }
}

/**
 * Returns the most recent audit log entries for a given farm.
 * Used by the read endpoint in audit.routes.js.
 */
export async function listAuditByFarm(farmId, limit = 100) {
  const { data, error } = await getSupabaseClient()
    .from("audit_logs")
    .select("*")
    .eq("farm_id", farmId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Unable to load audit events: ${error.message}`);
  return data;
}

// Legacy alias for existing callers that use recordAuditSafely
export const recordAuditSafely = writeAuditLogSafely;
