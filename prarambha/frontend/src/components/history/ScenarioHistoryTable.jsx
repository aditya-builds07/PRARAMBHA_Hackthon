import React, { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency } from "../../services/comparison.service";

/**
 * Format risk level with accessible text + icon + color badge.
 * Never uses color alone.
 */
export function getRiskBadge(risk) {
  const riskStr = (typeof risk === "string" ? risk : risk?.level || "Medium").toLowerCase();

  switch (riskStr) {
    case "low":
      return {
        label: "Low Risk",
        icon: "check_circle",
        dot: "",
        className: "bg-emerald-50 text-emerald-950 border-emerald-300",
      };
    case "high":
      return {
        label: "High Risk",
        icon: "warning",
        dot: "",
        className: "bg-amber-50 text-amber-950 border-amber-300",
      };
    case "critical":
      return {
        label: "Critical Risk",
        icon: "error",
        dot: "",
        className: "bg-rose-50 text-rose-950 border-rose-300",
      };
    case "medium":
    default:
      return {
        label: "Medium Risk",
        icon: "info",
        dot: "",
        className: "bg-yellow-50 text-yellow-950 border-yellow-300",
      };
  }
}

/**
 * Format timestamp into readable localized date string.
 */
function formatTimestamp(timestamp) {
  if (!timestamp) return "—";
  try {
    const d = new Date(timestamp);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_e) {
    return String(timestamp);
  }
}

/**
 * ScenarioHistoryTable Component - Member 4
 * Responsive table displaying 8 mandatory columns:
 * 1. Scenario Name
 * 2. Timestamp
 * 3. Crop
 * 4. Area
 * 5. Profit
 * 6. Risk (icon + text + color)
 * 7. Model Version (retains individual scenario version)
 * 8. Actions (Open, Rename, Delete with confirmation, Compare checkbox)
 */
