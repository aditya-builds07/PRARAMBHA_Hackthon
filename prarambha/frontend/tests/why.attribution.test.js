import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  getWhyExplanation,
  groupFactorsByControllability,
  calculateSecondaryDeltas,
} from "../src/services/comparison.service.js";
import { MOCK_SCENARIOS, MOCK_WHY_EXPLANATIONS } from "../src/services/mockData.js";

describe("Why Panel & Attribution — Unit Tests", () => {
  describe("WhyExplanation Contract & Invariants", () => {
    test("all entries in MOCK_WHY_EXPLANATIONS adhere to Section 25 schema", () => {
      for (const [key, exp] of Object.entries(MOCK_WHY_EXPLANATIONS)) {
        assert.ok(exp.referenceScenarioId, `${key}: missing referenceScenarioId`);
        assert.ok(exp.targetScenarioId, `${key}: missing targetScenarioId`);
        assert.ok(exp.totalChange, `${key}: missing totalChange`);
        assert.strictEqual(typeof exp.totalChange.value, "number");
        assert.ok(Array.isArray(exp.factors), `${key}: factors must be array`);

        for (const f of exp.factors) {
          assert.ok(f.factor, "Factor name required");
          assert.strictEqual(typeof f.contribution, "number");
          assert.ok(
            f.controllability === "controllable" || f.controllability === "external",
            `Invalid controllability '${f.controllability}' in ${f.factor}`
          );
          assert.ok(f.explanation, "Agronomic explanation required");
        }
      }
    });

    test("adheres to TECH.md line 294 invariant: factor contributions reconcile with total delta", () => {
      for (const [key, exp] of Object.entries(MOCK_WHY_EXPLANATIONS)) {
        const factorSum = exp.factors.reduce((acc, f) => acc + f.contribution, 0);
        assert.strictEqual(
          factorSum,
          exp.totalChange.value,
          `${key}: Sum of factors (${factorSum}) does not match totalChange (${exp.totalChange.value})`
        );
      }
    });
  });

  describe("getWhyExplanation helper", () => {
    test("retrieves valid pair and marks isReconciled = true", () => {
      const res = getWhyExplanation("sc-002", "sc-001", MOCK_WHY_EXPLANATIONS);
      assert.ok(res);
      assert.strictEqual(res.isReconciled, true);
      assert.strictEqual(res.totalChange.value, 16300);
      assert.strictEqual(res.factorSum, 16300);
    });

    test("handles identical scenario comparison (target === reference)", () => {
      const res = getWhyExplanation("sc-001", "sc-001", MOCK_WHY_EXPLANATIONS);
      assert.ok(res);
      assert.strictEqual(res.isIdentical, true);
      assert.strictEqual(res.totalChange.value, 0);
      assert.deepEqual(res.factors, []);
    });

    test("returns null for non-existent scenario pairs without throwing", () => {
      assert.strictEqual(getWhyExplanation("sc-999", "sc-001", MOCK_WHY_EXPLANATIONS), null);
      assert.strictEqual(getWhyExplanation(null, "sc-001", MOCK_WHY_EXPLANATIONS), null);
      assert.strictEqual(getWhyExplanation("sc-002", null, MOCK_WHY_EXPLANATIONS), null);
    });
  });

  describe("groupFactorsByControllability", () => {
    test("separates controllable and external factors accurately", () => {
      const factors = [
        { factor: "Drip Irrigation", contribution: 18500, controllability: "controllable" },
        { factor: "Input Cost", contribution: -8000, controllability: "controllable" },
        { factor: "Monsoon Heat", contribution: -9000, controllability: "external" },
      ];
      const grouped = groupFactorsByControllability(factors);
      assert.strictEqual(grouped.controllable.length, 2);
      assert.strictEqual(grouped.external.length, 1);
      assert.strictEqual(grouped.unclassified.length, 0);
    });

    test("handles null, undefined, or empty arrays safely", () => {
      assert.deepEqual(groupFactorsByControllability(null), { controllable: [], external: [], unclassified: [] });
      assert.deepEqual(groupFactorsByControllability(undefined), { controllable: [], external: [], unclassified: [] });
      assert.deepEqual(groupFactorsByControllability([]), { controllable: [], external: [], unclassified: [] });
    });
  });

  describe("calculateSecondaryDeltas", () => {
    test("calculates yield, water, risk, and score deltas between scenarios", () => {
      const baseline = MOCK_SCENARIOS[0]; // sc-001
      const drip = MOCK_SCENARIOS[1];     // sc-002

      const deltas = calculateSecondaryDeltas(drip, baseline);
      assert.ok(deltas);
      assert.ok(Math.abs(deltas.yieldTotal.diff - 10.8) < 0.001);
      assert.strictEqual(deltas.waterDrawn.diff, -1500);
      assert.strictEqual(deltas.riskOverall.diff, -6);
      assert.strictEqual(deltas.decisionScore.diff, 11);
    });

    test("returns null if either scenario is missing", () => {
      assert.strictEqual(calculateSecondaryDeltas(null, MOCK_SCENARIOS[0]), null);
      assert.strictEqual(calculateSecondaryDeltas(MOCK_SCENARIOS[0], null), null);
    });
  });
});
