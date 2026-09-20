import React, { useState } from "react";
import HistoryCard from "./HistoryCard";

/**
 * ScenarioHistoryList Component - Member 4
 * List of historical simulation records with search, filter, and comparison launcher.
 */
export default function ScenarioHistoryList({
  scenarios = [],
  onOpenScenario,
  onLaunchCompare,
  className = "",
}) {
  const [scenarioList, setScenarioList] = useState(scenarios);
  const [selectedIds, setSelectedIds] = useState(["sc-001", "sc-002"]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleRename = (id, newName) => {
    setScenarioList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: newName } : s))
    );
  };

  const handleDelete = (id) => {
    setScenarioList((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleToggleCompare = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, id];
      }
    });
  };

  const filtered = scenarioList.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.inputs?.crop || "").toLowerCase().includes(q) ||
      (s.tagline || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Search & Compare Launcher Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved scenarios by crop, name, or strategy..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Compare Launcher Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500">
            {selectedIds.length}/4 Selected
          </span>
          <button
            type="button"
            disabled={selectedIds.length < 2}
            onClick={() => onLaunchCompare && onLaunchCompare(selectedIds)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 ${
              selectedIds.length >= 2
                ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
            }`}
          >
            <span>Compare Selected Plans</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {/* Grid of Scenario History Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
          No saved scenarios match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((sc) => (
            <HistoryCard
              key={sc.id}
              scenario={sc}
              isSelectedForCompare={selectedIds.includes(sc.id)}
              onOpen={onOpenScenario}
              onRename={handleRename}
              onDelete={handleDelete}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
