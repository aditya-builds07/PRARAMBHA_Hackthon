/**
 * Service for scenario comparison, trade-off analysis, and metrics formatting.
 * Implements the ComparisonResult contract defined in Task_Distribution.md.
 */

export const METRIC_DEFINITIONS = [
  { key: "yieldTotal", label: "Total Yield", unit: "Quintals", higherIsBetter: true },
  { key: "yieldPerAcre", label: "Yield / Acre", unit: "Qtl/Acre", higherIsBetter: true },
  { key: "cost", label: "Production Cost", unit: "₹", higherIsBetter: false },
  { key: "revenue", label: "Gross Revenue", unit: "₹", higherIsBetter: true },
  { key: "profit", label: "Net Profit", unit: "₹", higherIsBetter: true },
  { key: "roi", label: "Return on Investment (ROI)", unit: "%", higherIsBetter: true },
  { key: "waterDrawn", label: "Water Drawn", unit: "m³", higherIsBetter: false },
  { key: "waterProductivity", label: "Water Productivity", unit: "Qtl/m³", higherIsBetter: true },
  { key: "riskOverall", label: "Overall Risk Score", unit: "/100", higherIsBetter: false },
  { key: "decisionScore", label: "Decision Score", unit: "/100", higherIsBetter: true },
];

/**
 * Format Indian Rupee currency standard
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format numbers with custom decimals
 */
