import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import http from "node:http";
import { createApp } from "../../src/app.js";

describe("Security Hardening Test Suite (V4 IDOR, V5 CORS, V6 Rate Limiting)", () => {
  let server;
  let baseUrl;

  before(async () => {
    const app = createApp();
    server = http.createServer(app);
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  describe("V5 — Overly Permissive CORS Policy Remediation", () => {
    it("permits trusted origin (http://localhost:5173) and returns correct CORS headers", async () => {
      const res = await fetch(`${baseUrl}/api/health`, {
        headers: { Origin: "http://localhost:5173" },
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get("access-control-allow-origin"), "http://localhost:5173");
      assert.strictEqual(res.headers.get("access-control-allow-credentials"), "true");
    });

    it("permits trusted origin (http://127.0.0.1:5173)", async () => {
      const res = await fetch(`${baseUrl}/api/health`, {
        headers: { Origin: "http://127.0.0.1:5173" },
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get("access-control-allow-origin"), "http://127.0.0.1:5173");
    });

    it("rejects untrusted third-party origins with 403 CORS_FORBIDDEN", async () => {
      const res = await fetch(`${baseUrl}/api/health`, {
        headers: { Origin: "https://evil-untrusted-site.com" },
      });
      assert.strictEqual(res.status, 403);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "CORS_FORBIDDEN");
    });

    it("allows non-browser requests where Origin header is absent (e.g. backend/CLI tools)", async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.strictEqual(res.status, 200);
      const body = await res.json();
      assert.strictEqual(body.success, true);
    });
  });

  describe("V6 — Missing Rate Limiting Remediation", () => {
    it("returns standard rate limit headers on /api routes", async () => {
      const res = await fetch(`${baseUrl}/api/health`);
      assert.strictEqual(res.status, 200);
      assert.ok(res.headers.has("ratelimit-limit"));
      assert.ok(res.headers.has("ratelimit-remaining"));
    });

    it("returns simulation rate limit headers on /api/simulate", async () => {
      const res = await fetch(`${baseUrl}/api/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      // Validation error expected for empty body, but rate limit headers must be present
      assert.ok(res.headers.has("ratelimit-limit"));
      assert.strictEqual(res.headers.get("ratelimit-limit"), "30");
    });
  });

  describe("V4 — Insecure Direct Object References (IDOR) & Route Protection", () => {
    it("rejects unauthenticated requests to POST /api/simulate-and-save with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/simulate-and-save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: "00000000-0000-0000-0000-000000000001" }),
      });
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to POST /api/simulation-results with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/simulation-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: "00000000-0000-0000-0000-000000000001" }),
      });
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to GET /api/compare with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/compare?farmId=farm-123&scenarioIds=s1,s2`);
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to POST /api/compare with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/compare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmId: "farm-123", scenarioIds: ["s1", "s2"] }),
      });
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to GET /api/scenarios/:id/recommendations with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/scenarios/scenario-123/recommendations`);
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to GET /api/history with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/history?farmId=farm-123`);
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to GET /api/farms with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/farms`);
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects unauthenticated requests to GET /api/resources with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/resources?farmId=farm-123`);
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });

    it("rejects requests with malformed or invalid Bearer tokens with 401 UNAUTHORIZED", async () => {
      const res = await fetch(`${baseUrl}/api/farms`, {
        headers: { Authorization: "Bearer invalid-tampered-token-123" },
      });
      assert.strictEqual(res.status, 401);
      const body = await res.json();
      assert.strictEqual(body.success, false);
      assert.strictEqual(body.error.code, "UNAUTHORIZED");
    });
  });

  describe("V4 — Direct Ownership Assertion Logic", () => {
    it("assertFarmOwnership rejects missing farmId or userId", async () => {
      const { assertFarmOwnership } = await import("../../src/services/authorization.service.js");
      await assert.rejects(async () => assertFarmOwnership("", "user-1"), /farmId is required/);
      await assert.rejects(async () => assertFarmOwnership("farm-1", ""), /User ID is required/);
    });

    it("assertScenarioOwnership rejects missing scenarioId or userId", async () => {
      const { assertScenarioOwnership } = await import("../../src/services/authorization.service.js");
      await assert.rejects(async () => assertScenarioOwnership("", "user-1"), /scenarioId is required/);
      await assert.rejects(async () => assertScenarioOwnership("scenario-1", ""), /User ID is required/);
    });
  });
});
