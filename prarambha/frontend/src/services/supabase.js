import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export function getAuthRedirectUrl() {
  const configuredUrl = import.meta.env.VITE_APP_URL?.trim()
  if (configuredUrl) return `${configuredUrl.replace(/\/$/, "")}/login`
  if (typeof window !== "undefined") return `${window.location.origin}/login`
  return undefined
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase authentication is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.")
  }
  return supabase
}
