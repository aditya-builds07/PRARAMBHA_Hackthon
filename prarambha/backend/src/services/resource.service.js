import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listResourcesByFarm(farmId) {
  const { data, error } = await getSupabaseClient()
    .from("resources")
    .select("*")
    .eq("farm_id", farmId)
    .order("resource_type", { ascending: true });

  if (error) throw new Error(`Unable to load resources: ${error.message}`);
  return data;
}

export async function createResource(resource) {
  const { data, error } = await getSupabaseClient()
    .from("resources")
    .insert(resource)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create resource: ${error.message}`);
  return data;
}
