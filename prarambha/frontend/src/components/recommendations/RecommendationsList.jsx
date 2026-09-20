import React, { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import RecommendationCard from "./RecommendationCard";

/**
 * RecommendationsList Component - Member 4
 * Filters and renders list of rule-based recommendations.
 */
export default function RecommendationsList({
  recommendations = [],
  isLoading = false,
  className = "",
}) {
  const { t } = useLanguage();
  const [filterSeverity, setFilterSeverity] = useState("all"); // "all" | "critical" | "warning" | "info"

  if (isLoading) {
    return (
      <div className={`space-y-4 animate-pulse ${className}`} aria-busy="true">
        <div className="h-10 bg-slate-200 rounded-lg w-72" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-slate-200 rounded-xl" />
          <div className="h-64 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const filtered = filterSeverity === "all"
    ? recommendations
    : recommendations.filter((r) => r.severity === filterSeverity);

  return (
    <section aria-label="Agronomic Recommendations" className={`space-y-5 ${className}`}>
      {/* Deterministic Rule-Based Transparency Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-base" aria-hidden="true">🛡️</span>
          <span>
            <strong>Deterministic Advisory:</strong> {t("recommendations.ruleBasedNote")}
          </span>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-white/80 border border-emerald-300 px-2 py-0.5 rounded-full shrink-0">
          Rule-Based Engine
        </span>
      </div>

      {/* Filter Tabs and Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter:</span>
          {[
            { id: "all", label: "All Advisories" },
            { id: "critical", label: "Critical" },
            { id: "warning", label: "Optimization" },
            { id: "info", label: "Informational" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterSeverity(tab.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                filterSeverity === tab.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
              {tab.id !== "all" && (
                <span className="ml-1.5 text-[10px] opacity-80">
                  ({recommendations.filter((r) => r.severity === tab.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filtered.length} of {recommendations.length} action items
        </span>
      </div>

      {/* Recommendations Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
          No recommendations matching the "{filterSeverity}" filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </div>
      )}
    </section>
  );
}
