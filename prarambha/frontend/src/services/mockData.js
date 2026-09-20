/**
 * Mock data adhering strictly to the shared PRD / Task_Distribution.md contracts:
 * - ScenarioInput
 * - SimulationResult
 * - ComparisonResult
 * - WhyExplanation
 * - Recommendation
 * - ResourceReadiness
 */

export const MOCK_SCENARIOS = [
  {
    id: "sc-001",
    name: "Standard Flood Plan",
    tagline: "Conventional Flood Irrigation, On-time sowing",
    farmId: "farm-001",
    farmName: "Shivneri Farm (Plot 1)",
    createdAt: "2026-09-18T10:30:00Z",
    modelVersion: "v2.0-deterministic",
    inputs: {
      farmId: "farm-001",
      crop: "Wheat (GW-496)",
      areaAcres: 4,
      sowingDate: "2026-10-15",
      waterAvailabilityPercent: 100,
      availableWaterM3: 4200,
      weather: "normal",
      planting: {
        type: "on_time",
        delayDays: 0,
      },
      inputCostMultiplier: 1.0,
      irrigation: "flood",
      priorityProfile: "balanced",
    },
    results: {
      modelVersion: "v2.0-deterministic",
      estimated: true,
      yield: {
        perAcre: 18.5,
        total: 74.0,
        low: 68.0,
        high: 80.0,
        unit: "Quintals",
      },
      economics: {
        cost: 68000,
        revenue: 166500,
        profit: 98500,
        roi: 144.85,
      },
      water: {
        drawnM3: 4000,
        productivity: 18.5, // kg per m³ or quintal equivalent
      },
      risk: {
        components: {
          water: 35,
          weather: 25,
          planting: 10,
          financial: 20,
        },
        overall: 28,
        level: "low",
      },
      decisionScore: 78,
    },
    tradeoffSummary: "Balanced baseline with stable returns, higher water consumption.",
  },
  {
    id: "sc-002",
    name: "High Efficiency Drip Plan",
    tagline: "Drip Irrigation + Balanced Nutrition",
    farmId: "farm-001",
    farmName: "Shivneri Farm (Plot 1)",
    createdAt: "2026-09-18T14:15:00Z",
    modelVersion: "v2.0-deterministic",
    inputs: {
      farmId: "farm-001",
      crop: "Wheat (GW-496)",
      areaAcres: 4,
      sowingDate: "2026-10-15",
      waterAvailabilityPercent: 70,
      availableWaterM3: 2800,
      weather: "normal",
      planting: {
        type: "on_time",
        delayDays: 0,
      },
      inputCostMultiplier: 1.15,
      irrigation: "drip",
      priorityProfile: "max_profit",
    },
    results: {
      modelVersion: "v2.0-deterministic",
      estimated: true,
      yield: {
        perAcre: 21.2,
        total: 84.8,
        low: 79.0,
        high: 90.5,
        unit: "Quintals",
      },
      economics: {
        cost: 76000,
        revenue: 190800,
        profit: 114800,
        roi: 151.05,
      },
      water: {
        drawnM3: 2500,
        productivity: 33.9,
      },
      risk: {
        components: {
          water: 15,
          weather: 22,
          planting: 10,
          financial: 32,
        },
        overall: 22,
        level: "low",
      },
      decisionScore: 89,
    },
    tradeoffSummary: "Maximizes yield & water productivity with higher upfront input cost.",
  },
  {
    id: "sc-003",
    name: "Late Sowing + Water Stress",
    tagline: "Delayed sowing by 21 days due to monsoon extension",
    farmId: "farm-001",
    farmName: "Shivneri Farm (Plot 1)",
    createdAt: "2026-09-19T09:00:00Z",
    modelVersion: "v2.0-deterministic",
    inputs: {
      farmId: "farm-001",
      crop: "Wheat (GW-496)",
      areaAcres: 4,
      sowingDate: "2026-11-05",
      waterAvailabilityPercent: 55,
      availableWaterM3: 2100,
      weather: "poor",
      planting: {
        type: "delayed",
        delayDays: 21,
      },
      inputCostMultiplier: 0.95,
      irrigation: "sprinkler",
      priorityProfile: "play_safe",
    },
    results: {
      modelVersion: "v2.0-deterministic",
      estimated: true,
      yield: {
        perAcre: 13.0,
        total: 52.0,
        low: 44.0,
        high: 58.0,
        unit: "Quintals",
      },
      economics: {
        cost: 61000,
        revenue: 117000,
        profit: 56000,
        roi: 91.8,
      },
      water: {
        drawnM3: 2100,
        productivity: 24.7,
      },
      risk: {
        components: {
          water: 68,
          weather: 70,
          planting: 65,
          financial: 45,
        },
        overall: 66,
        level: "high",
      },
      decisionScore: 49,
    },
    tradeoffSummary: "Low capital outlay but elevated temperature and water deficit risk.",
  },
  {
    id: "sc-004",
    name: "Play Safe Sprinkler Plan",
    tagline: "Moderate irrigation with drought-tolerant precautions",
    farmId: "farm-001",
    farmName: "Shivneri Farm (Plot 1)",
    createdAt: "2026-09-19T16:45:00Z",
    modelVersion: "v2.0-deterministic",
    inputs: {
      farmId: "farm-001",
      crop: "Wheat (GW-496)",
      areaAcres: 4,
      sowingDate: "2026-10-18",
      waterAvailabilityPercent: 80,
      availableWaterM3: 3200,
      weather: "normal",
      planting: {
        type: "on_time",
        delayDays: 3,
      },
      inputCostMultiplier: 1.05,
      irrigation: "sprinkler",
      priorityProfile: "play_safe",
    },
    results: {
      modelVersion: "v2.0-deterministic",
      estimated: true,
      yield: {
        perAcre: 17.0,
        total: 68.0,
        low: 63.0,
        high: 73.0,
        unit: "Quintals",
      },
      economics: {
        cost: 65000,
        revenue: 153000,
        profit: 88000,
        roi: 135.38,
      },
      water: {
        drawnM3: 3100,
        productivity: 21.9,
      },
      risk: {
        components: {
          water: 28,
          weather: 30,
          planting: 15,
          financial: 22,
        },
        overall: 26,
        level: "low",
      },
      decisionScore: 74,
    },
    tradeoffSummary: "Conservative strategy protecting against water volatility.",
  },
];

