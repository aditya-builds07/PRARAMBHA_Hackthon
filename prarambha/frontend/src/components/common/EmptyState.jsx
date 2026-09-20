import { cn } from "../../lib/utils.js"

/**
 * EmptyState — shown when a list has no items.
 */
export default function EmptyState({ message = "No data available.", action, actionLabel, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border py-12 text-center",
        className
      )}
    >
      <p className="text-sm text-muted-foreground">{message}</p>
      {action && (
        <button
          onClick={action}
          className="touch-target rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
