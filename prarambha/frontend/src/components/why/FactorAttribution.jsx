import React from "react";
import { formatCurrency } from "../../services/comparison.service";

/**
 * FactorAttribution Component - Member 4
 * Visualizes individual factor contributions that explain the net metric change.
 * Adheres strictly to the WhyExplanation data contract.
 */
export default function FactorAttribution({
  factors = [],
  totalChange = null,
  isReconciled = true,
}) {
  if (!factors || factors.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-sm">
        No factor attribution data recorded for this comparison.
      </div>
    );
  }

  // Find max magnitude for relative bar width calculation
  const maxAbs = Math.max(
    ...factors.map((f) => Math.abs(typeof f.contribution === "number" ? f.contribution : 0)),
    1000
  );

  return (
    <section
      aria-label="Factor Attribution Breakdown"
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span>Factor Attribution (Waterfall Breakdown)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Individual positive drivers and cost/stress penalties explaining net financial change.
          </p>
        </div>

        {/* Reconciliation Invariant Badge */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isReconciled
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-amber-50 text-amber-800 border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isReconciled ? "bg-emerald-600" : "bg-amber-600"
              }`}
              aria-hidden="true"
            />
            {isReconciled ? "Reconciled to Total Delta" : "Partial Attribution"}
          </span>
        </div>
      </div>

      {/* Factor Rows List */}
      <div className="space-y-3 pt-1">
        {factors.map((item, index) => {
          const val = typeof item.contribution === "number" ? item.contribution : 0;
          const isPositive = val > 0;
          const isZero = val === 0;
          const pctWidth = Math.min(100, Math.max(8, (Math.abs(val) / maxAbs) * 100));

          return (
            <div
              key={index}
              className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
            >
              {/* Header: Name + Badge + Contribution */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm">
                    {item.factor}
                  </span>

                  {/* Controllability Pill */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      item.controllability === "controllable"
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : item.controllability === "external"
                        ? "bg-purple-50 text-purple-800 border-purple-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {item.controllability || "Unclassified"}
                  </span>
                </div>

                {/* Magnitude with Explicit Sign and Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                      isPositive
                        ? "bg-emerald-100 text-emerald-800"
                        : isZero
                        ? "bg-slate-200 text-slate-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {isPositive ? "▲ Gain" : isZero ? "• Neutral" : "▼ Impact"}
                  </span>

                  <span
                    className={`font-black text-sm tabular-nums ${
                      isPositive
                        ? "text-emerald-700"
                        : isZero
                        ? "text-slate-700"
                        : "text-rose-700"
                    }`}
                  >
                    {isPositive ? `+${formatCurrency(val)}` : formatCurrency(val)}
                  </span>
                </div>
              </div>

              {/* Proportional Contribution Bar */}
              <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    isPositive
                      ? "bg-emerald-500"
                      : isZero
                      ? "bg-slate-400"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${pctWidth}%` }}
                  aria-hidden="true"
                />
              </div>

              {/* Agronomic Human-Readable Explanation */}
              {item.explanation && (
                <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                  <span className="font-semibold text-slate-700">Agronomic Insight: </span>
                  {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Reconciled Sum Summary Bar */}
      {totalChange && (
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium text-slate-600 bg-slate-100/60 p-3 rounded-lg">
          <span>
            Total Explained Shift ({totalChange.metric || "Net Profit"}):
          </span>
          <span
            className={`font-black text-sm tabular-nums ${
              totalChange.value >= 0 ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {totalChange.value >= 0
              ? `+${formatCurrency(totalChange.value)}`
              : formatCurrency(totalChange.value)}
          </span>
        </div>
      )}
    </section>
  );
}
