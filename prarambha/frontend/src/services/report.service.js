/**
 * Report Service - Member 4
 * Aggregates scenario outputs into a clean 12-section printable decision document.
 * Adheres strictly to Section 17 of Task_Distribution.md.
 */

import { formatCurrency, formatNumber, getRiskLevelInfo } from "./comparison.service.js";

/**
 * Compile a structured report model combining all domain aspects
 */
export function generateReportModel({
  scenario,
  farm = null,
  whyExplanation = null,
  recommendations = [],
  resources = null,
  assumptions = null,
}) {
  if (!scenario) return null;

  const results = scenario.results || {};
  const inputs = scenario.inputs || {};
  const riskInfo = getRiskLevelInfo(results.risk?.level, results.risk?.overall ?? 0);

  return {
    metadata: {
      generatedAt: new Date().toISOString(),
      reportTitle: `Decision Support Report — ${scenario.name}`,
      modelVersion: scenario.modelVersion || "v2.0-deterministic",
    },
    // 1. Farm
    farm: {
      id: scenario.farmId || farm?.id || "farm-001",
      name: scenario.farmName || farm?.name || "Shivneri Farm (Plot 1)",
      areaTotalAcres: farm?.areaAcres || inputs.areaAcres || 4,
    },
    // 2. Scenario
    scenario: {
      id: scenario.id,
      name: scenario.name,
      tagline: scenario.tagline || "",
      createdAt: scenario.createdAt,
      priorityProfile: inputs.priorityProfile || "balanced",
    },
    // 3. Inputs
    inputs: {
      crop: inputs.crop || "Wheat",
      areaAcres: inputs.areaAcres || 4,
      sowingDate: inputs.sowingDate || "2026-10-15",
      irrigation: (inputs.irrigation || "flood").toUpperCase(),
      weatherCondition: inputs.weather || "normal",
      waterAvailabilityPercent: inputs.waterAvailabilityPercent ?? 100,
      inputCostMultiplier: inputs.inputCostMultiplier ?? 1.0,
    },
    // 4. Yield
    yield: {
      perAcre: results.yield?.perAcre ?? 0,
      total: results.yield?.total ?? 0,
      range: `${results.yield?.low ?? 0} - ${results.yield?.high ?? 0}`,
      unit: results.yield?.unit || "Quintals",
    },
    // 5. Economics
    economics: {
      cost: results.economics?.cost ?? 0,
      revenue: results.economics?.revenue ?? 0,
      profit: results.economics?.profit ?? 0,
      roi: results.economics?.roi ?? 0,
    },
    // 6. Water
    water: {
      drawnM3: results.water?.drawnM3 ?? 0,
      productivity: results.water?.productivity ?? 0,
    },
    // 7. Risk
    risk: {
      overall: results.risk?.overall ?? 0,
      level: results.risk?.level || "low",
      levelLabel: riskInfo.label,
      components: results.risk?.components || {},
    },
    // 8. Decision Score
    decisionScore: results.decisionScore ?? 0,
    // 9. Why / Attribution
    why: whyExplanation
      ? {
          baselineName: whyExplanation.referenceScenarioName || "Baseline Plan",
          totalChange: whyExplanation.totalChange,
          factors: whyExplanation.factors || [],
          isReconciled: whyExplanation.isReconciled,
        }
      : null,
    // 10. Recommendations
    recommendations: recommendations.slice(0, 3),
    // 11. Resources Readiness
    resources: resources
      ? {
          overallStatus: resources.overallStatus,
          budget: resources.budget,
          water: resources.water,
          seed: resources.seed,
          fertilizer: resources.fertilizer,
        }
      : null,
    // 12. Assumptions & Disclaimer
    assumptions: {
      modelVersion: assumptions?.modelVersion || "v2.0-deterministic",
      assumptionVersion: assumptions?.assumptionVersion || "2026.09-kharif-rabi-1",
      disclaimer:
        assumptions?.disclaimer ||
        "Estimated values are model-based approximations for agricultural planning and trade-off exploration. They do not constitute guaranteed agronomic or financial outcomes.",
    },
  };
}

/**
 * Trigger native browser print dialog
 */
export function triggerPrint() {
  if (typeof window !== "undefined" && typeof window.print === "function") {
    window.print();
  }
}

/**
 * Export report as a formatted plain-text document
 */
export function generatePlainTextReport(model) {
  if (!model) return "";

  const lines = [
    "============================================================",
    "KRISHIMITRA — AGRI SCENARIO & DECISION SIMULATOR",
    "EXECUTIVE DECISION SUMMARY REPORT",
    "============================================================",
    `Date Generated: ${new Date(model.metadata.generatedAt).toLocaleString()}`,
    `Model Version:  ${model.metadata.modelVersion}`,
    "",
    "1. FARM & SCENARIO PROFILE",
    `   Farm:             ${model.farm.name} (${model.farm.id})`,
    `   Scenario:         ${model.scenario.name}`,
    `   Crop & Land:      ${model.inputs.crop} • ${model.inputs.areaAcres} Acres`,
    `   Irrigation:       ${model.inputs.irrigation}`,
    `   Weather Setting:  ${model.inputs.weatherCondition}`,
    "",
    "2. FINANCIAL & YIELD PERFORMANCE",
    `   Total Yield:      ${formatNumber(model.yield.total, 1)} ${model.yield.unit} (Range: ${model.yield.range})`,
    `   Yield Per Acre:   ${formatNumber(model.yield.perAcre, 1)} ${model.yield.unit}/Acre`,
    `   Estimated Cost:   ${formatCurrency(model.economics.cost)}`,
    `   Gross Revenue:    ${formatCurrency(model.economics.revenue)}`,
    `   Net Profit:       ${formatCurrency(model.economics.profit)}`,
    `   Projected ROI:    ${formatNumber(model.economics.roi, 1)}%`,
    "",
    "3. RESOURCE & WATER EFFICIENCY",
    `   Water Drawn:      ${formatNumber(model.water.drawnM3, 0)} m³`,
    `   Water Prod:       ${formatNumber(model.water.productivity, 1)} Qtl/m³`,
    `   Overall Risk:     ${model.risk.overall}/100 (${model.risk.levelLabel})`,
    `   Decision Score:   ${model.decisionScore}/100`,
    "",
  ];

  if (model.why && model.why.factors.length > 0) {
    lines.push("4. WHY DID THIS PLAN CHANGE? (ATTRIBUTION)");
    lines.push(`   Compared Against: ${model.why.baselineName}`);
    lines.push(`   Net Impact:       ${formatCurrency(model.why.totalChange?.value ?? 0)}`);
    model.why.factors.forEach((f) => {
      lines.push(`   • ${f.factor}: ${formatCurrency(f.contribution)} [${f.controllability}]`);
      lines.push(`     "${f.explanation}"`);
    });
    lines.push("");
  }

  if (model.recommendations.length > 0) {
    lines.push("5. PRIORITY ACTION RECOMMENDATIONS");
    model.recommendations.forEach((r, idx) => {
      lines.push(`   ${idx + 1}. [${r.trigger}] ${r.action}`);
      lines.push(`      Reason: ${r.reason}`);
    });
    lines.push("");
  }

  lines.push("6. TRANSPARENCY & GUIDANCE");
  lines.push(`   ${model.assumptions.disclaimer}`);
  lines.push("============================================================");

  return lines.join("\n");
}
