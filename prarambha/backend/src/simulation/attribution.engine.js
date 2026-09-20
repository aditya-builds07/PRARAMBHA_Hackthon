/**
 * PRARAMBHA 2.0 - Attribution Engine
 * Pure deterministic baseline vs alternative comparison and traceable change explanation.
 */

/**
 * Approved Attribution Categories:
 * - water
 * - weather
 * - planting
 * - financial
 * - irrigation
 * - decision
 */
export const ATTRIBUTION_CATEGORIES = [
  'water',
  'weather',
  'planting',
  'financial',
  'irrigation',
  'decision'
];

/**
 * Standard metric unit mapping for clear structured reporting.
 */
export const METRIC_UNITS = {
  perAcre: 'q/acre',
  yieldPerAcre: 'q/acre',
  totalYield: 'quintal',
  total: 'quintal',
  low: 'quintal',
  high: 'quintal',
  requiredWaterM3: 'm³',
  waterDrawnM3: 'm³',
  waterProductivityKgPerM3: 'kg/m³',
  baseCost: 'INR',
  irrigationCost: 'INR',
  totalCost: 'INR',
  cost: 'INR',
  revenue: 'INR',
  profit: 'INR',
  roi: '%',
  waterRisk: 'score',
  weatherRisk: 'score',
  plantingRisk: 'score',
  financialRisk: 'score',
  overallRisk: 'score',
  yieldIndex: 'score',
  profitIndex: 'score',
  safetyIndex: 'score',
  decisionScore: 'score'
};

/**
 * Standard scenario input unit mapping.
 */
export const INPUT_UNITS = {
  waterAvailabilityPercent: '%',
  availableWaterM3: 'm³',
  areaAcres: 'acres',
  plantingDelayDays: 'days',
  'planting.delayDays': 'days',
  inputCostMultiplier: 'x'
};

/**
 * Determine change direction from delta or categorical difference.
 * 
 * @param {number|boolean|null} delta
 * @param {boolean} [isNumeric=true]
 * @returns {'increase'|'decrease'|'unchanged'|'changed'}
 */
export function getChangeDirection(delta, isNumeric = true) {
  if (!isNumeric || delta === null || delta === undefined) {
    return delta ? 'changed' : 'unchanged';
  }
  const num = Number(delta);
  if (isNaN(num)) return 'unchanged';
  if (Math.abs(num) < 1e-9) return 'unchanged';
  return num > 0 ? 'increase' : 'decrease';
}

/**
 * Extract scenario and result objects cleanly whether passed nested or flat.
 * 
 * @param {Object} data 
 * @returns {{ scenario: Object, result: Object }}
 */
function extractScenarioAndResult(data) {
  if (!data || typeof data !== 'object') {
    return { scenario: {}, result: {} };
  }

  const scenario = data.scenario ?? data.input ?? data;
  const result = data.result ?? data.output ?? data;

  return { scenario, result };
}

/**
 * Safely extract a scenario input field value.
 * 
 * @param {Object} scenario 
 * @param {string} fieldPath 
 * @returns {any}
 */
function getScenarioValue(scenario, fieldPath) {
  if (!scenario || typeof scenario !== 'object') return undefined;

  if (fieldPath === 'planting.type') {
    if (typeof scenario.planting === 'object' && scenario.planting !== null) {
      return scenario.planting.type;
    }
    return scenario['planting.type'] ?? scenario.plantingType;
  }

  if (fieldPath === 'planting.delayDays') {
    if (typeof scenario.planting === 'object' && scenario.planting !== null) {
      return scenario.planting.delayDays;
    }
    if (typeof scenario.planting === 'number') {
      return scenario.planting;
    }
    return scenario['planting.delayDays'] ?? scenario.delayDays;
  }

  if (fieldPath === 'areaAcres') {
    return scenario.areaAcres ?? scenario.area;
  }

  if (fieldPath === 'priorityProfile') {
    return scenario.priorityProfile ?? scenario.profile;
  }

  return scenario[fieldPath];
}

