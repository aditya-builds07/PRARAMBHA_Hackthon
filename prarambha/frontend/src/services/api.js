/**
 * api.js — central HTTP client for all backend calls.
 *
 * Rules:
 * - All calls return { data, error }; never throw to the caller.
 * - Base URL from VITE_API_BASE_URL (never hard-coded).
 * - No secrets, no auth tokens in this file.
 */
import { supabase } from "./supabase.js"

/**
 * Resolves the backend API base URL safely across environments:
 * - If VITE_API_BASE_URL is a configured remote URL, use it.
 * - In local development (localhost / 127.0.0.1 / DEV), use localhost:3001.
 * - In production (e.g. Vercel deployment), always default to live Render backend.
 */
const getBaseUrl = () => {
  const envUrl = import.meta?.env?.VITE_API_BASE_URL;
  const isLocalhost =
    (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
       window.location.hostname === "127.0.0.1")) ||
    import.meta?.env?.DEV;

  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl.replace(/\/$/, "");
  }

  if (isLocalhost) {
    return (envUrl || "http://localhost:3001").replace(/\/$/, "");
  }

  return "https://krishimitra-api-hfqt.onrender.com";
};

const BASE_URL = getBaseUrl();

let memoryToken = null;

export function setAuthToken(token) {
  memoryToken = token;
}

export function getAuthToken() {
  if (memoryToken) return memoryToken;
  return null;
}

/**
 * @param {string} path   e.g. "/api/farms"
 * @param {RequestInit & { signal?: AbortSignal }} [options]
 * @returns {Promise<{ data: any, error: string|null }>}
 */
async function request(path, options = {}) {
  try {
    let token = getAuthToken();
    if (!token && supabase) {
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token ?? null;
      setAuthToken(token);
    }
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = body?.error?.message ?? (typeof body?.error === "string" ? body.error : null) ?? body?.message ?? `HTTP ${res.status}`;
      return { data: null, error: message };
    }

    const body = await res.json();
    // Standard response envelope support: { success: true, data: ... }
    const data =
      body && typeof body === "object" && body.success === true && "data" in body
        ? body.data
        : body;

    return { data, error: null };
  } catch (err) {
    if (err.name === "AbortError") return { data: null, error: "AbortError" };
    console.error("[api] request failed:", path, err);
    return { data: null, error: err.message ?? "Network error" };
  }
}

export const api = {
  get:    (path, signal)       => request(path, { method: "GET", signal }),
  post:   (path, body, signal) => request(path, { method: "POST",   body: JSON.stringify(body), signal }),
  put:    (path, body, signal) => request(path, { method: "PUT",    body: JSON.stringify(body), signal }),
  delete: (path, signal)       => request(path, { method: "DELETE", signal }),
};
