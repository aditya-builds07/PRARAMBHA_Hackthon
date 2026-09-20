import React from "react";
import { formatCurrency } from "../../services/comparison.service";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * Format risk level with icon + text + color.
 */
function getRiskInfo(level) {
  const lvl = (level || "medium").toLowerCase();
  switch (lvl) {
    case "low":
      return {
        label: "Low Risk",
        icon: "✓",
        dot: "🟢",
        className: "bg-emerald-50 text-emerald-800 border-emerald-300",
      };
    case "high":
      return {
        label: "High Risk",
        icon: "⚠",
        dot: "🟠",
        className: "bg-amber-50 text-amber-800 border-amber-300",
      };
    case "critical":
      return {
        label: "Critical Risk",
        icon: "🚨",
        dot: "🔴",
        className: "bg-rose-50 text-rose-800 border-rose-300",
      };
    case "medium":
    default:
      return {
        label: "Medium Risk",
        icon: "ℹ",
        dot: "🟡",
        className: "bg-yellow-50 text-yellow-800 border-yellow-300",
      };
  }
}

/**
 * DashboardKpiTiles Component - Member 4
 * Card/tile layout displaying 5 core scenario KPIs computed client-side from history.
 */
export default function DashboardKpiTiles({ kpis, onNavigateToHistory }) {
  const { t } = useLanguage();

  if (!kpis) return null;

  const {
    totalScenarios = 0,
    averageProfit = 0,
    averageRiskScore = 0,
    averageRiskLevel = "Low",
    highestProfitScenario = null,
    riskLevelCounts = { low: 0, medium: 0, high: 0, critical: 0 },
  } = kpis;

  const riskBadge = getRiskInfo(averageRiskLevel);

  return (
    <div className="space-y-6">
      {/* 5 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* KPI 1: Total Saved Scenarios */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.totalScenarios") || "Total Saved Scenarios"}
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              📁
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">
              {totalScenarios}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Simulated seasonal strategies on record
            </span>
          </div>
        </div>

        {/* KPI 2: Average Profit Across Scenarios */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.avgProfit") || "Average Projected Profit"}
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              💰
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-black text-emerald-700 tabular-nums">
              {formatCurrency(averageProfit)}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Mean net profit across all tested scenarios
            </span>
          </div>
        </div>

        {/* KPI 3: Average Risk Across Scenarios */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.avgRisk") || "Average Risk Index"}
            </span>
            <span className="w-8 h-8 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center font-bold text-sm">
              🛡️
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">
                {averageRiskScore}
              </span>
              <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${riskBadge.className}`}
              >
                <span aria-hidden="true">{riskBadge.dot}</span>
                <span>{riskBadge.label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* KPI 4: Highest-Profit Scenario */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.highestProfit") || "Highest-Profit Scenario"}
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
              🏆
            </span>
          </div>
          <div className="mt-3">
            {highestProfitScenario ? (
              <>
                <span className="text-2xl sm:text-3xl font-black text-emerald-800 tabular-nums block">
                  {formatCurrency(highestProfitScenario.value)}
                </span>
                <span className="text-xs font-bold text-slate-900 mt-1 block truncate">
                  {highestProfitScenario.name}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Crop: {highestProfitScenario.crop || "Target Variety"}
                </span>
              </>
            ) : (
              <span className="text-sm text-slate-400">None</span>
            )}
          </div>
        </div>

        {/* KPI 5: Count of Scenarios by Risk Level */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t("dashboard.riskDistribution") || "Scenarios by Risk Category"}
            </span>
            <span className="w-8 h-8 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center font-bold text-sm">
              📊
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                <span>🟢</span> <span>Low Risk</span>
              </span>
              <span className="text-2xl font-black text-emerald-900 mt-1 block tabular-nums">
                {riskLevelCounts.low}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-yellow-50/70 border border-yellow-200">
              <span className="text-[11px] font-bold text-yellow-800 flex items-center gap-1">
                <span>🟡</span> <span>Medium Risk</span>
              </span>
              <span className="text-2xl font-black text-yellow-900 mt-1 block tabular-nums">
                {riskLevelCounts.medium}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                <span>🟠</span> <span>High Risk</span>
              </span>
              <span className="text-2xl font-black text-amber-900 mt-1 block tabular-nums">
                {riskLevelCounts.high}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200">
              <span className="text-[11px] font-bold text-rose-800 flex items-center gap-1">
                <span>🔴</span> <span>Critical Risk</span>
              </span>
              <span className="text-2xl font-black text-rose-900 mt-1 block tabular-nums">
                {riskLevelCounts.critical}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Link to Full History Page */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {t("dashboard.viewHistoryHeading") || "Detailed Scenario Management"}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("dashboard.viewHistoryDesc") || "Open, rename, delete, or compare historical farm scenarios side-by-side."}
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToHistory}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>📋</span>
          <span>{t("dashboard.viewHistoryButton") || "Go to Scenario History"}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
