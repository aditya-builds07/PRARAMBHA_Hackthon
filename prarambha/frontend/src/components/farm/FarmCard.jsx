import { cn } from "../../lib/utils.js"
import en from "../../i18n/en.json"

export default function FarmCard({ farm, isActive, onSelect, onEdit, onDelete }) {
  return (
    <article
      className={cn(
        "rounded-2xl border p-5 flex flex-col gap-4 transition-all duration-200",
        isActive
          ? "border-[#164A34] bg-[#EBF3ED] shadow-sm"
          : "border-[#D0DEC0] bg-white hover:border-[#86C39C] shadow-xs"
      )}
      aria-label={`Farm: ${farm.name}${isActive ? " (active)" : ""}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#164A34] text-[22px]" aria-hidden="true">agriculture</span>
            <h3 className="font-extrabold text-[#1E2924] text-base truncate">{farm.name}</h3>
          </div>
          {farm.region && (
            <p className="flex items-center gap-1 text-xs text-[#596A61] mt-1">
              <span className="material-symbols-outlined text-[#164A34] text-[14px]" aria-hidden="true">location_on</span>
              <span>{farm.region}</span>
            </p>
          )}
        </div>
        {isActive && (
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#164A34] bg-white border border-[#D0DEC0] shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">check_circle</span>
            <span>Active Farm</span>
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <dl className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#F8F6F0] border border-[#D0DEC0]/60 text-xs">
        <div>
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider">Total Area</dt>
          <dd className="font-extrabold text-[#1E2924] mt-0.5">{farm.areaAcres ?? 5} Acres</dd>
        </div>
        <div>
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider">Water Availability</dt>
          <dd className="font-extrabold text-[#4C9BB8] mt-0.5">
            {farm.waterProfile ? (en.farms?.waterProfiles?.[farm.waterProfile] ?? farm.waterProfile) : "Normal (100%)"}
          </dd>
        </div>
        <div>
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider">Crop Cycle</dt>
          <dd className="font-extrabold text-[#1E2924] mt-0.5">{farm.cropCycle || "Rabi 2026-27"}</dd>
        </div>
        <div>
          <dt className="font-bold text-[#596A61] uppercase text-[10px] tracking-wider">Budget</dt>
          <dd className="font-extrabold text-[#164A34] mt-0.5">
            ₹{Number(farm.budgetInr || 50000).toLocaleString("en-IN")}
          </dd>
        </div>
      </dl>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onSelect(farm.id)}
          className={`touch-target flex-1 rounded-xl text-xs font-bold px-4 py-2.5 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isActive
              ? "bg-[#164A34] text-white hover:bg-[#196C3E] shadow-sm"
              : "bg-[#164A34] text-white hover:bg-[#196C3E] shadow-xs"
          }`}
          id={`select-farm-${farm.id}`}
        >
          <span>Open Farm</span>
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </button>

        <button
          onClick={() => onEdit(farm)}
          className="touch-target rounded-xl border border-[#D0DEC0] bg-white p-2.5 text-xs font-semibold text-[#1E2924] hover:bg-[#EBF3ED] transition-colors cursor-pointer"
          aria-label={`Edit Farm: ${farm.name}`}
          id={`edit-farm-${farm.id}`}
        >
          <span className="material-symbols-outlined text-[#596A61] text-[16px]" aria-hidden="true">edit</span>
        </button>
        <button
          onClick={() => onDelete(farm.id)}
          className="touch-target rounded-xl border border-[#F5C2BA] bg-[#FDF0EE] p-2.5 text-xs font-semibold text-[#C85A45] hover:bg-[#F9E2DF] transition-colors cursor-pointer"
          aria-label={`Delete Farm: ${farm.name}`}
          id={`delete-farm-${farm.id}`}
        >
          <span className="material-symbols-outlined text-[#C85A45] text-[16px]" aria-hidden="true">delete</span>
        </button>
      </div>
    </article>
  )
}

