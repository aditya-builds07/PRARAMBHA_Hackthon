import React, { useState } from "react";
import { formatCurrency } from "../../services/comparison.service";

/**
 * EconomicsChart - Section 11.1 of Task_Distribution.md
 * Non-SVG HTML/CSS bar chart comparing Cost, Revenue, and Profit across selected scenarios.
 */
export default function EconomicsChart({ scenarios = [] }) {
  const [hoveredScenario, setHoveredScenario] = useState(null);

  if (!scenarios || scenarios.length === 0) return null;

  // Max value calculation for scaling
  const maxVal = Math.max(
    ...scenarios.flatMap((s) => [
      s.results?.economics?.cost ?? s.outputs?.cost ?? 85000,
      s.results?.economics?.revenue ?? s.outputs?.revenue ?? 269500,
      s.results?.economics?.profit ?? s.outputs?.profit ?? 184500,
    ]),
    100000
  );

  const series = [
    { key: "cost", label: "Input Cost", color: "#BA1A1A", getVal: (s) => s.results?.economics?.cost ?? s.outputs?.cost ?? 85000 },
    { key: "revenue", label: "Gross Revenue", color: "#00475A", getVal: (s) => s.results?.economics?.revenue ?? s.outputs?.revenue ?? 269500 },
    { key: "profit", label: "Net Profit", color: "#196C3E", getVal: (s) => s.results?.economics?.profit ?? s.outputs?.profit ?? 184500 },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#CDE0D2] p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#CDE0D2] pb-3">
        <div>
          <h3 className="font-extrabold text-[#1E2924] text-base">
            Economics Breakdown: Cost vs Revenue vs Profit
          </h3>
          <p className="text-xs text-[#596A61]">
            Compare financial feasibility across selected strategies (₹ in INR).
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-bold">
          {series.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-xs"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[#1E2924]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* HTML Bar Chart Grid */}
      <div className="h-56 w-full bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-5 flex items-end justify-around gap-6">
        {scenarios.map((sc) => (
          <div 
            key={sc.id} 
            className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
            onMouseEnter={() => setHoveredScenario(sc.id)}
            onMouseLeave={() => setHoveredScenario(null)}
          >
            <div className="w-full flex items-end justify-center gap-1.5 h-40">
              {series.map((s) => {
                const val = s.getVal(sc);
                const heightPct = Math.min(100, Math.max(10, Math.round((val / maxVal) * 100)));
                return (
                  <div
                    key={s.key}
                    className="flex-1 rounded-t-md transition-all duration-300 hover:opacity-90 relative"
                    style={{ height: `${heightPct}%`, backgroundColor: s.color }}
                    title={`${sc.name || sc.label} - ${s.label}: ₹${val.toLocaleString("en-IN")}`}
                  >
                    {hoveredScenario === sc.id && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#003320] text-white text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap z-20">
                        ₹{Math.round(val / 1000)}k
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <span className="text-[11px] font-bold text-[#1E2924] mt-3 truncate max-w-[120px] text-center">
              {sc.name || sc.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
