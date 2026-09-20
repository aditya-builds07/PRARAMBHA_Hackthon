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
        iconName: "check_circle",
        className: "bg-[#EBF3ED] text-[#164A34] border-[#D0DEC0]",
      };
    case "high":
      return {
        label: "High Risk",
        iconName: "warning",
        className: "bg-[#FDF5EA] text-[#D9902F] border-[#F7D8B5]",
      };
    case "critical":
      return {
        label: "Critical Risk",
        iconName: "error",
        className: "bg-[#FDF0EE] text-[#C85A45] border-[#F5C2BA]",
      };
    case "medium":
    default:
      return {
        label: "Medium Risk",
        iconName: "info",
        className: "bg-[#FDF5EA] text-[#D9902F] border-[#F7D8B5]",
      };
  }
}

/**
 * DashboardKpiTiles Component — PRARAMBHA 2.0 Visual Restoration
 * Card/tile layout displaying 5 core scenario KPIs.
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
        <div className="bg-white rounded-2xl border border-[#D0DEC0] p-5 shadow-xs hover:border-[#86C39C] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#596A61]">
              {t("dashboard.totalScenarios") || "Total Saved Scenarios"}
            </span>
            <span className="w-9 h-9 rounded-xl bg-[#EBF3ED] text-[#164A34] flex items-center justify-center font-bold text-sm border border-[#D0DEC0]">
              <span className="material-symbols-outlined text-[20px]">folder</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-black text-[#1E2924] tabular-nums">
              {totalScenarios}
            </span>
            <span className="text-xs text-[#596A61] block mt-1">
              Simulated seasonal strategies on record
            </span>
          </div>
        </div>

        {/* KPI 2: Average Profit Across Scenarios */}
        <div className="bg-white rounded-2xl border border-[#D0DEC0] p-5 shadow-xs hover:border-[#86C39C] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#596A61]">
              {t("dashboard.avgProfit") || "Average Projected Profit"}
            </span>
            <span className="w-9 h-9 rounded-xl bg-[#EBF3ED] text-[#164A34] flex items-center justify-center font-bold text-sm border border-[#D0DEC0]">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </span>
          </div>
          <div className="mt-3">
            <span className="text-3xl sm:text-4xl font-black text-[#164A34] tabular-nums">
              {formatCurrency(averageProfit)}
            </span>
            <span className="text-xs text-[#596A61] block mt-1">
              Mean net profit across all tested scenarios
            </span>
          </div>
        </div>

        {/* KPI 3: Average Risk Across Scenarios */}
        <div className="bg-white rounded-2xl border border-[#D0DEC0] p-5 shadow-xs hover:border-[#86C39C] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#596A61]">
              {t("dashboard.avgRisk") || "Average Risk Index"}
            </span>
            <span className="w-9 h-9 rounded-xl bg-[#EBF3ED] text-[#1E2924] flex items-center justify-center font-bold text-sm border border-[#D0DEC0]">
              <span className="material-symbols-outlined text-[20px]">shield</span>
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-[#1E2924] tabular-nums">
                {averageRiskScore}
              </span>
              <span className="text-xs font-bold text-[#596A61]">/ 100</span>
            </div>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${riskBadge.className}`}
              >
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">{riskBadge.iconName}</span>
                <span>{riskBadge.label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* KPI 4: Highest-Profit Scenario */}
        <div className="bg-white rounded-2xl border border-[#D0DEC0] p-5 shadow-xs hover:border-[#86C39C] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#596A61]">
              {t("dashboard.highestProfit") || "Highest-Profit Scenario"}
            </span>
            <span className="w-9 h-9 rounded-xl bg-[#FDF5EA] text-[#D9902F] flex items-center justify-center font-bold text-sm border border-[#F7D8B5]">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
            </span>
          </div>
          <div className="mt-3">
            {highestProfitScenario ? (
              <>
                <span className="text-2xl sm:text-3xl font-black text-[#164A34] tabular-nums block">
                  {formatCurrency(highestProfitScenario.value)}
                </span>
                <span className="text-xs font-bold text-[#1E2924] mt-1 block truncate">
                  {highestProfitScenario.name}
                </span>
                <span className="text-[11px] text-[#596A61] block mt-0.5">
                  Crop: {highestProfitScenario.crop || "Target Variety"}
                </span>
              </>
            ) : (
              <span className="text-sm text-[#596A61]">None</span>
            )}
          </div>
        </div>

        {/* KPI 5: Count of Scenarios by Risk Level */}
        <div className="bg-white rounded-2xl border border-[#D0DEC0] p-5 shadow-xs hover:border-[#86C39C] transition-all sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#596A61]">
              {t("dashboard.riskDistribution") || "Scenarios by Risk Category"}
            </span>
            <span className="w-9 h-9 rounded-xl bg-[#EBF3ED] text-[#1E2924] flex items-center justify-center font-bold text-sm border border-[#D0DEC0]">
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
            <div className="p-3 rounded-xl bg-[#EBF3ED] border border-[#D0DEC0]">
              <span className="text-[11px] font-bold text-[#164A34] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> <span>Low Risk</span>
              </span>
              <span className="text-2xl font-black text-[#164A34] mt-1 block tabular-nums">
                {riskLevelCounts.low}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#FDF5EA] border border-[#F7D8B5]">
              <span className="text-[11px] font-bold text-[#D9902F] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span> <span>Medium Risk</span>
              </span>
              <span className="text-2xl font-black text-[#D9902F] mt-1 block tabular-nums">
                {riskLevelCounts.medium}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#FDF5EA] border border-[#F7D8B5]">
              <span className="text-[11px] font-bold text-[#D9902F] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> <span>High Risk</span>
              </span>
              <span className="text-2xl font-black text-[#D9902F] mt-1 block tabular-nums">
                {riskLevelCounts.high}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#FDF0EE] border border-[#F5C2BA]">
              <span className="text-[11px] font-bold text-[#C85A45] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span> <span>Critical Risk</span>
              </span>
              <span className="text-2xl font-black text-[#C85A45] mt-1 block tabular-nums">
                {riskLevelCounts.critical}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Link to Full History Page */}
      <div className="p-5 bg-white rounded-2xl border border-[#D0DEC0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-[#1E2924]">
            {t("dashboard.viewHistoryHeading") || "Detailed Scenario Management"}
          </h4>
          <p className="text-xs text-[#596A61] mt-0.5">
            {t("dashboard.viewHistoryDesc") || "Open, rename, delete, or compare historical farm scenarios side-by-side."}
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToHistory}
          className="px-4 py-2.5 bg-[#164A34] hover:bg-[#196C3E] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">history</span>
          <span>{t("dashboard.viewHistoryButton") || "Go to Scenario History"}</span>
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

