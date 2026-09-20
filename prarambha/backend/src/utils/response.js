// ============================================================================
// Response Utility — Standardized JSON Format & Data Leakage Sanitizer
// ============================================================================

const DB_LEAK_PATTERNS = [
  /\bselect\b/i,
  /\binsert\b/i,
  /\bupdate\b/i,
  /\bdelete\b/i,
  /\bfrom\s+["']?[a-z0-9_]+["']?/i,
  /\bwhere\b/i,
  /\brelation\s+["'][^"']+["']/i,
  /\bcolumn\s+["'][^"']+["']/i,
  /\btable\s+["'][^"']+["']/i,
  /\bconstraint\b/i,
  /\bpg_[a-z0-9_]+/i,
  /\bviolates\s+(foreign\s+key|not-null|unique|check)\s+constraint/i,
  /\bsyntax error at or near\b/i,
  /\bdatabase error\b/i,
  /\bpostgrest\b/i,
  /\bsupabase\b/i,
];

/**
 * Detects if an error string contains internal database schema or SQL snippets
 */
export function isDatabaseError(message) {
  if (typeof message !== 'string') return false;
  return DB_LEAK_PATTERNS.some((pattern) => pattern.test(message));
}

/**
 * Sanitizes client-facing error message to prevent SQL/schema leakage
 */
export function sanitizeErrorMessage(message, status = 500) {
  if (typeof message !== 'string' || !message.trim()) {
    return status >= 500
      ? 'An unexpected server error occurred.'
      : 'Invalid request.';
  }

  // If status is 500 or message leaks SQL/schema details, sanitize
  if (status >= 500 || isDatabaseError(message)) {
    return status >= 500
      ? 'An unexpected server error occurred.'
      : 'The requested operation could not be completed with the provided data.';
  }

  return message.trim();
}

export function sendSuccess(response, status, data) {
  response.status(status).json({ success: true, data });
}

export function sendError(response, status, code, message) {
  const safeMessage = sanitizeErrorMessage(message, status);
  // Ensure no stack traces or raw details are ever sent to client
  response.status(status).json({
    success: false,
    error: {
      code,
      message: safeMessage,
    },
  });
}
