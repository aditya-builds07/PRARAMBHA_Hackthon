/**
 * End-to-end test for the audit logging service.
 *
 * This test runs directly against the live Supabase project using the
 * service-role key from prarambha/.env. It is NOT a unit test — it verifies
 * that writeAuditLog actually inserts a row into audit_logs on the live DB.
 *
 * Run from the prarambha/ directory:
 *   node --env-file=.env backend/tests/api/audit.test.js
 *
 * Requires Node 20.6+ for --env-file support, or set the env vars manually.
 */

import { createClient } from "@supabase/supabase-js";
import { writeAuditLog, writeAuditLogSafely } from "../../src/services/audit.service.js";

// ── Helpers ──────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function assertThrows(fn, expectedFragment, label) {
  try {
    await fn();
    console.error(`  ❌ FAIL: ${label} — expected an error but none was thrown`);
    failed++;
  } catch (err) {
    if (err.message.includes(expectedFragment)) {
      console.log(`  ✅ PASS: ${label}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${label} — error "${err.message}" did not contain "${expectedFragment}"`);
      failed++;
    }
  }
}

// ── Supabase admin client for verification reads ──────────────────────────────

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

// ── Test cleanup helper ───────────────────────────────────────────────────────

async function deleteTestRows(ids) {
  if (!ids.length) return;
  const admin = getAdminClient();
  await admin.from("audit_logs").delete().in("id", ids);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

const createdIds = [];

async function testWriteAuditLog_CreateFarm() {
  console.log("\n▶  writeAuditLog — CREATE_FARM");
  const row = await writeAuditLog({
    action: "CREATE_FARM",
    inputSnapshot: { name: "Test Farm E2E", area_acres: 5 },
    outputSnapshot: { id: "00000000-0000-0000-0000-000000000001" },
  });

  assert(typeof row.id === "string" && row.id.length > 0, "Returns a row with a UUID id");
  assert(row.action === "CREATE_FARM", "Row.action matches CREATE_FARM");
  assert(row.farm_id === null, "farm_id is null when not provided");
  assert(row.scenario_id === null, "scenario_id is null when not provided");
  assert(row.created_at !== null, "created_at is set by DB default");

  // Verify the row actually exists in the live DB
  const admin = getAdminClient();
  const { data } = await admin.from("audit_logs").select("id, action").eq("id", row.id).maybeSingle();
  assert(data?.action === "CREATE_FARM", "Row is readable from live DB via admin client");

  createdIds.push(row.id);
}

async function testWriteAuditLog_Simulate() {
  console.log("\n▶  writeAuditLog — SIMULATE");
  const row = await writeAuditLog({
    action: "SIMULATE",
    modelVersion: "1.0.0",
    inputSnapshot: { crop_code: "wheat", area_acres: 10 },
    outputSnapshot: { yield_total_q: 160, profit_inr: 120000 },
  });

  assert(row.action === "SIMULATE", "Row.action matches SIMULATE");
  assert(row.model_version === "1.0.0", "model_version stored correctly");
  createdIds.push(row.id);
}

async function testWriteAuditLog_SaveScenario() {
  console.log("\n▶  writeAuditLog — SAVE_SCENARIO");
  const row = await writeAuditLog({
    action: "SAVE_SCENARIO",
    inputSnapshot: { scenario_name: "Wheat Baseline" },
  });
  assert(row.action === "SAVE_SCENARIO", "Row.action matches SAVE_SCENARIO");
  createdIds.push(row.id);
}

async function testWriteAuditLog_UpdateScenario() {
  console.log("\n▶  writeAuditLog — UPDATE_SCENARIO");
  const row = await writeAuditLog({ action: "UPDATE_SCENARIO" });
  assert(row.action === "UPDATE_SCENARIO", "Row.action matches UPDATE_SCENARIO");
  createdIds.push(row.id);
}

async function testWriteAuditLog_DeleteScenario() {
  console.log("\n▶  writeAuditLog — DELETE_SCENARIO");
  const row = await writeAuditLog({ action: "DELETE_SCENARIO" });
  assert(row.action === "DELETE_SCENARIO", "Row.action matches DELETE_SCENARIO");
  createdIds.push(row.id);
}

async function testWriteAuditLog_GenerateReport() {
  console.log("\n▶  writeAuditLog — GENERATE_REPORT");
  const row = await writeAuditLog({ action: "GENERATE_REPORT" });
  assert(row.action === "GENERATE_REPORT", "Row.action matches GENERATE_REPORT");
  createdIds.push(row.id);
}

async function testWriteAuditLog_CreateScenario() {
  console.log("\n▶  writeAuditLog — CREATE_SCENARIO");
  const row = await writeAuditLog({ action: "CREATE_SCENARIO" });
  assert(row.action === "CREATE_SCENARIO", "Row.action matches CREATE_SCENARIO");
  createdIds.push(row.id);
}

async function testInvalidAction_ThrowsLoudly() {
  console.log("\n▶  writeAuditLog — invalid action throws");
  await assertThrows(
    () => writeAuditLog({ action: "INVALID_ACTION" }),
    "Invalid audit action",
    "Throws with clear error for invalid action"
  );
}

async function testWriteAuditLogSafely_NeverThrows() {
  console.log("\n▶  writeAuditLogSafely — never throws on invalid action");
  let threw = false;
  try {
    await writeAuditLogSafely({ action: "BAD_ACTION_SAFE" });
  } catch {
    threw = true;
  }
  assert(!threw, "writeAuditLogSafely does not throw to caller on invalid action");
}

// ── Runner ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("=".repeat(60));
  console.log("KrishiMitra — Audit Service E2E Test");
  console.log(`  Supabase project: ${process.env.SUPABASE_URL ?? "(not set)"}`);
  console.log("=".repeat(60));

  try {
    await testWriteAuditLog_CreateFarm();
    await testWriteAuditLog_Simulate();
    await testWriteAuditLog_SaveScenario();
    await testWriteAuditLog_UpdateScenario();
    await testWriteAuditLog_DeleteScenario();
    await testWriteAuditLog_GenerateReport();
    await testWriteAuditLog_CreateScenario();
    await testInvalidAction_ThrowsLoudly();
    await testWriteAuditLogSafely_NeverThrows();
  } finally {
    if (createdIds.length) {
      await deleteTestRows(createdIds);
      console.log(`\n  🧹 Cleaned up ${createdIds.length} test row(s) from audit_logs.`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log("=".repeat(60));

  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n💥 Test runner crashed:", err.message);
  process.exit(1);
});
