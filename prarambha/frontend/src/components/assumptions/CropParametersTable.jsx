import React from "react";
import { formatCurrency, formatNumber } from "../../services/comparison.service";

/**
 * CropParametersTable Component - Member 4
 * Displays baseline agronomic benchmarks for crops.
 * Supports both array format [ { crop, parameter, value, unit } ] and legacy object format.
 */
export default function CropParametersTable({ cropParameters }) {
  if (!cropParameters) return null;

  // Standard PRD format: array of { crop, parameter, value, unit }
  if (Array.isArray(cropParameters)) {
    return (
      <div className="overflow-x-auto max-w-full touch-pan-x">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <th scope="col" className="p-3.5">Crop</th>
              <th scope="col" className="p-3.5">Parameter Benchmark</th>
              <th scope="col" className="p-3.5">Configured Baseline Value</th>
              <th scope="col" className="p-3.5">Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {cropParameters.map((p, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="p-3.5 font-bold text-slate-900">{p.crop}</td>
                <td className="p-3.5 font-medium text-slate-700">{p.parameter}</td>
                <td className="p-3.5 font-bold text-emerald-800 tabular-nums">{p.value}</td>
                <td className="p-3.5 text-slate-500 font-mono text-[11px]">{p.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Legacy object format fallback
  const params = [
    { label: "Crop Variety / Species", value: cropParameters.crop },
    {
      label: "Baseline Yield Potential",
      value: `${formatNumber(cropParameters.baseYieldPerAcreQuintals, 1)} Quintals / Acre`,
    },
    {
      label: "Minimum Water Survival Threshold",
      value: `${formatNumber(cropParameters.minWaterRequirementM3PerAcre, 0)} m³ / Acre`,
    },
    {
      label: "Optimal Water Crop Requirement",
      value: `${formatNumber(cropParameters.optimalWaterRequirementM3PerAcre, 0)} m³ / Acre`,
    },
    {
      label: "Reference Market Price (MSP/Mandatory)",
      value: `${formatCurrency(cropParameters.marketPricePerQuintalRupees)} / Quintal`,
    },
    {
      label: "Baseline Production Cost",
      value: `${formatCurrency(cropParameters.baseCostPerAcreRupees)} / Acre`,
    },
  ];

  return (
    <div className="overflow-x-auto max-w-full touch-pan-x">
      <table className="w-full text-left border-collapse min-w-[500px]">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <th scope="col" className="p-3.5">Parameter Benchmark</th>
            <th scope="col" className="p-3.5">Configured Baseline Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs">
          {params.map((p, idx) => (
            <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
              <th scope="row" className="p-3.5 font-semibold text-slate-800">
                {p.label}
              </th>
              <td className="p-3.5 font-bold text-slate-900 tabular-nums">
                {p.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
