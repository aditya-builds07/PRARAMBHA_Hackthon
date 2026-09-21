import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { assertFarmOwnership } from "./authorization.service.js";

function createStatus(required, available, unit) {
  const gap = Math.max(0, required - available);
  const gapRatio = required > 0 ? gap / required : 0;
  const status = gap === 0 ? "available" : gapRatio >= 0.25 ? "critical" : "shortage";
  return { required, available, gap, status, unit };
}

function overallStatus(statuses) {
  if (statuses.some((item) => item.status === "critical")) return "critical";
  if (statuses.some((item) => item.status === "shortage")) return "shortage";
  return "available";
}

export async function getResourceReadiness(supabaseOrFarmId, farmIdOrScenarioId, scenarioIdOrUserId, maybeUserId) {
  const supabase = typeof supabaseOrFarmId === "object" ? supabaseOrFarmId : getSupabaseClient();
  const farmId = typeof supabaseOrFarmId === "object" ? farmIdOrScenarioId : supabaseOrFarmId;
  const scenarioId = typeof supabaseOrFarmId === "object" ? scenarioIdOrUserId : farmIdOrScenarioId;
  const userId = typeof supabaseOrFarmId === "object" ? maybeUserId : scenarioIdOrUserId;
  await assertFarmOwnership(farmId, userId, supabase);
  const [{ data: resources, error: resourcesError }, { data: result, error: resultError }] = await Promise.all([
    supabase.from("resources").select("resource_type, available_quantity").eq("farm_id", farmId),
    supabase
      .from("simulation_results")
      .select("cost_inr, water_drawn_m3, scenarios!inner(farm_id)")
      .eq("scenario_id", scenarioId)
      .eq("scenarios.farm_id", farmId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (resourcesError) throw new Error(`Unable to load farm resources: ${resourcesError.message}`);
  if (resultError) throw new Error(`Unable to load simulation result: ${resultError.message}`);
  if (!result) throw new Error("No saved simulation result exists for this scenario.");

  const available = resources.reduce(
    (totals, resource) => ({
      ...totals,
      [resource.resource_type]: (totals[resource.resource_type] ?? 0) + Number(resource.available_quantity),
    }),
    {},
  );

  const budget = createStatus(Number(result.cost_inr), available.budget ?? 0, "INR");
  const water = createStatus(Number(result.water_drawn_m3), available.water ?? 0, "m3");

  const statuses = { budget, water };
  const status = overallStatus(Object.values(statuses));

  return {
    ...statuses,
    // The maps make the read API convenient for clients that compare resource types directly.
    required: Object.fromEntries(Object.entries(statuses).map(([type, value]) => [type, value.required])),
    available: Object.fromEntries(Object.entries(statuses).map(([type, value]) => [type, value.available])),
    gap: Object.fromEntries(Object.entries(statuses).map(([type, value]) => [type, value.gap])),
    status,
    overallStatus: status,
    resources: Object.entries(statuses).map(([resourceType, value]) => ({ resourceType, ...value })),
  };
}
