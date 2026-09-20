import React from "react";
import { formatCurrency, formatNumber, calculateSecondaryDeltas } from "../../services/comparison.service";
import FactorAttribution from "./FactorAttribution";
import ControllableVsExternal from "./ControllableVsExternal";

/**
 * WhyPanel Component - Member 4
 * Comprehensive explainability container answering "Why did this scenario change?"
 * Integrates outcome summary, secondary deltas, factor attribution, and controllability breakdown.
 */
export default function WhyPanel({
  targetScenario,
  referenceScenario,
  explanation,
  isLoading = false,
  className = "",
}) {
  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div
        className={`space-y-6 animate-pulse ${className}`}
        aria-busy="true"
        aria-label="Loading attribution data"
      >
        <div className="bg-slate-200/70 h-44 rounded-xl" />
        <div className="bg-slate-200/70 h-64 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-200/70 h-52 rounded-xl" />
          <div className="bg-slate-200/70 h-52 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!targetScenario || !referenceScenario) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center text-slate-500">
        Please select both a target scenario and a baseline reference to view explainability insights.
      </div>
    );
  }

  // Handle case where target is identical to reference
  if (targetScenario.id === referenceScenario.id) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center space-y-2">
        <div className="text-3xl">🎯</div>
        <h3 className="font-bold text-blue-900 text-base">
          Identical Scenario Comparison
        </h3>
        <p className="text-xs text-blue-700 max-w-md mx-auto">
          <strong>{targetScenario.name}</strong> is currently selected as both the target and baseline reference. Select a different target scenario above to see why outputs vary.
        </p>
      </div>
    );
  }

  // Calculate secondary deltas (Yield, Water, Risk, Decision Score)
  const secondaryDeltas = calculateSecondaryDeltas(targetScenario, referenceScenario);
  const totalImpact = explanation?.totalChange?.value ?? (secondaryDeltas?.profit?.diff ?? 0);
  const isGain = totalImpact >= 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. Outcome Summary Hero Card */}
      <section
        aria-label="Simulation Outcome Summary"
        className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              <span>Decision Explainability</span> • <span>Impact Summary</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {targetScenario.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Evaluated against baseline: <strong className="text-slate-700 font-semibold">{referenceScenario.name}</strong>
            </p>
          </div>

          {/* Primary Net Profit Delta Pill */}
          <div
            className={`flex flex-col items-start sm:items-end p-3.5 rounded-xl border ${
              isGain
                ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                : "bg-rose-50/70 border-rose-200 text-rose-950"
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Net Profit Difference
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span
                className={`text-2xl sm:text-3xl font-black tabular-nums ${
                  isGain ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {isGain ? `+${formatCurrency(totalImpact)}` : formatCurrency(totalImpact)}
              </span>
              <span className="text-xs font-bold text-slate-500">
                ({isGain ? "+" : ""}{formatNumber(secondaryDeltas?.profit?.pct ?? 0, 1)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Impact Metrics Bar (Yield, Water, Risk, Decision Score) */}
        {secondaryDeltas && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-4">
            {/* Total Yield */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Total Yield Shift
              </span>
              <span
                className={`text-sm font-black tabular-nums mt-0.5 block ${
                  secondaryDeltas.yieldTotal.diff >= 0 ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {secondaryDeltas.yieldTotal.diff >= 0 ? "+" : ""}
                {formatNumber(secondaryDeltas.yieldTotal.diff, 1)} Qtl
              </span>
              <span className="text-[10px] text-slate-400">
                ({secondaryDeltas.yieldTotal.diff >= 0 ? "+" : ""}{formatNumber(secondaryDeltas.yieldTotal.pct, 1)}%)
              </span>
            </div>

            {/* Water Drawn */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Water Drawn Delta
              </span>
              <span
                className={`text-sm font-black tabular-nums mt-0.5 block ${
                  secondaryDeltas.waterDrawn.diff <= 0 ? "text-emerald-700" : "text-amber-700"
                }`}
              >
                {secondaryDeltas.waterDrawn.diff >= 0 ? "+" : ""}
                {formatNumber(secondaryDeltas.waterDrawn.diff, 0)} m³
              </span>
              <span className="text-[10px] text-slate-400">
                {secondaryDeltas.waterDrawn.diff <= 0 ? "Saved" : "Increased withdrawal"}
              </span>
            </div>

            {/* Risk Shift */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Risk Score Shift
              </span>
              <span
                className={`text-sm font-black tabular-nums mt-0.5 block ${
                  secondaryDeltas.riskOverall.diff <= 0 ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {secondaryDeltas.riskOverall.diff >= 0 ? "+" : ""}
                {formatNumber(secondaryDeltas.riskOverall.diff, 0)} pts
              </span>
              <span className="text-[10px] text-slate-400">
                {secondaryDeltas.riskOverall.diff <= 0 ? "Lower risk profile" : "Elevated risk"}
              </span>
            </div>

            {/* Decision Score */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Decision Score
              </span>
              <span
                className={`text-sm font-black tabular-nums mt-0.5 block ${
                  secondaryDeltas.decisionScore.diff >= 0 ? "text-emerald-700" : "text-slate-700"
                }`}
              >
                {secondaryDeltas.decisionScore.diff >= 0 ? "+" : ""}
                {formatNumber(secondaryDeltas.decisionScore.diff, 0)} pts
              </span>
              <span className="text-[10px] text-slate-400">
                Target: {targetScenario.results?.decisionScore ?? 0}/100
              </span>
            </div>
          </div>
        )}
      </section>

      {/* 2. Factor Attribution Waterfall Component */}
      {explanation ? (
        <FactorAttribution
          factors={explanation.factors}
          totalChange={explanation.totalChange}
          isReconciled={explanation.isReconciled}
        />
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-xs text-amber-800">
          Attribution model for this scenario pair is currently pending calculation from the domain engine.
        </div>
      )}

      {/* 3. Controllable vs External Factors Categorization Component */}
      {explanation?.factors && (
        <ControllableVsExternal factors={explanation.factors} />
      )}

      {/* 4. Transparency & Audit Notice */}
      <footer className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🔬</span>
          <span>
            <strong>Deterministic Attribution:</strong> Factors reconcile to exact scenario differences using crop water/temperature benchmarks. No generative AI estimation.
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 shrink-0">
          Model: {targetScenario.modelVersion || "v2.0-deterministic"}
        </div>
      </footer>
    </div>
  );
}