/**
 * Safely extract a result metric value.
 * 
 * @param {Object} result 
 * @param {string} metricName 
 * @returns {any}
 */
function getResultMetricValue(result, metricName) {
  if (!result || typeof result !== 'object') return undefined;

  switch (metricName) {
    case 'perAcre':
    case 'yieldPerAcre':
      return result.perAcre ?? result.yieldPerAcre ?? result.yield?.perAcre;
    case 'totalYield':
    case 'total':
      return result.totalYield ?? result.total ?? result.yield?.total ?? result.yield?.totalYield;
    case 'low':
      return result.low ?? result.yieldLow ?? result.yield?.low;
    case 'high':
      return result.high ?? result.yieldHigh ?? result.yield?.high;
    case 'weatherFactor':
      return result.weatherFactor ?? result.factors?.weather ?? result.yield?.factors?.weather ?? result.yield?.weatherFactor;
    case 'plantingFactor':
      return result.plantingFactor ?? result.factors?.planting ?? result.yield?.factors?.planting ?? result.yield?.plantingFactor;

    case 'requiredWaterM3':
      return result.requiredWaterM3 ?? result.water?.requiredWaterM3;
    case 'waterDrawnM3':
      return result.waterDrawnM3 ?? result.water?.waterDrawnM3;
    case 'waterProductivityKgPerM3': {
      const direct = result.waterProductivityKgPerM3 ?? result.waterProductivity ?? result.water?.waterProductivityKgPerM3;
      if (direct !== undefined && direct !== null) return direct;
      
      const totalYieldQ = result.totalYield ?? result.total ?? result.yield?.total;
      const waterDrawn = result.waterDrawnM3 ?? result.water?.waterDrawnM3;
      if (totalYieldQ !== undefined && totalYieldQ !== null && waterDrawn) {
        const totalKg = Number(totalYieldQ) * 100;
        return waterDrawn > 0 ? totalKg / waterDrawn : 0;
      }
      return null;
    }
    case 'waterFactor':
      return result.waterFactor ?? result.factors?.water ?? result.water?.waterFactor ?? result.yield?.waterFactor;

    case 'baseCost':
      return result.baseCost ?? result.breakdown?.baseCost ?? result.financial?.breakdown?.baseCost ?? result.economics?.breakdown?.baseCost;
    case 'irrigationCost':
      return result.irrigationCost ?? result.breakdown?.irrigationCost ?? result.financial?.breakdown?.irrigationCost ?? result.economics?.breakdown?.irrigationCost;
    case 'totalCost':
    case 'cost':
      return result.totalCost ?? result.cost ?? result.financial?.cost ?? result.economics?.cost;
    case 'revenue':
      return result.revenue ?? result.financial?.revenue ?? result.economics?.revenue;
    case 'profit':
      return result.profit ?? result.financial?.profit ?? result.economics?.profit;
    case 'roi':
      return result.roi ?? result.financial?.roi ?? result.economics?.roi;

    case 'waterRisk':
      return result.waterRisk ?? result.components?.waterRisk ?? result.risk?.components?.waterRisk;
    case 'weatherRisk':
      return result.weatherRisk ?? result.components?.weatherRisk ?? result.risk?.components?.weatherRisk;
    case 'plantingRisk':
      return result.plantingRisk ?? result.components?.plantingRisk ?? result.risk?.components?.plantingRisk;
    case 'financialRisk':
      return result.financialRisk ?? result.components?.financialRisk ?? result.risk?.components?.financialRisk;
    case 'overallRisk':
      return result.overallRisk ?? result.riskScore ?? result.risk?.overallRisk;
    case 'riskLevel':
      return result.riskLevel ?? result.risk?.riskLevel;

    case 'yieldIndex':
      return result.yieldIndex ?? result.indices?.yield ?? result.decision?.indices?.yield;
    case 'profitIndex':
      return result.profitIndex ?? result.indices?.profit ?? result.decision?.indices?.profit;
    case 'safetyIndex':
      return result.safetyIndex ?? result.indices?.safety ?? result.decision?.indices?.safety;
    case 'decisionScore':
      return result.decisionScore ?? result.decision?.decisionScore;

    default:
      return result[metricName];
  }
}

