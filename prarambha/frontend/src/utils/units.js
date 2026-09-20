/**
 * units.js — unit labels and conversion helpers.
 * All numbers shown in the UI must have a unit from this file.
 */

export const UNITS = {
  acres:       "acres",
  kg:          "kg",
  quintal:     "qtl",         // quintal per acre (10 quintals = 1 tonne)
  m3:          "m³",
  inr:         "INR",
  percent:     "%",
  score:       "/ 100",
  kgPerM3:     "kg/m³",
  days:        "days",
  multiplier:  "x",
}

/** Display label for a numeric field. */
export function withUnit(value, unit) {
  if (value === null || value === undefined) return "—"
  return `${value} ${unit}`
}
