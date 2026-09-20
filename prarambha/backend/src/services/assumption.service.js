import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { MODEL_VERSION, ASSUMPTIONS_VERSION } from "../simulation/model.version.js";

const DEFAULT_ASSUMPTIONS = {
  modelVersion: MODEL_VERSION,
  assumptionVersion: ASSUMPTIONS_VERSION,
  disclaimer: "Estimated values are model-based approximations and do not constitute guaranteed results.",
  riskWeights: {
    waterStress: 0.35,
    weatherAnomaly: 0.25,
    delayedSowing: 0.20,
    capitalExposure: 0.20,
  },
  priorityWeights: {
    balanced: { profit: 0.35, yield: 0.25, risk: 0.20, water: 0.20 },
    max_profit: { profit: 0.60, yield: 0.20, risk: 0.10, water: 0.10 },
    play_safe: { profit: 0.20, yield: 0.20, risk: 0.40, water: 0.20 },
  },
};

export async function listActiveAssumptions() {
  try {
    const { data, error } = await getSupabaseClient()
      .from("assumptions")
      .select("key, value, description, source, version")
      .eq("active", true)
      .order("key", { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (_err) {
    // Database offline/unreachable fallback
  }

  return DEFAULT_ASSUMPTIONS;
}
