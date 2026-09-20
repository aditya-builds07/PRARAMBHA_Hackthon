import React, { useState, useMemo } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  MOCK_SCENARIOS,
  MOCK_WHY_EXPLANATIONS,
  MOCK_RECOMMENDATIONS,
  MOCK_RESOURCE_READINESS,
  MOCK_ASSUMPTIONS,
} from "../../services/mockData";
import { generateReportModel, generatePlainTextReport } from "../../services/report.service";
import ReportSummary from "../../components/report/ReportSummary";
import PrintableReport from "../../components/report/PrintableReport";

/**
 * ReportPage - Member 4 (Section 17 of Task_Distribution.md)
 * Full page displaying concise, print-ready 12-section decision support report.
 */
export default function ReportPage({ onNavigate = null }) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const allScenarios = MOCK_SCENARIOS || [];
  const [selectedScenarioId, setSelectedScenarioId] = useState("sc-002"); // Default to High Efficiency Drip Plan

  const scenario = useMemo(
    () => allScenarios.find((s) => s.id === selectedScenarioId) || allScenarios[0],
    [allScenarios, selectedScenarioId]
  );

  const whyKey = `${scenario?.id}_vs_sc-001`;
  const whyExplanation = MOCK_WHY_EXPLANATIONS[whyKey] || null;

  // Compile full 12-section model
  const reportModel = useMemo(() => {
    return generateReportModel({
      scenario,
      farm: { id: "farm-001", name: "Shivneri Farm (Plot 1)", areaAcres: 4 },
      whyExplanation,
      recommendations: MOCK_RECOMMENDATIONS,
      resources: MOCK_RESOURCE_READINESS,
      assumptions: MOCK_ASSUMPTIONS,
    });
  }, [scenario, whyExplanation]);

  // Handle plain text summary export
  const handleExportText = () => {
    if (!reportModel) return;
    const text = generatePlainTextReport(reportModel);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `KrishiMitra_Report_${scenario.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans print:p-0 print:bg-white">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header toolbar (Hidden during print) */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300 print:hidden">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Executive Report</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("report.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-0.5">
              Printable agricultural decision sheet for farmer records and extension reviews.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("comparison")}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs"
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

        {/* Scenario Selection Bar (Hidden during print) */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <label htmlFor="report-scenario-select" className="text-xs font-bold text-slate-700">
            Generate Report For Plan:
          </label>
          <select
            id="report-scenario-select"
            value={selectedScenarioId}
            onChange={(e) => setSelectedScenarioId(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          >
            {allScenarios.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.inputs?.crop} • {s.inputs?.irrigation?.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* On-Screen Action Summary Bar (Hidden during print) */}
        <div className="print:hidden">
          <ReportSummary reportModel={reportModel} onExportText={handleExportText} />
        </div>

        {/* Printable 12-Section Document Sheet */}
        <PrintableReport reportModel={reportModel} />
      </div>
    </div>
  );
}
