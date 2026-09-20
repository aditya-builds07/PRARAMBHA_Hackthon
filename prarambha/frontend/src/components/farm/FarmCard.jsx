/**
 * FarmCard.jsx — displays a single farm with select/edit/delete actions.
 * Props are explicit so Member 4 can reuse this in History if needed.
 */
import { MapPin, Droplets, Pencil, Trash2, CheckCircle2 } from "lucide-react"
import { cn } from "../../lib/utils.js"
import en from "../../i18n/en.json"

export default function FarmCard({ farm, isActive, onSelect, onEdit, onDelete }) {
  return (
    <article
      className={cn(
        "rounded-xl border p-4 flex flex-col gap-3 transition-all",
        isActive
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:border-primary/40"
      )}
      aria-label={`Farm: ${farm.name}${isActive ? " (active)" : ""}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{farm.name}</h3>
          {farm.region && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              {farm.region}
            </p>
          )}
        </div>
        {isActive && (
          <span className="flex items-center gap-1 text-xs font-medium text-primary shrink-0">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            {en.farms.activeFarm}
          </span>
        )}
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {farm.areaAcres != null && (
          <>
            <dt className="font-medium text-foreground">{en.farms.fields.areaAcres}</dt>
            <dd>{farm.areaAcres} acres</dd>
          </>
        )}
        {farm.waterProfile && (
          <>
            <dt className="font-medium text-foreground">{en.farms.fields.waterProfile}</dt>
            <dd>{en.farms.waterProfiles[farm.waterProfile] ?? farm.waterProfile}</dd>
          </>
        )}
        {farm.budgetInr != null && (
          <>
            <dt className="font-medium text-foreground">{en.farms.fields.budgetInr}</dt>
            <dd>₹{Number(farm.budgetInr).toLocaleString("en-IN")}</dd>
          </>
        )}
      </dl>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        {!isActive && (
          <button
            onClick={() => onSelect(farm.id)}
            className="touch-target flex-1 rounded-md bg-primary text-primary-foreground text-sm font-medium px-3 hover:bg-primary/90 transition-colors"
            id={`select-farm-${farm.id}`}
          >
            {en.farms.selectFarm}
          </button>
        )}
        <button
          onClick={() => onEdit(farm)}
          className="touch-target rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted transition-colors"
          aria-label={`${en.farms.editFarm}: ${farm.name}`}
          id={`edit-farm-${farm.id}`}
        >
          <Pencil className="h-4 w-4" aria-hidden />
        </button>
        <button
          onClick={() => onDelete(farm.id)}
          className="touch-target rounded-md border border-destructive/30 px-3 text-sm text-destructive hover:bg-destructive/5 transition-colors"
          aria-label={`${en.farms.deleteFarm}: ${farm.name}`}
          id={`delete-farm-${farm.id}`}
        >
          <Trash2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </article>
  )
}
