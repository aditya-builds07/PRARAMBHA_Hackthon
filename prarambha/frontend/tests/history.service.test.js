import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  filterScenarios,
  toggleCompareSelection,
  validateCompareSelection,
  renameScenario,
  deleteScenario,
  cloneScenario,
  sortScenarios,
} from "../src/services/history.service.js";
import { MOCK_SCENARIOS } from "../src/services/mockData.js";

describe("History Service — Unit Tests", () => {
  describe("filterScenarios", () => {
    it("returns all scenarios when search query is empty", () => {
      assert.equal(filterScenarios(MOCK_SCENARIOS, "").length, MOCK_SCENARIOS.length);
      assert.equal(filterScenarios(MOCK_SCENARIOS, "   ").length, MOCK_SCENARIOS.length);
    });

    it("filters scenarios by scenario name (case-insensitive)", () => {
      const results = filterScenarios(MOCK_SCENARIOS, "drip");
      assert.ok(results.length >= 1);
      assert.ok(results.some((s) => s.name.toLowerCase().includes("drip")));
    });

    it("filters scenarios by crop name", () => {
      const results = filterScenarios(MOCK_SCENARIOS, "wheat");
      assert.equal(results.length, MOCK_SCENARIOS.length); // All mock scenarios are wheat
    });

    it("filters scenarios by tagline text", () => {
      const results = filterScenarios(MOCK_SCENARIOS, "flood irrigation");
      assert.ok(results.length >= 1);
      assert.equal(results[0].id, "sc-001");
    });

    it("handles null or non-array scenarios gracefully", () => {
      assert.deepEqual(filterScenarios(null, "drip"), []);
      assert.deepEqual(filterScenarios(undefined, "drip"), []);
    });
  });

  describe("toggleCompareSelection", () => {
    it("adds scenario ID to selection when not present", () => {
      const initial = ["sc-001"];
      const updated = toggleCompareSelection(initial, "sc-002", 4);
      assert.deepEqual(updated, ["sc-001", "sc-002"]);
    });

    it("removes scenario ID from selection when already present", () => {
      const initial = ["sc-001", "sc-002"];
      const updated = toggleCompareSelection(initial, "sc-002", 4);
      assert.deepEqual(updated, ["sc-001"]);
    });

    it("strictly enforces maximum limit of 4 scenarios (PRD Section 12)", () => {
      const fourSelected = ["sc-001", "sc-002", "sc-003", "sc-004"];
      const attemptFifth = toggleCompareSelection(fourSelected, "sc-005", 4);
      assert.equal(attemptFifth.length, 4);
      assert.ok(!attemptFifth.includes("sc-005"));
    });

    it("handles null or empty initial selection safely", () => {
      assert.deepEqual(toggleCompareSelection(null, "sc-001"), ["sc-001"]);
      assert.deepEqual(toggleCompareSelection([], null), []);
    });
  });

  describe("validateCompareSelection", () => {
    it("fails validation if fewer than 2 scenarios are selected", () => {
      assert.equal(validateCompareSelection([]).isValid, false);
      assert.equal(validateCompareSelection(["sc-001"]).isValid, false);
    });

    it("passes validation when between 2 and 4 scenarios are selected", () => {
      assert.equal(validateCompareSelection(["sc-001", "sc-002"]).isValid, true);
      assert.equal(validateCompareSelection(["sc-001", "sc-002", "sc-003"]).isValid, true);
      assert.equal(validateCompareSelection(["sc-001", "sc-002", "sc-003", "sc-004"]).isValid, true);
    });

    it("fails validation if more than 4 scenarios are selected", () => {
      const five = ["sc-1", "sc-2", "sc-3", "sc-4", "sc-5"];
      assert.equal(validateCompareSelection(five).isValid, false);
    });
  });

  describe("renameScenario", () => {
    it("immutably renames targeted scenario", () => {
      const original = [{ id: "sc-001", name: "Old Name" }, { id: "sc-002", name: "Plan B" }];
      const updated = renameScenario(original, "sc-001", "New Upgraded Plan");
      assert.equal(updated[0].name, "New Upgraded Plan");
      assert.equal(original[0].name, "Old Name", "Original array must not be mutated");
      assert.equal(updated[1].name, "Plan B");
    });

    it("ignores empty or whitespace new names", () => {
      const original = [{ id: "sc-001", name: "Valid Plan" }];
      const updated = renameScenario(original, "sc-001", "   ");
      assert.equal(updated[0].name, "Valid Plan");
    });
  });

  describe("deleteScenario", () => {
    it("immutably deletes targeted scenario by ID", () => {
      const original = [{ id: "sc-001" }, { id: "sc-002" }];
      const updated = deleteScenario(original, "sc-001");
      assert.equal(updated.length, 1);
      assert.equal(updated[0].id, "sc-002");
      assert.equal(original.length, 2, "Original array must not be mutated");
    });

    it("handles non-existent ID gracefully without throwing", () => {
      const original = [{ id: "sc-001" }];
      const updated = deleteScenario(original, "non-existent-id");
      assert.equal(updated.length, 1);
    });
  });

  describe("cloneScenario", () => {
    it("creates an immutable copy with a new ID and appends (Copy)", () => {
      const original = [
        {
          id: "sc-001",
          name: "Wheat Baseline",
          modelVersion: "v2.0-deterministic",
          assumptionVersion: "2026.1",
        },
      ];
      const clonedList = cloneScenario(original, "sc-001");
      assert.equal(clonedList.length, 2);
      assert.notEqual(clonedList[0].id, "sc-001");
      assert.ok(clonedList[0].name.includes("(Copy)"));
      // Section 16 Requirement: Historical results must remain tied to original model/assumption version
      assert.equal(clonedList[0].modelVersion, "v2.0-deterministic");
      assert.equal(clonedList[0].assumptionVersion, "2026.1");
    });

    it("handles non-existent scenario ID gracefully without changing list", () => {
      const original = [{ id: "sc-001" }];
      const list = cloneScenario(original, "sc-999");
      assert.equal(list.length, 1);
    });
  });

  describe("sortScenarios", () => {
    const testList = [
      {
        id: "sc-A",
        createdAt: "2026-09-01T10:00:00Z",
        results: { economics: { profit: 20000 }, risk: { overall: 50 } },
      },
      {
        id: "sc-B",
        createdAt: "2026-09-15T10:00:00Z",
        results: { economics: { profit: 50000 }, risk: { overall: 20 } },
      },
      {
        id: "sc-C",
        createdAt: "2026-09-10T10:00:00Z",
        results: { economics: { profit: 10000 }, risk: { overall: 80 } },
      },
    ];

    it("sorts by newest first (descending timestamp)", () => {
      const sorted = sortScenarios(testList, "newest");
      assert.equal(sorted[0].id, "sc-B"); // Sept 15
      assert.equal(sorted[2].id, "sc-A"); // Sept 01
    });

    it("sorts by oldest first (ascending timestamp)", () => {
      const sorted = sortScenarios(testList, "oldest");
      assert.equal(sorted[0].id, "sc-A"); // Sept 01
      assert.equal(sorted[2].id, "sc-B"); // Sept 15
    });

    it("sorts by highest profit first", () => {
      const sorted = sortScenarios(testList, "profit_high");
      assert.equal(sorted[0].id, "sc-B"); // 50000
      assert.equal(sorted[2].id, "sc-C"); // 10000
    });

    it("sorts by lowest risk first", () => {
      const sorted = sortScenarios(testList, "risk_low");
      assert.equal(sorted[0].id, "sc-B"); // Risk 20
      assert.equal(sorted[2].id, "sc-C"); // Risk 80
    });
  });
});
