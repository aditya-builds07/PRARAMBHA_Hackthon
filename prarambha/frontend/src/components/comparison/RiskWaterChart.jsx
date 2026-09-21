import React, { useState } from "react";
import { formatNumber, getRiskLevelInfo } from "../../services/comparison.service";

/**
 * RiskWaterChart - Section 11.2 of Task_Distribution.md
 * Compares Water Usage, Water Productivity, and Overall Risk.
 * Enhanced with KrishiMitra green theme and animated bars.
 */

const PLAN_COLORS = ["#0D4A2B", "#3D8B5A", "#4C9BB8", "#D9902F"];

function AnimatedBar({ percent, color, delay = 0 }) {
  return (
    <div className="w-full bg-[#EAF3EC] rounded-full h-3 overflow-hidden">
      <div
        className="h-3 rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${percent}%`,
          backgroundColor: color,
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

function MiniBar({ percent, color }) {
  return (
    <div className="w-full bg-[#F0F5F2] rounded-full h-1.5 overflow-hidden">
      <div
        className="h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function RiskWaterChart({ scenarios = [] }) {
  const [activeTab, setActiveTab] = useState("water"); // 'water' | 'risk'

  if (!scenarios || scenarios.length === 0) return null;

  const maxWater = Math.max(4500, ...scenarios.map(s => s.results?.water?.drawnM3 ?? 0));

  return (
    <div className="bg-white rounded-3xl border border-[#CDE0D2] p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-black text-[#1E2924] text-base">
            Water &amp; Risk Assessment
          </h3>
          <p className="text-xs text-[#596A61] mt-0.5">
            Irrigation demand vs. crop security analysis
          </p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 bg-[#EAF3EC] rounded-xl text-xs font-semibold border border-[#CDE0D2]">
          <button
            type="button"
            onClick={() => setActiveTab("water")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "water"
                ? "bg-[#4C9BB8] text-white shadow-sm font-bold"
                : "text-[#596A61] hover:text-[#1E2924]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">water_drop</span>
              <span>Water</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("risk")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "risk"
                ? "bg-[#D9902F] text-white shadow-sm font-bold"
                : "text-[#596A61] hover:text-[#1E2924]"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">shield</span>
              <span>Risk</span>
            </span>
          </button>
        </div>
      </div>

      {activeTab === "water" ? (
        /* ── Water Section ── */
        <div className="space-y-4">
          {scenarios.map((scenario, idx) => {
            const water = scenario.results?.water?.drawnM3 ?? 0;
            const prod = scenario.results?.water?.productivity ?? 0;
            const percent = Math.min(100, Math.round((water / maxWater) * 100));
            const color = PLAN_COLORS[idx % PLAN_COLORS.length];

            return (
              <div
                key={scenario.id}
                className="border border-[#CDE0D2] rounded-2xl p-4 bg-gradient-to-r from-[#F8FBFA] to-white hover:border-[#86C39C] transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-bold text-[#1E2924] text-sm">{scenario.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-black tabular-nums"
                      style={{ color }}
                    >
                      {formatNumber(water, 0)} m³
                    </span>
                    <span className="text-[10px] font-semibold text-[#596A61] bg-[#EAF3EC] px-2 py-0.5 rounded-full border border-[#CDE0D2]">
                      {percent}% of max
                    </span>
                  </div>
                </div>

                <AnimatedBar percent={percent} color={color} delay={idx * 100} />

                <div className="flex justify-between items-center mt-2.5 text-xs">
                  <span className="flex items-center gap-1 text-[#596A61]">
                    <span className="material-symbols-outlined text-[13px] text-[#4C9BB8]">water_voc</span>
                    <span className="capitalize">{scenario.inputs?.irrigation || "Standard"} irrigation</span>
                  </span>
                  <span className="font-bold text-[#0D4A2B] bg-[#F0FAF2] px-2.5 py-0.5 rounded-full border border-[#CDE0D2]">
                    {formatNumber(prod, 1)} Qtl/m³ efficiency
                  </span>
                </div>
              </div>
            );
          })}

          {/* Summary insight */}
          {scenarios.length >= 2 && (() => {
            const best = [...scenarios].sort(
              (a, b) => (b.results?.water?.productivity ?? 0) - (a.results?.water?.productivity ?? 0)
            )[0];
            return (
              <div className="flex items-center gap-2 p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs">
                <span className="material-symbols-outlined text-[18px] text-[#4C9BB8]">emoji_objects</span>
                <span className="text-sky-900 font-semibold">
                  <strong>{best.name}</strong> has the highest water productivity
                  ({formatNumber(best.results?.water?.productivity ?? 0, 1)} Qtl/m³)
                </span>
              </div>
            );
          })()}
        </div>
      ) : (
        /* ── Risk Breakdown Section ── */
        <div className="space-y-4">
          {scenarios.map((scenario, idx) => {
            const risk = scenario.results?.risk || { overall: 0, level: "low", components: {} };
            const info = getRiskLevelInfo(risk.level, risk.overall);
            const comp = risk.components || {};
            const color = PLAN_COLORS[idx % PLAN_COLORS.length];

            const levelBadgeStyle = risk.level === "low"
              ? "bg-[#EAF3EC] text-[#0D4A2B] border-[#CDE0D2]"
              : risk.level === "medium"
              ? "bg-amber-50 text-amber-800 border-amber-200"
              : "bg-red-50 text-red-800 border-red-200";

            return (
              <div
                key={scenario.id}
                className="border border-[#CDE0D2] rounded-2xl p-4 bg-gradient-to-r from-[#F8FBFA] to-white hover:border-[#86C39C] transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-bold text-[#1E2924] text-sm">{scenario.name}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${levelBadgeStyle}`}>
                    {info.label || risk.level} — {risk.overall}/100
                  </span>
                </div>

                {/* Overall risk arc indicator */}
                <div className="mb-3">
                  <div className="flex justify-between text-[10px] text-[#596A61] font-semibold mb-1">
                    <span>Overall Risk Score</span>
                    <span className="font-bold" style={{ color }}>{risk.overall}/100</span>
                  </div>
                  <div className="w-full bg-[#EAF3EC] rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all duration-700"
                      style={{
                        width: `${risk.overall}%`,
                        backgroundColor: risk.overall < 35 ? "#3D8B5A" : risk.overall < 65 ? "#D9902F" : "#C85A45",
                      }}
                    />
                  </div>
                </div>

                {/* Risk Components */}
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Water Stress", value: comp.water ?? 0, color: "#4C9BB8", icon: "water_drop" },
                    { label: "Weather Vulnerability", value: comp.weather ?? 0, color: "#D9902F", icon: "thunderstorm" },
                    { label: "Financial Exposure", value: comp.financial ?? 0, color: "#9B59B6", icon: "account_balance" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[#596A61] mb-0.5">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]" style={{ color: item.color }}>{item.icon}</span>
                          {item.label}
                        </span>
                        <span className="font-bold text-[#1E2924]">{item.value}%</span>
                      </div>
                      <MiniBar percent={item.value} color={item.color} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Lowest risk callout */}
          {scenarios.length >= 2 && (() => {
            const safest = [...scenarios].sort(
              (a, b) => (a.results?.risk?.overall ?? 100) - (b.results?.risk?.overall ?? 100)
            )[0];
            return (
              <div className="flex items-center gap-2 p-3 bg-[#EAF3EC] border border-[#CDE0D2] rounded-xl text-xs">
                <span className="material-symbols-outlined text-[18px] text-[#3D8B5A]">verified_user</span>
                <span className="text-[#1E2924] font-semibold">
                  <strong>{safest.name}</strong> carries the lowest risk score
                  ({safest.results?.risk?.overall ?? 0}/100)
                </span>
              </div>
            );
          })()}
        </div>
      )}

      {/* Screen Reader Accessible Data Alternative */}
      <table className="sr-only">
        <caption>Water efficiency and risk profile comparison data table</caption>
        <thead>
          <tr>
            <th scope="col">Scenario Plan</th>
            <th scope="col">Water Drawn (m³)</th>
            <th scope="col">Water Productivity (Qtl/m³)</th>
            <th scope="col">Overall Risk Score</th>
            <th scope="col">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s) => (
            <tr key={s.id}>
              <th scope="row">{s.name}</th>
              <td>{formatNumber(s.results?.water?.drawnM3 ?? 0, 0)} m³</td>
              <td>{formatNumber(s.results?.water?.productivity ?? 0, 1)} Qtl/m³</td>
              <td>{s.results?.risk?.overall ?? 0}/100</td>
              <td>{s.results?.risk?.level || "Medium"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
