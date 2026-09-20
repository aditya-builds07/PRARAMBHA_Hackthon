/**
 * api.js — central HTTP client for all backend calls.
 *
 * Rules:
 * - All calls return { data, error }; never throw to the caller.
 * - Base URL from VITE_API_BASE_URL (never hard-coded).
 * - No secrets, no auth tokens in this file.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001"

/**
 * @param {string} path   e.g. "/api/farms"
 * @param {RequestInit & { signal?: AbortSignal }} [options]
 * @returns {Promise<{ data: any, error: string|null }>}
 */
async function request(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { data: null, error: body.message ?? `HTTP ${res.status}` }
    }
    const data = await res.json()
    return { data, error: null }
  } catch (err) {
    if (err.name === "AbortError") return { data: null, error: "AbortError" }
    console.error("[api] request failed:", path, err)
    return { data: null, error: err.message ?? "Network error" }
  }
}

export const api = {
  get:    (path, signal)       => request(path, { method: "GET", signal }),
  post:   (path, body, signal) => request(path, { method: "POST",   body: JSON.stringify(body), signal }),
  put:    (path, body, signal) => request(path, { method: "PUT",    body: JSON.stringify(body), signal }),
  delete: (path, signal)       => request(path, { method: "DELETE", signal }),
}
