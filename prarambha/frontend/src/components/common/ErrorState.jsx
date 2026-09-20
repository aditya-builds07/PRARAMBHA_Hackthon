import { cn } from "../../lib/utils.js"

/**
 * ErrorState — shown when an API call fails.
 * Never fabricates data. Always offers Retry.
 */
export default function ErrorState({ message = "Something went wrong.", onRetry, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        className
      )}
      role="alert"
    >
      <span className="material-symbols-outlined text-[32px] text-rose-600" aria-hidden="true">error</span>
      <p className="text-sm text-foreground">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="touch-target rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
          id="error-retry-btn"
        >
          Retry
        </button>
      )}
    </div>
  )
}
