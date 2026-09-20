import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { calculateSimulation } from "../simulation/simulation.engine.js";

function mapCropParameters(row) {
  return {
    crop: row.crop_code,
    name: row.display_name,
    season: row.season.toLowerCase(),
    potentialYield: Number(row.potential_yield_q_per_acre),
    pricePerUnit: Number(row.price_inr_per_q),
    baseCostPerAcre: Number(row.base_cost_inr_per_acre),
    waterRequirementMm: Number(row.water_need_mm),
  };
}

export async function runSimulation(input) {
  const { data: crop, error } = await getSupabaseClient()
    .from("crop_params")
    .select("*")
    .eq("crop_code", input.crop)
    .eq("active", true)
    .maybeSingle();

  if (error) throw new Error(`Unable to load crop parameters: ${error.message}`);
  if (!crop) throw new Error(`No active crop parameters exist for '${input.crop}'.`);

  const result = calculateSimulation({
    ...input,
    customCropParams: mapCropParameters(crop),
  });

  if (!result) throw new Error("The simulation engine could not produce a result.");

  return {
    ...result,
    estimated: true,
    decisionScore: result.decision.decisionScore,
  };
}