export function formatNumber(val, decimals = 1) {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return Number(val).toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Extract flat metric values for a scenario
 */
export function extractScenarioMetrics(scenario) {
  const r = scenario.results || {};
  return {
    yieldTotal: r.yield?.total ?? 0,
    yieldPerAcre: r.yield?.perAcre ?? 0,
    cost: r.economics?.cost ?? 0,
    revenue: r.economics?.revenue ?? 0,
    profit: r.economics?.profit ?? 0,
    roi: r.economics?.roi ?? 0,
    waterDrawn: r.water?.drawnM3 ?? 0,
    waterProductivity: r.water?.productivity ?? 0,
    riskOverall: r.risk?.overall ?? 0,
    decisionScore: r.decisionScore ?? 0,
  };
}

/**
 * Compare 2 to 4 scenarios and calculate differences against a baseline
 * Neutral comparison: no scenario is labeled as universally "best".
 */
export function compareScenarios(scenarios = [], baselineScenarioId = null) {
  if (!scenarios || scenarios.length === 0) {
    return {
      scenarios: [],
      differences: [],
      tradeoffs: {},
      baselineId: null,
    };
  }

  const baseline = scenarios.find((s) => s.id === baselineScenarioId) || scenarios[0];
  const baselineMetrics = extractScenarioMetrics(baseline);

  const differences = METRIC_DEFINITIONS.map((def) => {
    const rowValues = {};
    const rowDeltas = {};

    scenarios.forEach((s) => {
      const metrics = extractScenarioMetrics(s);
      const val = metrics[def.key];
      rowValues[s.id] = val;
      rowDeltas[s.id] = {
        diff: val - baselineMetrics[def.key],
        pct: baselineMetrics[def.key] !== 0
          ? ((val - baselineMetrics[def.key]) / baselineMetrics[def.key]) * 100
          : 0,
      };
    });

    return {
      metricKey: def.key,
      label: def.label,
      unit: def.unit,
      higherIsBetter: def.higherIsBetter,
      values: rowValues,
      deltas: rowDeltas,
    };
  });

  // Calculate distinct trade-off highlights per scenario (Neutral labels)
  const tradeoffs = {};
  scenarios.forEach((s) => {
    const m = extractScenarioMetrics(s);
    const highlights = [];

    // Profit check
    const maxProfit = Math.max(...scenarios.map((sc) => extractScenarioMetrics(sc).profit));
    if (m.profit === maxProfit && scenarios.length > 1) {
      highlights.push({ label: "Highest Profit", type: "positive", badge: "profit" });
    }

    // Water check
    const minWater = Math.min(...scenarios.map((sc) => extractScenarioMetrics(sc).waterDrawn));
    if (m.waterDrawn === minWater && scenarios.length > 1) {
      highlights.push({ label: "Lowest Water Use", type: "accent", badge: "water" });
    }

    // Risk check
    const minRisk = Math.min(...scenarios.map((sc) => extractScenarioMetrics(sc).riskOverall));
    if (m.riskOverall === minRisk && scenarios.length > 1) {
      highlights.push({ label: "Lowest Risk", type: "safe", badge: "risk" });
    }

    // Cost check
    const minCost = Math.min(...scenarios.map((sc) => extractScenarioMetrics(sc).cost));
    if (m.cost === minCost && scenarios.length > 1) {
      highlights.push({ label: "Lowest Input Cost", type: "info", badge: "cost" });
    }

    tradeoffs[s.id] = highlights;
  });

  return {
    scenarios,
    baselineId: baseline.id,
    baseline,
    differences,
    tradeoffs,
  };
}

/**
 * Get risk badge styling & label
 */
export function getRiskLevelInfo(level, score) {
  if (level === "low" || score <= 33) {
    return {
      label: "LOW RISK",
      scoreText: `${score} / 100`,
      colorClass: "text-emerald-900 bg-emerald-50 border-emerald-300",
      borderClass: "border-emerald-600",
      indicatorColor: "#047857",
    };
  } else if (level === "medium" || score <= 66) {
    return {
      label: "MEDIUM RISK",
      scoreText: `${score} / 100`,
      colorClass: "text-amber-950 bg-amber-50 border-amber-300",
      borderClass: "border-amber-600",
      indicatorColor: "#b45309",
    };
  } else {
    return {
      label: "HIGH RISK",
      scoreText: `${score} / 100`,
      colorClass: "text-rose-950 bg-rose-50 border-rose-300",
      borderClass: "border-rose-600",
      indicatorColor: "#be123c",
    };
  }
}

/**
 * Group factors into controllable, external, and unclassified categories
 */
export function groupFactorsByControllability(factors = []) {
  const result = {
    controllable: [],
    external: [],
    unclassified: [],
  };

  if (!Array.isArray(factors)) return result;

  for (const factor of factors) {
    if (factor.controllability === "controllable") {
      result.controllable.push(factor);
    } else if (factor.controllability === "external") {
      result.external.push(factor);
    } else {
      result.unclassified.push(factor);
    }
  }

  return result;
}

/**
 * Calculate secondary metric deltas between target and reference scenarios
 */
export function calculateSecondaryDeltas(targetScenario, referenceScenario) {
  if (!targetScenario || !referenceScenario) return null;

  const targetM = extractScenarioMetrics(targetScenario);
  const refM = extractScenarioMetrics(referenceScenario);

  return {
    profit: {
      diff: targetM.profit - refM.profit,
      pct: refM.profit !== 0 ? ((targetM.profit - refM.profit) / refM.profit) * 100 : 0,
      unit: "₹",
    },
    yieldTotal: {
      diff: targetM.yieldTotal - refM.yieldTotal,
      pct: refM.yieldTotal !== 0 ? ((targetM.yieldTotal - refM.yieldTotal) / refM.yieldTotal) * 100 : 0,
      unit: "Quintals",
    },
    yieldPerAcre: {
      diff: targetM.yieldPerAcre - refM.yieldPerAcre,
      pct: refM.yieldPerAcre !== 0 ? ((targetM.yieldPerAcre - refM.yieldPerAcre) / refM.yieldPerAcre) * 100 : 0,
      unit: "Qtl/Acre",
    },
    waterDrawn: {
      diff: targetM.waterDrawn - refM.waterDrawn,
      pct: refM.waterDrawn !== 0 ? ((targetM.waterDrawn - refM.waterDrawn) / refM.waterDrawn) * 100 : 0,
      unit: "m³",
    },
    riskOverall: {
      diff: targetM.riskOverall - refM.riskOverall,
      pct: refM.riskOverall !== 0 ? ((targetM.riskOverall - refM.riskOverall) / refM.riskOverall) * 100 : 0,
      unit: "pts",
    },
    decisionScore: {
      diff: targetM.decisionScore - refM.decisionScore,
      pct: refM.decisionScore !== 0 ? ((targetM.decisionScore - refM.decisionScore) / refM.decisionScore) * 100 : 0,
      unit: "pts",
    },
  };
}

/**
 * Retrieve and validate WhyExplanation attribution data for two scenarios
 */
export function getWhyExplanation(targetScenarioId, referenceScenarioId, explanationsMap = {}) {
  if (!targetScenarioId || !referenceScenarioId) return null;

  // Identity comparison (same scenario compared to itself)
  if (targetScenarioId === referenceScenarioId) {
    return {
      referenceScenarioId,
      targetScenarioId,
      totalChange: { metric: "Profit", value: 0 },
      factors: [],
      isIdentical: true,
    };
  }

  const key = `${targetScenarioId}_vs_${referenceScenarioId}`;
  const explanation = explanationsMap[key];

  if (!explanation) return null;

  // Validate attribution reconciliation: sum(contributions) === totalChange.value
  const factorSum = (explanation.factors || []).reduce(
    (acc, f) => acc + (typeof f.contribution === "number" ? f.contribution : 0),
    0
  );

  return {
    ...explanation,
    factorSum,
    isReconciled: factorSum === explanation.totalChange?.value,
  };
}

