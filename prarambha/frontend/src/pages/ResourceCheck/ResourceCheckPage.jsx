import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getResourceReadiness } from "../../services/resources.service";
import ResourceReadiness from "../../components/resources/ResourceReadiness";

/**
 * ResourceCheckPage - Member 4 (Section 14 of Task_Distribution.md)
 * Feasibility audit verifying budget, water, seed, and input availability with async fetch & states.
 */
export default function ResourceCheckPage({
  farmId = "farm-001",
  scenarioId = "sc-001",
  onNavigate = null,
}) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const [readinessData, setReadinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReadiness = () => {
    setIsLoading(true);
    setError(null);

    getResourceReadiness(farmId, scenarioId)
      .then((data) => {
        setReadinessData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load farm resource audit.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchReadiness();
  }, [farmId, scenarioId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Feasibility Check</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("resources.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t("resources.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            {onNavigate && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate("recommendations", { farmId, scenarioId })}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <span>🌾</span>
                  <span>Recommendations</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("report", { farmId, scenarioId })}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <span>📄</span>
                  <span>View Report</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("comparison")}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
                >
                  ← Back to Comparison
                </button>
              </div>
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

        {/* Resource Readiness Component with loading, empty, and error states */}
        <ResourceReadiness
          readinessData={readinessData}
          isLoading={isLoading}
          error={error}
          onRetry={fetchReadiness}
        />
      </div>
    </div>
  );
}
