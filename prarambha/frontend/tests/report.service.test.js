import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  generateReportModel,
  generatePlainTextReport,
} from "../src/services/report.service.js";
import {
  MOCK_SCENARIOS,
  MOCK_WHY_EXPLANATIONS,
  MOCK_RECOMMENDATIONS,
  MOCK_RESOURCE_READINESS,
  MOCK_ASSUMPTIONS,
} from "../src/services/mockData.js";

describe("Report Service — Unit Tests", () => {
  describe("generateReportModel", () => {
    test("compiles complete 12-section model strictly adhering to Section 17", () => {
      const scenario = MOCK_SCENARIOS[1]; // sc-002
      const model = generateReportModel({
        scenario,
        farm: { id: "farm-001", name: "Shivneri Farm", areaAcres: 4 },
        whyExplanation: MOCK_WHY_EXPLANATIONS["sc-002_vs_sc-001"],
        recommendations: MOCK_RECOMMENDATIONS,
        resources: MOCK_RESOURCE_READINESS,
        assumptions: MOCK_ASSUMPTIONS,
      });

      assert.ok(model);

      // Section 1: Farm
      assert.ok(model.farm.id);
      assert.ok(model.farm.name);

      // Section 2: Scenario
      assert.strictEqual(model.scenario.id, "sc-002");
      assert.strictEqual(model.scenario.name, "High Efficiency Drip Plan");

      // Section 3: Inputs
      assert.strictEqual(model.inputs.crop, "Wheat (GW-496)");
      assert.strictEqual(model.inputs.irrigation, "DRIP");

      // Section 4: Yield
      assert.strictEqual(model.yield.perAcre, 21.2);
      assert.strictEqual(model.yield.total, 84.8);

      // Section 5: Economics
      assert.strictEqual(model.economics.profit, 114800);
      assert.strictEqual(model.economics.roi, 151.05);

      // Section 6: Water
      assert.strictEqual(model.water.drawnM3, 2500);

      // Section 7: Risk
      assert.strictEqual(model.risk.overall, 22);

      // Section 8: Decision Score
      assert.strictEqual(model.decisionScore, 89);

      // Section 9: Why / Attribution
      assert.ok(model.why);
      assert.strictEqual(model.why.factors.length, 3);

      // Section 10: Recommendations
      assert.ok(Array.isArray(model.recommendations));
      assert.ok(model.recommendations.length > 0);

      // Section 11: Resources
      assert.ok(model.resources);
      assert.strictEqual(model.resources.overallStatus, "shortage");

      // Section 12: Assumptions & Disclaimer
      assert.ok(model.assumptions);
      assert.ok(model.assumptions.disclaimer.includes("Estimated values"));
    });

    test("handles missing scenario safely by returning null", () => {
      assert.strictEqual(generateReportModel({ scenario: null }), null);
    });

    test("handles missing optional parameters gracefully without throwing", () => {
      const model = generateReportModel({ scenario: MOCK_SCENARIOS[0] });
      assert.ok(model);
      assert.strictEqual(model.why, null);
      assert.deepEqual(model.recommendations, []);
      assert.strictEqual(model.resources, null);
      assert.ok(model.assumptions.disclaimer);
    });
  });

  describe("generatePlainTextReport", () => {
    test("generates ASCII formatted document containing all vital sections", () => {
      const scenario = MOCK_SCENARIOS[0];
      const model = generateReportModel({
        scenario,
        farm: { id: "farm-001", name: "Shivneri Farm", areaAcres: 4 },
        whyExplanation: null,
        recommendations: MOCK_RECOMMENDATIONS,
        resources: MOCK_RESOURCE_READINESS,
        assumptions: MOCK_ASSUMPTIONS,
      });

      const text = generatePlainTextReport(model);
      assert.ok(text.includes("KRISHIMITRA"));
      assert.ok(text.includes("EXECUTIVE DECISION SUMMARY REPORT"));
      assert.ok(text.includes("FINANCIAL & YIELD PERFORMANCE"));
      assert.ok(text.includes("PRIORITY ACTION RECOMMENDATIONS"));
      assert.ok(text.includes("TRANSPARENCY & GUIDANCE"));
    });

    test("returns empty string for null model", () => {
      assert.strictEqual(generatePlainTextReport(null), "");
    });
  });
});
