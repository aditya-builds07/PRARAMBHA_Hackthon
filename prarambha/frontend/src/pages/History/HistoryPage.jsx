import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS } from "../../services/mockData";
import ScenarioHistoryList from "../../components/history/ScenarioHistoryList";

/**
 * HistoryPage - Member 4 (Section 16 of Task_Distribution.md)
 * Full page presenting historical saved simulations with search, renaming, deletion, and comparison.
 */
export default function HistoryPage({ onNavigate = null }) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const handleLaunchCompare = (selectedIds) => {
    if (onNavigate) {
      onNavigate("comparison", { selectedIds });
    }
  };

  const handleOpenScenario = (scenario) => {
    if (onNavigate) {
      onNavigate("results", { scenarioId: scenario.id });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
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
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
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
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* History List Component */}
        <ScenarioHistoryList
          scenarios={MOCK_SCENARIOS}
          onOpenScenario={handleOpenScenario}
          onLaunchCompare={handleLaunchCompare}
        />
      </div>
    </div>
  );
}
