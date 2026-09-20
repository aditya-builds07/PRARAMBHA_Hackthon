import React, { useState } from "react";
import { formatCurrency, getRiskLevelInfo } from "../../services/comparison.service";

/**
 * HistoryCard Component - Member 4
 * Displays a single saved historical simulation record with actions: Open, Rename, Delete, Compare.
 */
export default function HistoryCard({
  scenario,
  isSelectedForCompare = false,
  onOpen,
  onRename,
  onClone,
  onDelete,
  onToggleCompare,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(scenario.name);

  const riskInfo = getRiskLevelInfo(
    scenario.results?.risk?.level,
    scenario.results?.risk?.overall ?? 0
  );

  const handleSaveRename = (e) => {
    e.preventDefault();
    if (editedName.trim() && onRename) {
      onRename(scenario.id, editedName.trim());
    }
    setIsEditing(false);
  };

  return (
    <article
      aria-label={`Saved Scenario: ${scenario.name}`}
      className={`bg-white rounded-xl border transition-all overflow-hidden flex flex-col justify-between ${
        isSelectedForCompare
          ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
          : "border-slate-200 shadow-xs hover:border-slate-300"
      }`}
    >
      {/* Top Header with Timestamp and Model Version */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">
            {scenario.createdAt
              ? new Date(scenario.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "Saved Plan"}
          </span>
          <span
            className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded"
            title={`Model Engine: ${scenario.modelVersion || "v2.0"} | Assumptions: ${scenario.assumptionVersion || "2026.1"}`}
          >
            {scenario.modelVersion || "v2.0"} • {scenario.assumptionVersion || "2026.1"}
          </span>
        </div>

        {/* Compare Checkbox */}
        <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-700">
          <input
            type="checkbox"
            checked={isSelectedForCompare}
            onChange={() => onToggleCompare && onToggleCompare(scenario.id)}
            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span>Compare</span>
        </label>
      </div>

      {/* Body: Title, Crop, and Financial Summary */}
      <div className="p-5 space-y-3 flex-1">
        {isEditing ? (
          <form onSubmit={handleSaveRename} className="flex gap-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              autoFocus
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-bold"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-snug">
              {scenario.name}
            </h3>
            {scenario.tagline && (
              <p className="text-xs text-slate-500 mt-0.5">{scenario.tagline}</p>
            )}
          </div>
        )}

        <div className="text-xs text-slate-600 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Crop & Land:</span>
            <span className="font-semibold text-slate-800">
              {scenario.inputs?.crop || "Wheat"} • {scenario.inputs?.areaAcres ?? 4} Acres
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Estimated Profit:</span>
            <span className="font-black text-emerald-700 tabular-nums">
              {formatCurrency(scenario.results?.economics?.profit ?? 0)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400">Risk Profile:</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${riskInfo.colorClass}`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: riskInfo.indicatorColor }} />
              <span>{riskInfo.label}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Buttons Toolbar */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-1 text-xs font-bold">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpen && onOpen(scenario)}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors shadow-2xs"
          >
            Open Plan
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            Rename
          </button>
          <button
            type="button"
            onClick={() => onClone && onClone(scenario.id)}
            className="px-2 py-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            Clone
          </button>
        </div>

        <button
          type="button"
          onClick={() => onDelete && onDelete(scenario.id)}
          className="px-2 py-1 rounded text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
