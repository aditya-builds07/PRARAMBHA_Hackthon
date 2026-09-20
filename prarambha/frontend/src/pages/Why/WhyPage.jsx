import React, { useState, useMemo } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS, MOCK_WHY_EXPLANATIONS } from "../../services/mockData";
import { getWhyExplanation } from "../../services/comparison.service";
import WhyPanel from "../../components/why/WhyPanel";

/**
 * WhyPage - Member 4 (Section 12 of Task_Distribution.md)
 * Dedicated page answering: "Why did this scenario change?"
 * Allows farmer to inspect attribution between any evaluated plan and their baseline.
 */
export default function WhyPage({
  initialTargetId = "sc-002",
  initialReferenceId = "sc-001",
  onNavigate = null,
}) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const allScenarios = MOCK_SCENARIOS || [];

  // Active scenario pair states
  const [targetId, setTargetId] = useState(initialTargetId);
  const [referenceId, setReferenceId] = useState(initialReferenceId);

  // Find scenario objects
  const targetScenario = useMemo(
    () => allScenarios.find((s) => s.id === targetId) || allScenarios[1] || allScenarios[0],
    [allScenarios, targetId]
  );

  const referenceScenario = useMemo(
    () => allScenarios.find((s) => s.id === referenceId) || allScenarios[0],
    [allScenarios, referenceId]
  );

  // Retrieve why explanation data adhering to WhyExplanation contract
  const explanation = useMemo(() => {
    if (!targetScenario || !referenceScenario) return null;
    return getWhyExplanation(targetScenario.id, referenceScenario.id, MOCK_WHY_EXPLANATIONS);
  }, [targetScenario, referenceScenario]);

  // Loading or empty state checks
  if (!allScenarios || allScenarios.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 p-8 flex items-center justify-center font-sans">
        <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-md text-center shadow-xs">
          <div className="text-3xl mb-2">🌾</div>
          <h2 className="text-lg font-bold text-slate-900">No Scenarios Available</h2>
          <p className="text-xs text-slate-500 mt-1">
            Simulate or create scenarios first to generate decision explainability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Top Header with Title, Back Navigation & Language Switcher */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Explainability Layer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("why.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto flex-wrap">
            {/* Optional onNavigate Back to Comparison */}
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

        {/* Pair Selection Controls Card */}
        <section
          aria-label="Scenario Comparison Selectors"
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Scenario Selector */}
            <div>
              <label
                htmlFor="target-scenario-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Simulated Plan to Explain (Target)
              </label>
              <select
                id="target-scenario-select"
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {allScenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.inputs?.irrigation?.toUpperCase()} • {s.inputs?.weather} weather)
                  </option>
                ))}
              </select>
            </div>

            {/* Reference Baseline Selector */}
            <div>
              <label
                htmlFor="baseline-scenario-select"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Baseline Reference Plan
              </label>
              <select
                id="baseline-scenario-select"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              >
                {allScenarios.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} (Baseline)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Scenario Preset Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 font-medium">Quick Compare Against Baseline:</span>
            {allScenarios
              .filter((s) => s.id !== referenceId)
              .map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setTargetId(s.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                    targetId === s.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {s.name}
                </button>
              ))}
          </div>
        </section>

        {/* Core WhyPanel Component */}
        <WhyPanel
          targetScenario={targetScenario}
          referenceScenario={referenceScenario}
          explanation={explanation}
        />
      </div>
    </div>
  );
}
