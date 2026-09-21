import { sendError, sendSuccess } from "../utils/response.js";

export async function getReport(request, response, next) {
  try {
    const scenarioId = typeof request.params.scenarioId === "string" ? request.params.scenarioId.trim() : "";
    if (!scenarioId) return sendError(response, 400, "VALIDATION_ERROR", "scenarioId is required.");

    const { data: scenario, error: scenarioError } = await request.supabaseClient
      .from("scenarios")
      .select("*")
      .eq("id", scenarioId)
      .maybeSingle();
    if (scenarioError) throw new Error(`Unable to load report scenario: ${scenarioError.message}`);
    if (!scenario) return sendError(response, 404, "NOT_FOUND", "Scenario not found.");

    const [{ data: farm, error: farmError }, { data: result, error: resultError }] = await Promise.all([
      request.supabaseClient.from("farms").select("*").eq("id", scenario.farm_id).maybeSingle(),
      request.supabaseClient
        .from("simulation_results")
        .select("result_json, model_version, assumptions_version, created_at")
        .eq("scenario_id", scenarioId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    if (farmError) throw new Error(`Unable to load report farm: ${farmError.message}`);
    if (resultError) throw new Error(`Unable to load report result: ${resultError.message}`);
    if (!result?.result_json) return sendError(response, 404, "RESULT_NOT_FOUND", "No saved simulation result exists for this scenario.");

    const output = result.result_json;
    sendSuccess(response, 200, {
      farm: { ...farm, area: farm.area_acres, location: farm.region },
      scenario: { ...scenario, id: scenario.id, name: scenario.name, crop: scenario.crop_code, area: scenario.area_acres },
      inputs: output.scenario ?? {},
      yield: output.yield ?? {},
      economics: output.economics ?? {},
      water: output.water ?? {},
      risk: output.risk ?? {},
      recommendations: [],
      resources: [],
      assumptions: { modelVersion: result.model_version, assumptionVersion: result.assumptions_version },
      whyExplanation: [],
      disclaimer: "Estimated values are model-based and are not guaranteed future results.",
    });
  } catch (error) {
    if (error.message === "Scenario not found.") return sendError(response, 404, "NOT_FOUND", error.message);
    next(error);
  }
}
