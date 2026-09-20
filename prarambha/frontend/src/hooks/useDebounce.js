/**
 * useDebounce.js — debounce a value by delayMs.
 * Used by useSimulation to throttle live re-simulation calls.
 */
import { useState, useEffect } from "react"

export function useDebounce(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])
  return debounced
}
