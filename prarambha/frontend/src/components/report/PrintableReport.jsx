import React from "react";
import { formatCurrency, formatNumber } from "../../services/comparison.service";

/**
 * PrintableReport Component - Member 4
 * Comprehensive 12-section printable report document tailored for farmers & extension officers.
 * Adheres to Section 17 in Task_Distribution.md.
 */
export default function PrintableReport({ reportModel }) {
  if (!reportModel) return null;

  const {
    metadata,
    farm,
    scenario,
    inputs,
    yield: yieldData,
    economics,
    water,
    risk,
    decisionScore,
    why,
    recommendations = [],
    resources,
    assumptions,
  } = reportModel;

  return (
    <article
      aria-label="Printable Decision Report"
      className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-10 space-y-8 print:p-0 print:border-none print:shadow-none font-sans text-slate-900"
    >
      {/* Document Header */}
      <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">
            <span>KrishiMitra Simulator</span> • <span>PRARAMBHA 2.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {scenario.name}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            {scenario.tagline || "Agricultural Decision Feasibility & Risk Simulation Report"}
          </p>
        </div>

        <div className="text-left sm:text-right text-[11px] text-slate-500 font-mono space-y-0.5">
          <div>Report Date: {new Date(metadata.generatedAt).toLocaleDateString("en-IN")}</div>
          <div>Model Engine: {metadata.modelVersion}</div>
        </div>
      </div>

      {/* Sections 1 & 2 & 3: Farm, Scenario, & Input Parameters Grid */}
      <section aria-label="Farm and Input Parameters" className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          1. Farm Profile & Sowing Parameters
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Farm & Plot</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{farm.name}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Crop & Area</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{inputs.crop} • {inputs.areaAcres} Acres</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Irrigation System</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{inputs.irrigation}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Weather Profile</span>
            <span className="font-bold text-slate-900 mt-0.5 block capitalize">{inputs.weatherCondition}</span>
          </div>
        </div>
      </section>

      {/* Sections 4, 5, 6, 7, 8: Core Performance Metrics Grid */}
      <section aria-label="Simulation Performance Metrics" className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          2. Simulated Outcomes (Yield, Economics, Water & Risk)
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          {/* Net Profit */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Estimated Net Profit
            </span>
            <span className="text-xl font-black text-emerald-700 mt-1 block tabular-nums">
              {formatCurrency(economics.profit)}
            </span>
            <span className="text-[10px] text-emerald-800/80 mt-0.5 block">
              ROI: {formatNumber(economics.roi, 1)}%
            </span>
          </div>

          {/* Harvest Yield */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Total Harvest Yield
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block tabular-nums">
              {formatNumber(yieldData.total, 1)} <span className="text-xs font-bold text-slate-500">Qtl</span>
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              {formatNumber(yieldData.perAcre, 1)} Qtl/Acre (Range: {yieldData.range})
            </span>
          </div>

          {/* Water Consumption */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Water Drawn & Buffer
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block tabular-nums">
              {formatNumber(water.drawnM3, 0)} <span className="text-xs font-bold text-slate-500">m³</span>
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Prod: {formatNumber(water.productivity, 1)} Qtl/m³
            </span>
          </div>

          {/* Risk & Composite Score */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Risk & Decision Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-slate-900 tabular-nums">
                {risk.overall}/100
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase">
                ({risk.levelLabel})
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Decision Score: {decisionScore}/100
            </span>
          </div>
        </div>
      </section>

      {/* Section 9: Why / Factor Attribution */}
      {why && (
        <section aria-label="Attribution Factor Summary" className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Factor Attribution (Variance vs. {why.baselineName})
            </h2>
            <span className="text-xs font-black text-slate-900">
              Net Impact: {formatCurrency(why.totalChange?.value ?? 0)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {why.factors.map((f, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-100 gap-2">
                <div>
                  <span className="font-bold text-slate-900">{f.factor}</span>
                  <span className="ml-2 text-[10px] uppercase font-bold text-slate-500 px-1.5 py-0.2 bg-white border border-slate-200 rounded">
                    {f.controllability}
                  </span>
                  <p className="text-[11px] text-slate-600 mt-0.5">"{f.explanation}"</p>
                </div>
                <span className={`font-black tabular-nums self-end sm:self-auto shrink-0 ${
                  f.contribution >= 0 ? "text-emerald-700" : "text-rose-700"
                }`}>
                  {f.contribution >= 0 ? `+${formatCurrency(f.contribution)}` : formatCurrency(f.contribution)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 10: Recommendations */}
      {recommendations.length > 0 && (
        <section aria-label="Advisory Recommendations" className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
            4. Key Advisory Recommendations
          </h2>
          <div className="space-y-2.5 text-xs">
            {recommendations.map((r) => (
              <div key={r.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{r.trigger}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    {r.severity}
                  </span>
                </div>
                <p className="text-slate-800 font-semibold">{r.action}</p>
                <p className="text-[11px] text-slate-500 italic">{r.reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 11: Resources Readiness Status */}
      {resources && (
        <section aria-label="Farm Resources Readiness" className="space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              5. Resource Feasibility & Reserve Check
            </h2>
            <span className="text-xs font-bold text-slate-700 uppercase">
              Overall Status: <strong>{resources.overallStatus}</strong>
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px]">Budget Gap:</span>
              <span className="font-bold text-slate-900">{formatCurrency(resources.budget?.gap ?? 0)}</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px]">Water Gap:</span>
              <span className="font-bold text-slate-900">{formatNumber(resources.water?.gap ?? 0, 0)} m³</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px]">Seed Gap:</span>
              <span className="font-bold text-slate-900">{formatNumber(resources.seed?.gap ?? 0, 0)} kg</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
              <span className="text-slate-400 font-bold block text-[10px]">Fertilizer Gap:</span>
              <span className="font-bold text-slate-900">{formatNumber(resources.fertilizer?.gap ?? 0, 0)} kg</span>
            </div>
          </div>
        </section>
      )}

      {/* Section 12: Mandatory Assumptions & Disclaimer */}
      <footer className="pt-4 border-t-2 border-slate-900 text-[11px] text-slate-500 space-y-2">
        <div className="flex items-center justify-between font-mono text-[10px]">
          <span>KrishiMitra • Deterministic Agricultural Simulator</span>
          <span>Dataset: {assumptions?.assumptionVersion}</span>
        </div>
        <p className="italic text-slate-600 leading-relaxed">
          <strong>Mandatory Guidance:</strong> {assumptions?.disclaimer}
        </p>
      </footer>
    </article>
  );
}
