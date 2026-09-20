import React, { useState } from "react";
import HistoryCard from "./HistoryCard";
import {
  filterScenarios,
  sortScenarios,
  toggleCompareSelection,
  renameScenario,
  deleteScenario,
  cloneScenario,
} from "../../services/history.service";
import { CustomSelect } from "../common/CustomSelect";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First", icon: "schedule" },
  { value: "oldest", label: "Oldest First", icon: "history" },
  { value: "profit_high", label: "Highest Profit", icon: "trending_up" },
  { value: "risk_low", label: "Lowest Risk", icon: "shield" },
];

/**
 * ScenarioHistoryList Component - Member 4
 * List of historical simulation records with search, sort, clone, and comparison launcher.
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
  const [sortBy, setSortBy] = useState("newest");

  const handleRename = (id, newName) => {
    setScenarioList((prev) => renameScenario(prev, id, newName));
  };

  const handleDelete = (id) => {
    setScenarioList((prev) => deleteScenario(prev, id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  const handleClone = (id) => {
    setScenarioList((prev) => cloneScenario(prev, id));
  };

  const handleToggleCompare = (id) => {
    setSelectedIds((prev) => toggleCompareSelection(prev, id, 4));
  };

  const filtered = filterScenarios(scenarioList, searchQuery);
  const displayed = sortScenarios(filtered, sortBy);

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Search, Sort & Compare Launcher Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 max-w-2xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved scenarios by crop, name, or strategy..."
              aria-label="Search saved scenarios by crop, name, or strategy"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <label htmlFor="history-sort" className="font-semibold text-slate-500 whitespace-nowrap">
              Sort:
            </label>
            <div className="w-44">
              <CustomSelect
                id="history-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target?.value ?? e)}
                options={SORT_OPTIONS}
                className="py-1.5 min-h-[36px] text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Compare Launcher Button */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
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
      {displayed.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
          No saved scenarios match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((sc) => (
            <HistoryCard
              key={sc.id}
              scenario={sc}
              isSelectedForCompare={selectedIds.includes(sc.id)}
              onOpen={onOpenScenario}
              onRename={handleRename}
              onClone={handleClone}
              onDelete={handleDelete}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
