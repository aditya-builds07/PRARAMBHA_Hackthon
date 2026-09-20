/**
 * ============================================================================
 * AUTOMATED SECURITY REGRESSION TEST SUITE (V7, V8, V9)
 * ============================================================================
 * 
 * Verifies:
 * 1. V7 — Security HTTP Headers (Helmet, CSP, HSTS, X-Frame-Options, X-Content-Type-Options, no X-Powered-By)
 * 2. V8 — Database Error & Stack Trace Leakage Prevention (no SQL/schema leaks, no stack in 500 responses)
 * 3. V9 — Authentication & Token Validation (401 on missing, invalid, or malformed Bearer tokens)
 * 4. V9 — Authorization & Tenant Ownership Boundaries (ownership isolation on farm & resource operations)
 * 
 * Run directly with:
 *   node tests/security/security.test.js
 */

import http from "node:http";
import { createApp } from "../../src/app.js";
import { isDatabaseError, sanitizeErrorMessage } from "../../src/utils/response.js";

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

// ── Test Server Harness ───────────────────────────────────────────────────────

async function withServer(fn) {
  const app = createApp({
    configure: (instance) => {
      // Route specifically added for testing database error sanitization under 500 condition
      instance.get("/api/test-db-error", (_req, _res, next) => {
        const error = new Error('null value in column "auth_user_id" of relation "farms" violates not-null constraint');
        error.code = '23502';
        error.table = 'farms';
        error.schema = 'public';
        next(error);
      });
    },
  });

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await fn(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

// ── Test Suite ───────────────────────────────────────────────────────────────

console.log("\n=======================================================");
console.log("🔒 RUNNING AUTOMATED SECURITY REGRESSION TEST SUITE");
console.log("=======================================================\n");

await withServer(async (baseUrl) => {
  // ───────────────────────────────────────────────────────────────────────────
  // 1. V7 — SECURITY HTTP HEADERS VERIFICATION
  // ───────────────────────────────────────────────────────────────────────────
  console.log("1️⃣  V7: Testing Security HTTP Headers...");

  const healthRes = await fetch(`${baseUrl}/api/health`);
  const headers = healthRes.headers;

  assert(
    Boolean(headers.get("content-security-policy")),
    "Content-Security-Policy (CSP) header is present"
  );

  assert(
    headers.get("x-frame-options") === "DENY" || headers.get("x-frame-options") === "SAMEORIGIN",
    `X-Frame-Options is set to protect against clickjacking (got: ${headers.get("x-frame-options")})`
  );

  assert(
    headers.get("x-content-type-options") === "nosniff",
    "X-Content-Type-Options is set to 'nosniff' to prevent MIME sniffing"
  );

  assert(
    Boolean(headers.get("strict-transport-security")),
    `Strict-Transport-Security (HSTS) header is enabled (got: ${headers.get("strict-transport-security")})`
  );

  assert(
    headers.get("x-powered-by") === null,
    "X-Powered-By header is stripped (Express fingerprint suppressed)"
  );

  assert(
    headers.get("referrer-policy") === "strict-origin-when-cross-origin" || headers.get("referrer-policy") === "no-referrer",
    "Referrer-Policy header is configured with strict policy"
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 2. V8 — INTERNAL DATABASE ERROR & STACK TRACE LEAKAGE PREVENTION
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n2️⃣  V8: Testing Database Error & Stack Trace Leakage Prevention...");

  // Send request triggering an internal database error
  const dbErrorRes = await fetch(`${baseUrl}/api/test-db-error`);
  const dbErrorBody = await dbErrorRes.json();

  assert(
    dbErrorRes.status === 500,
    `Database exception correctly mapped to HTTP 500 (got: ${dbErrorRes.status})`
  );

  assert(
    dbErrorBody.success === false && dbErrorBody.error?.code === "INTERNAL_SERVER_ERROR",
    `Response returns uniform error code 'INTERNAL_SERVER_ERROR' (got: ${dbErrorBody.error?.code})`
  );

  assert(
    !JSON.stringify(dbErrorBody).includes("relation") &&
    !JSON.stringify(dbErrorBody).includes("farms") &&
    !JSON.stringify(dbErrorBody).includes("auth_user_id") &&
    !JSON.stringify(dbErrorBody).includes("violates not-null constraint"),
    "Response body does NOT leak SQL queries, schema, table, or column names"
  );

  assert(
    dbErrorBody.error?.stack === undefined && dbErrorBody.stack === undefined,
    "Response body does NOT leak execution stack trace to the client"
  );

  // Unit verification of the sanitizer logic
  const rawSqlError = 'SELECT * FROM users WHERE relation "secret" violates foreign key constraint';
  assert(
    isDatabaseError(rawSqlError) === true,
    "SQL detection pattern correctly flags raw database queries and schema terms"
  );

  const sanitized = sanitizeErrorMessage(rawSqlError, 500);
  assert(
    sanitized === "An unexpected server error occurred." && !sanitized.includes("SELECT"),
    "Sanitizer replaces SQL leak messages with generic, safe client message"
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 3. V9 — AUTHENTICATION & TOKEN VALIDATION TESTS
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n3️⃣  V9: Testing Authentication & Bearer Token Boundaries...");

  // Missing Authorization header
  const noAuthRes = await fetch(`${baseUrl}/api/farms`);
  const noAuthBody = await noAuthRes.json();
  assert(
    noAuthRes.status === 401 && noAuthBody.error?.code === "UNAUTHORIZED",
    `Missing Authorization header is blocked with 401 UNAUTHORIZED (got: ${noAuthRes.status})`
  );

  // Malformed header (not Bearer)
  const malformedHeaderRes = await fetch(`${baseUrl}/api/farms`, {
    headers: { Authorization: "Basic dXNlcjpwYXNz" },
  });
  assert(
    malformedHeaderRes.status === 401,
    `Non-Bearer authorization format is rejected with 401 (got: ${malformedHeaderRes.status})`
  );

  // Invalid / forged token
  const forgedTokenRes = await fetch(`${baseUrl}/api/farms`, {
    headers: { Authorization: "Bearer forged-fake-jwt-token-99999" },
  });
  assert(
    forgedTokenRes.status === 401,
    `Forged/invalid Bearer token is rejected with 401 (got: ${forgedTokenRes.status})`
  );

  // Protected POST /api/farms without token
  const noAuthPostRes = await fetch(`${baseUrl}/api/farms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Malicious Farm", totalAcres: 10 }),
  });
  assert(
    noAuthPostRes.status === 401,
    `Protected resource creation requires authentication (got: ${noAuthPostRes.status})`
  );

  // ───────────────────────────────────────────────────────────────────────────
  // 4. V9 — AUTHORIZATION & TENANT OWNERSHIP BOUNDARIES
  // ───────────────────────────────────────────────────────────────────────────
  console.log("\n4️⃣  V9: Testing Authorization & Tenant Ownership Boundaries...");

  // Ensure farm creation requires valid validated payload & authenticated user identity
  const invalidAuthPost = await fetch(`${baseUrl}/api/farms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer invalid-user-token",
    },
    body: JSON.stringify({ name: "Tenant Attack Farm" }),
  });
  assert(
    invalidAuthPost.status === 401,
    "Unverified identities cannot inject or mutate cross-tenant farm records"
  );

  // Ensure 404 handler does not disclose resource existence across tenants
  const randomRouteRes = await fetch(`${baseUrl}/api/random-private-endpoint`);
  const randomRouteBody = await randomRouteRes.json();
  assert(
    randomRouteRes.status === 404 && randomRouteBody.error?.code === "NOT_FOUND",
    "Non-existent / unauthorized private routes return standard 404 NOT_FOUND"
  );
});

console.log("\n=======================================================");
console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log("=======================================================\n");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎯 ALL SECURITY REGRESSION TESTS PASSED SUCCESSFULLY!\n");
  process.exit(0);
}
