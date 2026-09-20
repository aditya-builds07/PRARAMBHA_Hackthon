import React from "react";
import { formatCurrency, formatNumber } from "../../services/comparison.service";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * Format risk level with icon + text label + color badge.
 * Never uses color alone.
 */
function getRiskBadge(riskLevel, riskScore) {
  const level = (typeof riskLevel === "string" ? riskLevel : "medium").toLowerCase();

  switch (level) {
    case "low":
      return {
        label: `Low Risk (${riskScore ?? 0}/100)`,
        icon: "✓",
        dot: "🟢",
        className: "bg-emerald-50 text-emerald-800 border-emerald-300",
      };
    case "high":
      return {
        label: `High Risk (${riskScore ?? 0}/100)`,
        icon: "⚠",
        dot: "🟠",
        className: "bg-amber-50 text-amber-800 border-amber-300",
      };
    case "critical":
      return {
        label: `Critical Risk (${riskScore ?? 0}/100)`,
        icon: "🚨",
        dot: "🔴",
        className: "bg-rose-50 text-rose-800 border-rose-300",
      };
    case "medium":
    default:
      return {
        label: `Medium Risk (${riskScore ?? 0}/100)`,
        icon: "ℹ",
        dot: "🟡",
        className: "bg-yellow-50 text-yellow-800 border-yellow-300",
      };
  }
}

/**
 * Format resource status with icon + text + color.
 */
function getResourceStatusBadge(status) {
  const st = (status || "available").toLowerCase();
  switch (st) {
    case "available":
      return {
        label: "Sufficient",
        icon: "✓",
        className: "bg-emerald-50 text-emerald-800 border-emerald-300",
      };
    case "shortage":
      return {
        label: "Shortage",
        icon: "⚠️",
        className: "bg-amber-50 text-amber-800 border-amber-300",
      };
    case "critical":
    default:
      return {
        label: "Critical Shortage",
        icon: "✕",
        className: "bg-rose-50 text-rose-800 border-rose-300",
      };
  }
}

/**
 * Format recommendation severity badge.
 */
function getRecommendationSeverityBadge(severity) {
  const sev = (severity || "info").toLowerCase();
  switch (sev) {
    case "critical":
      return {
        label: "Critical Attention",
        icon: "🚨",
        className: "bg-rose-50 text-rose-800 border-rose-300",
      };
    case "warning":
      return {
        label: "Optimization",
        icon: "⚠️",
        className: "bg-amber-50 text-amber-800 border-amber-300",
      };
    case "info":
    default:
      return {
        label: "Informational",
        icon: "💡",
        className: "bg-sky-50 text-sky-800 border-sky-300",
      };
  }
}

/**
 * PrintableReport Component - Member 4
 * Renders all 12 sections in the exact specified order:
 * 1. Farm
 * 2. Scenario
 * 3. Inputs
 * 4. Yield
 * 5. Economics
 * 6. Water
 * 7. Risk
 * 8. Why Explanation
 * 9. Recommendations
 * 10. Resources
 * 11. Assumptions
 * 12. Disclaimer
 */
