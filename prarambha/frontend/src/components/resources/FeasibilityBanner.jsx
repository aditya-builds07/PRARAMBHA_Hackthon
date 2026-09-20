import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { calculateFeasibility } from "../../services/resources.service";

/**
 * FeasibilityBanner Component - Member 4 (Module 3)
 * Prominently displays the rolled-up feasibility verdict for the scenario:
 * - "Not Feasible" if ANY resource status is "critical"
 * - "Feasible with Gaps" if ANY is "shortage" (and none critical)
 * - "Feasible" if ALL are "available"
 * Uses text label + icon (never color alone) and includes a one-line deficit summary.
 */
export default function FeasibilityBanner({
  feasibility = null,
  resources = [],
  className = "",
}) {
  const { t } = useLanguage();

  // Derive feasibility if not directly supplied
  const verdictData = feasibility || calculateFeasibility(resources);

  const configs = {
    not_feasible: {
      border: "border-rose-300",
      bg: "bg-rose-50",
      text: "text-rose-950",
      badgeBg: "bg-rose-600 text-white",
      icon: "✕",
      label: t("resources.verdict.notFeasible") || "NOT FEASIBLE",
      subtitle: t("resources.verdict.notFeasibleDesc") || "Critical resource shortages must be resolved prior to planting.",
    },
    feasible_with_gaps: {
      border: "border-amber-300",
      bg: "bg-amber-50",
      text: "text-amber-950",
      badgeBg: "bg-amber-600 text-white",
      icon: "⚠️",
      label: t("resources.verdict.feasibleWithGaps") || "FEASIBLE WITH GAPS",
      subtitle: t("resources.verdict.feasibleWithGapsDesc") || "Operational plan is viable if noted input deficits are procured.",
    },
    feasible: {
      border: "border-emerald-300",
      bg: "bg-emerald-50",
      text: "text-emerald-950",
      badgeBg: "bg-emerald-600 text-white",
      icon: "✓",
      label: t("resources.verdict.feasible") || "FEASIBLE",
      subtitle: t("resources.verdict.feasibleDesc") || "Sufficient capital, water, seeds, and equipment are available.",
    },
  }[verdictData.verdict] || {
    border: "border-slate-300",
    bg: "bg-slate-50",
    text: "text-slate-900",
    badgeBg: "bg-slate-700 text-white",
    icon: "ℹ️",
    label: (verdictData.label || "AUDIT COMPLETE").toUpperCase(),
    subtitle: "Resource assessment complete.",
  };

  return (
    <aside
      aria-label="Scenario Feasibility Verdict"
      className={`rounded-2xl border-2 ${configs.border} ${configs.bg} ${configs.text} p-5 sm:p-6 shadow-sm transition-all ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Verdict Badge and Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-2xs ${configs.badgeBg}`}
            >
              <span aria-hidden="true" className="text-sm font-black">{configs.icon}</span>
              <span>{configs.label}</span>
            </span>

            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Aggregated Feasibility Verdict
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
            {configs.subtitle}
          </h2>

          {/* One-line summary of short resources */}
          {verdictData.summaryText && (
            <p className="text-xs font-medium text-slate-700 pt-0.5 flex items-center gap-1.5">
              <span className="text-slate-400 font-bold uppercase text-[10px]">Resource Summary:</span>
              <span className="font-semibold text-slate-900">{verdictData.summaryText}</span>
            </p>
          )}
        </div>

        {/* Right: Legend reminder */}
        <div className="text-[11px] text-slate-500 bg-white/70 border border-slate-200/80 p-3 rounded-xl max-w-xs shrink-0 space-y-1">
          <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
            Decision Invariant:
          </span>
          <p className="leading-snug">
            Any <strong>Critical</strong> resource gap invalidates immediate sowing. <strong>Shortages</strong> require procurement planning.
          </p>
        </div>
      </div>
    </aside>
  );
}
