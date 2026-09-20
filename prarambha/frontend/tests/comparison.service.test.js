import { test, describe } from "vitest";
import assert from "node:assert/strict";
import {
  METRIC_DEFINITIONS,
  formatCurrency,
  formatNumber,
  extractScenarioMetrics,
  compareScenarios,
  getRiskLevelInfo,
} from "../src/services/comparison.service.js";
import { MOCK_SCENARIOS } from "../src/services/mockData.js";

describe("comparison.service — Unit Tests", () => {
  // 1. METRIC_DEFINITIONS
  describe("METRIC_DEFINITIONS", () => {
    test("defines all 10 required PRD comparison metrics", () => {
      const keys = METRIC_DEFINITIONS.map((m) => m.key);
      const expectedKeys = [
        "yieldTotal",
        "yieldPerAcre",
        "cost",
        "revenue",
        "profit",
        "roi",
        "waterDrawn",
        "waterProductivity",
        "riskOverall",
        "decisionScore",
      ];
      assert.deepEqual(keys, expectedKeys);
    });

    test("each metric definition contains required properties and boolean higherIsBetter", () => {
      for (const def of METRIC_DEFINITIONS) {
        assert.ok(def.key, "Metric must have a key");
        assert.ok(def.label, "Metric must have a human-readable label");
        assert.ok(def.unit, "Metric must have a unit");
        assert.strictEqual(typeof def.higherIsBetter, "boolean");
      }
    });

    test("directionality matches agronomic / financial expectations", () => {
      const costDef = METRIC_DEFINITIONS.find((m) => m.key === "cost");
      const profitDef = METRIC_DEFINITIONS.find((m) => m.key === "profit");
      const waterDef = METRIC_DEFINITIONS.find((m) => m.key === "waterDrawn");
      const riskDef = METRIC_DEFINITIONS.find((m) => m.key === "riskOverall");

      assert.strictEqual(costDef.higherIsBetter, false, "Higher cost is undesirable");
      assert.strictEqual(profitDef.higherIsBetter, true, "Higher profit is desirable");
      assert.strictEqual(waterDef.higherIsBetter, false, "Higher water withdrawal is undesirable");
      assert.strictEqual(riskDef.higherIsBetter, false, "Higher risk is undesirable");
    });
  });

  // 2. formatCurrency
  describe("formatCurrency", () => {
    test("formats positive numbers in INR standard", () => {
      const formatted = formatCurrency(98500);
      assert.ok(formatted.includes("98,500"), `Expected 98,500 in ${formatted}`);
      assert.ok(formatted.includes("₹"), `Expected ₹ in ${formatted}`);
    });

    test("formats 0 gracefully", () => {
      const formatted = formatCurrency(0);
      assert.ok(formatted.includes("0"), `Expected 0 in ${formatted}`);
    });

    test("handles null, undefined, and NaN safely without throwing", () => {
      assert.strictEqual(formatCurrency(null), "₹0");
      assert.strictEqual(formatCurrency(undefined), "₹0");
      assert.strictEqual(formatCurrency(NaN), "₹0");
      assert.strictEqual(formatCurrency("invalid"), "₹0");
    });

    test("formats negative amounts", () => {
      const formatted = formatCurrency(-42500);
      assert.ok(formatted.includes("42,500"), `Expected 42,500 in ${formatted}`);
    });
  });

  // 3. formatNumber
  describe("formatNumber", () => {
    test("formats numbers with default 1 decimal place", () => {
      assert.strictEqual(formatNumber(18.5), "18.5");
      assert.strictEqual(formatNumber(20), "20.0");
    });

    test("formats numbers with custom decimals", () => {
      assert.strictEqual(formatNumber(144.852, 2), "144.85");
      assert.strictEqual(formatNumber(100, 0), "100");
    });

    test("handles null, undefined, and NaN gracefully", () => {
      assert.strictEqual(formatNumber(null), "0");
      assert.strictEqual(formatNumber(undefined), "0");
      assert.strictEqual(formatNumber(NaN), "0");
    });
  });

  // 4. extractScenarioMetrics
  describe("extractScenarioMetrics", () => {
    test("extracts all required numeric fields from a complete scenario", () => {
      const sc = MOCK_SCENARIOS[0];
      const metrics = extractScenarioMetrics(sc);

      assert.strictEqual(metrics.yieldTotal, 74.0);
      assert.strictEqual(metrics.yieldPerAcre, 18.5);
      assert.strictEqual(metrics.cost, 68000);
      assert.strictEqual(metrics.revenue, 166500);
      assert.strictEqual(metrics.profit, 98500);
      assert.strictEqual(metrics.roi, 144.85);
      assert.strictEqual(metrics.waterDrawn, 4000);
      assert.strictEqual(metrics.waterProductivity, 18.5);
      assert.strictEqual(metrics.riskOverall, 28);
      assert.strictEqual(metrics.decisionScore, 78);
    });

    test("falls back to 0 for missing or undefined nested results", () => {
      const emptyScenario = { id: "sc-empty", name: "Empty Scenario" };
      const metrics = extractScenarioMetrics(emptyScenario);

      assert.strictEqual(metrics.yieldTotal, 0);
      assert.strictEqual(metrics.yieldPerAcre, 0);
      assert.strictEqual(metrics.cost, 0);
      assert.strictEqual(metrics.revenue, 0);
      assert.strictEqual(metrics.profit, 0);
      assert.strictEqual(metrics.roi, 0);
      assert.strictEqual(metrics.waterDrawn, 0);
      assert.strictEqual(metrics.waterProductivity, 0);
      assert.strictEqual(metrics.riskOverall, 0);
      assert.strictEqual(metrics.decisionScore, 0);
    });
  });

  // 5. compareScenarios
  describe("compareScenarios", () => {
    test("handles empty scenario array safely", () => {
      const result = compareScenarios([]);
      assert.deepEqual(result.scenarios, []);
      assert.deepEqual(result.differences, []);
      assert.deepEqual(result.tradeoffs, {});
      assert.strictEqual(result.baselineId, null);
    });

    test("defaults baseline to first scenario when not provided", () => {
      const result = compareScenarios([MOCK_SCENARIOS[0], MOCK_SCENARIOS[1]]);
      assert.strictEqual(result.baselineId, MOCK_SCENARIOS[0].id);
      assert.strictEqual(result.baseline.id, MOCK_SCENARIOS[0].id);
    });

    test("respects designated baselineScenarioId", () => {
      const result = compareScenarios(
        [MOCK_SCENARIOS[0], MOCK_SCENARIOS[1], MOCK_SCENARIOS[2]],
        "sc-002"
      );
      assert.strictEqual(result.baselineId, "sc-002");
      assert.strictEqual(result.baseline.id, "sc-002");
    });

    test("computes exact numeric differences (diff) and percentage shifts (pct)", () => {
      const scA = MOCK_SCENARIOS[0]; // profit: 98,500
      const scB = MOCK_SCENARIOS[1]; // profit: 114,800
      const result = compareScenarios([scA, scB], scA.id);

      const profitDiffRow = result.differences.find((d) => d.metricKey === "profit");
      assert.ok(profitDiffRow, "Profit diff row must exist");

      // Baseline delta against itself should be 0
      assert.strictEqual(profitDiffRow.deltas[scA.id].diff, 0);
      assert.strictEqual(profitDiffRow.deltas[scA.id].pct, 0);

      // Scenario B delta
      const expectedDiff = 114800 - 98500; // 16300
      const expectedPct = (16300 / 98500) * 100;
      assert.strictEqual(profitDiffRow.deltas[scB.id].diff, expectedDiff);
      assert.ok(
        Math.abs(profitDiffRow.deltas[scB.id].pct - expectedPct) < 0.001,
        `Expected pct close to ${expectedPct}, got ${profitDiffRow.deltas[scB.id].pct}`
      );
    });

    test("handles baseline value of 0 without dividing by zero", () => {
      const scZero = {
        id: "sc-zero",
        name: "Zero Baseline",
        results: { economics: { profit: 0 } },
      };
      const scOther = {
        id: "sc-other",
        name: "Other",
        results: { economics: { profit: 50000 } },
      };
      const result = compareScenarios([scZero, scOther], "sc-zero");
      const profitDiff = result.differences.find((d) => d.metricKey === "profit");
      assert.strictEqual(profitDiff.deltas["sc-other"].diff, 50000);
      assert.strictEqual(profitDiff.deltas["sc-other"].pct, 0);
    });

    test("produces neutral trade-off highlights without declaring any scenario universally 'best'", () => {
      const result = compareScenarios([
        MOCK_SCENARIOS[0],
        MOCK_SCENARIOS[1],
        MOCK_SCENARIOS[2],
        MOCK_SCENARIOS[3],
      ]);

      const sc1Tradeoffs = result.tradeoffs[MOCK_SCENARIOS[0].id] || [];
      const sc2Tradeoffs = result.tradeoffs[MOCK_SCENARIOS[1].id] || [];
      const sc3Tradeoffs = result.tradeoffs[MOCK_SCENARIOS[2].id] || [];

      // sc-002 has highest profit
      assert.ok(
        sc2Tradeoffs.some((t) => t.label === "Highest Profit"),
        "sc-002 should have 'Highest Profit' badge"
      );

      // Verify no trade-off badge uses non-neutral language like 'Best Overall' or 'Winner'
      for (const list of Object.values(result.tradeoffs)) {
        for (const item of list) {
          assert.notStrictEqual(item.label, "Best");
          assert.notStrictEqual(item.label, "Winner");
          assert.notStrictEqual(item.label, "Best Scenario");
        }
      }
    });
  });

  // 6. getRiskLevelInfo
  describe("getRiskLevelInfo", () => {
    test("returns low risk badge info for 'low' or score <= 33", () => {
      const info = getRiskLevelInfo("low", 25);
      assert.strictEqual(info.label, "LOW RISK");
      assert.strictEqual(info.scoreText, "25 / 100");
      assert.ok(info.colorClass.includes("emerald"));
    });

    test("returns medium risk badge info for 'medium' or score between 34 and 66", () => {
      const info = getRiskLevelInfo("medium", 50);
      assert.strictEqual(info.label, "MEDIUM RISK");
      assert.strictEqual(info.scoreText, "50 / 100");
      assert.ok(info.colorClass.includes("amber"));
    });

    test("returns high risk badge info for 'high' or score > 66", () => {
      const info = getRiskLevelInfo("high", 75);
      assert.strictEqual(info.label, "HIGH RISK");
      assert.strictEqual(info.scoreText, "75 / 100");
      assert.ok(info.colorClass.includes("rose"));
    });
  });

  // 7. Contract integrity with MOCK_SCENARIOS
  describe("Contract integrity with MOCK_SCENARIOS", () => {
    test("all 4 mock scenarios evaluate cleanly without NaN or undefined errors", () => {
      assert.strictEqual(MOCK_SCENARIOS.length, 4);

      for (const sc of MOCK_SCENARIOS) {
        assert.ok(sc.id);
        assert.ok(sc.name);
        assert.ok(sc.inputs);
        assert.ok(sc.results);

        const metrics = extractScenarioMetrics(sc);
        for (const [key, val] of Object.entries(metrics)) {
          assert.strictEqual(
            typeof val,
            "number",
            `Metric ${key} in ${sc.name} must be numeric`
          );
          assert.ok(!isNaN(val), `Metric ${key} in ${sc.name} must not be NaN`);
        }
      }
    });
  });
});
