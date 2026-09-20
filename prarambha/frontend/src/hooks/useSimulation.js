/**
 * useSimulation.js — live re-simulation with debounce + AbortController.
 *
 * Features:
 *  - Debounces input changes ~300ms before firing
 *  - Cancels stale in-flight requests (AbortController)
 *  - Ignores out-of-order responses via generation counter
 *  - Keeps last valid result visible during update ("updating…" overlay only)
 *  - Never fabricates data on error
 */
import { useEffect, useRef } from "react"
import { useAppStore } from "../state/store.js"
import { useDebounce } from "./useDebounce.js"
import { simulate } from "../services/simulation.service.js"
import { validateScenarioInput, hasErrors } from "../utils/validate.js"

export function useSimulation(farmId, scenarioId, scenarioInput) {
  const setResult  = useAppStore((s) => s.setResult)
  const setLoading = useAppStore((s) => s.setLoading)
  const setError   = useAppStore((s) => s.setError)

  const debouncedInput = useDebounce(scenarioInput, 300)
  const abortRef       = useRef(null)
  const generationRef  = useRef(0)

  useEffect(() => {
    if (!scenarioId || !debouncedInput) return

    // Validate before firing
    const errors = validateScenarioInput(debouncedInput)
    if (hasErrors(errors)) return   // block simulate; inline errors shown by form

    // Cancel previous in-flight request
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    // Increment generation to detect stale responses
    const generation = ++generationRef.current

    setLoading(scenarioId, true)

    simulate(debouncedInput, controller.signal).then(({ data, error }) => {
      // Ignore stale responses
      if (generation !== generationRef.current) return
      if (error && error !== "AbortError") {
        setError(scenarioId, error)
      } else if (data) {
        setResult(scenarioId, data)
      }
    })

    return () => {
      controller.abort()
    }
  }, [debouncedInput, scenarioId, setLoading, setResult, setError])
}
