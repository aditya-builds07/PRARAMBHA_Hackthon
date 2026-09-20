import { getSupabaseClient } from "../adapters/db/supabase.client.js";

const METRICS = [
  ["profit", "profit_inr"],
  ["cost", "cost_inr"],
  ["revenue", "revenue_inr"],
  ["yield", "yield_total_q"],
  ["waterDrawn", "water_drawn_m3"],
  ["waterProductivity", "water_productivity_kg_m3"],
  ["risk", "overall_risk"],
  ["decisionScore", "decision_score"],
];

function latestResultsByScenario(results) {
  return new Map(results.reduce((latest, result) => {
    if (!latest.some((item) => item.scenario_id === result.scenario_id)) latest.push(result);
    return latest;
  }, []).map((result) => [result.scenario_id, result]));
}

export async function compareScenarios(farmId, scenarioIds) {
  const supabase = getSupabaseClient();
  let scenariosQuery = supabase
    .from("scenarios")
    .select("id, name, is_baseline, crop_code, created_at")
    .eq("farm_id", farmId)
    .order("created_at", { ascending: true });

  if (scenarioIds.length > 0) scenariosQuery = scenariosQuery.in("id", scenarioIds);

  const { data: scenarios, error: scenariosError } = await scenariosQuery;
  if (scenariosError) throw new Error(`Unable to load scenarios for comparison: ${scenariosError.message}`);
  if (scenarios.length < 2 || scenarios.length > 4) {
    throw new Error("Comparison requires between 2 and 4 scenarios.");
  }

  const ids = scenarios.map((scenario) => scenario.id);
  const { data: results, error: resultsError } = await supabase
    .from("simulation_results")
    .select("*")
    .in("scenario_id", ids)
    .order("created_at", { ascending: false });

  if (resultsError) throw new Error(`Unable to load simulation results: ${resultsError.message}`);

  const latest = latestResultsByScenario(results);
  const missingResult = scenarios.find((scenario) => !latest.has(scenario.id));
  if (missingResult) throw new Error(`Scenario '${missingResult.name}' has no saved simulation result.`);

  const compared = scenarios.map((scenario) => ({
    id: scenario.id,
    name: scenario.name,
    cropCode: scenario.crop_code,
    isBaseline: scenario.is_baseline,
    result: latest.get(scenario.id),
  }));

  return {
    scenarios: compared,
    differences: METRICS.map(([metric, column]) => ({
      metric,
      values: Object.fromEntries(compared.map((scenario) => [scenario.id, Number(scenario.result[column])])),
    })),
    baselineScenarioId: compared.find((scenario) => scenario.isBaseline)?.id ?? null,
  };
}
