import { createClient } from "@supabase/supabase-js"

const DEFAULT_SUPABASE_URL = "https://ltzpntlwnqkuzoybtwdg.supabase.co"
const DEFAULT_SUPABASE_KEY = "sb_publishable_eK0B2yFF3boJGIUTf_Epxw_3o1pnOA_"

const getEnv = (key, fallback = "") => {
  try {
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
      return import.meta.env[key]
    }
  } catch {}
  try {
    if (typeof process !== "undefined" && process.env && process.env[key]) {
      return process.env[key]
    }
  } catch {}
  return fallback
}

const supabaseUrl = getEnv("VITE_SUPABASE_URL", DEFAULT_SUPABASE_URL)
const supabaseKey = getEnv("VITE_SUPABASE_PUBLISHABLE_KEY", DEFAULT_SUPABASE_KEY) || getEnv("VITE_SUPABASE_ANON_KEY", DEFAULT_SUPABASE_KEY)

export function getAuthRedirectUrl() {
  if (typeof window !== "undefined" && window.location?.origin && !window.location.origin.includes("localhost") && !window.location.origin.includes("127.0.0.1")) {
    return `${window.location.origin}/login`
  }
  const configuredUrl = getEnv("VITE_APP_URL", "")
  if (configuredUrl) return `${configuredUrl.replace(/\/$/, "")}/login`
  if (typeof window !== "undefined" && window.location?.origin) return `${window.location.origin}/login`
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
