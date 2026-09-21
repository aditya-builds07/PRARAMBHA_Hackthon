import { AsyncLocalStorage } from "node:async_hooks";

export const supabaseRequestContext = new AsyncLocalStorage();

export function getRequestSupabaseClient() {
  return supabaseRequestContext.getStore();
}
