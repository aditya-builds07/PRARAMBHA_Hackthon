import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  filterScenarios,
  toggleCompareSelection,
  validateCompareSelection,
  renameScenario,
  deleteScenario,
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
});
