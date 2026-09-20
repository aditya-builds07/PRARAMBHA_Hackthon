function requiredText(value, field) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${field} is required.`);
  return value.trim();
}

function finiteNumber(value, field, minimum = -Number.MAX_SAFE_INTEGER, maximum = Number.MAX_SAFE_INTEGER) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < minimum || number > maximum) {
    throw new Error(`${field} must be between ${minimum} and ${maximum}.`);
  }
  return number;
}

function riskLevel(value) {
  if (!["low", "medium", "high"].includes(value)) throw new Error("risk.level is invalid.");
  return value;
}

export function validateSimulationResultInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("A simulation result object is required.");
  }

  const yieldData = input.yield ?? {};
  const economics = input.economics ?? {};
  const water = input.water ?? {};
  const risk = input.risk ?? {};
  const components = risk.components ?? {};

  const yieldLow = finiteNumber(yieldData.low, "yield.low", 0);
  const yieldHigh = finiteNumber(yieldData.high, "yield.high", yieldLow);

  return {
    scenario_id: requiredText(input.scenarioId, "scenarioId"),
    model_version: requiredText(input.modelVersion, "modelVersion"),
    assumptions_version: requiredText(input.assumptionsVersion, "assumptionsVersion"),
    estimated: input.estimated !== false,
    yield_per_acre_q: finiteNumber(yieldData.perAcre, "yield.perAcre", 0),
    yield_total_q: finiteNumber(yieldData.total, "yield.total", 0),
    yield_low_q: yieldLow,
    yield_high_q: yieldHigh,
    cost_inr: finiteNumber(economics.cost, "economics.cost", 0),
    revenue_inr: finiteNumber(economics.revenue, "economics.revenue", 0),
    profit_inr: finiteNumber(economics.profit, "economics.profit"),
    roi_percent: finiteNumber(economics.roi, "economics.roi"),
    water_drawn_m3: finiteNumber(water.drawnM3, "water.drawnM3", 0),
    water_productivity_kg_m3: finiteNumber(water.productivity, "water.productivity", 0),
    water_risk: finiteNumber(components.water, "risk.components.water", 0, 100),
    weather_risk: finiteNumber(components.weather, "risk.components.weather", 0, 100),
    planting_risk: finiteNumber(components.planting, "risk.components.planting", 0, 100),
    financial_risk: finiteNumber(components.financial, "risk.components.financial", 0, 100),
    overall_risk: finiteNumber(risk.overall, "risk.overall", 0, 100),
    risk_level: riskLevel(risk.level),
    decision_score: finiteNumber(input.decisionScore, "decisionScore", 0, 100),
    result_json: input,
  };
}
