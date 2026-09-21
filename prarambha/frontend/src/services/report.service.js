/**
 * Report Service - Member 4 (Frontend UX / Reporting)
 * Aggregates scenario outputs into a clean 12-section printable decision document.
 * Adheres strictly to Section 17 of Task_Distribution.md.
 *
 * Pattern: Real fetch to GET /api/reports/:scenarioId with robust mock fallback.
 */

import { formatCurrency, formatNumber, getRiskLevelInfo } from "./comparison.service.js";

const API_BASE_URL = "/api";

export const MOCK_REPORT_DATA = {
  farm: {
    name: "Shivneri Farm (Plot 1)",
    location: "Baramati, Pune",
    area: 4,
    unit: "Acres",
  },
  scenario: {
    id: "sc-001",
    name: "Baseline Precision Drip Plan",
    crop: "Wheat (HD-2967)",
    timestamp: "2026-03-15T10:30:00Z",
  },
  inputs: {
    crop: "Wheat (HD-2967)",
    areaAcres: 4,
    irrigation: "Drip Irrigation",
    sowingDate: "2026-10-15",
    weather: "Normal Monsoonal",
    waterAvailability: "100%",
  },
  yield: {
    value: 24.5,
    unit: "Quintals / Acre",
  },
  economics: {
    cost: 105000,
    revenue: 250000,
    profit: 145000,
    roi: 138.1,
  },
  water: {
    used: 3200,
    unit: "m³",
    waterProductivity: 0.0076,
  },
  risk: {
    score: 28,
    level: "low",
  },
  whyExplanation: [
    { factor: "Irrigation Technology (Drip)", impact: 42000, direction: "positive" },
    { factor: "Optimal Sowing Date", impact: 18000, direction: "positive" },
    { factor: "Market MSP Escalation", impact: -8000, direction: "negative" },
  ],
  recommendations: [
    {
      id: "rec-001",
      trigger: "Water Stress",
      condition: "Water availability is within optimal crop demand buffer.",
      impact: "Yield stabilized with zero moisture deficit penalty.",
      action: "Maintain scheduled 4-day drip intervals.",
      reason: "Moisture monitoring indicates adequate root zone hydration.",
      severity: "info",
    },
    {
      id: "rec-002",
      trigger: "Fertilizer Stock",
      condition: "Nitrogen top-dressing scheduled in 10 days.",
      impact: "Grain filling potential increased by 8%.",
      action: "Procure 150 kg urea before second irrigation.",
      reason: "Critical growth stage requires nitrogen availability.",
      severity: "warning",
    },
  ],
  resources: [
    {
      resourceType: "Budget",
      required: 105000,
      available: 140000,
      gap: 0,
      unit: "₹",
      status: "available",
      explanation: "Farm working capital is sufficient.",
    },
    {
      resourceType: "Water",
      required: 3200,
      available: 3500,
      gap: 0,
      unit: "m³",
      status: "available",
      explanation: "Farm pond and borewell cover required volume.",
    },
  ],
  assumptions: {
    modelVersion: "v2.1.0-deterministic",
    assumptionVersion: "ICAR-2025.04",
  },
  disclaimer: "Estimated values are model-based and are not guaranteed future results.",
};

/**
 * Fetch complete decision report for a scenario.
 * @param {string} scenarioId - Scenario ID to generate report for
 * @returns {Promise<Object>} Aggregated report document
 */
export async function getReport(scenarioId = "sc-001") {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return {
      ...MOCK_REPORT_DATA,
      scenario: {
        ...MOCK_REPORT_DATA.scenario,
        id: scenarioId,
      },
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`${API_BASE_URL}/reports/${scenarioId}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        return data;
      }
    }
    // Mock fallback with requested scenario id
    return {
      ...MOCK_REPORT_DATA,
      scenario: {
        ...MOCK_REPORT_DATA.scenario,
        id: scenarioId,
      },
    };
  } catch (_err) {
    clearTimeout(timeoutId);
    return {
      ...MOCK_REPORT_DATA,
      scenario: {
        ...MOCK_REPORT_DATA.scenario,
        id: scenarioId,
      },
    };
  }
}

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
        "Estimated values are model-based and are not guaranteed future results.",
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
    `Date Generated: ${new Date(model.metadata?.generatedAt || Date.now()).toLocaleString()}`,
    `Model Version:  ${model.metadata?.modelVersion || model.assumptions?.modelVersion}`,
    "",
    "1. FARM & SCENARIO PROFILE",
    `   Farm:             ${model.farm?.name} (${model.farm?.id || model.farm?.location || ""})`,
    `   Scenario:         ${model.scenario?.name}`,
    `   Crop & Land:      ${model.inputs?.crop} • ${model.inputs?.areaAcres || model.farm?.area} Acres`,
    `   Irrigation:       ${model.inputs?.irrigation}`,
    `   Weather Setting:  ${model.inputs?.weatherCondition || model.inputs?.weather}`,
    "",
    "2. FINANCIAL & YIELD PERFORMANCE",
    `   Estimated Cost:   ${formatCurrency(model.economics?.cost ?? 0)}`,
    `   Gross Revenue:    ${formatCurrency(model.economics?.revenue ?? 0)}`,
    `   Net Profit:       ${formatCurrency(model.economics?.profit ?? 0)}`,
    `   Projected ROI:    ${formatNumber(model.economics?.roi ?? 0, 1)}%`,
    "",
    "3. RESOURCE & WATER EFFICIENCY",
    `   Water Drawn:      ${formatNumber(model.water?.used || model.water?.drawnM3 || 0, 0)} m³`,
    `   Overall Risk:     ${model.risk?.score || model.risk?.overall || 0}/100 (${model.risk?.level?.toUpperCase()})`,
    "",
  ];

  if (model.whyExplanation && model.whyExplanation.length > 0) {
    lines.push("4. WHY DID THIS PLAN CHANGE? (ATTRIBUTION)");
    model.whyExplanation.forEach((f) => {
      lines.push(`   • ${f.factor}: ${formatCurrency(f.impact)} [${f.direction}]`);
    });
    lines.push("");
  }

  if (model.recommendations && model.recommendations.length > 0) {
    lines.push("5. PRIORITY ACTION RECOMMENDATIONS");
    model.recommendations.forEach((r, idx) => {
      lines.push(`   ${idx + 1}. [${r.trigger}] ${r.action}`);
      lines.push(`      Reason: ${r.reason}`);
    });
    lines.push("");
  }

  lines.push("6. TRANSPARENCY & GUIDANCE");
  lines.push(`   ${model.disclaimer || model.assumptions?.disclaimer}`);
  lines.push("============================================================");

  return lines.join("\n");
}
