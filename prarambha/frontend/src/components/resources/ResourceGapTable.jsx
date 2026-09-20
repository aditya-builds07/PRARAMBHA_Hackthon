import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { formatCurrency, formatNumber } from "../../services/comparison.service";
import ResourceStatusBadge from "./ResourceStatusBadge";

/**
 * ResourceGapTable Component - Member 4
 * Tabular display of Required vs Available vs Gap across all farm resources.
 */
export default function ResourceGapTable({ readinessData }) {
  const { t } = useLanguage();

  if (!readinessData) return null;

  const { budget, water, seed, fertilizer, otherInputs = [] } = readinessData;

  const rows = [
    {
      key: "budget",
      name: t("resources.budget") || "Financial Budget",
      icon: "💰",
      req: budget?.required,
      avail: budget?.available,
      gap: budget?.gap,
      status: budget?.status,
      unit: budget?.unit || "₹",
      isCurrency: true,
    },
    {
      key: "water",
      name: t("resources.water") || "Water Reserves",
      icon: "💧",
      req: water?.required,
      avail: water?.available,
      gap: water?.gap,
      status: water?.status,
      unit: water?.unit || "m³",
      isCurrency: false,
    },
    {
      key: "seed",
      name: t("resources.seed") || "Seed Stock",
      icon: "🌱",
      req: seed?.required,
      avail: seed?.available,
      gap: seed?.gap,
      status: seed?.status,
      unit: seed?.unit || "kg",
      isCurrency: false,
    },
    {
      key: "fertilizer",
      name: t("resources.fertilizer") || "Fertilizer Stock",
      icon: "🧪",
      req: fertilizer?.required,
      avail: fertilizer?.available,
      gap: fertilizer?.gap,
      status: fertilizer?.status,
      unit: fertilizer?.unit || "kg",
      isCurrency: false,
    },
    ...otherInputs.map((item, idx) => ({
      key: `other-${idx}`,
      name: item.name,
      icon: "🚜",
      req: item.required,
      avail: item.available,
      gap: item.gap,
      status: item.status,
      unit: item.unit,
      isCurrency: false,
    })),
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[650px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <th scope="col" className="p-4 w-1/3">Resource Name</th>
            <th scope="col" className="p-4">{t("resources.required") || "Required"}</th>
            <th scope="col" className="p-4">{t("resources.available") || "Available"}</th>
            <th scope="col" className="p-4">{t("resources.gap") || "Deficit / Gap"}</th>
            <th scope="col" className="p-4">Readiness Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 text-xs">
          {rows.map((row) => {
            const hasDeficit = row.gap > 0;
            const formatVal = (val) => {
              if (row.isCurrency) return formatCurrency(val);
              return `${formatNumber(val, 0)} ${row.unit}`;
            };

            return (
              <tr key={row.key} className="hover:bg-slate-50/60 transition-colors">
                {/* Name */}
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
                <td className="p-4 tabular-nums">
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
