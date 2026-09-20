import React from "react";

/**
 * FormulasList Component - Member 4
 * Transparently reveals mathematical formulas behind simulation calculations.
 * Supports both { name, expression, description } and { name, formula, description }.
 */
export default function FormulasList({ formulas = [] }) {
  if (!formulas || formulas.length === 0) return null;

  return (
    <div className="space-y-3">
      {formulas.map((item, idx) => {
        const expression = item.expression || item.formula;
        return (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-bold text-slate-900 text-sm">
                {item.name}
              </h4>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                Formula
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
              <code>{expression}</code>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
