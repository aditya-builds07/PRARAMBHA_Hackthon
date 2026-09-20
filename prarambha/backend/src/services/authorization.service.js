import { getSupabaseClient } from "../adapters/db/supabase.client.js";

/**
 * Asserts that the given farm exists and belongs to the authenticated user.
 * Throws a 'Farm not found.' error if the farm does not exist or belongs to another user,
 * preventing object ID enumeration (IDOR prevention).
 *
 * @param {string} farmId
 * @param {string} userId
 * @returns {Promise<object>} Farm object
 */
export async function assertFarmOwnership(farmId, userId) {
  if (!farmId || typeof farmId !== "string" || !farmId.trim()) {
    throw new Error("farmId is required.");
  }
  if (!userId || typeof userId !== "string" || !userId.trim()) {
    throw new Error("Unauthorized: User ID is required.");
  }

  const { data, error } = await getSupabaseClient()
    .from("farms")
    .select("*")
    .eq("id", farmId.trim())
    .eq("auth_user_id", userId.trim())
    .maybeSingle();

  if (error) throw new Error(`Unable to verify farm ownership: ${error.message}`);
  if (!data) throw new Error("Farm not found.");
  return data;
}

/**
 * Asserts that the given scenario exists and its parent farm belongs to the authenticated user.
 * Throws a 'Scenario not found.' error if the scenario does not exist or is not owned by the caller.
 *
 * @param {string} scenarioId
 * @param {string} userId
 * @returns {Promise<object>} Scenario object
 */
export async function assertScenarioOwnership(scenarioId, userId) {
  if (!scenarioId || typeof scenarioId !== "string" || !scenarioId.trim()) {
    throw new Error("scenarioId is required.");
  }
  if (!userId || typeof userId !== "string" || !userId.trim()) {
    throw new Error("Unauthorized: User ID is required.");
  }

  const { data, error } = await getSupabaseClient()
    .from("scenarios")
    .select("*")
    .eq("id", scenarioId.trim())
    .maybeSingle();

  if (error) throw new Error(`Unable to load scenario: ${error.message}`);
  if (!data) throw new Error("Scenario not found.");

  // Confirm ownership of the parent farm
  await assertFarmOwnership(data.farm_id, userId);
  return data;
}
