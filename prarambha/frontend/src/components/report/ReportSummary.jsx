import React from "react";
import { formatCurrency, formatNumber } from "../../services/comparison.service";
import { triggerPrint } from "../../services/report.service";

/**
 * ReportSummary Component - Member 4
 * On-screen executive summary card with print & export actions.
 */
export default function ReportSummary({ reportModel, onExportText }) {
  if (!reportModel) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <span>Executive Summary</span> • <span>{reportModel.scenario.name}</span>
        </div>
        <div className="flex items-baseline gap-4 flex-wrap">
          <div>
            <span className="text-xs text-slate-400 font-medium">Estimated Net Profit:</span>
            <span className="text-xl font-black text-emerald-700 ml-1.5 tabular-nums">
              {formatCurrency(reportModel.economics.profit)}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Yield:</span>
            <span className="text-sm font-bold text-slate-900 ml-1.5 tabular-nums">
              {formatNumber(reportModel.yield.total, 1)} {reportModel.yield.unit}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Water Drawn:</span>
            <span className="text-sm font-bold text-slate-900 ml-1.5 tabular-nums">
              {formatNumber(reportModel.water.drawnM3, 0)} m³
            </span>
          </div>
        </div>
      </div>

      {/* Actions: Print and Text Download */}
      <div className="flex items-center gap-2.5 shrink-0">
        {onExportText && (
          <button
            type="button"
            onClick={onExportText}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span>📄</span>
            <span>Download Summary</span>
          </button>
        )}

        <button
          type="button"
          onClick={triggerPrint}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>🖨️</span>
          <span>Print Decision Sheet</span>
        </button>
      </div>
    </div>
  );
}
