import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { assertFarmOwnership } from "./authorization.service.js";

export async function listResourcesByFarm(farmId, userId) {
  if (userId) await assertFarmOwnership(farmId, userId);
  const { data, error } = await getSupabaseClient()
    .from("resources")
    .select("*")
    .eq("farm_id", farmId)
    .order("resource_type", { ascending: true });

  if (error) throw new Error(`Unable to load resources: ${error.message}`);
  return data;
}

export async function createResource(resource, userId) {
  if (userId) await assertFarmOwnership(resource.farm_id, userId);
  const { data, error } = await getSupabaseClient()
    .from("resources")
    .insert(resource)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create resource: ${error.message}`);
  return data;
}

export async function updateResource(id, resource, userId) {
  const { data: current, error: currentError } = await getSupabaseClient()
    .from('resources').select('id, farm_id').eq('id', id).maybeSingle();
  if (currentError) throw new Error(`Unable to load resource: ${currentError.message}`);
  if (!current) throw new Error('Resource not found.');
  if (userId) {
    await assertFarmOwnership(current.farm_id, userId);
    await assertFarmOwnership(resource.farm_id, userId);
  }
  const { data, error } = await getSupabaseClient()
    .from('resources').update(resource).eq('id', id).select('*').maybeSingle();
  if (error) throw new Error(`Unable to update resource: ${error.message}`);
  if (!data) throw new Error('Resource not found.');
  return data;
}

export async function upsertResourceForFarm(farmId, resource, userId) {
  if (userId) await assertFarmOwnership(farmId, userId);
  const { data, error } = await getSupabaseClient()
    .from("resources")
    .upsert(
      { ...resource, farm_id: farmId, updated_at: new Date().toISOString() },
      { onConflict: "farm_id,resource_type,label" },
    )
    .select("*")
    .single();

  if (error) throw new Error(`Unable to update resource: ${error.message}`);
  return data;
}