/**
 * Compare scenario input variables between baseline and alternative.
 * 
 * @param {Object} baselineScenario 
 * @param {Object} alternativeScenario 
 * @returns {Array<Object>} List of changed scenario input objects
 */
export function compareInputs(baselineScenario, alternativeScenario) {
  const fields = [
    'crop',
    'areaAcres',
    'sowingDate',
    'waterAvailabilityPercent',
    'availableWaterM3',
    'weather',
    'planting.type',
    'planting.delayDays',
    'inputCostMultiplier',
    'irrigation',
    'priorityProfile'
  ];

  const changedInputs = [];

  for (const field of fields) {
    const bVal = getScenarioValue(baselineScenario, field);
    const aVal = getScenarioValue(alternativeScenario, field);

    if (bVal === undefined && aVal === undefined) continue;
    if (bVal === null && aVal === null) continue;

    const isNumeric = typeof bVal === 'number' && typeof aVal === 'number';

    if (isNumeric) {
      if (isNaN(bVal) || isNaN(aVal) || !isFinite(bVal) || !isFinite(aVal)) {
        continue;
      }
      const delta = aVal - bVal;
      const direction = getChangeDirection(delta, true);
      if (direction !== 'unchanged') {
        changedInputs.push({
          field,
          baseline: bVal,
          alternative: aVal,
          delta,
          direction,
          unit: INPUT_UNITS[field] ?? null
        });
      }
    } else {
      const isChanged = String(bVal ?? '') !== String(aVal ?? '');
      if (isChanged) {
        changedInputs.push({
          field,
          baseline: bVal ?? null,
          alternative: aVal ?? null,
          delta: null,
          direction: 'changed',
          unit: INPUT_UNITS[field] ?? null
        });
      }
    }
  }

  return changedInputs;
}

/**
 * Compare simulation result metrics between baseline and alternative.
 * Delta convention: delta = alternative - baseline
 * 
 * @param {Object} baselineResult 
 * @param {Object} alternativeResult 
 * @returns {Array<Object>} List of metric delta objects
 */
export function compareMetrics(baselineResult, alternativeResult) {
  const metrics = [
    'totalYield',
    'perAcre',
    'low',
    'high',
    'weatherFactor',
    'plantingFactor',
    'requiredWaterM3',
    'waterDrawnM3',
    'waterProductivityKgPerM3',
    'waterFactor',
    'baseCost',
    'irrigationCost',
    'totalCost',
    'revenue',
    'profit',
    'roi',
    'waterRisk',
    'weatherRisk',
    'plantingRisk',
    'financialRisk',
    'overallRisk',
    'riskLevel',
    'yieldIndex',
    'profitIndex',
    'safetyIndex',
    'decisionScore'
  ];

  const metricDeltas = [];

  for (const metric of metrics) {
    const bVal = getResultMetricValue(baselineResult, metric);
    const aVal = getResultMetricValue(alternativeResult, metric);

    if (bVal === undefined && aVal === undefined) continue;
    if (bVal === null && aVal === null) continue;

    const isNumeric = typeof bVal === 'number' && typeof aVal === 'number';

    if (isNumeric) {
      if (isNaN(bVal) || isNaN(aVal) || !isFinite(bVal) || !isFinite(aVal)) {
        continue;
      }
      const delta = aVal - bVal;
      const direction = getChangeDirection(delta, true);
      if (direction !== 'unchanged') {
        metricDeltas.push({
          metric,
          baseline: bVal,
          alternative: aVal,
          delta,
          direction,
          unit: METRIC_UNITS[metric] ?? null
        });
      }
    } else {
      const isChanged = String(bVal ?? '') !== String(aVal ?? '');
      if (isChanged) {
        metricDeltas.push({
          metric,
          baseline: bVal ?? null,
          alternative: aVal ?? null,
          delta: null,
          direction: 'changed',
          unit: METRIC_UNITS[metric] ?? null
        });
      }
    }
  }

  return metricDeltas;
}

