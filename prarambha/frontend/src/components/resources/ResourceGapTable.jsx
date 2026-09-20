import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatResourceValue } from "../../services/resource.service";
import ResourceStatusBadge from "./ResourceStatusBadge";

/**
 * ResourceGapTable Component - Member 4
 * Displays required vs available resources, computed gap, status badge, and explanation.
 */
export default function ResourceGapTable({ readinessData }) {
  const { t } = useLanguage();

  if (!readinessData) return null;

  // Normalize data whether passed as raw array or object
  let rows = [];

  if (Array.isArray(readinessData.resources)) {
    rows = readinessData.resources.map((item, idx) => {
      const req = Number(item.required) || 0;
      const avail = Number(item.available) || 0;
      const gap = item.gap !== undefined ? Number(item.gap) : Math.max(0, req - avail);
      const isCurr = item.unit === "₹" || item.isCurrency || item.resourceType?.toLowerCase().includes("budget");

      const iconMap = {
        budget: "💰",
        water: "💧",
        seed: "🌱",
        fertilizer: "🧪",
        machinery: "🚜",
        labor: "👨‍🌾",
      };

      const matchedKey = Object.keys(iconMap).find((k) => item.resourceType?.toLowerCase().includes(k)) || "other";
      const icon = iconMap[matchedKey] || "📦";

      return {
        key: `res-${idx}-${item.resourceType}`,
        name: item.resourceType,
        icon,
        req,
        avail,
        gap,
        status: item.status || (gap === 0 ? "available" : gap / req >= 0.25 ? "critical" : "shortage"),
        unit: item.unit || "",
        explanation: item.explanation || "",
        isCurrency: isCurr,
      };
    });
  } else {
    const { budget, water, seed, fertilizer, otherInputs = [] } = readinessData;
    rows = [
      {
        key: "budget",
        name: t("resources.budget") || "Budget",
        icon: "💰",
        req: budget?.required ?? 0,
        avail: budget?.available ?? 0,
        gap: budget?.gap !== undefined ? budget.gap : Math.max(0, (budget?.required ?? 0) - (budget?.available ?? 0)),
        status: budget?.status || "available",
        unit: budget?.unit || "₹",
        explanation: budget?.explanation || "Working capital for seed, fertilizers, and operations.",
        isCurrency: true,
      },
      {
        key: "water",
        name: t("resources.water") || "Water",
        icon: "💧",
        req: water?.required ?? 0,
        avail: water?.available ?? 0,
        gap: water?.gap !== undefined ? water.gap : Math.max(0, (water?.required ?? 0) - (water?.available ?? 0)),
        status: water?.status || "available",
        unit: water?.unit || "m³",
        explanation: water?.explanation || "Irrigation volume required across all growth stages.",
        isCurrency: false,
      },
      {
        key: "seed",
        name: t("resources.seed") || "Seed",
        icon: "🌱",
        req: seed?.required ?? 0,
        avail: seed?.available ?? 0,
        gap: seed?.gap !== undefined ? seed.gap : Math.max(0, (seed?.required ?? 0) - (seed?.available ?? 0)),
        status: seed?.status || "available",
        unit: seed?.unit || "kg",
        explanation: seed?.explanation || "Certified sowing seeds allocated for plot area.",
        isCurrency: false,
      },
      {
        key: "fertilizer",
        name: t("resources.fertilizer") || "Fertilizer / Inputs",
        icon: "🧪",
        req: fertilizer?.required ?? 0,
        avail: fertilizer?.available ?? 0,
        gap: fertilizer?.gap !== undefined ? fertilizer.gap : Math.max(0, (fertilizer?.required ?? 0) - (fertilizer?.available ?? 0)),
        status: fertilizer?.status || "available",
        unit: fertilizer?.unit || "kg",
        explanation: fertilizer?.explanation || "Basal and top-dressing nutrient inputs.",
        isCurrency: false,
      },
      ...otherInputs.map((item, idx) => ({
        key: `other-${idx}`,
        name: item.name || item.resourceType || `Input #${idx + 1}`,
        icon: "🚜",
        req: item.required ?? 0,
        avail: item.available ?? 0,
        gap: item.gap !== undefined ? item.gap : Math.max(0, (item.required ?? 0) - (item.available ?? 0)),
        status: item.status || "available",
        unit: item.unit || "units",
        explanation: item.explanation || "Equipment and labor hours required.",
        isCurrency: false,
      })),
    ];
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Mobile Horizontal Scroll Indicator */}
      <div className="px-4 py-2 bg-slate-100/90 border-b border-slate-200 text-[11px] text-slate-600 flex items-center justify-between sm:hidden">
        <span>← Swipe to inspect resource deficits →</span>
        <span aria-hidden="true">💧</span>
      </div>

      <div className="overflow-x-auto max-w-full touch-pan-x">
        <table className="w-full text-left border-collapse min-w-[640px] sm:min-w-[700px]">
          <caption className="sr-only">Farm Resource Requirements, Current Availability and Net Deficits</caption>
          <thead>
          <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <th scope="col" className="p-4 w-1/4">Resource</th>
            <th scope="col" className="p-4">{t("resources.required") || "Required"}</th>
            <th scope="col" className="p-4">{t("resources.available") || "Available"}</th>
            <th scope="col" className="p-4">{t("resources.gap") || "Gap"}</th>
            <th scope="col" className="p-4">{t("resources.statusLabel") || "Status"}</th>
            <th scope="col" className="p-4 w-1/3">{t("resources.explanation") || "Explanation"}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-xs">
          {rows.map((row) => {
            const hasDeficit = row.gap > 0;
            const formatVal = (val) => formatResourceValue(val, row.unit, row.isCurrency);

            return (
              <tr key={row.key} className="hover:bg-slate-50/60 transition-colors">
                {/* Resource Name */}
                <th scope="row" className="p-4 font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="text-base" aria-hidden="true">{row.icon}</span>
                  <span>{row.name}</span>
                </th>

                {/* Required */}
                <td className="p-4 font-medium text-slate-700 tabular-nums">
                  {formatVal(row.req)}
                </td>

                {/* Available */}
                <td className="p-4 font-medium text-slate-700 tabular-nums">
                  {formatVal(row.avail)}
                </td>

                {/* Gap */}
                <td className="p-4 tabular-nums font-semibold">
                  {hasDeficit ? (
                    <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      <span>-{formatVal(row.gap)}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      <span>✓ Covered</span>
                    </span>
                  )}
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <ResourceStatusBadge status={row.status} />
                </td>

                {/* Explanation */}
                <td className="p-4 text-slate-600 text-[11px] leading-relaxed">
                  {row.explanation || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
  );
}
