export async function listFarms(supabase, userId) {
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('auth_user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Unable to load farms: ${error.message}`);
  return data;
}

export async function createFarm(supabase, farm, userId) {
  const { auth_user_id, ...cleanFarm } = farm;
  const { data, error } = await supabase
    .from('farms')
    .insert({ ...cleanFarm, auth_user_id: userId })
    .select('*')
    .single();

  if (error) throw new Error(`Unable to create farm: ${error.message}`);
  return data;
}

export async function getFarmById(supabase, farmId, userId) {
  let query = supabase.from('farms').select('*').eq('id', farmId);
  if (userId) query = query.eq('auth_user_id', userId);
  const { data, error } = await query.maybeSingle();

  if (error) throw new Error(`Unable to load farm: ${error.message}`);
  return data;
}

export async function updateFarm(supabase, id, farm, userId) {
  const { auth_user_id, ...cleanFarm } = farm;
  const { data, error } = await supabase
    .from('farms').update(cleanFarm).eq('id', id).eq('auth_user_id', userId).select('*').maybeSingle();
  if (error) throw new Error(`Unable to update farm: ${error.message}`);
  if (!data) throw new Error('Farm not found.');
  return data;
}

export async function deleteFarmById(supabase, id, userId) {
  const { data, error } = await supabase
    .from('farms').delete().eq('id', id).eq('auth_user_id', userId).select('id').maybeSingle();
  if (error) throw new Error(`Unable to delete farm: ${error.message}`);
  if (!data) throw new Error('Farm not found.');
  return data;
}
