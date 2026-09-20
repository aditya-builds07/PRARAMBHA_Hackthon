import { cn } from "../../lib/utils.js"

/**
 * EstimateBadge — always visible on result screens.
 * Hard rule: results are estimates, never guarantees.
 */
export function EstimateBadge({ className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 border border-amber-200",
        className
      )}
      aria-label="Estimated result — not a guarantee"
    >
      <span aria-hidden>~</span> Estimated — not a guarantee
    </span>
  )
}

/**
 * UnitLabel — renders a value with its unit. Displays "—" for null/NaN/Infinity.
 * @param {number|null} value
 * @param {string} unit
 * @param {number} [decimals=2]
 */
export function UnitLabel({ value, unit, decimals = 2, className }) {
  const display = (() => {
    if (value === null || value === undefined) return "—"
    if (typeof value === "number" && (isNaN(value) || !isFinite(value))) {
      console.warn("[UnitLabel] Received unsafe value:", value)
      return "—"
    }
    return `${Number(value).toFixed(decimals)} ${unit}`
  })()

  return (
    <span className={cn("font-medium tabular-nums", className)} aria-label={`${display}`}>
      {display}
    </span>
  )
}

/**
 * Button — primary/secondary/destructive variants.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "hover:bg-muted text-foreground",
    outline: "border border-border bg-background hover:bg-muted text-foreground",
  }
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }
  return (
    <button
      className={cn(
        "touch-target inline-flex items-center gap-2 rounded-md font-medium transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Field — labeled form field wrapper.
 */
export function Field({ label, htmlFor, error, hint, required, children, className }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-destructive ml-0.5" aria-label="required">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-xs text-destructive" role="alert" id={`${htmlFor}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
