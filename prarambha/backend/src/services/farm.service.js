import { getSupabaseClient } from "../adapters/db/supabase.client.js";

export async function listFarms(userId) {
  const { data, error } = await getSupabaseClient()
    .from("farms")
    .select("*")
    .eq('auth_user_id', userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Unable to load farms: ${error.message}`);
  return data;
}

export async function createFarm(farm, userId) {
  const { data, error } = await getSupabaseClient()
    .from("farms")
    .insert({ ...farm, auth_user_id: userId })
    .select("*")
    .single();

  if (error) throw new Error(`Unable to create farm: ${error.message}`);
  return data;
}

export async function updateFarm(id, farm, userId) {
  const { data, error } = await getSupabaseClient()
    .from('farms').update(farm).eq('id', id).eq('auth_user_id', userId).select('*').maybeSingle();
  if (error) throw new Error(`Unable to update farm: ${error.message}`);
  if (!data) throw new Error('Farm not found.');
  return data;
}

export async function deleteFarmById(id, userId) {
  const { data, error } = await getSupabaseClient()
    .from('farms').delete().eq('id', id).eq('auth_user_id', userId).select('id').maybeSingle();
  if (error) throw new Error(`Unable to delete farm: ${error.message}`);
  if (!data) throw new Error('Farm not found.');
  return data;
}
