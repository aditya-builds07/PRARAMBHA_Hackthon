import React, { useState, useMemo } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS } from "../../services/mockData";
import { compareScenarios } from "../../services/comparison.service";
import ScenarioSelector from "../../components/comparison/ScenarioSelector";
import ComparisonTable from "../../components/comparison/ComparisonTable";
import EconomicsChart from "../../components/comparison/EconomicsChart";
import RiskWaterChart from "../../components/comparison/RiskWaterChart";

/**
 * ScenarioComparisonPage - Owned by Member 4 (Section 9 & 10 in Task_Distribution.md)
 * Assembles scenario selection (2-4), neutral comparison matrix, and dynamic charts.
 */
export default function ScenarioComparisonPage() {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  // All available scenarios for this farm
  const allScenarios = MOCK_SCENARIOS;

  // Selected scenario IDs (defaulting to first 3 scenarios)
  const [selectedIds, setSelectedIds] = useState(["sc-001", "sc-002", "sc-003"]);

  // Designated baseline scenario
  const [baselineId, setBaselineId] = useState("sc-001");

  // Handle selection toggling
  const handleToggleScenario = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // Unselecting
        const next = prev.filter((item) => item !== id);
        // If unselected scenario was baseline, reassign baseline to first remaining
        if (id === baselineId && next.length > 0) {
          setBaselineId(next[0]);
        }
        return next;
      } else {
        // Selecting up to 4
        if (prev.length >= 4) return prev;
        return [...prev, id];
      }
    });
  };

  // Filter selected scenario objects
  const selectedScenarios = useMemo(() => {
    return allScenarios.filter((s) => selectedIds.includes(s.id));
  }, [allScenarios, selectedIds]);

  // Run comparison analysis
  const comparisonData = useMemo(() => {
    return compareScenarios(selectedScenarios, baselineId);
  }, [selectedScenarios, baselineId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Top Header with Title & Language Switcher */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Decision Support</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("comparison.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t("comparison.subtitle")}
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white border border-slate-200 rounded-lg p-1.5 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 pl-2">Language:</span>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                  language === lang.code
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </header>

        {/* 1. Scenario Selector */}
        <ScenarioSelector
          allScenarios={allScenarios}
          selectedIds={selectedIds}
          baselineId={baselineId}
          onToggleScenario={handleToggleScenario}
          onSetBaseline={setBaselineId}
        />

        {/* Check if at least 2 scenarios are selected */}
        {selectedIds.length < 2 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center my-8">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-bold text-amber-900 text-base mb-1">
              {t("comparison.minSelectionHint")}
            </h3>
            <p className="text-xs text-amber-700 max-w-md mx-auto">
              Comparing plans side-by-side helps identify hidden water and financial trade-offs before investing. Check at least 2 scenario cards above.
            </p>
          </div>
        ) : (
          <>
            {/* 2. Neutral Comparison Table */}
            <ComparisonTable
              scenarios={selectedScenarios}
              baselineId={baselineId}
              differences={comparisonData.differences}
              tradeoffs={comparisonData.tradeoffs}
            />

            {/* 3. Visual Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EconomicsChart scenarios={selectedScenarios} />
              <RiskWaterChart scenarios={selectedScenarios} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