export default function PrintableReport({ reportData }) {
  const { t } = useLanguage();

  if (!reportData) return null;

  const {
    farm = {},
    scenario = {},
    inputs = {},
    yield: yieldData = {},
    economics = {},
    water = {},
    risk = {},
    whyExplanation = [],
    recommendations = [],
    resources = [],
    assumptions = {},
    disclaimer,
  } = reportData;

  const riskBadge = getRiskBadge(risk.level, risk.score);

  const disclaimerText =
    t("assumptions.disclaimerText") ||
    disclaimer ||
    "Estimated values are model-based and are not guaranteed future results.";

  return (
    <article
      aria-label="Executive Decision Report"
      className="bg-white rounded-2xl border border-slate-300 shadow-md p-6 sm:p-10 space-y-7 print:p-0 print:border-none print:shadow-none font-sans text-slate-900"
    >
      {/* Top Title Banner */}
      <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">
            <span>KrishiMitra Simulator</span> • <span>PRARAMBHA 2.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {scenario.name || "Farm Scenario Report"}
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Agricultural Decision Feasibility & Risk Simulation Report
          </p>
        </div>

        <div className="text-left sm:text-right text-[11px] text-slate-500 font-mono space-y-0.5">
          <div>Report Date: {scenario.timestamp ? new Date(scenario.timestamp).toLocaleDateString("en-IN") : new Date().toLocaleDateString("en-IN")}</div>
          <div>Model Version: {assumptions.modelVersion || "v2.1.0-deterministic"}</div>
        </div>
      </div>

      {/* SECTION 1: Farm */}
      <section aria-label="1. Farm Profile" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          1. {t("report.sectionFarm") || "Farm Profile"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Farm Name</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{farm.name || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Location</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{farm.location || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Total Area</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{farm.area ?? 0} {farm.unit || "Acres"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Agro-Zone</span>
            <span className="font-bold text-slate-900 mt-0.5 block">Semi-Arid Deccan</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: Scenario */}
      <section aria-label="2. Scenario Metadata" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          2. {t("report.sectionScenario") || "Scenario Specifications"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Scenario ID</span>
            <span className="font-mono font-bold text-slate-900 mt-0.5 block">{scenario.id || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Scenario Name</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{scenario.name || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Target Crop</span>
            <span className="font-bold text-slate-900 mt-0.5 block">{scenario.crop || inputs.crop || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Simulated Date</span>
            <span className="font-medium text-slate-900 mt-0.5 block">
              {scenario.timestamp ? new Date(scenario.timestamp).toLocaleDateString("en-IN") : "—"}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Inputs */}
      <section aria-label="3. Key Inputs" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          3. {t("report.sectionInputs") || "Key Scenario Input Parameters"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {Object.entries(inputs).map(([key, val]) => (
            <div key={key} className="p-2.5 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wide">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="font-semibold text-slate-900 mt-0.5 block">{String(val)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Yield */}
      <section aria-label="4. Harvest Yield" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          4. {t("report.sectionYield") || "Harvest Yield Performance"}
        </h2>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Total Projected Yield</span>
            <span className="text-2xl font-black text-slate-900 mt-0.5 block tabular-nums">
              {yieldData.value ?? 0} <span className="text-sm font-bold text-slate-500">{yieldData.unit || "Quintals"}</span>
            </span>
          </div>
          <div className="text-right text-slate-600 text-xs">
            <span className="block font-bold">Standard Benchmarks</span>
            <span className="text-[11px] text-slate-500">Based on ICAR agronomic thresholds</span>
          </div>
        </div>
      </section>

      {/* SECTION 5: Economics */}
      <section aria-label="5. Economics" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          5. {t("report.sectionEconomics") || "Financial Economics & Return on Investment"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Cost of Cultivation</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block tabular-nums">
              {formatCurrency(economics.cost ?? 0)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Gross Revenue</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block tabular-nums">
              {formatCurrency(economics.revenue ?? 0)}
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300">
            <span className="text-emerald-800 font-bold block text-[10px] uppercase">Net Farm Profit</span>
            <span className="text-lg font-black text-emerald-800 mt-0.5 block tabular-nums">
              {formatCurrency(economics.profit ?? 0)}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Projected ROI</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block tabular-nums">
              {formatNumber(economics.roi ?? 0, 1)}%
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6: Water */}
      <section aria-label="6. Water Consumption" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          6. {t("report.sectionWater") || "Water Consumption & Irrigation Productivity"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Water Allocated / Drawn</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block tabular-nums">
              {formatNumber(water.used ?? 0, 0)} {water.unit || "m³"}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Water Productivity</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block tabular-nums">
              {water.waterProductivity ?? "—"} Qtl/m³
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Irrigation Status</span>
            <span className="text-base font-bold text-slate-900 mt-0.5 block">High Efficiency</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: Risk */}
      <section aria-label="7. Risk Assessment" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          7. {t("report.sectionRisk") || "Composite Risk Evaluation"}
        </h2>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 font-bold block text-[10px] uppercase">Risk Index & Rating</span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${riskBadge.className}`}
              >
                <span aria-hidden="true">{riskBadge.dot}</span>
                <span>{riskBadge.label}</span>
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500">
            <span className="block font-bold text-slate-700">Composite 4-Factor Scale</span>
            <span className="text-[11px]">Water + Weather + Sowing Delay + Financial</span>
          </div>
        </div>
      </section>

      {/* SECTION 8: Why Explanation */}
      <section aria-label="8. Factor Attribution" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          8. {t("report.sectionWhy") || "Why Did It Change? (Factor Attribution)"}
        </h2>
        {whyExplanation.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded">
            No attribution factors available for this scenario.
          </p>
        ) : (
          <div className="divide-y divide-slate-100 text-xs border border-slate-200 rounded-lg overflow-hidden">
            {whyExplanation.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50/70 flex items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-slate-900">{item.factor}</span>
                  <span className="ml-2 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                    {item.direction}
                  </span>
                </div>
                <span
                  className={`font-black font-mono tabular-nums ${
                    item.impact >= 0 ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {item.impact >= 0 ? `+${formatCurrency(item.impact)}` : formatCurrency(item.impact)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 9: Recommendations */}
      <section aria-label="9. Advisory Recommendations" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          9. {t("report.sectionRecommendations") || "Priority Advisory Recommendations"}
        </h2>
        {recommendations.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded">
            No active recommendations triggered for this plan.
          </p>
        ) : (
          <div className="space-y-2 text-xs">
            {recommendations.map((rec) => {
              const sevBadge = getRecommendationSeverityBadge(rec.severity);
              return (
                <div key={rec.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rec.trigger}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${sevBadge.className}`}
                    >
                      <span aria-hidden="true">{sevBadge.icon}</span>
                      <span>{sevBadge.label}</span>
                    </span>
                  </div>
                  <p className="text-slate-800 font-semibold">{rec.action}</p>
                  <p className="text-[11px] text-slate-500 italic">{rec.reason}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 10: Resources */}
      <section aria-label="10. Resource Check" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          10. {t("report.sectionResources") || "Resource & Input Readiness Verification"}
        </h2>
        {resources.length === 0 ? (
          <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded">
            No resource inventory records available.
          </p>
        ) : (
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-600">
                  <th scope="col" className="p-2.5">Resource</th>
                  <th scope="col" className="p-2.5 text-right">Required</th>
                  <th scope="col" className="p-2.5 text-right">Available</th>
                  <th scope="col" className="p-2.5 text-right">Gap</th>
                  <th scope="col" className="p-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map((res, idx) => {
                  const statusBadge = getResourceStatusBadge(res.status);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-bold text-slate-800">{res.resourceType}</td>
                      <td className="p-2.5 text-right font-medium text-slate-700 tabular-nums">
                        {formatNumber(res.required ?? 0, 0)} {res.unit}
                      </td>
                      <td className="p-2.5 text-right font-medium text-slate-700 tabular-nums">
                        {formatNumber(res.available ?? 0, 0)} {res.unit}
                      </td>
                      <td className="p-2.5 text-right font-bold text-slate-900 tabular-nums">
                        {formatNumber(res.gap ?? 0, 0)} {res.unit}
                      </td>
                      <td className="p-2.5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadge.className}`}
                        >
                          <span aria-hidden="true">{statusBadge.icon}</span>
                          <span>{statusBadge.label}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* SECTION 11: Assumptions */}
      <section aria-label="11. Model Assumptions" className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-1 border-b border-slate-200">
          11. {t("report.sectionAssumptions") || "Simulation Engine & Dataset Version"}
        </h2>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Engine Version</span>
            <span className="font-mono font-bold text-slate-900 mt-0.5 block">
              {assumptions.modelVersion || "v2.1.0-deterministic"}
            </span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
            <span className="text-slate-400 font-bold block text-[10px] uppercase">Benchmark Package</span>
            <span className="font-mono font-bold text-slate-900 mt-0.5 block">
              {assumptions.assumptionVersion || "ICAR-2025.04"}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 12: Disclaimer (MANDATORY, always visible) */}
      <footer aria-label="12. Mandatory Disclaimer" className="pt-4 border-t-2 border-slate-900 text-xs space-y-2">
        <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-2.5">
          <span className="text-xl shrink-0" aria-hidden="true">⚠️</span>
          <div>
            <span className="font-black text-xs uppercase tracking-wide block text-amber-950">
              {t("assumptions.disclaimerTitle") || "Mandatory Simulation Guidance & Disclaimer"}
            </span>
            <p className="text-xs text-amber-900 font-semibold mt-0.5 leading-relaxed">
              {disclaimerText}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
          <span>KrishiMitra • PRARAMBHA 2.0 Hackathon</span>
          <span>Deterministic Agronomic Evaluation</span>
        </div>
      </footer>
    </article>
  );
}