export const MOCK_WHY_EXPLANATIONS = {
  "sc-002_vs_sc-001": {
    referenceScenarioId: "sc-001",
    referenceScenarioName: "Standard Flood Plan",
    targetScenarioId: "sc-002",
    targetScenarioName: "High Efficiency Drip Plan",
    totalChange: {
      metric: "Profit",
      value: 16300, // +₹16,300
    },
    factors: [
      {
        factor: "Irrigation Efficiency (Drip vs Flood)",
        contribution: 18500,
        controllability: "controllable",
        explanation: "Drip system reduced root-zone evaporation and increased uniform nutrient delivery, yielding +10.8 quintals.",
      },
      {
        factor: "Input Cost Multiplier (1.15x)",
        contribution: -8000,
        controllability: "controllable",
        explanation: "Higher quality soluble fertilizers and drip maintenance incurred an additional ₹8,000 in expenditure.",
      },
      {
        factor: "Water Security Factor",
        contribution: 5800,
        controllability: "controllable",
        explanation: "Saved 1,500 m³ water buffer, preventing late-season moisture stress penalty.",
      },
    ],
  },
  "sc-003_vs_sc-001": {
    referenceScenarioId: "sc-001",
    referenceScenarioName: "Standard Flood Plan",
    targetScenarioId: "sc-003",
    targetScenarioName: "Late Sowing + Water Stress",
    totalChange: {
      metric: "Profit",
      value: -42500, // -₹42,500
    },
    factors: [
      {
        factor: "Late Sowing Penalty (21 Days Delay)",
        contribution: -19000,
        controllability: "controllable",
        explanation: "Terminal heat stress during grain filling stage reduced thousand-grain weight by 22%.",
      },
      {
        factor: "Water Deficit Stress (55% Availability)",
        contribution: -14500,
        controllability: "controllable",
        explanation: "Skipping the critical crown root initiation (CRI) and flowering watering suppressed tiller survival.",
      },
      {
        factor: "Adverse Weather Shift",
        contribution: -9000,
        controllability: "external",
        explanation: "Poor seasonal temperature profile accelerated maturity before full grain hardening.",
      },
    ],
  },
  "sc-004_vs_sc-001": {
    referenceScenarioId: "sc-001",
    referenceScenarioName: "Standard Flood Plan",
    targetScenarioId: "sc-004",
    targetScenarioName: "Play Safe Sprinkler Plan",
    totalChange: {
      metric: "Profit",
      value: -10500, // -₹10,500
    },
    factors: [
      {
        factor: "Sprinkler Irrigation Efficiency",
        contribution: 4500,
        controllability: "controllable",
        explanation: "Sprinkler distribution saved 900 m³ water buffer and maintained stable canopy cooling.",
      },
      {
        factor: "Input Cost Multiplier (1.05x)",
        contribution: -3000,
        controllability: "controllable",
        explanation: "Sprinkler maintenance and targeted micronutrients added ₹3,000 in operational costs.",
      },
      {
        factor: "Conservative Plant Density",
        contribution: -12000,
        controllability: "controllable",
        explanation: "Lower seed rate intentionally favored risk protection and water endurance over maximum yield potential.",
      },
    ],
  },
};

