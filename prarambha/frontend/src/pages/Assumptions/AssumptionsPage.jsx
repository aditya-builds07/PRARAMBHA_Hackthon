import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getAssumptions } from "../../services/assumptions.service";
import AssumptionsViewer from "../../components/assumptions/AssumptionsViewer";

/**
 * AssumptionsPage - Member 4 (Section 15 of Task_Distribution.md)
 * Full transparency screen showing model version, formulas, crop parameters, risk weights,
 * priority weights, research sources, and mandatory disclaimer.
 * Read-only reference layout with async fetch, loading, and error states.
 */
export default function AssumptionsPage({ onNavigate = null }) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const [assumptionsData, setAssumptionsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssumptions = () => {
    setIsLoading(true);
    setError(null);

    getAssumptions()
      .then((data) => {
        setAssumptionsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load simulation assumption parameters.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAssumptions();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D0DEC0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#164A34] uppercase tracking-widest mb-1">
            <span>KRISHIMITRA</span> • <span>MODEL TRANSPARENCY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2924] tracking-tight">
            {t("assumptions.title") || "Model Assumptions & Formulas"}
          </h1>
          <p className="text-sm text-[#596A61] mt-1 max-w-2xl">
            {t("assumptions.subtitle") || "Complete transparency into underlying agronomic equations, parameters, and research sources."}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("comparison")}
              className="px-3.5 py-2 rounded-xl border border-[#D0DEC0] bg-white hover:bg-[#EBF3ED] text-xs font-bold text-[#164A34] transition-colors shadow-xs cursor-pointer"
            >
              ← Back to Comparison
            </button>
          )}
        </div>
      </header>
      {/* Error State with Retry Button */}

        {/* Error State with Retry Button */}
        {error && (
          <div
            role="alert"
            className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-center justify-between gap-4 shadow-xs"
          >
            <div>
              <p className="font-bold text-xs uppercase tracking-wide">
                {t("assumptions.errorTitle") || "Unable to Load Simulation Assumptions"}
              </p>
              <p className="text-xs text-rose-900 mt-0.5">{error}</p>
            </div>
            <button
              type="button"
              onClick={fetchAssumptions}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden"
            >
              {t("assumptions.retry") || "Retry"}
            </button>
          </div>
        )}

        {/* Assumptions Viewer Component (Read-Only) */}
        <AssumptionsViewer
          assumptionsData={assumptionsData}
          isLoading={isLoading}
        />
    </div>
  );
}
