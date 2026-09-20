import React, { useState } from "react";
import { formatNumber, getRiskLevelInfo } from "../../services/comparison.service";

/**
 * RiskWaterChart - Section 11.2 of Task_Distribution.md
 * Compares Water Usage, Water Productivity, and Overall Risk.
 */
export default function RiskWaterChart({ scenarios = [] }) {
  const [activeTab, setActiveTab] = useState("water"); // 'water' | 'risk'

  if (!scenarios || scenarios.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Water Demand & Risk Assessment
          </h3>
          <p className="text-xs text-slate-500">
            Assess irrigation requirements vs. crop security risks.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("water")}
            className={`px-3 py-1 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-hidden ${
              activeTab === "water"
                ? "bg-white text-blue-800 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            💧 Water Efficiency
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("risk")}
            className={`px-3 py-1 rounded-md transition-all focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-hidden ${
              activeTab === "risk"
                ? "bg-white text-rose-800 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ⚠️ Risk Profile
          </button>
        </div>
      </div>

      {activeTab === "water" ? (
        /* Water Section */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => {
              const water = scenario.results?.water?.drawnM3 ?? 0;
              const prod = scenario.results?.water?.productivity ?? 0;
              // Max standard benchmark ~ 5000 m³
              const maxWater = 4500;
              const percent = Math.min(100, Math.round((water / maxWater) * 100));

              return (
                <div
                  key={scenario.id}
                  className="border border-slate-200 rounded-lg p-3 bg-slate-50/50"
                >
                  <div className="flex justify-between items-center mb-1 text-sm font-bold text-slate-900">
                    <span>{scenario.name}</span>
                    <span className="text-blue-700">{formatNumber(water, 0)} m³</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                    <span>Irrigation: <strong className="capitalize text-slate-700">{scenario.inputs?.irrigation}</strong></span>
                    <span>Productivity: <strong className="text-emerald-700 font-bold">{formatNumber(prod, 1)} Qtl/m³</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Risk Breakdown Section */
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => {
              const risk = scenario.results?.risk || { overall: 0, level: "low", components: {} };
              const info = getRiskLevelInfo(risk.level, risk.overall);
              const comp = risk.components || {};

              return (
                <div
                  key={scenario.id}
                  className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-900 text-sm">{scenario.name}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${info.colorClass}`}
                    >
                      {info.label} ({risk.overall}/100)
                    </span>
                  </div>

                  {/* Risk Components Progress */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Water Stress Risk:</span>
                      <span className="font-semibold">{comp.water ?? 0}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-sky-500 h-1.5 rounded-full"
                        style={{ width: `${comp.water ?? 0}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-slate-600 pt-1">
                      <span>Weather Vulnerability:</span>
                      <span className="font-semibold">{comp.weather ?? 0}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{ width: `${comp.weather ?? 0}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-slate-600 pt-1">
                      <span>Financial Exposure:</span>
                      <span className="font-semibold">{comp.financial ?? 0}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-500 h-1.5 rounded-full"
                        style={{ width: `${comp.financial ?? 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