/**
 * Map drivers and metric deltas into traceable attribution categories.
 * 
 * @param {Array<Object>} changedInputs 
 * @param {Array<Object>} metricDeltas 
 * @returns {Array<Object>} Structured attribution category items
 */
function buildCategoryAttributions(changedInputs, metricDeltas) {
  const driverMap = {
    water: ['waterAvailabilityPercent', 'availableWaterM3'],
    weather: ['weather'],
    planting: ['planting.type', 'planting.delayDays'],
    financial: ['inputCostMultiplier'],
    irrigation: ['irrigation'],
    decision: ['priorityProfile']
  };

  const primaryImpactMap = {
    water: ['waterFactor', 'requiredWaterM3', 'waterDrawnM3', 'waterProductivityKgPerM3', 'waterRisk'],
    weather: ['weatherFactor', 'weatherRisk'],
    planting: ['plantingFactor', 'plantingRisk'],
    financial: ['baseCost', 'totalCost', 'profit', 'roi', 'financialRisk', 'profitIndex'],
    irrigation: ['irrigationCost', 'totalCost', 'profit', 'roi', 'financialRisk'],
    decision: ['yieldIndex', 'profitIndex', 'safetyIndex', 'decisionScore']
  };

  const downstreamImpactMap = {
    water: ['totalYield', 'perAcre', 'profit', 'overallRisk', 'decisionScore'],
    weather: ['totalYield', 'perAcre', 'profit', 'overallRisk', 'decisionScore'],
    planting: ['totalYield', 'perAcre', 'profit', 'overallRisk', 'safetyIndex', 'decisionScore'],
    financial: ['decisionScore'],
    irrigation: ['decisionScore'],
    decision: []
  };

  const attributions = [];

  for (const cat of ATTRIBUTION_CATEGORIES) {
    const validDriverFields = driverMap[cat] || [];
    const drivers = changedInputs.filter(inp => validDriverFields.includes(inp.field));

    const primaryMetrics = primaryImpactMap[cat] || [];
    const downstreamMetrics = downstreamImpactMap[cat] || [];

    let impacts = [];
    if (drivers.length > 0) {
      const allowedMetrics = [...primaryMetrics, ...downstreamMetrics];
      impacts = metricDeltas.filter(m => allowedMetrics.includes(m.metric));
    } else {
      impacts = metricDeltas.filter(m => primaryMetrics.includes(m.metric));
    }

    const changed = drivers.length > 0 || impacts.length > 0;

    attributions.push({
      category: cat,
      changed,
      drivers: drivers.map(d => ({ ...d })),
      impacts: impacts.map(i => ({ ...i }))
    });
  }

  return attributions;
}

/**
 * Calculate deterministic scenario attribution comparing Baseline vs Alternative.
 * Delta convention: delta = alternative - baseline
 * 
 * @param {Object} input - Object containing { baseline, alternative }
 * @returns {Object} Structured attribution output object
 */
export function calculateAttribution(input) {
  if (!input || typeof input !== 'object') {
    return {
      baseline: {},
      alternative: {},
      changedInputs: [],
      metricDeltas: [],
      attributions: ATTRIBUTION_CATEGORIES.map(category => ({ category, changed: false, drivers: [], impacts: [] })),
      summary: { changedInputCount: 0, changedMetricCount: 0, changedCategories: [] }
    };
  }

  const { scenario: bScenario, result: bResult } = extractScenarioAndResult(input.baseline);
  const { scenario: aScenario, result: aResult } = extractScenarioAndResult(input.alternative);

  const changedInputs = compareInputs(bScenario, aScenario);
  const metricDeltas = compareMetrics(bResult, aResult);
  const attributions = buildCategoryAttributions(changedInputs, metricDeltas);

  const changedCategories = attributions.filter(a => a.changed).map(a => a.category);

  return {
    baseline: input.baseline ?? {},
    alternative: input.alternative ?? {},
    changedInputs,
    metricDeltas,
    attributions,
    summary: {
      changedInputCount: changedInputs.length,
      changedMetricCount: metricDeltas.length,
      changedCategories
    }
  };
}
