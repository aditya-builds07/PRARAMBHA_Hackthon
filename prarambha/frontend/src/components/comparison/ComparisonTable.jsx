import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import {
  formatCurrency,
  formatNumber,
  getRiskLevelInfo,
} from "../../services/comparison.service";

/**
 * ComparisonTable - Task B in Task_Distribution.md:
 * - Metrics: Yield, Yield Range, Cost, Revenue, Profit, ROI, Water, Productivity, Risk, Decision Score.
 * - Neutral labels (e.g. Higher Profit, Lower Water Use, Lower Risk).
 * - Accessible: no color-only information.
 * - Delta comparison against reference baseline.
 */
export default function ComparisonTable({
  scenarios = [],
  baselineId = null,
  differences = [],
  tradeoffs = {},
  onSelectWhyScenario = null,
}) {
  const { t } = useLanguage();

  if (!scenarios || scenarios.length < 2) {
    return null;
  }

  const baseline = scenarios.find((s) => s.id === baselineId) || scenarios[0];

  return (
    <section aria-label="Comparison Table" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Table Header / Title */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-sm font-bold">
              2
            </span>
            {t("comparison.metricsTable")}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Baseline: <strong className="text-slate-800 font-semibold">{baseline.name}</strong>. Differences and percentages are computed relative to baseline.
          </p>
        </div>

        {/* Trade-off summary banner */}
        <div className="flex flex-wrap gap-2 text-xs">
          {scenarios.map((s) => {
            const list = tradeoffs[s.id] || [];
            if (list.length === 0) return null;
            return (
              <div key={s.id} className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 shadow-2xs">
                <span className="font-semibold text-slate-900">{s.name}:</span>{" "}
                <span className="text-emerald-700 font-medium">
                  {list.map((h) => h.label).join(" • ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsive Horizontal Scroll Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70">
              <th scope="col" className="p-4 text-xs font-bold uppercase tracking-wider text-slate-600 w-1/4">
                {t("comparison.metric")}
              </th>
              {scenarios.map((scenario) => {
                const isBaseline = scenario.id === baseline.id;
                const badges = tradeoffs[scenario.id] || [];
                return (
                  <th
                    key={scenario.id}
                    scope="col"
                    className={`p-4 text-sm font-bold text-slate-900 align-top ${
                      isBaseline ? "bg-emerald-50/60 border-x border-emerald-200" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span>{scenario.name}</span>
                      {isBaseline && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-600 text-white uppercase">
                          Baseline
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-normal text-slate-500 block">
                      {scenario.inputs?.irrigation?.toUpperCase()} • {scenario.inputs?.weather} weather
                    </span>

                    {/* Neutral Highlight Tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {badges.map((b, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-200 text-slate-800"
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>

                    {/* Action: Explain Scenario Attribution */}
                    {onSelectWhyScenario && !isBaseline && (
                      <button
                        type="button"
                        onClick={() => onSelectWhyScenario(scenario.id)}
                        className="mt-2.5 w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors shadow-2xs"
                        title={`Explain why ${scenario.name} differs from baseline`}
                      >
                        <span>Explain (Why?)</span>
                        <span aria-hidden="true">→</span>
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {/* 1. Yield */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Total Yield
                <span className="block text-xs font-normal text-slate-400">Total harvest output</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const val = s.results?.yield?.total ?? 0;
                const baseVal = baseline.results?.yield?.total ?? 0;
                const diff = val - baseVal;
                return (
                  <td
                    key={s.id}
                    className={`p-4 font-medium text-slate-900 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    <div className="text-base font-bold text-slate-900">
                      {formatNumber(val, 1)} <span className="text-xs font-normal text-slate-500">Quintals</span>
                    </div>
                    {!isBaseline && (
                      <div className={`text-xs font-semibold mt-0.5 ${diff >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {diff >= 0 ? `+${formatNumber(diff, 1)}` : formatNumber(diff, 1)} Qtl ({diff >= 0 ? "+" : ""}{formatNumber((diff / baseVal) * 100, 1)}%)
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 2. Yield Range */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Yield Confidence Range
                <span className="block text-xs font-normal text-slate-400">Low - High estimate</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const y = s.results?.yield || {};
                return (
                  <td
                    key={s.id}
                    className={`p-4 text-slate-700 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium text-xs">
                      {formatNumber(y.low, 1)} — {formatNumber(y.high, 1)} Qtl
                    </span>
                  </td>
                );
              })}
            </tr>

            {/* 3. Production Cost */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Production Cost
                <span className="block text-xs font-normal text-slate-400">Total operational expenses</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const cost = s.results?.economics?.cost ?? 0;
                const baseCost = baseline.results?.economics?.cost ?? 0;
                const diff = cost - baseCost;
                return (
                  <td
                    key={s.id}
                    className={`p-4 font-medium text-slate-900 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    <div className="font-bold text-slate-900">{formatCurrency(cost)}</div>
                    {!isBaseline && (
                      <div className={`text-xs font-semibold mt-0.5 ${diff <= 0 ? "text-emerald-600" : "text-amber-600"}`}>
                        {diff >= 0 ? `+${formatCurrency(diff)}` : `-${formatCurrency(Math.abs(diff))}`}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 4. Gross Revenue */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Gross Revenue
                <span className="block text-xs font-normal text-slate-400">Estimated sales at harvest</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const rev = s.results?.economics?.revenue ?? 0;
                return (
                  <td
                    key={s.id}
                    className={`p-4 font-bold text-slate-900 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    {formatCurrency(rev)}
                  </td>
                );
              })}
            </tr>

            {/* 5. Net Profit (Core decision metric) */}
            <tr className="bg-emerald-50/30 hover:bg-emerald-50/50 transition-colors">
              <th scope="row" className="p-4 font-bold text-emerald-950">
                Net Profit
                <span className="block text-xs font-normal text-emerald-700">Gross revenue minus production cost</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const profit = s.results?.economics?.profit ?? 0;
                const baseProfit = baseline.results?.economics?.profit ?? 0;
                const diff = profit - baseProfit;
                return (
                  <td
                    key={s.id}
                    className={`p-4 ${
                      isBaseline ? "bg-emerald-100/40 border-x border-emerald-300" : ""
                    }`}
                  >
                    <div className="text-lg font-black text-emerald-900">
                      {formatCurrency(profit)}
                    </div>
                    {!isBaseline && (
                      <div
                        className={`text-xs font-bold mt-0.5 inline-flex items-center gap-1 ${
                          diff >= 0 ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {diff >= 0 ? `+${formatCurrency(diff)}` : `-${formatCurrency(Math.abs(diff))}`}
                        <span>({diff >= 0 ? "+" : ""}{formatNumber((diff / baseProfit) * 100, 1)}%)</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 6. Return on Investment (ROI) */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                ROI (Profit / Cost)
                <span className="block text-xs font-normal text-slate-400">Return efficiency on invested money</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const roi = s.results?.economics?.roi ?? 0;
                return (
                  <td
                    key={s.id}
                    className={`p-4 font-bold text-slate-900 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    {formatNumber(roi, 1)}%
                  </td>
                );
              })}
            </tr>

            {/* 7. Water Drawn */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Water Drawn
                <span className="block text-xs font-normal text-slate-400">Total irrigation volume required</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const water = s.results?.water?.drawnM3 ?? 0;
                const baseWater = baseline.results?.water?.drawnM3 ?? 0;
                const diff = water - baseWater;
                return (
                  <td
                    key={s.id}
                    className={`p-4 font-medium text-slate-900 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    <div className="font-bold text-slate-900">
                      {formatNumber(water, 0)} <span className="text-xs font-normal text-slate-500">m³</span>
                    </div>
                    {!isBaseline && (
                      <div className={`text-xs font-semibold mt-0.5 ${diff <= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {diff <= 0 ? `Saved ${formatNumber(Math.abs(diff), 0)} m³` : `+${formatNumber(diff, 0)} m³`}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 8. Water Productivity */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Water Productivity
                <span className="block text-xs font-normal text-slate-400">Kg harvest produced per 100m³ water</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const prod = s.results?.water?.productivity ?? 0;
                return (
                  <td
                    key={s.id}
                    className={`p-4 font-semibold text-slate-800 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    {formatNumber(prod, 1)} Qtl/m³
                  </td>
                );
              })}
            </tr>

            {/* 9. Risk (Accessible: text label + score, non-color-only) */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Risk Level & Index
                <span className="block text-xs font-normal text-slate-400">Composite vulnerability index</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const score = s.results?.risk?.overall ?? 0;
                const level = s.results?.risk?.level ?? "low";
                const info = getRiskLevelInfo(level, score);
                return (
                  <td
                    key={s.id}
                    className={`p-4 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${info.colorClass}`}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: info.indicatorColor }} aria-hidden="true" />
                      <span>{info.label} ({info.scoreText})</span>
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* 10. Decision Score */}
            <tr className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-4 font-semibold text-slate-800">
                Overall Decision Score
                <span className="block text-xs font-normal text-slate-400">0 - 100 multi-criteria index</span>
              </th>
              {scenarios.map((s) => {
                const isBaseline = s.id === baseline.id;
                const score = s.results?.decisionScore ?? 0;
                return (
                  <td
                    key={s.id}
                    className={`p-4 ${
                      isBaseline ? "bg-emerald-50/30 border-x border-emerald-100" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full border-4 border-emerald-600 flex items-center justify-center font-black text-slate-900 text-sm">
                        {score}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">/ 100</span>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
