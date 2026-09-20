import { cn } from "../../lib/utils.js"

/**
 * LoadingState — shown while API calls are in flight.
 * @param {string} [message]
 */
export default function LoadingState({ message = "Loading…", className }) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground", className)}
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" aria-hidden />
      <p className="text-sm">{message}</p>
    </div>
  )
}
