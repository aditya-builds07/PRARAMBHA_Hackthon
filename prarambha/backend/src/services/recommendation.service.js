/**
 * PRARAMBHA 2.0 - Recommendation Service (Step 12)
 * Pure, deterministic, rule-based advisory engine.
 * 
 * ARCHITECTURAL BOUNDARY MANDATE:
 * The Recommendation Service operates strictly downstream of the Simulation Engine.
 * It consumes verified simulation outputs (water, yield, financial, risk, decision)
 * and translates them into actionable, traceable expert advisory recommendations.
 * 
 * CRITICAL RULE: This service MUST NOT recalculate yield, revenue, cost, profit, ROI,
 * water requirement, risk, or decision score. Recomputing these metrics would create
 * split-brain logic and break consistency between simulation outputs and recommendations.
 */

/**
 * Priority rank map for deterministic sorting.
 * High priority recommendations appear first to highlight urgent risks to farmers.
 */
const PRIORITY_RANK = {
  high: 1,
  medium: 2,
  low: 3
};

/**
 * Stable category sequence for secondary deterministic sorting.
 */
const CATEGORY_RANK = {
  water: 1,
  weather: 2,
  planting: 3,
  financial: 4,
  input_cost: 5,
  irrigation: 6,
  decision_profile: 7
};

/**
 * Generate actionable, traceable recommendations based on deterministic simulation outputs.
 * 
 * @param {Object} simulationResult - Output object from calculateSimulation()
 * @param {Object} [scenarioInput] - Optional raw scenario input (extracted from simulationResult if omitted)
 * @returns {Object} Structured recommendation object containing `{ recommendations: Array }`
 */
