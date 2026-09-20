import { sendError, sanitizeErrorMessage } from "../utils/response.js";

/**
 * ============================================================================
 * GLOBAL ERROR HANDLER MIDDLEWARE (V8 — Prevent Database & Stack Trace Leakage)
 * ============================================================================
 * 
 * Guarantees that:
 * 1. Raw SQL errors, schema names, table names, and database internals are never returned to clients.
 * 2. Stack traces are never leaked in HTTP 500 error responses.
 * 3. Diagnostics and stack traces are logged safely on the server side.
 */
export function globalErrorHandler(error, _request, response, _next) {
  // Safe server-side error logging with stack trace
  console.error("[SERVER_ERROR_LOG]", {
    timestamp: new Date().toISOString(),
    name: error?.name || "Error",
    message: error?.message,
    stack: error?.stack,
  });

  const status = typeof error?.status === "number" && error.status >= 400 && error.status < 600
    ? error.status
    : 500;

  const isSqlState = typeof error?.code === "string" && (/^[0-9A-Z]{5}$/.test(error.code) || error.code.startsWith("PG_"));

  let code = "INTERNAL_SERVER_ERROR";
  if (status === 404) code = "NOT_FOUND";
  else if (status === 400) code = "VALIDATION_ERROR";
  else if (status === 401) code = "UNAUTHORIZED";
  else if (status === 403) code = "FORBIDDEN";
  else if (status === 409) code = "CONFLICT";
  else if (status >= 500 || isSqlState) {
    code = "INTERNAL_SERVER_ERROR";
  } else if (error?.code && typeof error.code === "string") {
    code = error.code;
  }

  const safeMessage = sanitizeErrorMessage(error?.message, status);

  sendError(response, status, code, safeMessage);
}
