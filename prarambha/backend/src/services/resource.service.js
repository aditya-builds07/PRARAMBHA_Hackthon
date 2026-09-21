import { getUserScopedClient } from "../adapters/db/supabase.client.js";

async function assertFarmOwnership(supabase, farmId, userId) {
  const { data, error } = await supabase
    .from('farms').select('id').eq('id', farmId).eq('auth_user_id', userId).maybeSingle();
  if (error) throw new Error(`Unable to verify farm ownership: ${error.message}`);
  if (!data) throw new Error('Farm not found.');
}

export async function listResourcesByFarm(supabase, farmId, userId) {
  const db = supabase || getUserScopedClient();
  if (userId) await assertFarmOwnership(db, farmId, userId);
  const { data, error } = await db
    .from("resources")
    .select("*")
    .eq("farm_id", farmId)
    .order("resource_type", { ascending: true });

  if (error) throw new Error(`Unable to load resources: ${error.message}`);
  return data;
}

export async function createResource(supabase, resource, userId) {
  const db = supabase || getUserScopedClient();
  if (userId) await assertFarmOwnership(db, resource.farm_id, userId);
  const { data, error } = await db
    .from("resources")
    .insert(resource)
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create resource: ${error.message}`);
  return data;
}

export async function updateResource(supabase, id, resource, userId) {
  const db = supabase || getUserScopedClient();
  const { data: current, error: currentError } = await db
    .from('resources').select('id, farm_id').eq('id', id).maybeSingle();
  if (currentError) throw new Error(`Unable to load resource: ${currentError.message}`);
  if (!current) throw new Error('Resource not found.');
  if (userId) {
    await assertFarmOwnership(db, current.farm_id, userId);
    await assertFarmOwnership(db, resource.farm_id, userId);
  }
  const { data, error } = await db
    .from('resources').update(resource).eq('id', id).select('*').maybeSingle();
  if (error) throw new Error(`Unable to update resource: ${error.message}`);
  if (!data) throw new Error('Resource not found.');
  return data;
}

export async function upsertResourceForFarm(supabase, farmId, resource, userId) {
  const db = supabase || getUserScopedClient();
  if (userId) await assertFarmOwnership(db, farmId, userId);
  const { data, error } = await db
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