export const MOCK_RECOMMENDATIONS = [
  {
    id: "rec-001",
    trigger: "WATER DEFICIT DETECTED",
    condition: "Available water (2,100 m³) is 38% below optimal crop water requirement (3,400 m³).",
    impact: "Estimated yield declines by ~29.7% and water risk index surges to 68/100.",
    action: "Adopt micro-irrigation (Drip or Sprinkler) and mulch soil to conserve root moisture.",
    reason: "Water stress during critical tillering and heading stages severely restricts grain panicle size.",
    severity: "critical",
  },
  {
    id: "rec-002",
    trigger: "SOWING WINDOW VULNERABILITY",
    condition: "Sowing scheduled after November 1st encounters severe terminal heat during grain filling.",
    impact: "Expected profit decrease of ~₹19,000 across 4 acres.",
    action: "Advance sowing to optimal window (October 20 - October 28) or switch to short-duration variety (e.g., HD-2967).",
    reason: "Every 7 days delay after November 10 cuts wheat yield potential by 4.5 quintals/hectare.",
    severity: "warning",
  },
  {
    id: "rec-003",
    trigger: "COST-RETURN OPTIMIZATION",
    condition: "Input cost multiplier is 1.15x while priority is 'max_profit'.",
    impact: "Net ROI remains high at 151% due to premium grade harvest offsetting input expenditure.",
    action: "Lock in wholesale rates early for water-soluble NPK fertilizers to preserve working capital.",
    reason: "High fertilizer efficacy under drip delivers net positive gain despite +₹8,000 higher input cost.",
    severity: "info",
  },
];

export const MOCK_RESOURCE_READINESS = {
  farmId: "farm-001",
  farmName: "Shivneri Farm (Plot 1)",
  overallStatus: "shortage", // "available" | "shortage" | "critical"
  budget: {
    required: 76000,
    available: 85000,
    gap: 0,
    status: "available",
    unit: "₹",
  },
  water: {
    required: 4000,
    available: 3200,
    gap: 800,
    status: "shortage",
    unit: "m³",
  },
  seed: {
    required: 160,
    available: 160,
    gap: 0,
    status: "available",
    unit: "kg",
  },
  fertilizer: {
    required: 320,
    available: 240,
    gap: 80,
    status: "shortage",
    unit: "kg",
  },
  otherInputs: [
    {
      name: "Drip Line / Lateral Maintenance",
      required: 4,
      available: 4,
      gap: 0,
      status: "available",
      unit: "Acre kit",
    },
    {
      name: "Tractor / Machinery Hours",
      required: 16,
      available: 12,
      gap: 4,
      status: "shortage",
      unit: "Hours",
    },
  ],
};

export const MOCK_ASSUMPTIONS = {
  modelVersion: "v2.0-deterministic",
  assumptionVersion: "2026.09-kharif-rabi-1",
  lastUpdated: "2026-09-15",
  disclaimer: "Estimated values are model-based approximations for agricultural planning and trade-off exploration. They do not constitute guaranteed agronomic or financial outcomes. Actual yields and prices depend on localized weather, pest dynamics, and market conditions.",
  cropParameters: {
    crop: "Wheat (Triticum aestivum)",
    baseYieldPerAcreQuintals: 18.5,
    minWaterRequirementM3PerAcre: 650,
    optimalWaterRequirementM3PerAcre: 1000,
    marketPricePerQuintalRupees: 2250,
    baseCostPerAcreRupees: 17000,
  },
  riskWeights: {
    waterStress: 0.35,
    weatherAnomaly: 0.25,
    sowingDelay: 0.20,
    financialExposure: 0.20,
  },
  priorityProfiles: {
    balanced: "Equal emphasis on profit maximization and risk mitigation.",
    max_profit: "Prioritizes top-end gross margin; accepts higher input intensity and market risk.",
    play_safe: "Minimizes drawdown risk and water volatility; favors conservative inputs.",
  },
  formulas: [
    {
      name: "Water Stress Factor",
      formula: "Min(1.0, Available Water / Optimal Water Requirement)",
      description: "Linear deficit penalty applied below threshold.",
    },
    {
      name: "Net Profit",
      formula: "(Total Yield × Market Price) - Total Production Cost",
      description: "Monetary return over operational expenditure.",
    },
    {
      name: "Decision Score",
      formula: "0.45 × Normalized Profit + 0.30 × (100 - Risk) + 0.25 × Water Productivity",
      description: "Composite 0-100 index for comparative decision support.",
    },
  ],
  sources: [
    "ICAR Indian Institute of Wheat and Barley Research (Agronomic Benchmarks)",
    "Commission for Agricultural Costs and Prices (CACP MSP 2026)",
    "Maharashtra State Agricultural Department Groundwater Surveys",
  ],
};
