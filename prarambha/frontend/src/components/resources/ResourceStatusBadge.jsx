import React from "react";
import { useLanguage } from "../../i18n/LanguageContext";

/**
 * ResourceStatusBadge Component - Member 4
 * Visual badge for readiness status: available | shortage | critical
 */
export default function ResourceStatusBadge({ status = "available" }) {
  const { t } = useLanguage();

  const configs = {
    available: {
      bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
      dot: "bg-emerald-600",
      label: t("resources.status.available") || "Sufficient",
      icon: "✓",
    },
    shortage: {
      bg: "bg-amber-50 text-amber-800 border-amber-300",
      dot: "bg-amber-600",
      label: t("resources.status.shortage") || "Deficit Identified",
      icon: "!",
    },
    critical: {
      bg: "bg-rose-50 text-rose-800 border-rose-300",
      dot: "bg-rose-600",
      label: t("resources.status.critical") || "Critical Shortage",
      icon: "✕",
    },
  }[status] || {
    bg: "bg-slate-50 text-slate-800 border-slate-300",
    dot: "bg-slate-500",
    label: status.toUpperCase(),
    icon: "•",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs ${configs.bg}`}
    >
      <span aria-hidden="true" className="font-extrabold text-[11px]">{configs.icon}</span>
      <span>{configs.label}</span>
    </span>
  );
}
