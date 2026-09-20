import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getReport, triggerPrint } from "../../services/report.service";
import PrintableReport from "../../components/report/PrintableReport";

/**
 * ReportPage - Member 4 (Section 17 of Task_Distribution.md)
 * Full page presenting concise, printable 12-section summary of a single scenario.
 * Features async fetch, loading, error ("Report unavailable"), and print export.
 */
export default function ReportPage({ scenarioId = "sc-001", onNavigate = null }) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const [currentScenarioId, setCurrentScenarioId] = useState(scenarioId);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReport = (id) => {
    setIsLoading(true);
    setError(null);

    getReport(id)
      .then((data) => {
        if (!data || !data.scenario) {
          throw new Error("Report unavailable for the requested scenario.");
        }
        setReportData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Report unavailable for this scenario.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (scenarioId) {
      setCurrentScenarioId(scenarioId);
    }
  }, [scenarioId]);

  useEffect(() => {
    fetchReport(currentScenarioId);
  }, [currentScenarioId]);

  const handlePrint = () => {
    triggerPrint();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans print:p-0 print:bg-white print:m-0">
      <div className="max-w-5xl mx-auto space-y-6 print:max-w-none print:w-full print:space-y-0">
        {/* Navigation Toolbar (Hidden during print) */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300 print:hidden">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Executive Report</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("report.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              {t("report.subtitle") || "Printable agricultural decision sheet for farmer records and extension reviews."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("comparison")}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
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

        {/* Action Toolbar with Print/Export Button (Hidden during print) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span>Scenario Plan:</span>
            <span className="px-2.5 py-1 rounded bg-slate-100 font-mono text-slate-900">
              {reportData?.scenario?.name || currentScenarioId}
            </span>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isLoading || !!error}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-2xs flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-hidden ${
              !isLoading && !error
                ? "bg-slate-900 hover:bg-slate-800 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>🖨️</span>
            <span>{t("report.printButton") || "Print / Export Summary"}</span>
          </button>
        </div>

        {/* Loading State (Hidden during print) */}
        {isLoading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-xs space-y-4 animate-pulse print:hidden">
            <div className="h-8 bg-slate-200 rounded w-1/3" />
            <div className="h-4 bg-slate-100 rounded w-1/2" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="h-20 bg-slate-100 rounded-lg" />
              <div className="h-20 bg-slate-100 rounded-lg" />
              <div className="h-20 bg-slate-100 rounded-lg" />
              <div className="h-20 bg-slate-100 rounded-lg" />
            </div>
          </div>
        )}

        {/* Error State: Clear "Report unavailable" message with Retry */}
        {!isLoading && error && (
          <div
            role="alert"
            className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs print:hidden"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">⚠️</span>
              <div>
                <h3 className="font-black text-sm uppercase tracking-wide">
                  {t("report.unavailableTitle") || "Report Unavailable"}
                </h3>
                <p className="text-xs text-rose-900 mt-0.5">
                  {error}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fetchReport(currentScenarioId)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden"
            >
              {t("report.retry") || "Retry"}
            </button>
          </div>
        )}

        {/* Printable 12-Section Document Sheet */}
        {!isLoading && !error && reportData && (
          <PrintableReport reportData={reportData} />
        )}
      </div>
    </div>
  );
}
