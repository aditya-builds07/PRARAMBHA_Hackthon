import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateResourceGap,
  determineResourceStatus,
  calculateOverallStatus,
  formatResourceValue,
  evaluateResourceReadiness,
} from "../src/services/resource.service.js";
import { MOCK_RESOURCE_READINESS } from "../src/services/mockData.js";

describe("Resource Service — Unit Tests", () => {
  describe("calculateResourceGap", () => {
    it("returns 0 when available exceeds required", () => {
      assert.equal(calculateResourceGap(100, 150), 0);
    });

    it("returns 0 when available exactly equals required", () => {
      assert.equal(calculateResourceGap(200, 200), 0);
    });

    it("returns exact positive difference when available is less than required", () => {
      assert.equal(calculateResourceGap(500, 300), 200);
      assert.equal(calculateResourceGap(1000, 0), 1000);
    });

    it("handles null, undefined, and non-numeric inputs gracefully without NaN", () => {
      assert.equal(calculateResourceGap(null, 50), 0);
      assert.equal(calculateResourceGap(100, undefined), 100);
      assert.equal(calculateResourceGap("invalid", "invalid"), 0);
    });
  });

  describe("determineResourceStatus", () => {
    it("returns 'available' when required is 0 or less", () => {
      assert.equal(determineResourceStatus(0, 0), "available");
      assert.equal(determineResourceStatus(-50, 10), "available");
    });

    it("returns 'available' when available >= required", () => {
      assert.equal(determineResourceStatus(500, 500), "available");
      assert.equal(determineResourceStatus(500, 600), "available");
    });

    it("returns 'shortage' when deficit is strictly less than 25% of required", () => {
      // Required: 100, Available: 80 => gap is 20 (20% deficit < 25%)
      assert.equal(determineResourceStatus(100, 80), "shortage");
      // Required: 1000, Available: 760 => gap is 240 (24% deficit < 25%)
      assert.equal(determineResourceStatus(1000, 760), "shortage");
    });

    it("returns 'critical' when deficit is 25% or greater of required", () => {
      // Exactly 25% threshold
      assert.equal(determineResourceStatus(100, 75), "critical");
      // Deficit > 25% (e.g. 50% deficit)
      assert.equal(determineResourceStatus(100, 50), "critical");
      // Total deficit (100% missing)
      assert.equal(determineResourceStatus(100, 0), "critical");
    });
  });

  describe("calculateOverallStatus", () => {
    it("returns 'available' when all items are available or list is empty", () => {
      assert.equal(calculateOverallStatus([]), "available");
      assert.equal(
        calculateOverallStatus([
          { status: "available" },
          { status: "available" },
        ]),
        "available"
      );
    });

    it("returns 'shortage' if any item has shortage and none are critical", () => {
      assert.equal(
        calculateOverallStatus([
          { status: "available" },
          { status: "shortage" },
          { status: "available" },
        ]),
        "shortage"
      );
    });

    it("returns 'critical' if at least one item has critical status, regardless of others", () => {
      assert.equal(
        calculateOverallStatus([
          { status: "available" },
          { status: "shortage" },
          { status: "critical" },
        ]),
        "critical"
      );
      assert.equal(
        calculateOverallStatus([
          { status: "available" },
          { status: "critical" },
        ]),
        "critical"
      );
    });
  });

  describe("formatResourceValue", () => {
    it("formats currency values using INR format", () => {
      const formatted = formatResourceValue(75000, "₹", true);
      assert.ok(formatted.includes("75,000"));
      assert.ok(formatted.includes("₹"));
    });

    it("formats physical units correctly", () => {
      assert.equal(formatResourceValue(4000, "m³", false), "4,000 m³");
      assert.equal(formatResourceValue(160, "kg", false), "160 kg");
      assert.equal(formatResourceValue(0, "kg", false), "0 kg");
    });
  });

  describe("evaluateResourceReadiness & Fixture Conformance", () => {
    it("matches MOCK_RESOURCE_READINESS structure and constraints", () => {
      assert.ok(MOCK_RESOURCE_READINESS.farmId);
      assert.ok(MOCK_RESOURCE_READINESS.farmName);
      assert.ok(["available", "shortage", "critical"].includes(MOCK_RESOURCE_READINESS.overallStatus));

      const { budget, water, seed, fertilizer } = MOCK_RESOURCE_READINESS;
      assert.equal(budget.gap, Math.max(0, budget.required - budget.available));
      assert.equal(water.gap, Math.max(0, water.required - water.available));
      assert.equal(seed.gap, Math.max(0, seed.required - seed.available));
      assert.equal(fertilizer.gap, Math.max(0, fertilizer.required - fertilizer.available));
    });

    it("constructs model with evaluateResourceReadiness accurately", () => {
      const model = evaluateResourceReadiness({
        farmId: "farm-101",
        farmName: "Pawar Farm",
        requirements: {
          budget: 100000,
          water: 5000,
          seed: 200,
          fertilizer: 400,
          otherInputs: [{ name: "Tractor Hours", required: 20, available: 15, unit: "Hours" }],
        },
        inventory: {
          budget: 80000, // gap 20000 (20% -> shortage)
          water: 3500,  // gap 1500 (30% -> critical)
          seed: 200,   // gap 0 -> available
          fertilizer: 400, // gap 0 -> available
        },
      });

      assert.equal(model.farmId, "farm-101");
      assert.equal(model.budget.status, "shortage");
      assert.equal(model.water.status, "critical");
      assert.equal(model.seed.status, "available");
      assert.equal(model.fertilizer.status, "available");
      assert.equal(model.overallStatus, "critical"); // Since water is critical
      assert.equal(model.otherInputs[0].status, "critical"); // 5/20 = 25% => critical
    });
  });
});
