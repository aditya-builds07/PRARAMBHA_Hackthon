import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatRiskWeightPercent } from "../../services/assumptions.service.js";
import CropParametersTable from "./CropParametersTable";
import FormulasList from "./FormulasList";

/**
 * AssumptionsViewer Component - Member 4
 * Full transparency view displaying model assumptions, risk weights, formulas, and legal guidance.
 */
export default function AssumptionsViewer({ assumptionsData, isLoading = false }) {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse" aria-busy="true">
        <div className="h-32 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  if (!assumptionsData) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-xs">
        No simulation assumption metadata available.
      </div>
    );
  }

  const {
    modelVersion,
    assumptionVersion,
    lastUpdated,
    disclaimer,
    cropParameters,
    riskWeights = {},
    priorityProfiles = {},
    formulas = [],
    sources = [],
  } = assumptionsData;

  return (
    <div className="space-y-6">
      {/* 1. Mandatory Non-Guarantee Disclaimer Banner */}
      <section
        aria-label="Simulation Guidance and Disclaimer"
        className="p-5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">⚠️</span>
          <h2 className="font-black text-amber-950 text-sm uppercase tracking-wider">
            {t("assumptions.disclaimerTitle") || "Mandatory Simulation Guidance & Disclaimer"}
          </h2>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed font-medium">
          {disclaimer}
        </p>
      </section>

      {/* 2. Model Version & Provenance Card */}
      <section
        aria-label="Model Version Metadata"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              {t("assumptions.modelVersion") || "Model Version"}
            </span>
            <span className="text-sm font-black font-mono text-slate-900 mt-0.5 block">
              {modelVersion}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              {t("assumptions.assumptionVersion") || "Assumption Dataset"}
            </span>
            <span className="text-sm font-black font-mono text-slate-900 mt-0.5 block">
              {assumptionVersion}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              {t("assumptions.lastUpdated") || "Last Reviewed"}
            </span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">
              {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Crop Baseline Parameters */}
      <section
        aria-label="Baseline Agronomic Parameters"
        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">
            {t("assumptions.cropParameters") || "Crop Baseline Parameters"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified agronomic thresholds governing potential yield and water draw.
          </p>
        </div>

        <CropParametersTable cropParameters={cropParameters} />
      </section>

      {/* 4. Risk Weights & Priority Profiles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Model Weights */}
        <section
          aria-label="Risk Weight Factors"
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3"
        >
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {t("assumptions.riskWeights") || "Risk Model Weights"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Factor contribution weights composing the 0-100 composite risk index.
            </p>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            {Object.entries(riskWeights).map(([key, weight]) => {
              const formattedPct = formatRiskWeightPercent(weight);
              const widthPct = (weight * 100).toFixed(0);
              const labels = {
                waterStress: "Water Deficit Stress Weight",
                weatherAnomaly: "Weather / Temperature Anomaly",
                sowingDelay: "Sowing Window Delay Penalty",
                financialExposure: "Working Capital Exposure",
              };
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>{labels[key] || key}</span>
                    <span className="tabular-nums text-slate-900">{formattedPct}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${widthPct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Priority Profiles */}
        <section
          aria-label="Priority Profile Presets"
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3"
        >
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Decision Priority Profiles
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Optimization priorities selectable during scenario creation.
            </p>
          </div>

          <div className="space-y-2.5 pt-1 text-xs">
            {Object.entries(priorityProfiles).map(([profile, desc]) => (
              <div key={profile} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded inline-block">
                  {profile.replace("_", " ")}
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. Core Formulas */}
      <section
        aria-label="Core Mathematical Formulations"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4"
      >
        <div>
          <h3 className="font-bold text-slate-900 text-sm">
            {t("assumptions.formulas") || "Core Mathematical Formulations"}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent agronomic and financial equations used across the simulator.
          </p>
        </div>

        <FormulasList formulas={formulas} />
      </section>

      {/* 6. Scientific Sources */}
      {sources.length > 0 && (
        <footer className="p-5 rounded-xl bg-slate-100/80 border border-slate-200 space-y-2 text-xs text-slate-600">
          <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
            <span>📚</span>
            <span>{t("assumptions.sources") || "Agronomic Research Sources"}</span>
          </h4>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 pl-1">
            {sources.map((src, idx) => (
              <li key={idx}>{src}</li>
            ))}
          </ul>
        </footer>
      )}
    </div>
  );
}
