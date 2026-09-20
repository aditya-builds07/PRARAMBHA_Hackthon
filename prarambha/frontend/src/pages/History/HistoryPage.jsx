import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getScenarioHistory } from "../../services/history.service";
import ScenarioHistoryTable from "../../components/history/ScenarioHistoryTable";
import { useScenarioActions } from "../../components/history/useScenarioActions";

/**
 * HistoryPage - Member 4 (Section 16 of Task_Distribution.md)
 * Full scenario history screen using the extracted useScenarioActions hook for
 * optimistic updates, rollback management, compare selections, and lifecycle states.
 */
export default function HistoryPage({ onNavigate = null }) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const {
    scenarios,
    setScenarios,
    selectedIds,
    toggleSelectScenario,
    handleRename,
    handleDelete,
    actionError,
    clearError,
  } = useScenarioActions({
    initialScenarios: [],
    defaultSelectedIds: ["sc-001", "sc-002"],
  });

  const fetchHistory = () => {
    setIsLoading(true);
    setFetchError(null);
    clearError();

    getScenarioHistory()
      .then((data) => {
        setScenarios(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setFetchError(err?.message || "Failed to load saved scenario history.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleOpenScenario = (scenario) => {
    if (onNavigate) {
      onNavigate("report", { scenarioId: scenario.id });
    }
  };

  const handleLaunchCompare = (idsToCompare) => {
    if (onNavigate) {
      onNavigate("comparison", { selectedIds: idsToCompare });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navigation Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Simulation Records</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("history.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t("history.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("comparison")}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                ← Back to Comparison
              </button>
            )}

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1.5 shadow-2xs">
              <span className="text-xs font-semibold text-slate-500 pl-1.5">Language:</span>
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    language === lang.code
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "text-slate-700 hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Action / Rollback Notification Banner */}
        {actionError && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center justify-between gap-4 shadow-xs"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">⚠️</span>
              <p className="text-xs font-semibold">{actionError}</p>
            </div>
            <button
              type="button"
              onClick={clearError}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-xs space-y-4 animate-pulse">
            <div className="h-10 bg-slate-200 rounded-lg w-1/3" />
            <div className="h-64 bg-slate-100 rounded-lg" />
          </div>
        )}

        {/* Fetch Error State with Retry Button */}
        {!isLoading && fetchError && (
          <div
            role="alert"
            className="p-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between gap-4 shadow-xs"
          >
            <div>
              <p className="font-bold text-xs uppercase tracking-wide">
                {t("history.errorTitle") || "Unable to Load Scenario History"}
              </p>
              <p className="text-xs text-rose-700 mt-0.5">{fetchError}</p>
            </div>
            <button
              type="button"
              onClick={fetchHistory}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              {t("history.retry") || "Retry"}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !fetchError && scenarios.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs space-y-3">
            <span className="text-4xl block" aria-hidden="true">🌱</span>
            <h3 className="text-base font-bold text-slate-900">
              {t("history.emptyTitle") || "No saved scenarios yet"}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {t("history.empty") || "Simulate a season in the Scenario Builder and save your strategy to build your farm record history."}
            </p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("builder")}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Create New Scenario
              </button>
            )}
          </div>
        )}

        {/* Table View with 8 columns */}
        {!isLoading && !fetchError && scenarios.length > 0 && (
          <ScenarioHistoryTable
            scenarios={scenarios}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelectScenario}
            onOpen={handleOpenScenario}
            onRename={handleRename}
            onDelete={handleDelete}
            onLaunchCompare={handleLaunchCompare}
          />
        )}
      </div>
    </div>
  );
}
