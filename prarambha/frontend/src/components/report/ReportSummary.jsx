import React from "react";
import { formatCurrency, formatNumber } from "../../services/comparison.service";
import { triggerPrint } from "../../services/report.service";

/**
 * ReportSummary Component - Member 4
 * Premium on-screen executive summary card with KPI tiles, print & export actions.
 */
export default function ReportSummary({ reportModel, onExportText }) {
  if (!reportModel) return null;

  const profit = reportModel.economics?.profit ?? 0;
  const revenue = reportModel.economics?.revenue ?? 0;
  const cost = reportModel.economics?.totalCost ?? 0;
  const roi = revenue > 0 && cost > 0 ? Math.round(((revenue - cost) / cost) * 100) : null;

  const kpis = [
    {
      label: "Estimated Net Profit",
      value: formatCurrency(profit),
      icon: "payments",
      color: "#0D4A2B",
      bg: "#EAF3EC",
      border: "#CDE0D2",
      highlight: true,
    },
    {
      label: "Total Yield",
      value: `${formatNumber(reportModel.yield?.total, 1)} ${reportModel.yield?.unit || "qtl"}`,
      icon: "grain",
      color: "#1E2924",
      bg: "#F4F7F4",
      border: "#D0DEC0",
    },
    {
      label: "Water Drawn",
      value: `${formatNumber(reportModel.water?.drawnM3, 0)} m³`,
      icon: "water_drop",
      color: "#4C9BB8",
      bg: "#EFF8FC",
      border: "#BEE0ED",
    },
    ...(roi !== null
      ? [{
          label: "Return on Investment",
          value: `${roi}%`,
          icon: "analytics",
          color: roi >= 0 ? "#3D8B5A" : "#C85A45",
          bg: roi >= 0 ? "#F0FAF2" : "#FEF2F0",
          border: roi >= 0 ? "#C6E8CE" : "#FBCFCB",
        }]
      : []),
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#CDE0D2] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-[#CDE0D2] bg-gradient-to-r from-[#F4F7F4] to-white">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#0D4A2B] uppercase tracking-widest mb-0.5">
            <span className="material-symbols-outlined text-[14px]">summarize</span>
            <span>Executive Summary</span>
            <span className="text-[#CDE0D2]">•</span>
            <span className="truncate max-w-[140px]">{reportModel.scenario?.name}</span>
          </div>
          <p className="text-xs text-[#596A61]">
            Simulation-based farm decision report — for advisory purposes only
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {onExportText && (
            <button
              type="button"
              onClick={onExportText}
              className="px-3.5 py-2 rounded-xl border border-[#D0DEC0] bg-white hover:bg-[#EAF3EC] text-xs font-bold text-[#1E2924] transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:border-[#86C39C]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#596A61]">download</span>
              <span>Download</span>
            </button>
          )}
          <button
            type="button"
            onClick={triggerPrint}
            className="px-4 py-2 rounded-xl bg-[#0D4A2B] hover:bg-[#164A34] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#EAF3EC]">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col gap-1.5 p-4 group hover:bg-[#FAFCFA] transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center border"
                style={{ backgroundColor: kpi.bg, borderColor: kpi.border }}
              >
                <span className="material-symbols-outlined text-[15px]" style={{ color: kpi.color }}>
                  {kpi.icon}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider leading-tight">
                {kpi.label}
              </span>
            </div>
            <span
              className={`font-black tabular-nums text-lg leading-tight ${kpi.highlight ? "text-[#0D4A2B]" : "text-[#1E2924]"}`}
              style={kpi.highlight ? {} : { color: kpi.color }}
            >
              {kpi.value}
            </span>
          </div>
        ))}
      </div>

      {/* Disclaimer bar */}
      <div className="px-5 py-2.5 bg-amber-50 border-t border-amber-100 flex items-center gap-2">
        <span className="material-symbols-outlined text-[14px] text-amber-600 shrink-0">info</span>
        <p className="text-[10px] text-amber-700 font-medium">
          Figures are simulation estimates only. Actual results vary with field conditions, weather, and market prices.
        </p>
      </div>
    </div>
  );
}
