import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS } from "../../services/mockData";
import { getRecommendations } from "../../services/recommendations.service";
import RecommendationsList from "../../components/recommendations/RecommendationsList";

/**
 * RecommendationsPage - Member 4 (Section 13 of Task_Distribution.md)
 * Full page presenting rule-based actionable advisories for simulated scenarios.
 */
export default function RecommendationsPage({ scenarioId = "sc-003", onNavigate = null }) {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const allScenarios = MOCK_SCENARIOS || [];
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarioId);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state if scenarioId prop changes from parent / router
  useEffect(() => {
    if (scenarioId) {
      setSelectedScenarioId(scenarioId);
    }
  }, [scenarioId]);

  // Fetch recommendations whenever selected scenario changes
  const fetchAdvisories = () => {
    setIsLoading(true);
    setError(null);

    getRecommendations(selectedScenarioId)
      .then((data) => {
        setRecommendations(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load scenario recommendations.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvisories();
  }, [selectedScenarioId]);

  const activeScenario = allScenarios.find((s) => s.id === selectedScenarioId) || allScenarios[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <span>PRARAMBHA 2.0</span> • <span>Actionable Guidance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t("recommendations.title")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t("recommendations.subtitle")}
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

        {/* Active Scenario Context Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              🌾
            </span>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Simulated Plan Context
              </span>
              <h2 className="text-base font-black text-slate-900">
                {activeScenario?.name}
              </h2>
            </div>
          </div>

          {/* Scenario Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="rec-scenario-select" className="text-xs font-bold text-slate-600">
              Switch Scenario:
            </label>
            <select
              id="rec-scenario-select"
              value={selectedScenarioId}
              onChange={(e) => setSelectedScenarioId(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              {allScenarios.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.results?.risk?.level?.toUpperCase()} RISK)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recommendations List Component with Loading, Empty & Error States */}
        <RecommendationsList
          recommendations={recommendations}
          isLoading={isLoading}
          error={error}
          onRetry={fetchAdvisories}
        />
      </div>
    </div>
  );
}
