import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatRiskWeightPercent } from "../../services/assumptions.service.js";
import CropParametersTable from "./CropParametersTable";
import FormulasList from "./FormulasList";

/**
 * AssumptionsViewer Component - Member 4
 * Full transparency view displaying model assumptions, crop parameters, risk weights,
 * priority weights, mathematical formulas, and data sources.
 * Strictly read-only reference display with mandatory disclaimer.
 */
export default function AssumptionsViewer({ assumptionsData, isLoading = false }) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse" aria-busy="true">
        <div className="h-28 bg-slate-200 rounded-xl" />
        <div className="h-48 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  if (!assumptionsData) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
        {t("assumptions.empty") || "No simulation assumption metadata available."}
      </div>
    );
  }

  const {
    modelVersion = "v2.1.0-deterministic",
    assumptionVersion = "ICAR-2025.04",
    lastUpdated = "April 2025",
    disclaimer,
    cropParameters = [],
    riskWeights = [],
    priorityWeights = [],
    priorityProfiles = {},
    formulas = [],
    dataSources = [],
    sources = [],
  } = assumptionsData;

  // Normalize risk weights to array of { factor, weight }
  const normalizedRiskWeights = Array.isArray(riskWeights)
    ? riskWeights
    : Object.entries(riskWeights).map(([key, weight]) => {
        const labels = {
          waterStress: "Water Deficit Stress Weight",
          weatherAnomaly: "Weather / Temperature Anomaly",
          sowingDelay: "Sowing Window Delay Penalty",
          financialExposure: "Working Capital Exposure",
        };
        return { factor: labels[key] || key, weight };
      });

  // Normalize priority weights to array of { factor, weight }
  const normalizedPriorityWeights = Array.isArray(priorityWeights) && priorityWeights.length > 0
    ? priorityWeights
    : Object.entries(priorityProfiles).map(([key, val]) => ({
        factor: key.replace(/_/g, " ").toUpperCase(),
        weight: typeof val === "number" ? val : null,
        description: typeof val === "string" ? val : null,
      }));

  // Normalize data sources
  const normalizedSources = Array.isArray(dataSources) && dataSources.length > 0
    ? dataSources
    : sources.map((s) => (typeof s === "string" ? { name: s, description: "" } : s));

  const disclaimerText =
    t("assumptions.disclaimerText") ||
    disclaimer ||
    "Estimated values are model-based and are not guaranteed future results.";

  return (
    <div className="space-y-6">
      {/* MANDATORY Non-Guarantee Disclaimer Banner - Always Visible, Styled Distinctly */}
      <section
        aria-label="Simulation Guidance and Disclaimer"
        className="p-5 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2 shadow-xs"
      >
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[24px] text-amber-900" aria-hidden="true">warning</span>
          <div>
            <h2 className="font-black text-amber-950 text-sm uppercase tracking-wider">
              {t("assumptions.disclaimerTitle") || "Simulation Transparency & Disclaimer"}
            </h2>
            <p className="text-xs text-amber-900 font-bold mt-0.5 leading-relaxed">
              {disclaimerText}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: Model & Assumption Version Metadata */}
      <section
        aria-label="Model Version Metadata"
        className="bg-white rounded-xl border border-slate-200 shadow-xs p-5"
      >
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          1. {t("assumptions.versionSection") || "Model & Assumption Version Specification"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
              {t("assumptions.modelVersion") || "Model Version"}
            </span>
            <span className="text-sm font-black font-mono text-emerald-800 mt-1 block">
              {modelVersion}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Deterministic Agronomic Engine</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
              {t("assumptions.assumptionVersion") || "Assumption Dataset"}
            </span>
            <span className="text-sm font-black font-mono text-slate-900 mt-1 block">
              {assumptionVersion}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">ICAR / CACP Benchmark Package</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
              {t("assumptions.lastUpdated") || "Last Reviewed"}
            </span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">
              {lastUpdated}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Annual Empirical Audit</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Crop Baseline Parameters */}
      <section
        aria-label="Crop Baseline Parameters"
        className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 bg-slate-50/70">
          <h3 className="font-bold text-slate-900 text-sm">
            2. {t("assumptions.cropParameters") || "Crop Baseline Parameters"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified agronomic thresholds governing potential yield and crop water demands across agro-climatic zones.
          </p>
        </div>

        <CropParametersTable cropParameters={cropParameters} />
      </section>

      {/* SECTION 3 & SECTION 4: Risk Weights & Priority Weights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SECTION 3: Risk Model Weights */}
        <section
          aria-label="Risk Weight Factors"
          className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4"
        >
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              3. {t("assumptions.riskWeights") || "Risk Model Weights"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Factor contribution weights composing the 0-100 composite risk scoring model.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th scope="col" className="p-2.5">Risk Factor</th>
                  <th scope="col" className="p-2.5 text-right">Contribution Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {normalizedRiskWeights.map((item, idx) => {
                  const weightNum = typeof item.weight === "number" ? item.weight : parseFloat(item.weight) || 0;
                  const formattedPct = formatRiskWeightPercent(weightNum);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-medium text-slate-800">{item.factor}</td>
                      <td className="p-2.5 text-right font-bold font-mono text-emerald-800 tabular-nums">
                        {formattedPct}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: Priority Weights */}
        <section
          aria-label="Priority Weights and Optimization Profiles"
          className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4"
        >
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              4. {t("assumptions.priorityWeights") || "Priority Weights & Objectives"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-objective optimization criteria and relative evaluation weights.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th scope="col" className="p-2.5">Optimization Factor</th>
                  <th scope="col" className="p-2.5 text-right">Weight / Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {normalizedPriorityWeights.map((item, idx) => {
                  const weightDisplay = item.weight !== null
                    ? formatRiskWeightPercent(item.weight)
                    : item.description || "Active Profile";
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-medium text-slate-800">{item.factor}</td>
                      <td className="p-2.5 text-right font-bold font-mono text-slate-900 tabular-nums">
                        {weightDisplay}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* SECTION 5: Core Mathematical Formulations */}
      <section
        aria-label="Core Mathematical Formulations"
        className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4"
      >
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            5. {t("assumptions.formulas") || "Core Mathematical Formulations"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Deterministic agronomic and financial equations governing all simulation outputs.
          </p>
        </div>

        <FormulasList formulas={formulas} />
      </section>

      {/* SECTION 6: Data Sources & Research References */}
      <section
        aria-label="Agronomic Research Data Sources"
        className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4"
      >
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-800" aria-hidden="true">menu_book</span>
            <span>6. {t("assumptions.sources") || "Agronomic Research Sources & Data References"}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            All benchmark thresholds are calibrated against published institutional agricultural datasets.
          </p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {normalizedSources.map((src, idx) => (
            <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900">{src.name}</span>
                {src.url && (
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {src.url}
                  </span>
                )}
              </div>
              {src.description && (
                <p className="text-slate-600 text-xs leading-relaxed">{src.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
