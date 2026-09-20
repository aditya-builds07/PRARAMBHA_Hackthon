import { getSupabaseClient } from '../adapters/db/supabase.client.js';

/** Records only successful mutations, providing a durable ownership-aware history. */
export async function recordAudit({ userId, entityType, entityId, action, metadata = {} }) {
  const { error } = await getSupabaseClient().from('audit_logs').insert({
    auth_user_id: userId,
    entity_type: entityType,
    entity_id: entityId,
    action,
    metadata,
  });
  if (error) throw new Error(`Unable to record audit event: ${error.message}`);
}
