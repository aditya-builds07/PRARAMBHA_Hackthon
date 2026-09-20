import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { MOCK_ASSUMPTIONS } from "../src/services/mockData.js";

describe("Assumptions Transparency & Invariants — Unit Tests", () => {
  describe("Model Transparency & Metadata", () => {
    it("contains modelVersion identifying the deterministic simulation engine", () => {
      assert.ok(MOCK_ASSUMPTIONS.modelVersion);
      assert.match(MOCK_ASSUMPTIONS.modelVersion, /^v\d+\.\d+/);
    });

    it("contains assumptionVersion identifying the agronomic baseline dataset", () => {
      assert.ok(MOCK_ASSUMPTIONS.assumptionVersion);
      assert.equal(typeof MOCK_ASSUMPTIONS.assumptionVersion, "string");
    });

    it("has a valid lastUpdated ISO date format", () => {
      assert.ok(MOCK_ASSUMPTIONS.lastUpdated);
      const parsedDate = new Date(MOCK_ASSUMPTIONS.lastUpdated);
      assert.ok(!isNaN(parsedDate.getTime()), "lastUpdated must be a valid date");
    });
  });

  describe("Mandatory Agricultural Guidance & Disclaimer", () => {
    it("contains a mandatory non-guarantee disclaimer", () => {
      assert.ok(MOCK_ASSUMPTIONS.disclaimer);
      assert.ok(MOCK_ASSUMPTIONS.disclaimer.length >= 50);
      assert.match(
        MOCK_ASSUMPTIONS.disclaimer.toLowerCase(),
        /not constitute guaranteed|approximations|planning/
      );
    });
  });

  describe("Risk Weights Summation Invariant", () => {
    it("defines the 4 required risk factor weights", () => {
      const weights = MOCK_ASSUMPTIONS.riskWeights;
      assert.ok(weights);
      assert.equal(typeof weights.waterStress, "number");
      assert.equal(typeof weights.weatherAnomaly, "number");
      assert.equal(typeof weights.sowingDelay, "number");
      assert.equal(typeof weights.financialExposure, "number");
    });

    it("enforces risk weights summation invariant: sum(weights) === 1.0", () => {
      const weights = Object.values(MOCK_ASSUMPTIONS.riskWeights);
      const sum = weights.reduce((acc, w) => acc + w, 0);
      assert.ok(
        Math.abs(sum - 1.0) < 1e-6,
        `Expected sum of risk weights to be 1.0, received ${sum}`
      );
    });
  });

  describe("Agronomic Crop Parameters Constraints", () => {
    it("validates crop parameters adhere to physiological bounds", () => {
      const params = MOCK_ASSUMPTIONS.cropParameters;
      assert.ok(params);
      assert.ok(params.crop);
      assert.ok(params.baseYieldPerAcreQuintals > 0);
      assert.ok(params.minWaterRequirementM3PerAcre > 0);
      assert.ok(
        params.optimalWaterRequirementM3PerAcre >= params.minWaterRequirementM3PerAcre,
        "Optimal water requirement must be greater than or equal to minimum threshold"
      );
    });
  });

  describe("Decision Priority Profiles", () => {
    it("defines standard profiles for scenario trade-off optimization", () => {
      const profiles = MOCK_ASSUMPTIONS.priorityProfiles;
      assert.ok(profiles);
      assert.ok(profiles.balanced);
      assert.ok(profiles.max_profit);
      assert.ok(profiles.play_safe);
    });
  });

  describe("Core Mathematical Formulations Transparency", () => {
    it("documents all key simulator formulas for open review", () => {
      const formulas = MOCK_ASSUMPTIONS.formulas;
      assert.ok(Array.isArray(formulas));
      assert.ok(formulas.length >= 3);

      const formulaNames = formulas.map((f) => f.name.toLowerCase());
      assert.ok(formulaNames.some((n) => n.includes("profit") || n.includes("yield")));
      assert.ok(formulaNames.some((n) => n.includes("water")));
      assert.ok(formulaNames.some((n) => n.includes("score") || n.includes("decision")));
    });
  });
});
