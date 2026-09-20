import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency } from "../../services/comparison.service";

/**
 * ScenarioSelector - Task A in Task_Distribution.md:
 * - Allows selecting 2 to 4 scenarios.
 * - Shows checkbox per scenario.
 * - Allows designating one scenario as the baseline.
 * - Disables compare until at least two are selected.
 * - Shows clear validation hints for min 2 and max 4 scenarios.
 */
export default function ScenarioSelector({
  allScenarios = [],
  selectedIds = [],
  baselineId = null,
  onToggleScenario,
  onSetBaseline,
}) {
  const { t } = useLanguage();

  const isMinSelected = selectedIds.length >= 2;
  const isMaxReached = selectedIds.length >= 4;

  return (
    <section aria-label="Scenario Selector" className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold">
              1
            </span>
            {t("comparison.selectScenarios")}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {t("comparison.selectInstruction")}
          </p>
        </div>

        {/* Selection status badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              isMinSelected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {selectedIds.length} / 4 Selected
          </span>
          {!isMinSelected && (
            <span className="text-xs text-amber-600 font-medium">
              (Select at least 2)
            </span>
          )}
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allScenarios.map((scenario) => {
          const isSelected = selectedIds.includes(scenario.id);
          const isBaseline = scenario.id === baselineId;
          const profit = scenario.results?.economics?.profit ?? 0;
          const riskLevel = scenario.results?.risk?.level ?? "low";

          return (
            <div
              key={scenario.id}
              className={`relative rounded-xl border-2 transition-all p-4 flex flex-col justify-between ${
                isSelected
                  ? isBaseline
                    ? "border-emerald-600 bg-emerald-50/40 shadow-sm"
                    : "border-blue-500 bg-blue-50/30 shadow-sm"
                  : "border-slate-200 bg-slate-50/60 opacity-80 hover:opacity-100 hover:border-slate-300"
              }`}
            >
              {/* Card Header & Checkbox */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={!isSelected && isMaxReached}
                      onChange={() => onToggleScenario(scenario.id)}
                      className="mt-1 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer disabled:cursor-not-allowed"
                      aria-label={`Select ${scenario.name}`}
                    />
                    <div>
                      <span className="font-bold text-slate-900 text-sm block leading-tight">
                        {scenario.name}
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {scenario.inputs?.crop} • {scenario.inputs?.areaAcres} Acres
                      </span>
                    </div>
                  </label>

                  {isBaseline && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                      {t("comparison.baseline")}
                    </span>
                  )}
                </div>

                {/* Key indicators */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Est. Profit</span>
                    <span className="font-semibold text-slate-800">
                      {formatCurrency(profit)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Irrigation</span>
                    <span className="font-semibold text-slate-800 capitalize">
                      {scenario.inputs?.irrigation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Baseline button */}
              <div className="mt-3 pt-2">
                {isSelected && !isBaseline ? (
                  <button
                    type="button"
                    onClick={() => onSetBaseline(scenario.id)}
                    className="w-full text-[11px] font-semibold text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-md py-1 px-2 transition-colors"
                  >
                    {t("comparison.setBaseline")}
                  </button>
                ) : isBaseline ? (
                  <div className="text-center text-[11px] text-emerald-700 font-semibold py-1">
                    ✓ Reference Baseline
                  </div>
                ) : (
                  <div className="h-6" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isMaxReached && (
        <p className="mt-3 text-xs text-slate-500 italic">
          * {t("comparison.maxSelectionHint")}
        </p>
      )}
    </section>
  );
}
