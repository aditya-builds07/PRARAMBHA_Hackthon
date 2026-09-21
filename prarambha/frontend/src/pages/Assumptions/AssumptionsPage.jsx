import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getAssumptions } from "../../services/assumptions.service";
import AssumptionsViewer from "../../components/assumptions/AssumptionsViewer";

/**
 * AssumptionsPage - Member 4 (Section 15 of Task_Distribution.md)
 * Full transparency screen showing model version, formulas, crop parameters, risk weights,
 * priority weights, research sources, and mandatory disclaimer.
 * Enhanced with KrishiMitra premium design system.
 */
export default function AssumptionsPage({ onNavigate = null }) {
  const { t } = useLanguage();

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
    <div className="space-y-6 page-transition">
      {/* ── PREMIUM HEADER ── */}
      <header className="rounded-3xl border border-[#CDE0D2] bg-gradient-to-br from-[#063D27] to-[#0D4A2B] p-6 text-white relative overflow-hidden shadow-lg">
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3D8B5A_1px,transparent_1px)] [background-size:14px_14px]" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#86C39C] uppercase tracking-widest">
              <span className="material-symbols-outlined text-[13px]">science</span>
              <span>KRISHIMITRA</span>
              <span className="opacity-50">•</span>
              <span>MODEL TRANSPARENCY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t("assumptions.title") || "Model Assumptions & Formulas"}
            </h1>
            <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              {t("assumptions.subtitle") ||
                "Complete transparency into underlying agronomic equations, parameters, and research sources."}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-emerald-200/90 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#86C39C]">check_circle</span>
                Peer-reviewed parameters
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#86C39C]">check_circle</span>
                ICAR & ICRISAT sourced
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#86C39C]">check_circle</span>
                Deterministic model v2.0
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("comparison")}
                className="px-4 py-2 rounded-xl border border-[#3D8B5A] bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                Back to Comparison
              </button>
            )}
            <div className="px-3 py-1.5 rounded-full bg-[#0D4A2B]/60 border border-[#3D8B5A]/50 text-[10px] font-bold text-[#86C39C] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D8B5A] animate-pulse inline-block" />
              Read-only Reference
            </div>
          </div>
        </div>
      </header>

      {/* Error State with Retry Button */}
      {error && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-center justify-between gap-4 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[22px] text-rose-500 shrink-0">error</span>
            <div>
              <p className="font-bold text-xs uppercase tracking-wide">
                {t("assumptions.errorTitle") || "Unable to Load Simulation Assumptions"}
              </p>
              <p className="text-xs text-rose-900 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchAssumptions}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[15px]">refresh</span>
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
