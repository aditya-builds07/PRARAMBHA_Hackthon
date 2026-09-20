/**
 * api.js — central HTTP client for all backend calls.
 *
 * Rules:
 * - All calls return { data, error }; never throw to the caller.
 * - Base URL from VITE_API_BASE_URL (never hard-coded).
 * - No secrets, no auth tokens in this file.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001"

let memoryToken = null;

export function setAuthToken(token) {
  memoryToken = token;
}

export function getAuthToken() {
  if (memoryToken) return memoryToken;
  if (typeof window !== "undefined") {
    try {
      return (
        localStorage.getItem("supabase_token") ||
        localStorage.getItem("sb-access-token") ||
        sessionStorage.getItem("sb-access-token") ||
        null
      );
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * @param {string} path   e.g. "/api/farms"
 * @param {RequestInit & { signal?: AbortSignal }} [options]
 * @returns {Promise<{ data: any, error: string|null }>}
 */
async function request(path, options = {}) {
  try {
    const token = getAuthToken();
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
      const message = body?.error?.message ?? body?.message ?? `HTTP ${res.status}`;
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
