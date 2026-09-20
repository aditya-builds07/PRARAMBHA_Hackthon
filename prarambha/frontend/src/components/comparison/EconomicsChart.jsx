import React, { useState } from "react";
import { formatCurrency } from "../../services/comparison.service";

/**
 * EconomicsChart - Section 11.1 of Task_Distribution.md
 * Compares Cost, Revenue, and Profit across selected scenarios.
 * Built with responsive SVG for guaranteed reliability and rich aesthetics.
 */
export default function EconomicsChart({ scenarios = [] }) {
  const [hoveredScenario, setHoveredScenario] = useState(null);

  if (!scenarios || scenarios.length === 0) return null;

  // Chart dimensions
  const chartHeight = 280;
  const chartWidth = 640;
  const padding = { top: 30, right: 30, bottom: 50, left: 80 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Max value calculation for scaling
  const maxVal = Math.max(
    ...scenarios.flatMap((s) => [
      s.results?.economics?.cost ?? 0,
      s.results?.economics?.revenue ?? 0,
      s.results?.economics?.profit ?? 0,
    ]),
    100000
  );

  const groupWidth = innerWidth / scenarios.length;
  const barWidth = Math.min(26, groupWidth / 3.8);

  const series = [
    { key: "cost", label: "Cost", color: "#f97316", hoverColor: "#ea580c" },
    { key: "revenue", label: "Revenue", color: "#3b82f6", hoverColor: "#2563eb" },
    { key: "profit", label: "Profit", color: "#10b981", hoverColor: "#059669" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Economics Breakdown: Cost vs Revenue vs Profit
          </h3>
          <p className="text-xs text-slate-500">
            Compare financial feasibility across selected strategies (₹ in Lakhs/Thousands).
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          {series.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm shadow-xs"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto min-w-[500px]"
          role="img"
          aria-label="Bar chart comparing production cost, gross revenue, and net profit"
        >
          {/* Background horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((ratio, i) => {
            const yPos = padding.top + innerHeight * (1 - ratio);
            const valLabel = Math.round((maxVal * ratio) / 1000);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={yPos}
                  x2={chartWidth - padding.right}
                  y2={yPos}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#94a3b8"
                  className="font-mono"
                >
                  ₹{valLabel}k
                </text>
              </g>
            );
          })}

          {/* Scenario Groups */}
          {scenarios.map((scenario, groupIdx) => {
            const groupX = padding.left + groupIdx * groupWidth;
            const groupCenterX = groupX + groupWidth / 2;
            const eco = scenario.results?.economics || {};
            const isHovered = hoveredScenario === scenario.id;

            return (
              <g
                key={scenario.id}
                onMouseEnter={() => setHoveredScenario(scenario.id)}
                onMouseLeave={() => setHoveredScenario(null)}
                className="cursor-pointer transition-opacity"
              >
                {/* Highlight background on hover */}
                {isHovered && (
                  <rect
                    x={groupX + 4}
                    y={padding.top}
                    width={groupWidth - 8}
                    height={innerHeight}
                    fill="#f1f5f9"
                    opacity="0.6"
                    rx="6"
                  />
                )}

                {/* Series Bars */}
                {series.map((item, barIdx) => {
                  const val = Math.max(eco[item.key] ?? 0, 0);
                  const barH = (val / maxVal) * innerHeight;
                  const barX = groupCenterX - (barWidth * 1.5) + (barIdx * (barWidth + 4));
                  const barY = padding.top + (innerHeight - barH);

                  return (
                    <g key={item.key}>
                      <rect
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barH}
                        fill={isHovered ? item.hoverColor : item.color}
                        rx="3"
                        className="transition-all duration-300"
                      />
                      {/* Value label on top of bar */}
                      <text
                        x={barX + barWidth / 2}
                        y={barY - 5}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="bold"
                        fill="#334155"
                      >
                        ₹{(val / 1000).toFixed(0)}k
                      </text>
                    </g>
                  );
                })}

                {/* Scenario Name below group */}
                <text
                  x={groupCenterX}
                  y={chartHeight - 18}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isHovered ? "bold" : "600"}
                  fill={isHovered ? "#0f172a" : "#475569"}
                >
                  {scenario.name.length > 16
                    ? `${scenario.name.substring(0, 14)}...`
                    : scenario.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tooltip detail bar */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600">
        <span>💡 Hover or tap any bar group to view detailed figures.</span>
        {hoveredScenario && (
          <div className="font-semibold text-slate-800">
            {(() => {
              const active = scenarios.find((s) => s.id === hoveredScenario);
              if (!active) return null;
              const eco = active.results?.economics || {};
              return (
                <span>
                  {active.name}: Cost {formatCurrency(eco.cost)} | Revenue {formatCurrency(eco.revenue)} |{" "}
                  <strong className="text-emerald-700">Net Profit {formatCurrency(eco.profit)}</strong>
                </span>
              );
            })()}
          </div>
        )}
      </div>

      {/* Screen Reader Accessible Data Alternative */}
      <table className="sr-only">
        <caption>Economics breakdown comparison data table</caption>
        <thead>
          <tr>
            <th scope="col">Scenario Plan</th>
            <th scope="col">Production Cost</th>
            <th scope="col">Gross Revenue</th>
            <th scope="col">Net Profit</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s) => (
            <tr key={s.id}>
              <th scope="row">{s.name}</th>
              <td>{formatCurrency(s.results?.economics?.cost ?? 0)}</td>
              <td>{formatCurrency(s.results?.economics?.revenue ?? 0)}</td>
              <td>{formatCurrency(s.results?.economics?.profit ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
