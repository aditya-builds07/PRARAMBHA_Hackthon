import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MOCK_RECOMMENDATIONS } from "../src/services/mockData.js";

describe("Recommendations Rule-Based Invariants — Unit Tests", () => {
  it("contains at least 3 rule-based recommendation advisories", () => {
    assert.ok(Array.isArray(MOCK_RECOMMENDATIONS));
    assert.ok(MOCK_RECOMMENDATIONS.length >= 3);
  });

  it("strictly implements the 4-part advisory structure required by Section 13 (Condition, Impact, Action, Reason)", () => {
    for (const rec of MOCK_RECOMMENDATIONS) {
      assert.ok(rec.id, "Recommendation must have an id");
      assert.ok(rec.trigger, "Recommendation must define a trigger condition");
      assert.ok(rec.condition && rec.condition.trim().length > 10, "Condition must be explanatory");
      assert.ok(rec.impact && rec.impact.trim().length > 10, "Impact must quantify projected outcome");
      assert.ok(rec.action && rec.action.trim().length > 10, "Action must provide actionable advice");
      assert.ok(rec.reason && rec.reason.trim().length > 10, "Reason must cite scientific/agronomic logic");
    }
  });

  it("assigns valid severity levels from the approved set: critical | warning | info", () => {
    const validSeverities = new Set(["critical", "warning", "info"]);
    for (const rec of MOCK_RECOMMENDATIONS) {
      assert.ok(
        validSeverities.has(rec.severity),
        `Severity '${rec.severity}' must be one of: critical, warning, info`
      );
    }
  });

  it("ensures critical advisories address acute agronomic threats", () => {
    const criticalRecs = MOCK_RECOMMENDATIONS.filter((r) => r.severity === "critical");
    assert.ok(criticalRecs.length >= 1, "Should have at least one critical advisory");
    assert.match(criticalRecs[0].trigger.toLowerCase(), /water|deficit|stress/);
  });
});
