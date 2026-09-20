/**
 * Dashboard KPI Calculation Utilities - Member 4
 * Computes summary KPIs directly from scenario history dataset without backend writes.
 */

/**
 * Maps risk string or object to numerical score for average calculation.
 */
export function getRiskNumericalScore(risk) {
  if (typeof risk === "number") return risk;
  if (risk && typeof risk.score === "number") return risk.score;
  const level = (typeof risk === "string" ? risk : risk?.level || "medium").toLowerCase();
  switch (level) {
    case "low":
      return 25;
    case "medium":
      return 50;
    case "high":
      return 75;
    case "critical":
      return 95;
    default:
      return 50;
  }
}

/**
 * Categorizes a numeric risk score back into standard level.
 */
export function getRiskLevelFromScore(avgScore) {
  if (avgScore <= 35) return "Low";
  if (avgScore <= 65) return "Medium";
  if (avgScore <= 85) return "High";
  return "Critical";
}

/**
 * Derives all 5 mandatory KPIs from the scenario history list:
 * 1. Total saved scenarios
 * 2. Average profit across scenarios
 * 3. Average risk across scenarios
 * 4. Highest-profit scenario (name + value)
 * 5. Count of scenarios by risk level
 *
 * @param {Array} scenarios - Array of historical scenario objects
 * @returns {Object|null} Computed KPIs summary
 */
export function computeDashboardKpis(scenarios = []) {
  if (!scenarios || !Array.isArray(scenarios) || scenarios.length === 0) {
    return {
      totalScenarios: 0,
      averageProfit: 0,
      averageRiskScore: 0,
      averageRiskLevel: "None",
      highestProfitScenario: null,
      riskLevelCounts: {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0,
      },
    };
  }

  const count = scenarios.length;

  // 1. Total Scenarios
  const totalScenarios = count;

  // 2. Average Profit & 4. Highest Profit Scenario
  let totalProfit = 0;
  let highestProfitScenario = null;

  // 3. Average Risk & 5. Count by Risk Level
  let totalRiskScore = 0;
  const riskLevelCounts = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  scenarios.forEach((sc) => {
    // Profit
    const profitVal = typeof sc.profit === "number" ? sc.profit : parseFloat(sc.profit) || 0;
    totalProfit += profitVal;

    if (!highestProfitScenario || profitVal > highestProfitScenario.value) {
      highestProfitScenario = {
        id: sc.id,
        name: sc.name,
        value: profitVal,
        crop: sc.crop,
      };
    }

    // Risk
    const riskScore = getRiskNumericalScore(sc.risk);
    totalRiskScore += riskScore;

    const rawLevel = (typeof sc.risk === "string" ? sc.risk : sc.risk?.level || "medium").toLowerCase();
    if (riskLevelCounts[rawLevel] !== undefined) {
      riskLevelCounts[rawLevel] += 1;
    } else {
      riskLevelCounts.medium += 1;
    }
  });

  const averageProfit = Math.round(totalProfit / count);
  const averageRiskScore = Math.round(totalRiskScore / count);
  const averageRiskLevel = getRiskLevelFromScore(averageRiskScore);

  return {
    totalScenarios,
    averageProfit,
    averageRiskScore,
    averageRiskLevel,
    highestProfitScenario,
    riskLevelCounts,
  };
}
