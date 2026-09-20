/**
 * PRARAMBHA 2.0 - Model Version, Crop Parameters, Water, Yield, Financial & Risk Engine Test Suite (Steps 3, 4, 5, 6 & 7)
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MODEL_VERSION, ASSUMPTIONS_VERSION } from '../../src/simulation/model.version.js';
import {
  DEFAULT_CROP_PARAMETERS,
  getCropParameters,
  getAllCropParameters,
  validateCropParameter
} from '../../src/simulation/crop.parameters.js';
import {
  MM_TO_M3_PER_ACRE_CONVERSION_FACTOR,
  calculateWaterFactor,
  calculateRequiredWaterM3,
  calculateWaterDraw,
  calculateWaterProductivity,
  calculateWater
} from '../../src/simulation/water.engine.js';
import {
  WEATHER_FACTORS,
  calculateWeatherFactor,
  calculatePlantingFactor,
  calculateYieldPerAcre,
  calculateYield
} from '../../src/simulation/yield.engine.js';
import {
  IRRIGATION_COST_PER_ACRE,
  calculateIrrigationCost,
  calculateBaseCost,
  calculateTotalCost,
  calculateRevenue,
  calculateProfit,
  calculateROI,
  calculateEconomics
} from '../../src/simulation/financial.engine.js';
import {
  RISK_WEIGHTS,
  WEATHER_RISK_MAP,
  calculateWaterRisk,
  calculateWeatherRisk,
  calculatePlantingRisk,
  calculateFinancialRisk,
  getRiskLevel,
  calculateOverallRisk
} from '../../src/simulation/risk.engine.js';
import {
  DECISION_PROFILES,
  normalizePriorityProfile,
  calculateYieldIndex,
  calculateProfitIndex,
  calculateSafetyIndex,
  calculateDecisionScore,
  calculateDecision
} from '../../src/simulation/decision.engine.js';
import {
  ATTRIBUTION_CATEGORIES,
  METRIC_UNITS,
  INPUT_UNITS,
  getChangeDirection,
  compareInputs,
  compareMetrics,
  calculateAttribution
} from '../../src/simulation/attribution.engine.js';



describe('Model Version Suite', () => {
  it('should export MODEL_VERSION and ASSUMPTIONS_VERSION constants', () => {
    assert.strictEqual(typeof MODEL_VERSION, 'string');
    assert.strictEqual(typeof ASSUMPTIONS_VERSION, 'string');
    assert.strictEqual(MODEL_VERSION, '2.0.0');
    assert.strictEqual(ASSUMPTIONS_VERSION, '2026.1');
  });
});

describe('Crop Parameters Suite', () => {
  it('1. All six crops are available', () => {
    const crops = getAllCropParameters();
    assert.strictEqual(crops.length, 6);
    const keys = Object.keys(DEFAULT_CROP_PARAMETERS);
    assert.deepStrictEqual(keys.sort(), ['cotton', 'maize', 'rice', 'soybean', 'sugarcane', 'wheat']);
  });

  it('2. Each crop has all required parameter fields', () => {
    const crops = getAllCropParameters();
    for (const crop of crops) {
      assert.strictEqual(validateCropParameter(crop), true, `Crop ${crop.crop} failed data safety validation`);
    }
  });

  it('3. Wheat values are correct', () => {
    const wheat = getCropParameters('wheat');
    assert.deepStrictEqual(wheat, {
      crop: 'wheat',
      name: 'Wheat',
      season: 'rabi',
      potentialYield: 16,
      pricePerUnit: 2400,
      baseCostPerAcre: 24000,
      waterRequirementMm: 450,
      unit: 'quintal'
    });
  });

  it('4. Rice values are correct', () => {
    const rice = getCropParameters('rice');
    assert.deepStrictEqual(rice, {
      crop: 'rice',
      name: 'Rice',
      season: 'kharif',
      potentialYield: 22,
      pricePerUnit: 2300,
      baseCostPerAcre: 32000,
      waterRequirementMm: 1200,
      unit: 'quintal'
    });
  });

  it('5. Maize values are correct', () => {
    const maize = getCropParameters('maize');
    assert.deepStrictEqual(maize, {
      crop: 'maize',
      name: 'Maize',
      season: 'kharif',
      potentialYield: 24,
      pricePerUnit: 2100,
      baseCostPerAcre: 30000,
      waterRequirementMm: 600,
      unit: 'quintal'
    });
  });

  it('6. Sugarcane values are correct', () => {
    const sugarcane = getCropParameters('sugarcane');
    assert.deepStrictEqual(sugarcane, {
      crop: 'sugarcane',
      name: 'Sugarcane',
      season: 'annual',
      potentialYield: 320,
      pricePerUnit: 350,
      baseCostPerAcre: 85000,
      waterRequirementMm: 1800,
      unit: 'quintal'
    });
  });

  it('7. Soybean values are correct', () => {
    const soybean = getCropParameters('soybean');
    assert.deepStrictEqual(soybean, {
      crop: 'soybean',
      name: 'Soybean',
      season: 'kharif',
      potentialYield: 8,
      pricePerUnit: 4600,
      baseCostPerAcre: 21000,
      waterRequirementMm: 450,
      unit: 'quintal'
    });
  });

  it('8. Cotton values are correct', () => {
    const cotton = getCropParameters('cotton');
    assert.deepStrictEqual(cotton, {
      crop: 'cotton',
      name: 'Cotton',
      season: 'kharif',
      potentialYield: 8,
      pricePerUnit: 7000,
      baseCostPerAcre: 34000,
      waterRequirementMm: 700,
      unit: 'quintal'
    });
  });

  it('9. Crop lookup returns the correct parameters for case-insensitive inputs', () => {
    const wheatUpper = getCropParameters('WHEAT');
    const wheatTrimmed = getCropParameters('  wheat  ');
    assert.ok(wheatUpper);
    assert.strictEqual(wheatUpper.crop, 'wheat');
    assert.deepStrictEqual(wheatUpper, wheatTrimmed);
  });

  it('10. Unknown crop lookup returns null safely', () => {
    assert.strictEqual(getCropParameters('unknown_crop'), null);
    assert.strictEqual(getCropParameters(''), null);
    assert.strictEqual(getCropParameters(null), null);
    assert.strictEqual(getCropParameters(undefined), null);
  });
});

describe('Water Engine Suite (Step 4)', () => {
  it('1. Wheat water requirement conversion mm -> m³', () => {
    const res = calculateWater({ crop: 'wheat', areaAcres: 1, waterAvailabilityPercent: 100 });
    assert.strictEqual(res.waterRequirementMm, 450);
    assert.strictEqual(res.requiredWaterM3, 1821.085);
  });

  it('2. Rice water requirement conversion mm -> m³', () => {
    const res = calculateWater({ crop: 'rice', areaAcres: 1, waterAvailabilityPercent: 100 });
    assert.strictEqual(res.waterRequirementMm, 1200);
    assert.strictEqual(res.requiredWaterM3, 4856.227);
  });

  it('3. Area scaling', () => {
    const res1 = calculateWater({ crop: 'wheat', areaAcres: 1, waterAvailabilityPercent: 100 });
    const res5 = calculateWater({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 100 });
    assert.strictEqual(res5.requiredWaterM3, calculateRequiredWaterM3(450, 5));
    assert.strictEqual(res1.waterFactor, res5.waterFactor);
  });

  it('4. 100% water availability returns waterFactor = 1.0', () => {
    assert.strictEqual(calculateWaterFactor(100), 1.0);
  });

  it('5. 75% water availability returns waterFactor = 0.75', () => {
    assert.strictEqual(calculateWaterFactor(75), 0.75);
  });

  it('6. 50% water availability returns waterFactor = 0.50', () => {
    assert.strictEqual(calculateWaterFactor(50), 0.50);
  });

  it('7. 0% water availability returns waterFactor = 0.0', () => {
    assert.strictEqual(calculateWaterFactor(0), 0.0);
  });

  it('8. More water cannot reduce waterFactor (monotonicity)', () => {
    assert.ok(calculateWaterFactor(25) >= calculateWaterFactor(0));
    assert.ok(calculateWaterFactor(50) >= calculateWaterFactor(25));
    assert.ok(calculateWaterFactor(75) >= calculateWaterFactor(50));
    assert.ok(calculateWaterFactor(100) >= calculateWaterFactor(75));
  });

  it('9. waterFactor is clamped to [0, 1]', () => {
    assert.strictEqual(calculateWaterFactor(-50), 0);
    assert.strictEqual(calculateWaterFactor(150), 1);
  });

  it('10. waterDrawnM3 is zero at 0% availability', () => {
    const res = calculateWater({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 0 });
    assert.strictEqual(res.waterDrawnM3, 0);
  });

  it('11. waterDrawnM3 increases with water availability', () => {
    const res50 = calculateWater({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 50 });
    const res100 = calculateWater({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 100 });
    assert.ok(res100.waterDrawnM3 > res50.waterDrawnM3);
  });

  it('12. water productivity with valid yield', () => {
    assert.strictEqual(calculateWaterProductivity(2000, 1000), 2);
  });

  it('13. water productivity returns 0 when waterDrawnM3 = 0', () => {
    assert.strictEqual(calculateWaterProductivity(2000, 0), 0);
  });

  it('14. No NaN or Infinity in water engine results', () => {
    const inputs = [
      { crop: 'wheat', areaAcres: 0, waterAvailabilityPercent: 0 },
      { crop: 'rice', areaAcres: 10, waterAvailabilityPercent: 100, totalYieldKg: 0 },
      { crop: 'maize', areaAcres: 5, waterAvailabilityPercent: 50, availableWaterM3: 0 }
    ];
    for (const input of inputs) {
      const res = calculateWater(input);
      assert.ok(!isNaN(res.waterFactor));
      assert.ok(isFinite(res.waterFactor));
      assert.ok(!isNaN(res.waterDrawnM3));
      assert.ok(isFinite(res.waterDrawnM3));
    }
  });

  it('15. All three irrigation values (flood, sprinkler, drip) are accepted without applying undocumented efficiency multipliers', () => {
    const resFlood = calculateWater({ crop: 'wheat', areaAcres: 1, waterAvailabilityPercent: 80, irrigation: 'flood' });
    const resSprinkler = calculateWater({ crop: 'wheat', areaAcres: 1, waterAvailabilityPercent: 80, irrigation: 'sprinkler' });
    const resDrip = calculateWater({ crop: 'wheat', areaAcres: 1, waterAvailabilityPercent: 80, irrigation: 'drip' });

    assert.strictEqual(resFlood.irrigation, 'flood');
    assert.strictEqual(resSprinkler.irrigation, 'sprinkler');
    assert.strictEqual(resDrip.irrigation, 'drip');
    assert.strictEqual(resFlood.waterFactor, resSprinkler.waterFactor);
    assert.strictEqual(resFlood.waterDrawnM3, resDrip.waterDrawnM3);
  });
});

describe('Yield Engine Suite (Step 5)', () => {
  it('1. Wheat normal conditions (16 q/acre * 1.0 water * 0.90 weather * 1.0 planting = 14.4 q/acre)', () => {
    const res = calculateYield({
      crop: 'wheat',
      areaAcres: 1,
      waterFactor: 1.0,
      weather: 'normal',
      planting: { type: 'on_time', delayDays: 0 }
    });
    assert.strictEqual(res.perAcre, 14.4);
    assert.strictEqual(res.total, 14.4);
    assert.strictEqual(res.low, 14.4 * 0.90);
    assert.strictEqual(res.high, 14.4 * 1.10);
  });

  it('2. All six supported crops produce valid yields', () => {
    const crops = ['wheat', 'rice', 'maize', 'sugarcane', 'soybean', 'cotton'];
    for (const crop of crops) {
      const res = calculateYield({
        crop,
        areaAcres: 5,
        waterFactor: 1.0,
        weather: 'normal',
        planting: { type: 'on_time', delayDays: 0 }
      });
      assert.ok(res);
      assert.strictEqual(res.estimated, true);
      assert.ok(res.perAcre > 0);
      assert.ok(res.total > 0);
      assert.ok(res.low <= res.total);
      assert.ok(res.high >= res.total);
    }
  });

  it('3. Good weather factor = 1.0', () => {
    assert.strictEqual(calculateWeatherFactor('good'), 1.00);
  });

  it('4. Normal weather factor = 0.90', () => {
    assert.strictEqual(calculateWeatherFactor('normal'), 0.90);
  });

  it('5. Poor weather factor = 0.65', () => {
    assert.strictEqual(calculateWeatherFactor('poor'), 0.65);
  });

  it('6. Good weather produces >= normal weather yield', () => {
    const resGood = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'good', planting: { type: 'on_time', delayDays: 0 } });
    const resNorm = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    assert.ok(resGood.perAcre >= resNorm.perAcre);
  });

  it('7. Normal weather produces >= poor weather yield', () => {
    const resNorm = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    const resPoor = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'poor', planting: { type: 'on_time', delayDays: 0 } });
    assert.ok(resNorm.perAcre >= resPoor.perAcre);
  });

  it('8. On-time planting factor = 1.0', () => {
    assert.strictEqual(calculatePlantingFactor({ type: 'on_time', delayDays: 0 }), 1.0);
  });

  it('9. Delayed planting applies 0.015/day penalty', () => {
    const factor10 = calculatePlantingFactor({ type: 'delayed', delayDays: 10 });
    assert.strictEqual(factor10, 1.0 - (10 * 0.015));
  });

  it('10. Increasing delay cannot improve yield', () => {
    const p0 = calculatePlantingFactor({ type: 'on_time', delayDays: 0 });
    const p5 = calculatePlantingFactor({ type: 'delayed', delayDays: 5 });
    const p10 = calculatePlantingFactor({ type: 'delayed', delayDays: 10 });
    assert.ok(p0 >= p5);
    assert.ok(p5 >= p10);
  });

  it('11. Very large delay is clamped to minimum planting factor 0.4', () => {
    assert.strictEqual(calculatePlantingFactor({ type: 'delayed', delayDays: 50 }), 0.4);
    assert.strictEqual(calculatePlantingFactor({ type: 'delayed', delayDays: 100 }), 0.4);
  });

  it('12. Zero water factor produces zero yield', () => {
    const res = calculateYield({ crop: 'wheat', areaAcres: 5, waterFactor: 0, weather: 'good', planting: { type: 'on_time', delayDays: 0 } });
    assert.strictEqual(res.perAcre, 0);
    assert.strictEqual(res.total, 0);
  });

  it('13. Full water factor produces higher/equal yield than partial water factor', () => {
    const resFull = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    const resPart = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 0.5, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    assert.ok(resFull.perAcre >= resPart.perAcre);
  });

  it('14. Increasing area changes total yield but not per-acre yield', () => {
    const res1 = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    const res5 = calculateYield({ crop: 'wheat', areaAcres: 5, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    assert.strictEqual(res1.perAcre, res5.perAcre);
    assert.strictEqual(res5.total, res1.total * 5);
  });

  it('15. Yield range is valid (low = 90% total, high = 110% total)', () => {
    const res = calculateYield({ crop: 'rice', areaAcres: 2, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    assert.strictEqual(res.low, res.total * 0.90);
    assert.strictEqual(res.high, res.total * 1.10);
  });

  it('16. estimated = true flag is present', () => {
    const res = calculateYield({ crop: 'wheat', areaAcres: 1, waterFactor: 1.0, weather: 'normal', planting: { type: 'on_time', delayDays: 0 } });
    assert.strictEqual(res.estimated, true);
  });

  it('17. low <= total <= high', () => {
    const res = calculateYield({ crop: 'maize', areaAcres: 3, waterFactor: 0.8, weather: 'poor', planting: { type: 'delayed', delayDays: 5 } });
    assert.ok(res.low <= res.total);
    assert.ok(res.total <= res.high);
  });

  it('18. No NaN in yield engine outputs', () => {
    const inputs = [
      { crop: 'wheat', areaAcres: 0, waterFactor: 0, weather: 'good' },
      { crop: 'rice', areaAcres: 5, waterFactor: 1.0, weather: 'invalid_weather' }
    ];
    for (const input of inputs) {
      const res = calculateYield(input);
      assert.ok(!isNaN(res.perAcre));
      assert.ok(!isNaN(res.total));
    }
  });

  it('19. No Infinity in yield engine outputs', () => {
    const res = calculateYield({ crop: 'cotton', areaAcres: 1000, waterFactor: 1.0, weather: 'poor' });
    assert.ok(isFinite(res.perAcre));
    assert.ok(isFinite(res.total));
  });

  it('20. Invalid crop returns null safely', () => {
    const res = calculateYield({ crop: 'nonexistent_crop', areaAcres: 5, waterFactor: 1.0 });
    assert.strictEqual(res, null);
  });
});

describe('Financial Engine Suite (Step 6)', () => {
  it('1. Wheat baseline financial calculation', () => {
    const res = calculateEconomics({
      crop: 'wheat',
      areaAcres: 1,
      totalYield: 14.4,
      inputCostMultiplier: 1.0,
      irrigation: 'flood'
    });
    assert.strictEqual(res.cost, 24000);
    assert.strictEqual(res.revenue, 34560);
    assert.strictEqual(res.profit, 10560);
    assert.strictEqual(res.roi, (10560 / 24000) * 100);
    assert.strictEqual(res.breakdown.baseCost, 24000);
    assert.strictEqual(res.breakdown.irrigationCost, 0);
  });

  it('2. All six supported crops have valid financial parameters', () => {
    const crops = ['wheat', 'rice', 'maize', 'sugarcane', 'soybean', 'cotton'];
    for (const crop of crops) {
      const yieldRes = calculateYield({ crop, areaAcres: 5, waterFactor: 1.0, weather: 'normal' });
      const finRes = calculateEconomics({ crop, areaAcres: 5, totalYield: yieldRes.total, inputCostMultiplier: 1.0 });
      assert.ok(finRes);
      assert.ok(finRes.cost > 0);
      assert.ok(finRes.revenue > 0);
      assert.strictEqual(finRes.profit, finRes.revenue - finRes.cost);
      assert.ok(!isNaN(finRes.roi));
      assert.ok(isFinite(finRes.roi));
    }
  });

  it('3. Base cost scales correctly with area', () => {
    const res1 = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10, inputCostMultiplier: 1.0 });
    const res5 = calculateEconomics({ crop: 'wheat', areaAcres: 5, totalYield: 50, inputCostMultiplier: 1.0 });
    assert.strictEqual(res5.cost, res1.cost * 5);
  });

  it('4. Input cost multiplier = 1.0 produces baseline cost', () => {
    const res = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 14.4, inputCostMultiplier: 1.0 });
    assert.strictEqual(res.cost, 24000);
  });

  it('5. Input cost multiplier > 1 increases total cost', () => {
    const res10 = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 14.4, inputCostMultiplier: 1.0 });
    const res15 = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 14.4, inputCostMultiplier: 1.5 });
    assert.ok(res15.cost > res10.cost);
    assert.strictEqual(res15.cost, 36000);
  });

  it('6. Input cost multiplier > 1 reduces profit', () => {
    const res10 = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 14.4, inputCostMultiplier: 1.0 });
    const res15 = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 14.4, inputCostMultiplier: 1.5 });
    assert.ok(res15.profit < res10.profit);
  });

  it('7. Input cost multiplier does NOT change yield (Cross-Engine Test)', () => {
    const yieldInputA = { crop: 'wheat', areaAcres: 5, waterFactor: 1.0, weather: 'normal' };
    const yieldInputB = { crop: 'wheat', areaAcres: 5, waterFactor: 1.0, weather: 'normal' };
    const yieldA = calculateYield(yieldInputA);
    const yieldB = calculateYield(yieldInputB);
    const finA = calculateEconomics({ crop: 'wheat', areaAcres: 5, totalYield: yieldA.total, inputCostMultiplier: 1.0 });
    const finB = calculateEconomics({ crop: 'wheat', areaAcres: 5, totalYield: yieldB.total, inputCostMultiplier: 1.5 });

    assert.strictEqual(yieldA.total, yieldB.total);
    assert.strictEqual(yieldA.perAcre, yieldB.perAcre);
    assert.ok(finB.cost > finA.cost);
    assert.ok(finB.profit < finA.profit);
  });

  it('8. Revenue = totalYield * price', () => {
    const res = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10, pricePerUnit: 2400 });
    assert.strictEqual(res.revenue, 24000);
  });

  it('9. Profit = revenue - totalCost', () => {
    const res = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10 });
    assert.strictEqual(res.profit, res.revenue - res.cost);
  });

  it('10. Positive profit scenario', () => {
    const res = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 16 });
    assert.ok(res.profit > 0);
  });

  it('11. Zero-profit scenario', () => {
    const res = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10, inputCostMultiplier: 1.0, irrigation: 'flood' });
    assert.strictEqual(res.profit, 0);
    assert.strictEqual(res.roi, 0);
  });

  it('12. Negative-profit scenario is valid and not clamped to zero', () => {
    const res = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 5, inputCostMultiplier: 1.0 });
    assert.ok(res.profit < 0);
    assert.strictEqual(res.profit, -12000);
    assert.strictEqual(res.roi, -50);
  });

  it('13. ROI calculation', () => {
    assert.strictEqual(calculateROI(5000, 20000), 25);
  });

  it('14. Zero total cost safely returns ROI = 0', () => {
    const roi = calculateROI(1000, 0);
    assert.strictEqual(roi, 0);
    assert.ok(!isNaN(roi));
    assert.ok(isFinite(roi));
  });

  it('15. No NaN in financial engine outputs', () => {
    const inputs = [
      { crop: 'wheat', areaAcres: 0, totalYield: 0 },
      { crop: 'rice', areaAcres: 5, totalYield: 0, inputCostMultiplier: 0 }
    ];
    for (const input of inputs) {
      const res = calculateEconomics(input);
      assert.ok(!isNaN(res.cost));
      assert.ok(!isNaN(res.revenue));
      assert.ok(!isNaN(res.profit));
      assert.ok(!isNaN(res.roi));
    }
  });

  it('16. No Infinity in financial engine outputs', () => {
    const res = calculateEconomics({ crop: 'sugarcane', areaAcres: 100, totalYield: 10000 });
    assert.ok(isFinite(res.cost));
    assert.ok(isFinite(res.revenue));
    assert.ok(isFinite(res.profit));
    assert.ok(isFinite(res.roi));
  });

  it('17. Irrigation cost scales with area', () => {
    assert.strictEqual(calculateIrrigationCost(1, 'drip'), 2500);
    assert.strictEqual(calculateIrrigationCost(5, 'drip'), 12500);
  });

  it('18. Flood/sprinkler/drip are handled according to approved assumptions', () => {
    const flood = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10, irrigation: 'flood' });
    const sprinkler = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10, irrigation: 'sprinkler' });
    const drip = calculateEconomics({ crop: 'wheat', areaAcres: 1, totalYield: 10, irrigation: 'drip' });

    assert.strictEqual(flood.breakdown.irrigationCost, 0);
    assert.strictEqual(sprinkler.breakdown.irrigationCost, 1200);
    assert.strictEqual(drip.breakdown.irrigationCost, 2500);
  });

  it('19. Area scaling works correctly', () => {
    const res2 = calculateEconomics({ crop: 'maize', areaAcres: 2, totalYield: 48 });
    const res4 = calculateEconomics({ crop: 'maize', areaAcres: 4, totalYield: 96 });
    assert.strictEqual(res4.cost, res2.cost * 2);
    assert.strictEqual(res4.revenue, res2.revenue * 2);
    assert.strictEqual(res4.profit, res2.profit * 2);
    assert.strictEqual(res4.roi, res2.roi);
  });

  it('20. Changing financial inputs does not mutate the input object', () => {
    const input = { crop: 'wheat', areaAcres: 5, totalYield: 50, inputCostMultiplier: 1.2, irrigation: 'drip' };
    const inputCopy = JSON.parse(JSON.stringify(input));
    const res = calculateEconomics(input);
    assert.ok(res);
    assert.deepStrictEqual(input, inputCopy);
  });
});

describe('Risk Engine Suite (Step 7)', () => {
  // Test 1: WaterRisk at waterFactor = 1.0
  it('1. WaterRisk at waterFactor = 1.0 is 0', () => {
    assert.strictEqual(calculateWaterRisk(1.0), 0);
  });

  // Test 2: WaterRisk at waterFactor = 0.75
  it('2. WaterRisk at waterFactor = 0.75 is 25', () => {
    assert.strictEqual(calculateWaterRisk(0.75), 25);
  });

  // Test 3: WaterRisk at waterFactor = 0.50
  it('3. WaterRisk at waterFactor = 0.50 is 50', () => {
    assert.strictEqual(calculateWaterRisk(0.50), 50);
  });

  // Test 4: WaterRisk at waterFactor = 0.0
  it('4. WaterRisk at waterFactor = 0.0 is 100', () => {
    assert.strictEqual(calculateWaterRisk(0), 100);
  });

  // Test 5: WeatherRisk good = 10
  it('5. WeatherRisk good = 10', () => {
    assert.strictEqual(calculateWeatherRisk('good'), 10);
  });

  // Test 6: WeatherRisk normal = 30
  it('6. WeatherRisk normal = 30', () => {
    assert.strictEqual(calculateWeatherRisk('normal'), 30);
  });

  // Test 7: WeatherRisk poor = 80
  it('7. WeatherRisk poor = 80', () => {
    assert.strictEqual(calculateWeatherRisk('poor'), 80);
  });

  // Test 8: Poor weather risk > normal weather risk
  it('8. Poor weather risk > normal weather risk', () => {
    assert.ok(calculateWeatherRisk('poor') > calculateWeatherRisk('normal'));
  });

  // Test 9: Normal weather risk > good weather risk
  it('9. Normal weather risk > good weather risk', () => {
    assert.ok(calculateWeatherRisk('normal') > calculateWeatherRisk('good'));
  });

  // Test 10: Planting risk at zero delay = 0
  it('10. Planting risk at zero delay = 0', () => {
    assert.strictEqual(calculatePlantingRisk({ delayDays: 0 }), 0);
  });

  // Test 11: Planting risk at 10 days = 35
  it('11. Planting risk at 10 days = 35', () => {
    assert.strictEqual(calculatePlantingRisk({ delayDays: 10 }), 35);
  });

  // Test 12: Planting risk at 20 days = 70
  it('12. Planting risk at 20 days = 70', () => {
    assert.strictEqual(calculatePlantingRisk({ delayDays: 20 }), 70);
  });

  // Test 13: Planting risk at 30 days = 100
  it('13. Planting risk at 30 days = 100', () => {
    assert.strictEqual(calculatePlantingRisk({ delayDays: 30 }), 100);
  });

  // Test 14: Increasing delay cannot reduce risk
  it('14. Increasing delay cannot reduce risk', () => {
    const r0 = calculatePlantingRisk({ delayDays: 0 });
    const r10 = calculatePlantingRisk({ delayDays: 10 });
    const r20 = calculatePlantingRisk({ delayDays: 20 });
    const r30 = calculatePlantingRisk({ delayDays: 30 });
    assert.ok(r10 >= r0);
    assert.ok(r20 >= r10);
    assert.ok(r30 >= r20);
  });

  // Test 15: Negative profit -> FinancialRisk = 100
  it('15. Negative profit -> FinancialRisk = 100', () => {
    assert.strictEqual(calculateFinancialRisk({ profit: -5000, totalCost: 20000 }), 100);
  });

  // Test 16: Non-negative profit -> FinancialRisk = 0
  it('16. Non-negative profit -> FinancialRisk = 0', () => {
    assert.strictEqual(calculateFinancialRisk({ profit: 10000, totalCost: 20000 }), 0);
    assert.strictEqual(calculateFinancialRisk({ profit: 0, totalCost: 20000 }), 0);
  });

  // Test 17: Zero-cost behavior is safe (FinancialRisk = 0)
  it('17. Zero-cost behavior is safe (FinancialRisk = 0)', () => {
    assert.strictEqual(calculateFinancialRisk({ profit: 0, totalCost: 0 }), 0);
    assert.strictEqual(calculateFinancialRisk({ profit: -500, totalCost: 0 }), 0);
  });

  // Test 18: Overall risk follows the 35/20/20/25 weights
  it('18. Overall risk follows the 35/20/20/25 weights', () => {
    // waterFactor = 1.0 (waterRisk = 0)
    // weather = 'good' (weatherRisk = 10)
    // delayDays = 10 (plantingRisk = 35)
    // profit = -1000, cost = 10000 (financialRisk = 100)
    // Expected OverallRisk = (0.35 * 0) + (0.20 * 10) + (0.20 * 35) + (0.25 * 100) = 0 + 2 + 7 + 25 = 34
    const res = calculateOverallRisk({
      waterFactor: 1.0,
      weather: 'good',
      planting: { delayDays: 10 },
      financial: { profit: -1000, totalCost: 10000 }
    });
    assert.strictEqual(res.components.waterRisk, 0);
    assert.strictEqual(res.components.weatherRisk, 10);
    assert.strictEqual(res.components.plantingRisk, 35);
    assert.strictEqual(res.components.financialRisk, 100);
    assert.strictEqual(res.overallRisk, 34);
    assert.strictEqual(res.riskLevel, 'low');
  });

  // Test 19: Overall risk remains 0–100
  it('19. Overall risk remains 0–100 for all edge cases', () => {
    const resZero = calculateOverallRisk({ waterFactor: 1.0, weather: 'good', planting: { delayDays: 0 }, financial: { profit: 100, cost: 100 } });
    const resMax = calculateOverallRisk({ waterFactor: 0.0, weather: 'poor', planting: { delayDays: 50 }, financial: { profit: -1000, cost: 100 } });
    assert.ok(resZero.overallRisk >= 0 && resZero.overallRisk <= 100);
    assert.ok(resMax.overallRisk >= 0 && resMax.overallRisk <= 100);
    assert.strictEqual(resMax.overallRisk, (0.35 * 100) + (0.20 * 80) + (0.20 * 100) + (0.25 * 100)); // 35 + 16 + 20 + 25 = 96
  });

  // Test 20: Low boundary (< 35)
  it('20. Low boundary (< 35)', () => {
    assert.strictEqual(getRiskLevel(34.99), 'low');
    assert.strictEqual(getRiskLevel(0), 'low');
  });

  // Test 21: Medium lower boundary = 35
  it('21. Medium lower boundary = 35', () => {
    assert.strictEqual(getRiskLevel(35), 'medium');
  });

  // Test 22: Medium upper boundary = 65
  it('22. Medium upper boundary = 65', () => {
    assert.strictEqual(getRiskLevel(65), 'medium');
  });

  // Test 23: High boundary > 65
  it('23. High boundary > 65', () => {
    assert.strictEqual(getRiskLevel(65.01), 'high');
    assert.strictEqual(getRiskLevel(100), 'high');
  });

  // Test 24: No NaN in risk engine outputs
  it('24. No NaN in risk engine outputs', () => {
    const res = calculateOverallRisk({ waterFactor: undefined, weather: undefined, planting: undefined, financial: undefined });
    assert.ok(!isNaN(res.overallRisk));
    assert.ok(!isNaN(res.components.waterRisk));
    assert.ok(!isNaN(res.components.weatherRisk));
    assert.ok(!isNaN(res.components.plantingRisk));
    assert.ok(!isNaN(res.components.financialRisk));
  });

  // Test 25: No Infinity in risk engine outputs
  it('25. No Infinity in risk engine outputs', () => {
    const res = calculateOverallRisk({ waterFactor: 100, weather: 'poor', planting: { delayDays: 1000 }, financial: { profit: -1e9, cost: 1e9 } });
    assert.ok(isFinite(res.overallRisk));
  });

  // Test 26: Input object is not mutated
  it('26. Input object is not mutated', () => {
    const input = { waterFactor: 0.8, weather: 'normal', planting: { delayDays: 5 }, financial: { profit: 1000, totalCost: 5000 } };
    const copy = JSON.parse(JSON.stringify(input));
    calculateOverallRisk(input);
    assert.deepStrictEqual(input, copy);
  });
});

describe('Cross-Engine Risk Integration Tests', () => {
  // Cross-Engine Test A: More water lowers or maintains WaterRisk
  it('A. More water: higher waterFactor -> lower/equal WaterRisk', () => {
    const r50 = calculateWaterRisk(0.5);
    const r100 = calculateWaterRisk(1.0);
    assert.ok(r50 > r100);
    assert.strictEqual(r50, 50);
    assert.strictEqual(r100, 0);
  });

  // Cross-Engine Test B: Weather risk ordering good (10) < normal (30) < poor (80)
  it('B. Weather: good (10) < normal (30) < poor (80)', () => {
    const g = calculateWeatherRisk('good');
    const n = calculateWeatherRisk('normal');
    const p = calculateWeatherRisk('poor');
    assert.strictEqual(g, 10);
    assert.strictEqual(n, 30);
    assert.strictEqual(p, 80);
    assert.ok(g < n && n < p);
  });

  // Cross-Engine Test C: Planting delay ordering 0 < 10 < 20 < 30
  it('C. Planting: delay 0 < delay 10 < delay 20 < delay 30', () => {
    const d0 = calculatePlantingRisk({ delayDays: 0 });
    const d10 = calculatePlantingRisk({ delayDays: 10 });
    const d20 = calculatePlantingRisk({ delayDays: 20 });
    const d30 = calculatePlantingRisk({ delayDays: 30 });
    assert.strictEqual(d0, 0);
    assert.strictEqual(d10, 35);
    assert.strictEqual(d20, 70);
    assert.strictEqual(d30, 100);
  });

  // Cross-Engine Test D: Financial risk: negative profit -> 100, positive profit -> 0
  it('D. Financial: negative profit -> FinancialRisk = 100, positive profit -> FinancialRisk = 0', () => {
    const neg = calculateFinancialRisk({ profit: -100, totalCost: 1000 });
    const pos = calculateFinancialRisk({ profit: 100, totalCost: 1000 });
    assert.strictEqual(neg, 100);
    assert.strictEqual(pos, 0);
  });
});

describe('Decision Engine Suite (Step 8)', () => {
  it('1. Balanced profile weights sum to 1.0', () => {
    const p = DECISION_PROFILES.balanced;
    assert.ok(Math.abs((p.yield + p.profit + p.safety) - 1.0) < 1e-9);
  });

  it('2. Max Profit profile weights sum to 1.0', () => {
    const p = DECISION_PROFILES.max_profit;
    assert.strictEqual(p.yield + p.profit + p.safety, 1.0);
  });

  it('3. Play Safe profile weights sum to 1.0', () => {
    const p = DECISION_PROFILES.play_safe;
    assert.strictEqual(p.yield + p.profit + p.safety, 1.0);
  });

  it('4. normalizePriorityProfile handles standard keys and aliases', () => {
    assert.strictEqual(normalizePriorityProfile('balanced'), 'balanced');
    assert.strictEqual(normalizePriorityProfile('max_profit'), 'max_profit');
    assert.strictEqual(normalizePriorityProfile('max profit'), 'max_profit');
    assert.strictEqual(normalizePriorityProfile('maxProfit'), 'max_profit');
    assert.strictEqual(normalizePriorityProfile('play_safe'), 'play_safe');
    assert.strictEqual(normalizePriorityProfile('play safe'), 'play_safe');
    assert.strictEqual(normalizePriorityProfile('playSafe'), 'play_safe');
    assert.strictEqual(normalizePriorityProfile('unknown_profile'), 'balanced');
    assert.strictEqual(normalizePriorityProfile(null), 'balanced');
    assert.strictEqual(normalizePriorityProfile(undefined), 'balanced');
  });

  it('5. YieldIndex calculation at 100% potential yield = 100', () => {
    const res = calculateYieldIndex({ yield: { total: 80, potentialYield: 16, areaAcres: 5 } });
    assert.strictEqual(res, 100);
  });

  it('6. YieldIndex calculation at 90% potential yield = 90', () => {
    const res = calculateYieldIndex({ yield: { total: 72, potentialYield: 16, areaAcres: 5 } });
    assert.strictEqual(res, 90);
  });

  it('7. YieldIndex calculation at 0 yield = 0', () => {
    const res = calculateYieldIndex({ yield: { total: 0, potentialYield: 16, areaAcres: 5 } });
    assert.strictEqual(res, 0);
  });

  it('8. YieldIndex returns 0 for zero area or zero potential yield', () => {
    assert.strictEqual(calculateYieldIndex({ yield: { total: 50, potentialYield: 0, areaAcres: 5 } }), 0);
    assert.strictEqual(calculateYieldIndex({ yield: { total: 50, potentialYield: 16, areaAcres: 0 } }), 0);
  });

  it('9. ProfitIndex calculation at ROI = -100% is 0', () => {
    assert.strictEqual(calculateProfitIndex({ economics: { roi: -100 } }), 0);
  });

  it('10. ProfitIndex calculation at ROI = 0% is 50', () => {
    assert.strictEqual(calculateProfitIndex({ economics: { roi: 0 } }), 50);
  });

  it('11. ProfitIndex calculation at ROI = 50% is 75', () => {
    assert.strictEqual(calculateProfitIndex({ economics: { roi: 50 } }), 75);
  });

  it('12. ProfitIndex calculation at ROI = 100% is 100', () => {
    assert.strictEqual(calculateProfitIndex({ economics: { roi: 100 } }), 100);
  });

  it('13. ProfitIndex calculation at ROI > 100% is clamped to 100', () => {
    assert.strictEqual(calculateProfitIndex({ economics: { roi: 200 } }), 100);
  });

  it('14. ProfitIndex returns 0 for missing or non-finite ROI', () => {
    assert.strictEqual(calculateProfitIndex({}), 0);
    assert.strictEqual(calculateProfitIndex({ roi: NaN }), 0);
    assert.strictEqual(calculateProfitIndex({ roi: Infinity }), 0);
  });

  it('15. SafetyIndex calculation at Risk = 0 is 100', () => {
    assert.strictEqual(calculateSafetyIndex({ risk: { overallRisk: 0 } }), 100);
  });

  it('16. SafetyIndex calculation at Risk = 14 is 86', () => {
    assert.strictEqual(calculateSafetyIndex({ risk: { overallRisk: 14 } }), 86);
  });

  it('17. SafetyIndex calculation at Risk = 25 is 75', () => {
    assert.strictEqual(calculateSafetyIndex({ risk: { overallRisk: 25 } }), 75);
  });

  it('18. SafetyIndex calculation at Risk = 100 is 0', () => {
    assert.strictEqual(calculateSafetyIndex({ risk: { overallRisk: 100 } }), 0);
  });

  it('19. SafetyIndex returns 0 for missing or non-finite risk', () => {
    assert.strictEqual(calculateSafetyIndex({}), 0);
    assert.strictEqual(calculateSafetyIndex({ overallRisk: NaN }), 0);
    assert.strictEqual(calculateSafetyIndex({ overallRisk: Infinity }), 0);
  });

  it('20. calculateDecision transparent breakdown and decisionScore calculation', () => {
    const input = {
      priorityProfile: 'balanced',
      yield: { total: 80, potentialYield: 16, areaAcres: 5 },
      economics: { roi: 60 },
      risk: { overallRisk: 14 }
    };

    const res = calculateDecision(input);
    assert.strictEqual(res.priorityProfile, 'balanced');
    assert.deepStrictEqual(res.weights, { yield: 0.35, profit: 0.30, safety: 0.35 });
    assert.strictEqual(res.indices.yield, 100);
    assert.strictEqual(res.indices.profit, 80); // (60 + 100) / 2 = 80
    assert.strictEqual(res.indices.safety, 86); // 100 - 14 = 86
    // Score = 0.35 * 100 + 0.30 * 80 + 0.35 * 86 = 35 + 24 + 30.1 = 89.1
    assert.strictEqual(res.decisionScore, 89.1);
  });

  it('21. Profile sensitivity (different profiles produce different scores for non-equal indices)', () => {
    const input = {
      yield: { total: 80, potentialYield: 16, areaAcres: 5 }, // index = 100
      economics: { roi: 20 }, // profit index = 60
      risk: { overallRisk: 50 } // safety index = 50
    };

    const bal = calculateDecision({ ...input, priorityProfile: 'balanced' });
    const maxP = calculateDecision({ ...input, priorityProfile: 'max_profit' });
    const safe = calculateDecision({ ...input, priorityProfile: 'play_safe' });

    assert.notStrictEqual(bal.decisionScore, maxP.decisionScore);
    assert.notStrictEqual(bal.decisionScore, safe.decisionScore);
    assert.notStrictEqual(maxP.decisionScore, safe.decisionScore);
  });

  it('22. Monotonicity: Higher yield index does not decrease score', () => {
    const baseInput = { priorityProfile: 'balanced', economics: { roi: 40 }, risk: { overallRisk: 20 } };
    const scoreLowYield = calculateDecisionScore({ ...baseInput, yield: { total: 40, potentialYield: 16, areaAcres: 5 } });
    const scoreHighYield = calculateDecisionScore({ ...baseInput, yield: { total: 80, potentialYield: 16, areaAcres: 5 } });
    assert.ok(scoreHighYield >= scoreLowYield);
  });

  it('23. Monotonicity: Higher profit index does not decrease score', () => {
    const baseInput = { priorityProfile: 'balanced', yield: { total: 80, potentialYield: 16, areaAcres: 5 }, risk: { overallRisk: 20 } };
    const scoreLowProfit = calculateDecisionScore({ ...baseInput, economics: { roi: 0 } });
    const scoreHighProfit = calculateDecisionScore({ ...baseInput, economics: { roi: 60 } });
    assert.ok(scoreHighProfit >= scoreLowProfit);
  });

  it('24. Monotonicity: Lower risk does not decrease score', () => {
    const baseInput = { priorityProfile: 'balanced', yield: { total: 80, potentialYield: 16, areaAcres: 5 }, economics: { roi: 40 } };
    const scoreHighRisk = calculateDecisionScore({ ...baseInput, risk: { overallRisk: 80 } });
    const scoreLowRisk = calculateDecisionScore({ ...baseInput, risk: { overallRisk: 20 } });
    assert.ok(scoreLowRisk >= scoreHighRisk);
  });

  it('25. Score bounds check (0 <= score <= 100) for edge cases', () => {
    const minInput = { priorityProfile: 'balanced', yield: { total: 0, potentialYield: 16, areaAcres: 5 }, economics: { roi: -200 }, risk: { overallRisk: 150 } };
    const maxInput = { priorityProfile: 'balanced', yield: { total: 200, potentialYield: 16, areaAcres: 5 }, economics: { roi: 300 }, risk: { overallRisk: -50 } };
    const resMin = calculateDecision(minInput);
    const resMax = calculateDecision(maxInput);

    assert.strictEqual(resMin.decisionScore, 0);
    assert.strictEqual(resMax.decisionScore, 100);
  });

  it('26. No NaN in Decision Engine outputs', () => {
    const res = calculateDecision({ priorityProfile: undefined, yield: undefined, economics: undefined, risk: undefined });
    assert.ok(!isNaN(res.decisionScore));
    assert.ok(!isNaN(res.indices.yield));
    assert.ok(!isNaN(res.indices.profit));
    assert.ok(!isNaN(res.indices.safety));
  });

  it('27. No Infinity in Decision Engine outputs', () => {
    const res = calculateDecision({
      yield: { total: 1e9, potentialYield: 1e-9, areaAcres: 1e-9 },
      economics: { roi: 1e9 },
      risk: { overallRisk: -1e9 }
    });
    assert.ok(isFinite(res.decisionScore));
    assert.ok(isFinite(res.indices.yield));
    assert.ok(isFinite(res.indices.profit));
    assert.ok(isFinite(res.indices.safety));
  });

  it('28. Input immutability check', () => {
    const input = {
      priorityProfile: 'play_safe',
      yield: { total: 80, potentialYield: 16, areaAcres: 5 },
      economics: { roi: 40 },
      risk: { overallRisk: 20 }
    };
    const copy = JSON.parse(JSON.stringify(input));
    calculateDecision(input);
    assert.deepStrictEqual(input, copy);
  });

  it('29. Deterministic repeated calculation', () => {
    const input = {
      priorityProfile: 'max_profit',
      yield: { total: 70, potentialYield: 16, areaAcres: 5 },
      economics: { roi: 50 },
      risk: { overallRisk: 30 }
    };
    const res1 = calculateDecision(input);
    const res2 = calculateDecision(input);
    assert.deepStrictEqual(res1, res2);
  });
});

describe('Cross-Engine Decision Integration Tests', () => {
  it('Full pipeline: Yield + Economics + Risk outputs piped into Decision Engine', () => {
    const yieldOutput = calculateYield({
      crop: 'wheat',
      areaAcres: 5,
      waterFactor: 1.0,
      weather: 'normal',
      planting: { type: 'on_time', delayDays: 0 }
    });
    const cropParams = getCropParameters('wheat');

    const economicsOutput = calculateEconomics({
      crop: 'wheat',
      areaAcres: 5,
      totalYield: yieldOutput.total,
      inputCostMultiplier: 1.0,
      irrigation: 'flood'
    });

    const riskOutput = calculateOverallRisk({
      waterFactor: 1.0,
      weather: 'normal',
      planting: { delayDays: 0 },
      financial: economicsOutput
    });

    const decisionResult = calculateDecision({
      priorityProfile: 'balanced',
      yield: {
        total: yieldOutput.total,
        potentialYield: cropParams.potentialYield,
        areaAcres: 5
      },
      economics: economicsOutput,
      risk: riskOutput
    });

    assert.ok(decisionResult);
    assert.strictEqual(decisionResult.priorityProfile, 'balanced');
    assert.ok(decisionResult.indices.yield > 0);
    assert.ok(decisionResult.indices.profit > 0);
    assert.ok(decisionResult.indices.safety > 0);
    assert.ok(decisionResult.decisionScore > 0 && decisionResult.decisionScore <= 100);
  });
});

describe('Attribution Engine Suite (Step 9)', () => {
  // Helper to build complete simulation outputs for testing
  function buildTestSimulation(scenario) {
    const cropParams = getCropParameters(scenario.crop || 'wheat');
    const water = calculateWater({
      crop: scenario.crop || 'wheat',
      areaAcres: scenario.areaAcres || 5,
      waterAvailabilityPercent: scenario.waterAvailabilityPercent ?? 100,
      irrigation: scenario.irrigation || 'flood'
    });

    const yieldRes = calculateYield({
      crop: scenario.crop || 'wheat',
      areaAcres: scenario.areaAcres || 5,
      waterFactor: water.waterFactor,
      weather: scenario.weather || 'normal',
      planting: scenario.planting || { type: 'on_time', delayDays: 0 }
    });

    const economics = calculateEconomics({
      crop: scenario.crop || 'wheat',
      areaAcres: scenario.areaAcres || 5,
      totalYield: yieldRes.total,
      inputCostMultiplier: scenario.inputCostMultiplier ?? 1.0,
      irrigation: scenario.irrigation || 'flood'
    });

    const risk = calculateOverallRisk({
      waterFactor: water.waterFactor,
      weather: scenario.weather || 'normal',
      planting: scenario.planting || { delayDays: 0 },
      financial: economics
    });

    const decision = calculateDecision({
      priorityProfile: scenario.priorityProfile || 'balanced',
      yield: {
        total: yieldRes.total,
        potentialYield: cropParams.potentialYield,
        areaAcres: scenario.areaAcres || 5
      },
      economics,
      risk
    });

    return {
      scenario,
      result: {
        water,
        yield: yieldRes,
        economics,
        risk,
        decision
      }
    };
  }

  // 1. Identical baseline and alternative
  it('1. Identical baseline and alternative scenario produces 0 changed inputs and 0 metric deltas', () => {
    const base = buildTestSimulation({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 100, weather: 'normal' });
    const alt = buildTestSimulation({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 100, weather: 'normal' });

    const attr = calculateAttribution({ baseline: base, alternative: alt });
    assert.strictEqual(attr.changedInputs.length, 0);
    assert.strictEqual(attr.metricDeltas.length, 0);
    assert.strictEqual(attr.summary.changedInputCount, 0);
    assert.strictEqual(attr.summary.changedMetricCount, 0);
    assert.strictEqual(attr.summary.changedCategories.length, 0);
  });

  // 2. One changed input
  it('2. One changed input (waterAvailabilityPercent 100 -> 75) is correctly detected', () => {
    const base = buildTestSimulation({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', areaAcres: 5, waterAvailabilityPercent: 75 });

    const attr = calculateAttribution({ baseline: base, alternative: alt });
    assert.strictEqual(attr.changedInputs.length, 1);
    assert.strictEqual(attr.changedInputs[0].field, 'waterAvailabilityPercent');
    assert.strictEqual(attr.changedInputs[0].baseline, 100);
    assert.strictEqual(attr.changedInputs[0].alternative, 75);
    assert.strictEqual(attr.changedInputs[0].delta, -25);
    assert.strictEqual(attr.changedInputs[0].direction, 'decrease');
  });

  // 3. Multiple changed inputs
  it('3. Multiple changed inputs are all detected in changedInputs array', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100, weather: 'normal', inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 80, weather: 'poor', inputCostMultiplier: 1.2 });

    const attr = calculateAttribution({ baseline: base, alternative: alt });
    assert.strictEqual(attr.changedInputs.length, 3);
    const fields = attr.changedInputs.map(i => i.field);
    assert.ok(fields.includes('waterAvailabilityPercent'));
    assert.ok(fields.includes('weather'));
    assert.ok(fields.includes('inputCostMultiplier'));
  });

  // 4. No changed inputs when values match
  it('4. No changed inputs reported when scenario parameters match', () => {
    const base = { scenario: { weather: 'good' }, result: {} };
    const alt = { scenario: { weather: 'good' }, result: {} };
    const attr = calculateAttribution({ baseline: base, alternative: alt });
    assert.strictEqual(attr.changedInputs.length, 0);
  });

  // 5. Water availability change detection
  it('5. Water availability change is detected with correct delta and unit', () => {
    const res = compareInputs({ waterAvailabilityPercent: 100 }, { waterAvailabilityPercent: 50 });
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].field, 'waterAvailabilityPercent');
    assert.strictEqual(res[0].delta, -50);
    assert.strictEqual(res[0].direction, 'decrease');
    assert.strictEqual(res[0].unit, '%');
  });

  // 6. Weather change detection
  it('6. Weather categorical change is detected', () => {
    const res = compareInputs({ weather: 'normal' }, { weather: 'poor' });
    assert.strictEqual(res.length, 1);
    assert.strictEqual(res[0].field, 'weather');
    assert.strictEqual(res[0].baseline, 'normal');
    assert.strictEqual(res[0].alternative, 'poor');
    assert.strictEqual(res[0].delta, null);
    assert.strictEqual(res[0].direction, 'changed');
  });

  // 7. Planting type change detection
  it('7. planting.type nested field change is detected as independent field', () => {
    const base = { planting: { type: 'on_time', delayDays: 0 } };
    const alt = { planting: { type: 'delayed', delayDays: 10 } };
    const res = compareInputs(base, alt);
    assert.strictEqual(res.length, 2);

    const typeChange = res.find(i => i.field === 'planting.type');
    const delayChange = res.find(i => i.field === 'planting.delayDays');

    assert.ok(typeChange);
    assert.strictEqual(typeChange.direction, 'changed');
    assert.ok(delayChange);
    assert.strictEqual(delayChange.delta, 10);
    assert.strictEqual(delayChange.direction, 'increase');
  });

  // 8. Planting delay change detection
  it('8. planting.delayDays increase is detected', () => {
    const res = compareInputs({ planting: { delayDays: 0 } }, { planting: { delayDays: 15 } });
    const delayItem = res.find(i => i.field === 'planting.delayDays');
    assert.ok(delayItem);
    assert.strictEqual(delayItem.delta, 15);
    assert.strictEqual(delayItem.direction, 'increase');
    assert.strictEqual(delayItem.unit, 'days');
  });

  // 9. Input cost multiplier change detection
  it('9. inputCostMultiplier change is detected', () => {
    const res = compareInputs({ inputCostMultiplier: 1.0 }, { inputCostMultiplier: 1.5 });
    const costItem = res.find(i => i.field === 'inputCostMultiplier');
    assert.ok(costItem);
    assert.strictEqual(costItem.delta, 0.5);
    assert.strictEqual(costItem.direction, 'increase');
  });

  // 10. Irrigation change detection
  it('10. Irrigation categorical change is detected', () => {
    const res = compareInputs({ irrigation: 'flood' }, { irrigation: 'sprinkler' });
    const irrItem = res.find(i => i.field === 'irrigation');
    assert.ok(irrItem);
    assert.strictEqual(irrItem.direction, 'changed');
    assert.strictEqual(irrItem.baseline, 'flood');
    assert.strictEqual(irrItem.alternative, 'sprinkler');
  });

  // 11. Priority profile change detection
  it('11. Priority profile change is detected', () => {
    const res = compareInputs({ priorityProfile: 'balanced' }, { priorityProfile: 'max_profit' });
    const profItem = res.find(i => i.field === 'priorityProfile');
    assert.ok(profItem);
    assert.strictEqual(profItem.direction, 'changed');
  });

  // 12. Unchanged input detection
  it('12. Unchanged inputs produce direction = unchanged in getChangeDirection', () => {
    assert.strictEqual(getChangeDirection(0, true), 'unchanged');
    assert.strictEqual(getChangeDirection(false, false), 'unchanged');
  });

  // 13. Positive delta (alternative > baseline)
  it('13. Positive delta convention (alternative - baseline)', () => {
    const deltas = compareMetrics({ profit: 40000 }, { profit: 45000 });
    assert.strictEqual(deltas.length, 1);
    assert.strictEqual(deltas[0].delta, 5000);
    assert.strictEqual(deltas[0].direction, 'increase');
  });

  // 14. Negative delta (alternative < baseline)
  it('14. Negative delta convention (alternative - baseline)', () => {
    const deltas = compareMetrics({ profit: 40000 }, { profit: 35000 });
    assert.strictEqual(deltas.length, 1);
    assert.strictEqual(deltas[0].delta, -5000);
    assert.strictEqual(deltas[0].direction, 'decrease');
  });

  // 15. Zero delta
  it('15. Zero delta is excluded from metricDeltas list', () => {
    const deltas = compareMetrics({ profit: 40000 }, { profit: 40000 });
    assert.strictEqual(deltas.length, 0);
  });

  // 16. Categorical change (riskLevel)
  it('16. Categorical metric change (riskLevel low -> medium) is detected', () => {
    const deltas = compareMetrics({ riskLevel: 'low' }, { riskLevel: 'medium' });
    assert.strictEqual(deltas.length, 1);
    assert.strictEqual(deltas[0].metric, 'riskLevel');
    assert.strictEqual(deltas[0].direction, 'changed');
    assert.strictEqual(deltas[0].delta, null);
  });

  // 17. Categorical unchanged
  it('17. Categorical metric unchanged (riskLevel low -> low) is excluded', () => {
    const deltas = compareMetrics({ riskLevel: 'low' }, { riskLevel: 'low' });
    assert.strictEqual(deltas.length, 0);
  });

  // 18. Water factor difference
  it('18. Water factor difference is included in water category impacts', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 50 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const waterCat = attr.attributions.find(a => a.category === 'water');
    assert.ok(waterCat);
    assert.strictEqual(waterCat.changed, true);
    assert.ok(waterCat.drivers.some(d => d.field === 'waterAvailabilityPercent'));
    assert.ok(waterCat.impacts.some(i => i.metric === 'waterFactor'));
  });

  // 19. Water draw difference
  it('19. Water drawn difference is detected', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 75 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const waterDrawnImpact = attr.metricDeltas.find(m => m.metric === 'waterDrawnM3');
    assert.ok(waterDrawnImpact);
    assert.ok(waterDrawnImpact.delta < 0);
    assert.strictEqual(waterDrawnImpact.direction, 'decrease');
  });

  // 20. Water productivity difference
  it('20. Water productivity difference is populated correctly', () => {
    const base = buildTestSimulation({ crop: 'wheat', weather: 'good' });
    const alt = buildTestSimulation({ crop: 'wheat', weather: 'poor' });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const prodImpact = attr.metricDeltas.find(m => m.metric === 'waterProductivityKgPerM3');
    assert.ok(prodImpact);
    assert.ok(!isNaN(prodImpact.delta));
    assert.ok(prodImpact.delta < 0);
  });

  // 21. Water risk difference
  it('21. Water risk difference is recorded in water category', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 }); // waterRisk = 0
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 50 }); // waterRisk = 50
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const waterRiskImpact = attr.metricDeltas.find(m => m.metric === 'waterRisk');
    assert.ok(waterRiskImpact);
    assert.strictEqual(waterRiskImpact.delta, 50);
    assert.strictEqual(waterRiskImpact.direction, 'increase');
  });

  // 22. Weather factor difference
  it('22. Weather factor difference is recorded in weather category', () => {
    const base = buildTestSimulation({ crop: 'wheat', weather: 'good' }); // factor = 1.0
    const alt = buildTestSimulation({ crop: 'wheat', weather: 'poor' }); // factor = 0.65
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const weatherCat = attr.attributions.find(a => a.category === 'weather');
    assert.ok(weatherCat);
    assert.strictEqual(weatherCat.changed, true);
    assert.ok(weatherCat.impacts.some(i => i.metric === 'weatherFactor'));
  });

  // 23. Weather yield difference
  it('23. Weather change alters yield and is reflected in weather category impacts', () => {
    const base = buildTestSimulation({ crop: 'wheat', weather: 'normal' });
    const alt = buildTestSimulation({ crop: 'wheat', weather: 'poor' });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const yieldImpact = attr.metricDeltas.find(m => m.metric === 'totalYield');
    assert.ok(yieldImpact);
    assert.ok(yieldImpact.delta < 0);
  });

  // 24. Weather risk difference
  it('24. Weather risk difference (30 -> 80) is recorded', () => {
    const base = buildTestSimulation({ crop: 'wheat', weather: 'normal' });
    const alt = buildTestSimulation({ crop: 'wheat', weather: 'poor' });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const wRiskImpact = attr.metricDeltas.find(m => m.metric === 'weatherRisk');
    assert.ok(wRiskImpact);
    assert.strictEqual(wRiskImpact.delta, 50);
  });

  // 25. Planting factor difference
  it('25. Delayed planting alters plantingFactor and is recorded in planting category', () => {
    const base = buildTestSimulation({ crop: 'wheat', planting: { type: 'on_time', delayDays: 0 } });
    const alt = buildTestSimulation({ crop: 'wheat', planting: { type: 'delayed', delayDays: 10 } });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const plantCat = attr.attributions.find(a => a.category === 'planting');
    assert.ok(plantCat);
    assert.strictEqual(plantCat.changed, true);
    assert.ok(plantCat.impacts.some(i => i.metric === 'plantingFactor'));
  });

  // 26. Planting risk difference
  it('26. Delayed planting increases plantingRisk', () => {
    const base = buildTestSimulation({ crop: 'wheat', planting: { delayDays: 0 } });
    const alt = buildTestSimulation({ crop: 'wheat', planting: { delayDays: 10 } });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const pRiskImpact = attr.metricDeltas.find(m => m.metric === 'plantingRisk');
    assert.ok(pRiskImpact);
    assert.strictEqual(pRiskImpact.delta, 35);
  });

  // 27. Delayed planting overall impact
  it('27. Delayed planting reduces yield and profit', () => {
    const base = buildTestSimulation({ crop: 'wheat', planting: { delayDays: 0 } });
    const alt = buildTestSimulation({ crop: 'wheat', planting: { delayDays: 20 } });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const yieldImpact = attr.metricDeltas.find(m => m.metric === 'totalYield');
    const profitImpact = attr.metricDeltas.find(m => m.metric === 'profit');
    assert.ok(yieldImpact && yieldImpact.delta < 0);
    assert.ok(profitImpact && profitImpact.delta < 0);
  });

  // 28. Financial input cost multiplier affects cost
  it('28. inputCostMultiplier change increases total cost and decreases profit', () => {
    const base = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.5 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const costImpact = attr.metricDeltas.find(m => m.metric === 'totalCost' || m.metric === 'baseCost');
    const profitImpact = attr.metricDeltas.find(m => m.metric === 'profit');
    assert.ok(costImpact && costImpact.delta > 0);
    assert.ok(profitImpact && profitImpact.delta < 0);
  });

  // 29. SPECIAL INVARIANT TEST 1 (Section 32): inputCostMultiplier does NOT alter yield!
  it('29. Special Invariant 1: inputCostMultiplier change alone MUST NOT alter totalYield or YieldIndex', () => {
    const base = buildTestSimulation({ crop: 'wheat', areaAcres: 5, inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', areaAcres: 5, inputCostMultiplier: 1.8 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const yieldDelta = attr.metricDeltas.find(m => m.metric === 'totalYield');
    const yieldIndexDelta = attr.metricDeltas.find(m => m.metric === 'yieldIndex');

    assert.strictEqual(yieldDelta, undefined, 'totalYield must remain strictly unchanged');
    assert.strictEqual(yieldIndexDelta, undefined, 'yieldIndex must remain strictly unchanged');

    const finCat = attr.attributions.find(a => a.category === 'financial');
    assert.strictEqual(finCat.changed, true);
  });

  // 30. Irrigation affects irrigation cost
  it('30. Irrigation change (flood -> drip) alters irrigationCost and totalCost', () => {
    const base = buildTestSimulation({ crop: 'wheat', irrigation: 'flood' });
    const alt = buildTestSimulation({ crop: 'wheat', irrigation: 'drip' });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const irrCostImpact = attr.metricDeltas.find(m => m.metric === 'irrigationCost');
    assert.ok(irrCostImpact);
    assert.ok(irrCostImpact.delta > 0);
    assert.strictEqual(irrCostImpact.direction, 'increase');
  });

  // 31. Profit difference
  it('31. Profit difference is recorded with INR unit', () => {
    const base = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.2 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const profitImpact = attr.metricDeltas.find(m => m.metric === 'profit');
    assert.ok(profitImpact);
    assert.strictEqual(profitImpact.unit, 'INR');
  });

  // 32. ROI difference
  it('32. ROI difference is recorded with % unit', () => {
    const base = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.2 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const roiImpact = attr.metricDeltas.find(m => m.metric === 'roi');
    assert.ok(roiImpact);
    assert.strictEqual(roiImpact.unit, '%');
  });

  // 33. Yield index difference
  it('33. Yield index difference is recorded with score unit', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 50 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const yIndexImpact = attr.metricDeltas.find(m => m.metric === 'yieldIndex');
    assert.ok(yIndexImpact);
    assert.strictEqual(yIndexImpact.unit, 'score');
  });

  // 34. Profit index difference
  it('34. Profit index difference is recorded in decision category impacts', () => {
    const base = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', inputCostMultiplier: 1.4 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const pIndexImpact = attr.metricDeltas.find(m => m.metric === 'profitIndex');
    assert.ok(pIndexImpact);
  });

  // 35. Safety index difference
  it('35. Safety index difference is recorded in decision category impacts', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 50 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const sIndexImpact = attr.metricDeltas.find(m => m.metric === 'safetyIndex');
    assert.ok(sIndexImpact);
  });

  // 36. Decision score difference
  it('36. Decision score difference is recorded when inputs change', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 60 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const scoreImpact = attr.metricDeltas.find(m => m.metric === 'decisionScore');
    assert.ok(scoreImpact);
    assert.ok(scoreImpact.delta < 0);
  });

  // 37. SPECIAL INVARIANT TEST 2 (Section 33): Priority profile change alone
  it('37. Special Invariant 2: Priority profile change alone MUST NOT change physical scenario outputs (yield, cost, profit, risk)', () => {
    const base = buildTestSimulation({ crop: 'wheat', priorityProfile: 'balanced' });
    const alt = buildTestSimulation({ crop: 'wheat', priorityProfile: 'max_profit' });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const physYield = attr.metricDeltas.find(m => m.metric === 'totalYield');
    const physCost = attr.metricDeltas.find(m => m.metric === 'totalCost');
    const physProfit = attr.metricDeltas.find(m => m.metric === 'profit');
    const physRisk = attr.metricDeltas.find(m => m.metric === 'overallRisk');

    assert.strictEqual(physYield, undefined);
    assert.strictEqual(physCost, undefined);
    assert.strictEqual(physProfit, undefined);
    assert.strictEqual(physRisk, undefined);

    const decCat = attr.attributions.find(a => a.category === 'decision');
    assert.strictEqual(decCat.changed, true);

    const physCats = attr.attributions.filter(a => a.category !== 'decision');
    for (const cat of physCats) {
      assert.strictEqual(cat.changed, false, `Category ${cat.category} must be unchanged when only priorityProfile changes`);
    }
  });

  // 38. SPECIAL INVARIANT TEST 3 (Section 34): Irrigation change (flood -> sprinkler)
  it('38. Special Invariant 3: Irrigation change alone MUST NOT claim water factor or water drawn change under MVP model', () => {
    const base = buildTestSimulation({ crop: 'wheat', irrigation: 'flood' });
    const alt = buildTestSimulation({ crop: 'wheat', irrigation: 'sprinkler' });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    const waterFactorDelta = attr.metricDeltas.find(m => m.metric === 'waterFactor');
    const waterDrawnDelta = attr.metricDeltas.find(m => m.metric === 'waterDrawnM3');
    assert.strictEqual(waterFactorDelta, undefined);
    assert.strictEqual(waterDrawnDelta, undefined);

    const waterCat = attr.attributions.find(a => a.category === 'water');
    assert.strictEqual(waterCat.changed, false);

    const irrCat = attr.attributions.find(a => a.category === 'irrigation');
    assert.strictEqual(irrCat.changed, true);
  });

  // 39. Missing values safety
  it('39. Missing values in baseline/alternative do not throw errors', () => {
    const attr = calculateAttribution({ baseline: {}, alternative: {} });
    assert.ok(attr);
    assert.strictEqual(attr.changedInputs.length, 0);
    assert.strictEqual(attr.metricDeltas.length, 0);
  });

  // 40. Null values safety
  it('40. Null baseline and alternative inputs handled safely', () => {
    const attr1 = calculateAttribution(null);
    const attr2 = calculateAttribution(undefined);
    assert.ok(attr1);
    assert.ok(attr2);
    assert.strictEqual(attr1.changedInputs.length, 0);
    assert.strictEqual(attr2.changedInputs.length, 0);
  });

  // 41. NaN inputs safety
  it('41. NaN metric values do not produce NaN deltas', () => {
    const base = { result: { profit: NaN, totalYield: 50 } };
    const alt = { result: { profit: 40000, totalYield: 50 } };
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    for (const m of attr.metricDeltas) {
      assert.ok(!isNaN(m.delta));
    }
  });

  // 42. Infinity inputs safety
  it('42. Infinity metric values do not produce Infinity deltas', () => {
    const base = { result: { profit: Infinity } };
    const alt = { result: { profit: 40000 } };
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    for (const m of attr.metricDeltas) {
      assert.ok(isFinite(m.delta));
    }
  });

  // 43. No NaN/Infinity in output
  it('43. No NaN or Infinity in any attribution result field', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 50 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 80 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    for (const inp of attr.changedInputs) {
      if (inp.delta !== null) {
        assert.ok(!isNaN(inp.delta));
        assert.ok(isFinite(inp.delta));
      }
    }
    for (const m of attr.metricDeltas) {
      if (m.delta !== null) {
        assert.ok(!isNaN(m.delta));
        assert.ok(isFinite(m.delta));
      }
    }
  });

  // 44. Input immutability
  it('44. Input immutability check for calculateAttribution', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 75 });
    const baseCopy = JSON.parse(JSON.stringify(base));
    const altCopy = JSON.parse(JSON.stringify(alt));

    calculateAttribution({ baseline: base, alternative: alt });
    assert.deepStrictEqual(base, baseCopy);
    assert.deepStrictEqual(alt, altCopy);
  });

  // 45. Deterministic repeated calculation
  it('45. Deterministic repeated calculation produces identical outputs', () => {
    const base = buildTestSimulation({ crop: 'rice', waterAvailabilityPercent: 100, weather: 'normal' });
    const alt = buildTestSimulation({ crop: 'rice', waterAvailabilityPercent: 80, weather: 'poor' });

    const attr1 = calculateAttribution({ baseline: base, alternative: alt });
    const attr2 = calculateAttribution({ baseline: base, alternative: alt });

    assert.deepStrictEqual(attr1, attr2);
  });

  // 46. Categorical change direction test helper
  it('46. getChangeDirection correctly identifies numeric and categorical directions', () => {
    assert.strictEqual(getChangeDirection(10, true), 'increase');
    assert.strictEqual(getChangeDirection(-5, true), 'decrease');
    assert.strictEqual(getChangeDirection(0, true), 'unchanged');
    assert.strictEqual(getChangeDirection(true, false), 'changed');
    assert.strictEqual(getChangeDirection(false, false), 'unchanged');
  });

  // 47. Summary output validation
  it('47. Summary object reflects correct counts and changed category keys', () => {
    const base = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 100, inputCostMultiplier: 1.0 });
    const alt = buildTestSimulation({ crop: 'wheat', waterAvailabilityPercent: 70, inputCostMultiplier: 1.2 });
    const attr = calculateAttribution({ baseline: base, alternative: alt });

    assert.strictEqual(attr.summary.changedInputCount, 2);
    assert.ok(attr.summary.changedMetricCount > 0);
    assert.ok(attr.summary.changedCategories.includes('water'));
    assert.ok(attr.summary.changedCategories.includes('financial'));
  });

  // 48. Full cross-engine attribution pipeline test
  it('48. Full Cross-Engine Attribution Pipeline: Realistic Baseline vs Alternative', () => {
    const baselineScenario = {
      crop: 'wheat',
      areaAcres: 5,
      waterAvailabilityPercent: 100,
      weather: 'normal',
      planting: { type: 'on_time', delayDays: 0 },
      inputCostMultiplier: 1.0,
      irrigation: 'flood',
      priorityProfile: 'balanced'
    };

    const alternativeScenario = {
      crop: 'wheat',
      areaAcres: 5,
      waterAvailabilityPercent: 75,
      weather: 'poor',
      planting: { type: 'delayed', delayDays: 10 },
      inputCostMultiplier: 1.2,
      irrigation: 'sprinkler',
      priorityProfile: 'max_profit'
    };

    const baseSim = buildTestSimulation(baselineScenario);
    const altSim = buildTestSimulation(alternativeScenario);

    const attr = calculateAttribution({ baseline: baseSim, alternative: altSim });

    assert.ok(attr);
    assert.strictEqual(attr.summary.changedInputCount, 7); // water, weather, planting.type, planting.delayDays, costMultiplier, irrigation, profile
    assert.ok(attr.summary.changedMetricCount > 5);
    assert.strictEqual(attr.summary.changedCategories.length, 6);

    const waterCat = attr.attributions.find(a => a.category === 'water');
    const weatherCat = attr.attributions.find(a => a.category === 'weather');
    const plantingCat = attr.attributions.find(a => a.category === 'planting');
    const financialCat = attr.attributions.find(a => a.category === 'financial');
    const irrCat = attr.attributions.find(a => a.category === 'irrigation');
    const decCat = attr.attributions.find(a => a.category === 'decision');

    assert.strictEqual(waterCat.changed, true);
    assert.strictEqual(weatherCat.changed, true);
    assert.strictEqual(plantingCat.changed, true);
    assert.strictEqual(financialCat.changed, true);
    assert.strictEqual(irrCat.changed, true);
    assert.strictEqual(decCat.changed, true);
  });
});


