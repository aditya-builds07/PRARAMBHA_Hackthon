import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { DEFAULT_CROP_PARAMETERS } from "../simulation/crop.parameters.js";

export async function listActiveCrops() {
  try {
    const { data, error } = await getSupabaseClient()
      .from("crop_params")
      .select("*")
      .eq("active", true)
      .order("display_name", { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data;
    }
  } catch (_err) {
    // Database offline/unreachable fallback
  }

  return Object.values(DEFAULT_CROP_PARAMETERS).map((c) => ({
    crop_code: c.crop,
    display_name: c.name,
    season: c.season,
    potential_yield_q_per_acre: c.potentialYield,
    price_inr_per_q: c.pricePerUnit,
    base_cost_inr_per_acre: c.baseCostPerAcre,
    water_need_mm: c.waterRequirementMm,
    active: true,
  }));
}
