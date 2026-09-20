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
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Transparency & Reproducibility</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("assumptions.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t("assumptions.subtitle")}
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
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
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
    </div>
  );
}
