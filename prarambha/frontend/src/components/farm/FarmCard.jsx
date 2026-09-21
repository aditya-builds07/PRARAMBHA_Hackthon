import { cn } from "../../lib/utils.js"
import en from "../../i18n/en.json"

const SOIL_TYPE_COLORS = {
  loamy:    { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A", label: "Loamy" },
  sandy:    { bg: "#FEF9EE", text: "#78350F", border: "#FCD34D", label: "Sandy" },
  clay:     { bg: "#EDE9FE", text: "#4C1D95", border: "#C4B5FD", label: "Clay" },
  alluvial: { bg: "#DCFCE7", text: "#14532D", border: "#86EFAC", label: "Alluvial" },
  default:  { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0", label: "Mixed" },
};

const WATER_PROFILE_COLORS = {
  scarce:   "#EF4444",
  limited:  "#F97316",
  normal:   "#3D8B5A",
  abundant: "#0D4A2B",
};

export default function FarmCard({ farm, isActive, onSelect, onEdit, onDelete }) {
  const soilKey = (farm.soilType || "default").toLowerCase();
  const soilStyle = SOIL_TYPE_COLORS[soilKey] || SOIL_TYPE_COLORS.default;
  const waterColor = WATER_PROFILE_COLORS[farm.waterProfile] || WATER_PROFILE_COLORS.normal;
  const budget = Number(farm.budgetInr || 50000);

  return (
    <article
      className={cn(
        "rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-300 group relative overflow-hidden",
        isActive
          ? "border-[#164A34] bg-gradient-to-br from-[#EBF3ED] to-[#F0FAF2] shadow-md ring-2 ring-[#164A34]/20"
          : "border-[#D0DEC0] bg-white hover:border-[#86C39C] hover:shadow-lg hover:-translate-y-0.5"
      )}
      aria-label={`Farm: ${farm.name}${isActive ? " (active)" : ""}`}
    >
      {/* Decorative top bar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300",
          isActive ? "bg-gradient-to-r from-[#164A34] to-[#3D8B5A]" : "bg-gradient-to-r from-[#D0DEC0] to-[#86C39C] opacity-0 group-hover:opacity-100"
        )}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 pt-1">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
              isActive ? "bg-[#164A34] text-white" : "bg-[#EAF3EC] text-[#164A34] group-hover:bg-[#164A34] group-hover:text-white"
            )}>
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">agriculture</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-[#1E2924] text-base truncate">{farm.name}</h3>
              {farm.region && (
                <p className="flex items-center gap-1 text-xs text-[#596A61]">
                  <span className="material-symbols-outlined text-[#164A34] text-[13px]" aria-hidden="true">location_on</span>
                  <span className="truncate">{farm.region}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {isActive && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#164A34] bg-white border border-[#D0DEC0] shadow-xs animate-pulse-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D8B5A] inline-block" />
              <span>Active</span>
            </span>
          )}
          {/* Soil type badge */}
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ backgroundColor: soilStyle.bg, color: soilStyle.text, borderColor: soilStyle.border }}
          >
            {soilStyle.label} Soil
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <dl className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F8F6F0] border border-[#D0DEC0]/60 text-xs">
        <div className="space-y-0.5">
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-[#3D8B5A]">straighten</span>
            Total Area
          </dt>
          <dd className="font-extrabold text-[#1E2924] tabular-nums">{farm.areaAcres ?? 5} Acres</dd>
        </div>

        <div className="space-y-0.5">
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]" style={{ color: waterColor }}>water_drop</span>
            Water Profile
          </dt>
          <dd className="font-extrabold tabular-nums" style={{ color: waterColor }}>
            {farm.waterProfile ? (en.farms?.waterProfiles?.[farm.waterProfile] ?? farm.waterProfile) : "Normal (100%)"}
          </dd>
        </div>

        <div className="space-y-0.5">
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-[#596A61]">calendar_today</span>
            Crop Cycle
          </dt>
          <dd className="font-extrabold text-[#1E2924]">{farm.cropCycle || "Rabi 2026-27"}</dd>
        </div>

        <div className="space-y-0.5">
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-[#164A34]">payments</span>
            Budget
          </dt>
          <dd className="font-extrabold text-[#164A34] tabular-nums">
            ₹{budget.toLocaleString("en-IN")}
          </dd>
        </div>
      </dl>

      {/* Budget Visual Bar */}
      <div className="px-1 space-y-1">
        <div className="flex justify-between items-center text-[10px] text-[#596A61] font-semibold">
          <span>Budget Utilization Estimate</span>
          <span className="text-[#164A34] font-bold">{budget < 40000 ? "Tight" : budget < 80000 ? "Moderate" : "Comfortable"}</span>
        </div>
        <div className="w-full bg-[#E9F2EC] rounded-full h-1.5 overflow-hidden">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-[#3D8B5A] to-[#164A34] transition-all duration-700"
            style={{ width: `${Math.min(100, Math.round((budget / 120000) * 100))}%` }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-0.5">
        <button
          onClick={() => onSelect(farm.id)}
          className={cn(
            "touch-target flex-1 rounded-xl text-xs font-bold px-4 py-2.5 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md",
            isActive
              ? "bg-[#164A34] text-white hover:bg-[#196C3E]"
              : "bg-[#164A34] text-white hover:bg-[#196C3E] hover:scale-[1.02]"
          )}
          id={`select-farm-${farm.id}`}
        >
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">agriculture</span>
          <span>Open Farm</span>
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </button>

        <button
          onClick={() => onEdit(farm)}
          className="touch-target rounded-xl border border-[#D0DEC0] bg-white p-2.5 text-xs font-semibold text-[#1E2924] hover:bg-[#EBF3ED] hover:border-[#86C39C] transition-all cursor-pointer"
          aria-label={`Edit Farm: ${farm.name}`}
          id={`edit-farm-${farm.id}`}
        >
          <span className="material-symbols-outlined text-[#596A61] text-[16px]" aria-hidden="true">edit</span>
        </button>

        <button
          onClick={() => onDelete(farm.id)}
          className="touch-target rounded-xl border border-[#F5C2BA] bg-[#FDF0EE] p-2.5 text-xs font-semibold text-[#C85A45] hover:bg-[#F9E2DF] hover:border-[#C85A45] transition-all cursor-pointer"
          aria-label={`Delete Farm: ${farm.name}`}
          id={`delete-farm-${farm.id}`}
        >
          <span className="material-symbols-outlined text-[#C85A45] text-[16px]" aria-hidden="true">delete</span>
        </button>
      </div>
    </article>
  )
}
