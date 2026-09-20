/**
 * PRARAMBHA 2.0 - Centralized Crop Baseline Parameters
 * Configurable baseline parameters for supported simulation crops.
 * All water requirements are stored strictly in source unit (mm).
 */

export const DEFAULT_CROP_PARAMETERS = {
  wheat: {
    crop: 'wheat',
    name: 'Wheat',
    season: 'rabi',
    potentialYield: 16, // q/acre
    pricePerUnit: 2400, // ₹/q
    baseCostPerAcre: 24000, // ₹/acre
    waterRequirementMm: 450, // mm
    unit: 'quintal'
  },
  rice: {
    crop: 'rice',
    name: 'Rice',
    season: 'kharif',
    potentialYield: 22, // q/acre
    pricePerUnit: 2300, // ₹/q
    baseCostPerAcre: 32000, // ₹/acre
    waterRequirementMm: 1200, // mm
    unit: 'quintal'
  },
  maize: {
    crop: 'maize',
    name: 'Maize',
    season: 'kharif',
    potentialYield: 24, // q/acre
    pricePerUnit: 2100, // ₹/q
    baseCostPerAcre: 30000, // ₹/acre
    waterRequirementMm: 600, // mm
    unit: 'quintal'
  },
  sugarcane: {
    crop: 'sugarcane',
    name: 'Sugarcane',
    season: 'annual',
    potentialYield: 320, // q/acre
    pricePerUnit: 350, // ₹/q
    baseCostPerAcre: 85000, // ₹/acre
    waterRequirementMm: 1800, // mm
    unit: 'quintal'
  },
  soybean: {
    crop: 'soybean',
    name: 'Soybean',
    season: 'kharif',
    potentialYield: 8, // q/acre
    pricePerUnit: 4600, // ₹/q
    baseCostPerAcre: 21000, // ₹/acre
    waterRequirementMm: 450, // mm
    unit: 'quintal'
  },
  cotton: {
    crop: 'cotton',
    name: 'Cotton',
    season: 'kharif',
    potentialYield: 8, // q/acre
    pricePerUnit: 7000, // ₹/q
    baseCostPerAcre: 34000, // ₹/acre
    waterRequirementMm: 700, // mm
    unit: 'quintal'
  }
};

/**
 * Validates crop parameters data integrity.
 * @param {Object} params - Crop parameter object
 * @returns {boolean} True if valid
 */
export function validateCropParameter(params) {
  if (!params || typeof params !== 'object') return false;
  if (!params.crop || typeof params.crop !== 'string') return false;
  if (!params.name || typeof params.name !== 'string') return false;
  if (!params.season || typeof params.season !== 'string') return false;
  if (typeof params.potentialYield !== 'number' || isNaN(params.potentialYield) || params.potentialYield <= 0) return false;
  if (typeof params.pricePerUnit !== 'number' || isNaN(params.pricePerUnit) || params.pricePerUnit < 0) return false;
  if (typeof params.baseCostPerAcre !== 'number' || isNaN(params.baseCostPerAcre) || params.baseCostPerAcre < 0) return false;
  if (typeof params.waterRequirementMm !== 'number' || isNaN(params.waterRequirementMm) || params.waterRequirementMm < 0) return false;
  return true;
}

/**
 * Retrieve crop parameters by crop key with optional custom overrides.
 * Returns null if crop is unknown.
 * 
 * @param {string} cropKey - Crop identifier (e.g. 'wheat')
 * @param {Object} [customParams={}] - Optional parameter overrides
 * @returns {Object|null} Configured crop parameter object or null if unknown
 */
export function getCropParameters(cropKey, customParams = {}) {
  if (!cropKey || typeof cropKey !== 'string') {
    return null;
  }
  const key = cropKey.toLowerCase().trim();
  const base = DEFAULT_CROP_PARAMETERS[key];
  if (!base) {
    return null;
  }
  const result = {
    ...base,
    ...customParams
  };

  return validateCropParameter(result) ? result : null;
}

/**
 * Returns array of all default crop parameter configuration objects.
 * @returns {Array<Object>}
 */
export function getAllCropParameters() {
  return Object.values(DEFAULT_CROP_PARAMETERS);
}
