import { createUserClient } from "./supabase.user.client.js";
import { getRequestSupabaseClient } from "./supabase.context.js";

export { createUserClient };

export function getUserScopedClient(userJwt) {
  return createUserClient(userJwt);
}

export function getSupabaseClient() {
  return getRequestSupabaseClient();
}
