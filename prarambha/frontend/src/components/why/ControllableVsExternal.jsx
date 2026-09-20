import React from "react";
import { formatCurrency, groupFactorsByControllability } from "../../services/comparison.service";

/**
 * ControllableVsExternal Component - Member 4
 * Separates factors into managerial choices vs environmental conditions.
 * Uses strictly neutral, non-judgmental language.
 */
export default function ControllableVsExternal({ factors = [] }) {
  const grouped = groupFactorsByControllability(factors);

  const controllableSum = grouped.controllable.reduce((sum, f) => sum + (f.contribution || 0), 0);
  const externalSum = grouped.external.reduce((sum, f) => sum + (f.contribution || 0), 0);

  return (
    <section
      aria-label="Controllable versus External Factors"
      className="space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Actionable Agency: Controllable vs External Factors
          </h3>
          <p className="text-xs text-slate-500">
            Differentiating choices you can optimize on the farm from seasonal factors requiring risk buffers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Farmer-Controllable Decisions */}
        <div className="bg-white rounded-xl border border-blue-200 shadow-xs overflow-hidden flex flex-col">
          <div className="bg-blue-50/80 p-4 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold" aria-hidden="true">
                ⚙️
              </span>
              <div>
                <h4 className="font-bold text-blue-950 text-sm">
                  Management Decisions
                </h4>
                <span className="text-[11px] text-blue-700 font-medium">
                  Direct farm agency & inputs
                </span>
              </div>
            </div>

            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                controllableSum >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}
            >
              Net: {controllableSum >= 0 ? `+${formatCurrency(controllableSum)}` : formatCurrency(controllableSum)}
            </span>
          </div>

          <div className="p-4 space-y-3 flex-1">
            {grouped.controllable.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No controllable factor variations recorded.
              </p>
            ) : (
              grouped.controllable.map((item, idx) => {
                const val = item.contribution || 0;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        {item.factor}
                      </span>
                      <span
                        className={`text-xs font-black tabular-nums ${
                          val >= 0 ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {val >= 0 ? `+${formatCurrency(val)}` : formatCurrency(val)}
                      </span>
                    </div>
                    {item.explanation && (
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 2. External / Environmental Conditions */}
        <div className="bg-white rounded-xl border border-purple-200 shadow-xs overflow-hidden flex flex-col">
          <div className="bg-purple-50/80 p-4 border-b border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-xs font-bold" aria-hidden="true">
                🌦️
              </span>
              <div>
                <h4 className="font-bold text-purple-950 text-sm">
                  External & Climate Factors
                </h4>
                <span className="text-[11px] text-purple-700 font-medium">
                  Conditions beyond direct control
                </span>
              </div>
            </div>

            <span
              className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                externalSum >= 0 ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}
            >
              Net: {externalSum >= 0 ? `+${formatCurrency(externalSum)}` : formatCurrency(externalSum)}
            </span>
          </div>

          <div className="p-4 space-y-3 flex-1">
            {grouped.external.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">
                No external weather or market variations recorded.
              </p>
            ) : (
              grouped.external.map((item, idx) => {
                const val = item.contribution || 0;
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        {item.factor}
                      </span>
                      <span
                        className={`text-xs font-black tabular-nums ${
                          val >= 0 ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {val >= 0 ? `+${formatCurrency(val)}` : formatCurrency(val)}
                      </span>
                    </div>
                    {item.explanation && (
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
