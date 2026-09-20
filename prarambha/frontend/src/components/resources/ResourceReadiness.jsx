import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import ResourceGapTable from "./ResourceGapTable";
import ResourceStatusBadge from "./ResourceStatusBadge";

/**
 * ResourceReadiness Component - Member 4
 * Evaluates whether farm reserves cover the planned scenario requirements.
 * Supports loading, empty, and error states.
 */
export default function ResourceReadiness({
  readinessData = null,
  isLoading = false,
  error = null,
  onRetry = null,
}) {
  const { t } = useLanguage();

  // 1. Error State
  if (error) {
    return (
      <div
        role="alert"
        className="p-8 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-3 shadow-xs"
      >
        <div className="text-2xl" aria-hidden="true">⚠️</div>
        <h3 className="font-bold text-rose-950 text-sm">
          {t("resources.errorTitle") || "Unable to Load Resource Inventory"}
        </h3>
        <p className="text-xs text-rose-700 max-w-md mx-auto">
          {error}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            Retry Request
          </button>
        )}
      </div>
    );
  }

  // 2. Loading State (Skeleton)
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse" aria-busy="true" aria-label="Loading resource audit">
        <div className="h-24 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  // 3. Empty State
  const hasResources =
    readinessData &&
    (Array.isArray(readinessData.resources) ? readinessData.resources.length > 0 : Boolean(readinessData.budget || readinessData.water));

  if (!hasResources) {
    return (
      <div
        role="status"
        className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-2 shadow-xs"
      >
        <div className="text-2xl text-slate-400" aria-hidden="true">💧</div>
        <h3 className="font-bold text-slate-900 text-sm">
          {t("resources.emptyTitle") || "No Resource Inventory Available"}
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t("resources.empty") || "No resource inventory records found for this farm plot."}
        </p>
      </div>
    );
  }

  const farmName = readinessData.farmName || "Farm Plot";
  const overallStatus = readinessData.overallStatus || readinessData.feasibility?.verdict || "available";

  return (
    <div className="space-y-6">
      {/* 1. Overall Readiness Status Card */}
      <section
        aria-label="Overall Readiness Summary"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              <span>Farm Feasibility Audit</span> • <span>{farmName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pre-Season Resource Readiness
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Validating required working capital, irrigation reserves, seeds, and equipment before planting.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Aggregated Status
            </span>
            <ResourceStatusBadge status={overallStatus} />
          </div>
        </div>
      </section>

      {/* 2. Resource Gap Matrix Card */}
      <section
        aria-label="Resource Gap Matrix"
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">
            Resource Inventory vs Scenario Demand
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            Units tailored by resource type
          </span>
        </div>

        <ResourceGapTable readinessData={readinessData} />
      </section>

      {/* 3. PRD Scope Notice */}
      <footer className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <span className="text-base" aria-hidden="true">ℹ️</span>
        <span>
          <strong>Decision-Support Notice:</strong> This audit verifies agronomic and financial feasibility. KrishiMitra does not process commercial transactions or marketplace purchases.
        </span>
      </footer>
    </div>
  );
}
