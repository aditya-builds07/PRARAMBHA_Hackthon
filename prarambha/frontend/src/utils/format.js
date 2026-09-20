/**
 * format.js — safe display formatters.
 * RULE: Never show NaN, Infinity, or impossible values.
 *       Return "—" and log a warning for unsafe inputs.
 */

const FALLBACK = "—"

function safeNum(value, label) {
  if (value === null || value === undefined) return null
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    console.warn(`[format] unsafe value for ${label}:`, value)
    return null
  }
  return value
}

/** Format a number with fixed decimals + unit. Returns "—" if unsafe. */
export function fmt(value, unit = "", decimals = 2, label = "value") {
  const n = safeNum(value, label)
  if (n === null) return FALLBACK
  const formatted = n.toFixed(decimals)
  return unit ? `${formatted} ${unit}` : formatted
}

/** Format INR currency. */
export function fmtINR(value) {
  const n = safeNum(value, "INR")
  if (n === null) return FALLBACK
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
}

/** Format a percentage (0–100). */
export function fmtPct(value, decimals = 1) {
  const n = safeNum(value, "percent")
  if (n === null) return FALLBACK
  return `${n.toFixed(decimals)} %`
}

/** Format kg/m3 water productivity. */
export function fmtWaterProductivity(value) {
  const n = safeNum(value, "waterProductivity")
  if (n === null) return FALLBACK
  return `${n.toFixed(4)} kg/m³`
}

/**
 * Risk level label from overall risk score.
 * Scores: Low < 35, Medium 35–65, High > 65
 */
export function riskLevel(score) {
  const n = safeNum(score, "risk")
  if (n === null) return "Unknown"
  if (n < 35) return "Low"
  if (n <= 65) return "Medium"
  return "High"
}

/** Colour class for a risk level string. Uses both colour AND text (accessibility). */
export function riskColour(level) {
  return {
    Low:     "bg-green-100 text-green-800 border-green-200",
    Medium:  "bg-amber-100  text-amber-800  border-amber-200",
    High:    "bg-red-100   text-red-800   border-red-200",
    Unknown: "bg-muted     text-muted-foreground border-border",
  }[level] ?? "bg-muted text-muted-foreground"
}