export default function ScenarioHistoryTable({
  scenarios = [],
  selectedIds = [],
  onToggleSelect,
  onOpen,
  onRename,
  onDelete,
  onLaunchCompare,
}) {
  const { t } = useLanguage();

  // Rename state
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Delete confirmation modal state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const startRename = (scenario) => {
    setEditingId(scenario.id);
    setEditingName(scenario.name);
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleRenameSubmit = (e, id) => {
    e.preventDefault();
    if (editingName.trim() && onRename) {
      onRename(id, editingName.trim());
    }
    setEditingId(null);
  };

  const requestDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId && onDelete) {
      onDelete(confirmDeleteId);
    }
    setConfirmDeleteId(null);
  };

  const targetScenarioToDelete = scenarios.find((s) => s.id === confirmDeleteId);

  return (
    <div className="space-y-4">
      {/* Compare Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">
            {t("history.selectedCount") || "Selected for Comparison"}:
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-black font-mono">
            {selectedIds.length} / 4
          </span>
          <span className="text-[11px] text-slate-400">
            ({t("history.compareInstruction") || "Select 2 to 4 scenarios to compare"})
          </span>
        </div>

        <button
          type="button"
          disabled={selectedIds.length < 2}
          onClick={() => onLaunchCompare && onLaunchCompare(selectedIds)}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden ${
            selectedIds.length >= 2 && selectedIds.length <= 4
              ? "bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
              : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">bar_chart</span>
          <span>{t("history.compareButton") || "Compare Selected"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {/* Confirmation Dialog / Modal */}
      {confirmDeleteId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl font-bold">
                <span className="material-symbols-outlined">warning</span>
              </span>
              <div>
                <h2 id="confirm-delete-title" className="text-base font-black text-slate-900">
                  {t("history.confirmDeleteTitle") || "Delete Scenario?"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("history.confirmDeletePrompt") || "Are you sure you want to delete this scenario?"}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              <span className="font-bold text-slate-800 block">
                {targetScenarioToDelete?.name}
              </span>
              <span className="text-slate-500 font-mono text-[11px] block mt-0.5">
                ID: {confirmDeleteId} • {targetScenarioToDelete?.crop}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-hidden"
              >
                {t("history.cancel") || "Cancel"}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden"
              >
                {t("history.confirmDeleteAction") || "Yes, Delete Scenario"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8-Column Desktop & Tablet Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Mobile Horizontal Scroll Indicator */}
        <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-200 text-[11px] text-slate-600 flex items-center justify-between sm:hidden">
          <span>← Swipe to view all table columns →</span>
          <span className="material-symbols-outlined text-[16px]">bar_chart</span>
        </div>

        <div className="overflow-x-auto max-w-full touch-pan-x">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <caption className="sr-only">Historical Scenario Simulations and Management Table</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th scope="col" className="p-3.5 w-12 text-center">
                  <span className="sr-only">Select</span>
                </th>
                <th scope="col" className="p-3.5">{t("history.colName") || "Scenario Name"}</th>
                <th scope="col" className="p-3.5">{t("history.colTimestamp") || "Timestamp"}</th>
                <th scope="col" className="p-3.5">{t("history.colCrop") || "Crop"}</th>
                <th scope="col" className="p-3.5 text-right">{t("history.colArea") || "Area"}</th>
                <th scope="col" className="p-3.5 text-right">{t("history.colProfit") || "Profit"}</th>
                <th scope="col" className="p-3.5 text-center">{t("history.colRisk") || "Risk"}</th>
                <th scope="col" className="p-3.5 text-center">{t("history.colModelVersion") || "Model Version"}</th>
                <th scope="col" className="p-3.5 text-right">{t("history.colActions") || "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {scenarios.map((sc) => {
                const isSelected = selectedIds.includes(sc.id);
                const isEditing = editingId === sc.id;
                const risk = getRiskBadge(sc.risk);
                const profitDisplay = typeof sc.profit === "number" ? formatCurrency(sc.profit) : sc.profit;
                const areaDisplay = typeof sc.area === "number" ? `${sc.area} Acres` : sc.area || "—";

                return (
                  <tr
                    key={sc.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? "bg-emerald-50/40" : ""
                    }`}
                  >
                    {/* Checkbox for compare */}
                    <td className="p-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect && onToggleSelect(sc.id)}
                        aria-label={`Select ${sc.name} for comparison`}
                        className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500 focus-visible:outline-hidden cursor-pointer"
                      />
                    </td>

                    {/* Column 1: Scenario Name (with inline edit) */}
                    <td className="p-3.5 font-bold text-slate-900">
                      {isEditing ? (
                        <form
                          onSubmit={(e) => handleRenameSubmit(e, sc.id)}
                          className="flex items-center gap-1.5"
                        >
                          <label htmlFor={`rename-input-${sc.id}`} className="sr-only">
                            Rename scenario {sc.name}
                          </label>
                          <input
                            id={`rename-input-${sc.id}`}
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            aria-label={`Rename scenario ${sc.name}`}
                            className="bg-white border border-slate-300 rounded px-2 py-1 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelRename}
                            className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-[10px] font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{sc.name}</span>
                          <button
                            type="button"
                            onClick={() => startRename(sc)}
                            title="Rename Scenario"
                            className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">edit</span>
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Column 2: Timestamp */}
                    <td className="p-3.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {formatTimestamp(sc.timestamp)}
                    </td>

                    {/* Column 3: Crop */}
                    <td className="p-3.5 font-medium text-slate-800">
                      {sc.crop || "—"}
                    </td>

                    {/* Column 4: Area */}
                    <td className="p-3.5 text-right font-medium text-slate-700 tabular-nums whitespace-nowrap">
                      {areaDisplay}
                    </td>

                    {/* Column 5: Profit */}
                    <td className="p-3.5 text-right font-black text-emerald-900 tabular-nums whitespace-nowrap">
                      {profitDisplay}
                    </td>

                    {/* Column 6: Risk (icon + text + color) */}
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span
                        role="status"
                        aria-label={`Risk assessment: ${risk.label}`}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs ${risk.className}`}
                      >
                        <span aria-hidden="true">{risk.dot}</span>
                        <span>{risk.label}</span>
                      </span>
                    </td>

                    {/* Column 7: Model Version (MUST retain individual scenario version) */}
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                        {sc.modelVersion || "v2.0.0"}
                      </span>
                    </td>

                    {/* Column 8: Actions (Open, Rename, Delete, Compare) */}
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpen && onOpen(sc)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
                        >
                          {t("history.open") || "Open"}
                        </button>

                        <button
                          type="button"
                          onClick={() => startRename(sc)}
                          className="px-2 py-1 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-[11px] font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-hidden"
                        >
                          {t("history.rename") || "Rename"}
                        </button>

                          <button
                            type="button"
                            onClick={() => requestDelete(sc.id)}
                            className="px-2 py-1 rounded text-rose-700 hover:text-rose-950 hover:bg-rose-50 text-[11px] font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden"
                          >
                          {t("history.delete") || "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