export function generateRecommendations(simulationResult, scenarioInput) {
  // Safe handling of null, undefined, or malformed simulation results
  if (!simulationResult || typeof simulationResult !== 'object') {
    return { recommendations: [] };
  }

  // Extract scenario inputs either from explicit param or embedded simulation output
  const scenario = scenarioInput || simulationResult.scenario || {};
  const crop = simulationResult.crop || {};
  const water = simulationResult.water || {};
  const yieldRes = simulationResult.yield || {};
  const economics = simulationResult.economics || {};
  const risk = simulationResult.risk || {};
  const decision = simulationResult.decision || {};
  const riskComponents = risk.components || {};

  const rawRecommendations = [];

  // =========================================================================
  // 1. WATER CATEGORY RULES
  // =========================================================================

  const waterAvail = scenario.waterAvailabilityPercent ?? water.waterAvailabilityPercent ?? 100;
  const waterFactor = water.waterFactor ?? 1.0;
  const waterProductivity = water.waterProductivityKgPerM3;

  // RULE_WATER_AVAILABILITY_CRITICAL: Water availability under 50%
  if (waterAvail < 50 || waterFactor < 0.5) {
    // Why threshold 50%: Crops suffer severe irreversible drought stress below 50% water supply.
    rawRecommendations.push({
      id: 'rec-rule-water-critical',
      ruleId: 'RULE_WATER_AVAILABILITY_CRITICAL',
      category: 'water',
      priority: 'high',
      title: 'Severe Water Deficit Detected',
      message: `Water availability is at ${waterAvail}%, causing a ${Math.round((1 - waterFactor) * 100)}% yield penalty.`,
      reason: 'Water availability falls below the critical 50% sustainability threshold for this crop.',
      metric: 'waterAvailabilityPercent',
      currentValue: waterAvail,
      threshold: 50,
      action: 'Consider shifting to drought-resilient crops (e.g. soybean/maize) or adopting micro-irrigation (drip/sprinkler).'
    });
  }
  // RULE_WATER_AVAILABILITY_MODERATE: Water availability between 50% and 79%
  else if (waterAvail < 80 || waterFactor < 0.8) {
    // Why threshold 80%: Optimal potential yield requires at least 80% water satisfaction.
    rawRecommendations.push({
      id: 'rec-rule-water-moderate',
      ruleId: 'RULE_WATER_AVAILABILITY_MODERATE',
      category: 'water',
      priority: 'medium',
      title: 'Moderate Water Deficit Advisory',
      message: `Water availability at ${waterAvail}% reduces crop potential yield by ${Math.round((1 - waterFactor) * 100)}%.`,
      reason: 'Water availability is below the optimal 80% baseline for maximum crop yield.',
      metric: 'waterAvailabilityPercent',
      currentValue: waterAvail,
      threshold: 80,
      action: 'Adopt soil mulching and scheduled deficit irrigation to minimize transpiration loss.'
    });
  }

  // RULE_WATER_PRODUCTIVITY_LOW: Low yield generated per cubic meter of water
  if (typeof waterProductivity === 'number' && waterProductivity > 0 && waterProductivity < 0.50) {
    // Why threshold 0.50 kg/m3: Standard agricultural benchmark for acceptable water use efficiency.
    rawRecommendations.push({
      id: 'rec-rule-water-productivity-low',
      ruleId: 'RULE_WATER_PRODUCTIVITY_LOW',
      category: 'water',
      priority: 'medium',
      title: 'Suboptimal Water Productivity',
      message: `Water productivity is ${waterProductivity.toFixed(2)} kg/m³, below the 0.50 kg/m³ efficiency benchmark.`,
      reason: 'Crop yield per cubic meter of water applied is lower than expected efficiency levels.',
      metric: 'waterProductivityKgPerM3',
      currentValue: Number(waterProductivity.toFixed(2)),
      threshold: 0.50,
      action: 'Upgrade field irrigation method from flood to drip or sprinkler systems.'
    });
  }

  // =========================================================================
  // 2. WEATHER CATEGORY RULES
  // =========================================================================

  const weather = scenario.weather || 'normal';
  const weatherRisk = riskComponents.weatherRisk ?? 30;

  // RULE_WEATHER_POOR: Severe weather risk conditions
  if (weather === 'poor' || weatherRisk >= 80) {
    // Why high priority: Weather shocks (drought/unseasonal rain) directly penalize yield by 35%.
    rawRecommendations.push({
      id: 'rec-rule-weather-poor',
      ruleId: 'RULE_WEATHER_POOR',
      category: 'weather',
      priority: 'high',
      title: 'High Adverse Weather Vulnerability',
      message: `Poor weather conditions elevate weather risk to ${weatherRisk} / 100 and reduce yield by 35%.`,
      reason: 'Unfavorable climate forecast creates high crop vulnerability.',
      metric: 'weather',
      currentValue: weather,
      threshold: 'normal',
      action: 'Procure crop insurance, adjust sowing dates, and apply anti-transpirant sprays.'
    });
  } else if (weather === 'normal' && (risk.overallRisk ?? 0) > 50) {
    // RULE_WEATHER_NORMAL_STRESS: Moderate weather risk compounding existing scenario stress
    rawRecommendations.push({
      id: 'rec-rule-weather-normal-stress',
      ruleId: 'RULE_WEATHER_NORMAL_STRESS',
      category: 'weather',
      priority: 'medium',
      title: 'Weather Vulnerability Under Scenario Stress',
      message: `Normal weather presents moderate risk (${weatherRisk} / 100) under current elevated scenario stress.`,
      reason: 'Weather factors compound existing water availability or planting delay risks.',
      metric: 'weatherRisk',
      currentValue: weatherRisk,
      threshold: 30,
      action: 'Track local agrometeorological advisories for sudden temperature fluctuations or rainfall events.'
    });
  }

  // =========================================================================
  // 3. PLANTING CATEGORY RULES
  // =========================================================================

  const plantingObj = scenario.planting || {};
  const delayDays = typeof plantingObj === 'object' ? (Number(plantingObj.delayDays) || 0) : 0;
  const plantingRisk = riskComponents.plantingRisk ?? 0;
  const plantingFactor = yieldRes.factors?.planting ?? 1.0;

  // RULE_PLANTING_DELAY_HIGH: Sowing delay of 15+ days
  if (delayDays >= 15 || plantingRisk >= 50) {
    // Why 15 days: Delays over 15 days significantly miss peak vegetative solar window.
    rawRecommendations.push({
      id: 'rec-rule-planting-delay-high',
      ruleId: 'RULE_PLANTING_DELAY_HIGH',
      category: 'planting',
      priority: 'high',
      title: 'Critical Planting Delay Warning',
      message: `Sowing delayed by ${delayDays} days incurs a ${Math.round((1 - plantingFactor) * 100)}% yield penalty.`,
      reason: 'Planting delay exceeds 15 days, missing optimal agronomic sowing windows.',
      metric: 'delayDays',
      currentValue: delayDays,
      threshold: 15,
      action: 'Use early-maturing short-duration seed varieties or direct seed techniques to shorten cycle.'
    });
  } else if (delayDays > 0) {
    // RULE_PLANTING_DELAY_MODERATE: Minor sowing delay (1-14 days)
    rawRecommendations.push({
      id: 'rec-rule-planting-delay-moderate',
      ruleId: 'RULE_PLANTING_DELAY_MODERATE',
      category: 'planting',
      priority: 'medium',
      title: 'Minor Planting Delay Advisory',
      message: `Sowing delayed by ${delayDays} day(s) introduces a minor yield penalty of ${Math.round((1 - plantingFactor) * 100)}%.`,
      reason: 'Sowing date is past optimal recommended date.',
      metric: 'delayDays',
      currentValue: delayDays,
      threshold: 0,
      action: 'Ensure thorough seed treatment and optimal basal fertilizer placement for quick establishment.'
    });
  }

  // =========================================================================
  // 4. FINANCIAL CATEGORY RULES
  // =========================================================================

  const profit = economics.profit ?? 0;
  const cost = economics.cost ?? economics.totalCost ?? 0;
  const revenue = economics.revenue ?? 0;
  const roi = economics.roi ?? 0;
  const financialRisk = riskComponents.financialRisk ?? 0;

  // RULE_FINANCIAL_NEGATIVE_PROFIT: Operating at financial loss
  if (profit < 0 || financialRisk === 100) {
    // Why high priority: Financial loss threatens farmer livelihood and solvency.
    rawRecommendations.push({
      id: 'rec-rule-financial-negative-profit',
      ruleId: 'RULE_FINANCIAL_NEGATIVE_PROFIT',
      category: 'financial',
      priority: 'high',
      title: 'Financial Loss Warning',
      message: `Projected scenario operates at a financial loss of ₹${Math.abs(Math.round(profit)).toLocaleString('en-IN')}.`,
      reason: `Total production cost (₹${Math.round(cost).toLocaleString('en-IN')}) exceeds gross market revenue (₹${Math.round(revenue).toLocaleString('en-IN')}).`,
      metric: 'profit',
      currentValue: profit,
      threshold: 0,
      action: 'Lower input cost multiplier, switch to higher-value crop, or improve water efficiency to achieve profitability.'
    });
  } else if (cost > 0 && roi < 15) {
    // RULE_FINANCIAL_LOW_ROI: Low profitability margin (ROI < 15%)
    rawRecommendations.push({
      id: 'rec-rule-financial-low-roi',
      ruleId: 'RULE_FINANCIAL_LOW_ROI',
      category: 'financial',
      priority: 'medium',
      title: 'Low Return on Investment (ROI)',
      message: `Projected ROI is ${roi.toFixed(1)}%, which is below the target benchmark of 15%.`,
      reason: 'Return per rupee invested is low relative to agricultural risk exposure.',
      metric: 'roi',
      currentValue: Number(roi.toFixed(1)),
      threshold: 15,
      action: 'Optimize input purchase costs and explore direct-to-market selling to improve margin.'
    });
  }

  // =========================================================================
  // 5. INPUT COST CATEGORY RULES
  // =========================================================================

  const inputCostMultiplier = scenario.inputCostMultiplier ?? 1.0;

  // RULE_INPUT_COST_ELEVATED: Elevated input cost multiplier (> 1.2)
  if (inputCostMultiplier > 1.2) {
    // Why threshold 1.2: Multipliers above 1.2x represent excessive overhead expenses.
    rawRecommendations.push({
      id: 'rec-rule-input-cost-elevated',
      ruleId: 'RULE_INPUT_COST_ELEVATED',
      category: 'input_cost',
      priority: 'medium',
      title: 'Elevated Input Expenditure',
      message: `Input cost multiplier is ${inputCostMultiplier}x baseline, driving total cost to ₹${Math.round(cost).toLocaleString('en-IN')}.`,
      reason: 'Production input multiplier significantly exceeds standard 1.0x baseline.',
      metric: 'inputCostMultiplier',
      currentValue: inputCostMultiplier,
      threshold: 1.2,
      action: 'Consider cooperative bulk purchasing for seeds/fertilizers or integrated pest management to curb expenses.'
    });
  }

  // =========================================================================
  // 6. IRRIGATION CATEGORY RULES
  // =========================================================================

  const irrigation = scenario.irrigation || 'flood';

  // RULE_IRRIGATION_FLOOD_HIGH_COST: Flood irrigation under water constraints
  if (irrigation === 'flood' && waterAvail < 80) {
    // Why medium priority: Flood irrigation wastes water via runoff and evaporation under restricted availability.
    rawRecommendations.push({
      id: 'rec-rule-irrigation-flood-constrained',
      ruleId: 'RULE_IRRIGATION_FLOOD_HIGH_COST',
      category: 'irrigation',
      priority: 'medium',
      title: 'Inefficient Irrigation Method',
      message: `Flood irrigation is used under restricted water availability (${waterAvail}%).`,
      reason: 'Flood irrigation suffers high evaporation losses when water resources are constrained.',
      metric: 'irrigation',
      currentValue: irrigation,
      threshold: 'sprinkler',
      action: 'Upgrade to sprinkler or drip irrigation to conserve water while maintaining output.'
    });
  }

  // =========================================================================
  // 7. DECISION PROFILE CATEGORY RULES
  // =========================================================================

  const profile = scenario.priorityProfile ?? scenario.profile ?? decision.priorityProfile ?? 'balanced';
  const overallRisk = risk.overallRisk ?? 0;

  // RULE_PROFILE_HIGH_RISK_MISMATCH: Max profit profile selected under high overall risk (> 60)
  if ((profile === 'max_profit' || profile === 'max-yield') && overallRisk > 60) {
    // Why high priority: Pursuing maximum profit under high risk exposes farmer to catastrophic loss.
    rawRecommendations.push({
      id: 'rec-rule-profile-mismatch',
      ruleId: 'RULE_PROFILE_HIGH_RISK_MISMATCH',
      category: 'decision_profile',
      priority: 'high',
      title: 'Risk-Profit Strategy Mismatch',
      message: `'${profile}' profile is selected while overall scenario risk is high (${Math.round(overallRisk)} / 100).`,
      reason: 'Aggressive profit targeting under high environmental/financial risk increases vulnerability.',
      metric: 'overallRisk',
      currentValue: Math.round(overallRisk),
      threshold: 60,
      action: 'Switch priority profile to "balanced" or "play_safe" to protect capital reserves.'
    });
  } else if ((profile === 'play_safe' || profile === 'safety-first') && overallRisk < 30 && roi > 30) {
    // RULE_PROFILE_PLAY_SAFE_OPPORTUNITY: Play safe profile under very low risk and high ROI
    rawRecommendations.push({
      id: 'rec-rule-profile-play-safe-opportunity',
      ruleId: 'RULE_PROFILE_PLAY_SAFE_OPPORTUNITY',
      category: 'decision_profile',
      priority: 'low',
      title: 'Conservative Strategy Opportunity',
      message: `'${profile}' profile selected under low risk (${Math.round(overallRisk)} / 100) and strong ROI (${roi.toFixed(1)}%).`,
      reason: 'Highly favorable risk and return environment allows for more growth-oriented management.',
      metric: 'priorityProfile',
      currentValue: profile,
      threshold: 'balanced',
      action: 'Consider shifting to "balanced" or "max_profit" profile to optimize return potential.'
    });
  }

  // =========================================================================
  // DETERMINISTIC DEDUPLICATION & SORTING
  // =========================================================================

  // Deduplicate recommendations by ruleId to ensure duplicate rules are suppressed
  const seenRuleIds = new Set();
  const uniqueRecommendations = [];

  for (const rec of rawRecommendations) {
    if (!seenRuleIds.has(rec.ruleId)) {
      seenRuleIds.add(rec.ruleId);
      uniqueRecommendations.push(rec);
    }
  }

  // Sort deterministically: First by priority rank (high -> medium -> low), then by category rank, then by ruleId
  uniqueRecommendations.sort((a, b) => {
    const priorityDiff = (PRIORITY_RANK[a.priority] || 99) - (PRIORITY_RANK[b.priority] || 99);
    if (priorityDiff !== 0) return priorityDiff;

    const categoryDiff = (CATEGORY_RANK[a.category] || 99) - (CATEGORY_RANK[b.category] || 99);
    if (categoryDiff !== 0) return categoryDiff;

    return a.ruleId.localeCompare(b.ruleId);
  });

  return {
    recommendations: uniqueRecommendations
  };
}
