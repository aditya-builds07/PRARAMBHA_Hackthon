import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * RecommendationCard Component - Member 4
 * Displays a single rule-based agronomic advisory card.
 * Contract: { id, trigger, condition, impact, action, reason, severity }
 */
export default function RecommendationCard({ recommendation }) {
  const { t } = useLanguage();

  if (!recommendation) return null;

  const { trigger, condition, impact, action, reason, severity = "info" } = recommendation;

  // Semantic styles based on severity
  const severityConfig = {
    critical: {
      border: "border-rose-300",
      bgHeader: "bg-rose-50",
      textHeader: "text-rose-950",
      badge: "bg-rose-600 text-white",
      icon: "🚨",
      label: t("recommendations.severity.critical") || "Critical Attention Required",
      actionBg: "bg-rose-50/70 border-rose-200 text-rose-950",
    },
    warning: {
      border: "border-amber-300",
      bgHeader: "bg-amber-50",
      textHeader: "text-amber-950",
      badge: "bg-amber-600 text-white",
      icon: "⚠️",
      label: t("recommendations.severity.warning") || "Optimization Opportunity",
      actionBg: "bg-amber-50/70 border-amber-200 text-amber-950",
    },
    info: {
      border: "border-blue-200",
      bgHeader: "bg-blue-50",
      textHeader: "text-blue-950",
      badge: "bg-blue-600 text-white",
      icon: "💡",
      label: t("recommendations.severity.info") || "Informational Advisory",
      actionBg: "bg-blue-50/70 border-blue-200 text-blue-950",
    },
  }[severity] || {
    border: "border-slate-200",
    bgHeader: "bg-slate-50",
    textHeader: "text-slate-950",
    badge: "bg-slate-600 text-white",
    icon: "📌",
    label: "Advisory",
    actionBg: "bg-slate-50 border-slate-200 text-slate-900",
  };

  return (
    <article
      aria-label={`Recommendation: ${trigger}`}
      className={`bg-white rounded-xl border ${severityConfig.border} shadow-xs overflow-hidden flex flex-col transition-all hover:shadow-sm`}
    >
      {/* Card Header: Severity & Trigger */}
      <div className={`${severityConfig.bgHeader} p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base" aria-hidden="true">
            {severityConfig.icon}
          </span>
          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs ${severityConfig.badge}`}>
            {severityConfig.label}
          </span>
        </div>

        <span className="text-xs font-mono font-bold tracking-tight text-slate-700 bg-white/80 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
          {trigger}
        </span>
      </div>

      {/* Card Body: Structured 4-Part Format */}
      <div className="p-4 sm:p-5 space-y-4 flex-1 text-xs">
        {/* 1. Observed Condition */}
        <div className="space-y-1">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
            {t("recommendations.condition") || "Trigger Condition"}
          </span>
          <p className="text-slate-900 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            {condition}
          </p>
        </div>

        {/* 2. Projected Impact */}
        <div className="space-y-1">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
            {t("recommendations.impact") || "Projected Impact"}
          </span>
          <p className="text-slate-800 leading-relaxed pl-2 border-l-2 border-slate-300">
            {impact}
          </p>
        </div>

        {/* 3. Recommended Action (Hero Action Box) */}
        <div className="space-y-1">
          <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] flex items-center gap-1">
            <span>✅</span>
            <span>{t("recommendations.action") || "Recommended Action"}</span>
          </span>
          <div className={`p-3 rounded-lg border font-semibold leading-relaxed ${severityConfig.actionBg}`}>
            {action}
          </div>
        </div>

        {/* 4. Underlying Scientific / Economic Reason */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">
            {t("recommendations.reason") || "Scientific / Economic Reason"}
          </span>
          <p className="text-slate-600 italic leading-relaxed">
            "{reason}"
          </p>
        </div>
      </div>
    </article>
  );
}
