import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Sprout, Droplets, CloudSun, Calendar, Plus, Copy, Trash2, 
  Sparkles, CheckCircle, RefreshCw, ArrowRight, Layers, Sliders
} from "lucide-react"
import { 
  useAppStore, 
  getScenarios, 
  getActiveFarm, 
  isLoading, 
  getError, 
  getResult 
} from "../../state/store.js"
import { useSimulation } from "../../hooks/useSimulation.js"
import { DEMO_PRESETS, WEATHER_OPTIONS, IRRIGATION_TYPES, PRIORITY_PROFILES } from "../../utils/constants.js"
import en from "../../i18n/en.json"

const CROP_OPTIONS = [
  { id: "wheat", name: "Wheat (गहू / गेहूं)" },
  { id: "rice", name: "Rice / Paddy (भात / धान)" },
  { id: "cotton", name: "Cotton (कापूस / कपास)" },
  { id: "soybean", name: "Soybean (सोयाबीन)" },
  { id: "sugarcane", name: "Sugarcane (ऊस / गन्ना)" },
  { id: "chickpea", name: "Gram / Chickpea (हरभरा / चना)" },
  { id: "maize", name: "Maize (मका / मक्का)" }
]

export default function ScenarioBuilderPage() {
  const navigate = useNavigate()
  
  const activeFarm = useAppStore(getActiveFarm)
  const activeFarmId = useAppStore((s) => s.activeFarmId)
  const scenariosMap = useAppStore((s) => s.scenarios)
  const addScenario = useAppStore((s) => s.addScenario)
  const cloneScenario = useAppStore((s) => s.cloneScenario)
  const updateScenario = useAppStore((s) => s.updateScenario)
  const removeScenario = useAppStore((s) => s.removeScenario)
  const setActiveFarm = useAppStore((s) => s.setActiveFarm)
  const farms = useAppStore((s) => s.farms)

  // Auto-select first farm if none is active
  useEffect(() => {
    if (!activeFarmId && farms.length > 0) {
      setActiveFarm(farms[0].id)
    }
  }, [activeFarmId, farms, setActiveFarm])

  const scenarios = activeFarmId ? (scenariosMap[activeFarmId] || []) : []
  const [selectedScenarioId, setSelectedScenarioId] = useState(null)

  useEffect(() => {
    if (scenarios.length > 0) {
      if (!selectedScenarioId || !scenarios.some(s => s.id === selectedScenarioId)) {
        setSelectedScenarioId(scenarios[0].id)
      }
    } else if (activeFarmId) {
      const created = addScenario(activeFarmId, { crop: "wheat" })
      setSelectedScenarioId(created.id)
    }
  }, [scenarios, selectedScenarioId, activeFarmId, addScenario])

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0] || null

  // Hook for live re-simulation
  useSimulation(activeFarmId, activeScenario?.id, activeScenario)

  const loading = useAppStore(isLoading(activeScenario?.id))
  const error = useAppStore(getError(activeScenario?.id))
  const result = useAppStore(getResult(activeScenario?.id))

  const handleFieldChange = (field, value) => {
    if (!activeFarmId || !activeScenario) return
    updateScenario(activeFarmId, activeScenario.id, { [field]: value })
  }

  const handlePlantingChange = (patch) => {
    if (!activeFarmId || !activeScenario) return
    updateScenario(activeFarmId, activeScenario.id, {
      planting: { ...(activeScenario.planting || { type: "on_time", delayDays: 0 }), ...patch }
    })
  }

  const applyPreset = (presetKey) => {
    if (!activeFarmId || !activeScenario) return
    const preset = DEMO_PRESETS[presetKey]
    if (preset) {
      updateScenario(activeFarmId, activeScenario.id, {
        ...preset.input,
        crop: preset.input.crop || activeScenario.crop || "wheat"
      })
    }
  }

  if (!activeFarm) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Sprout className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">No Farm Selected</h2>
        <p className="text-muted-foreground mb-6">Please select or create a farm before building scenarios.</p>
        <button onClick={() => navigate("/farms")} className="touch-target bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium">
          Go to Farm Selection
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Farm & Status Header */}
      <div className="bg-card border rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wide">
              Active Plot
            </span>
            <h1 className="text-xl font-bold text-foreground">{activeFarm.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {activeFarm.village ? `${activeFarm.village}, ` : ""}{activeFarm.district || "Default District"} • {activeFarm.totalAcres} Acres • {activeFarm.soilType || "Alluvial"} Soil
          </p>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <span className="inline-flex items-center gap-2 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Simulating Plan...
            </span>
          ) : result ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5" />
              Simulated in Real-Time
            </span>
          ) : null}

          <button
            onClick={() => navigate("/results")}
            className="touch-target inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <span>View Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {scenarios.map((sc, idx) => {
            const isSelected = sc.id === activeScenario?.id
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`touch-target px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow" 
                    : "bg-muted/70 hover:bg-muted text-foreground border"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{sc.label || `Scenario ${String.fromCharCode(65 + idx)}`}</span>
                {idx === 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${isSelected ? "bg-primary-foreground/20 text-white" : "bg-primary/10 text-primary"}`}>
                    Baseline
                  </span>
                )}
              </button>
            )
          })}

          {scenarios.length < 4 && (
            <button
              onClick={() => {
                const created = addScenario(activeFarmId, { crop: activeScenario?.crop || "wheat" })
                setSelectedScenarioId(created.id)
              }}
              className="touch-target inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Scenario
            </button>
          )}
        </div>

        {activeScenario && (
          <div className="flex items-center gap-2">
            {scenarios.length < 4 && (
              <button
                onClick={() => {
                  const cloned = cloneScenario(activeFarmId, activeScenario.id)
                  if (cloned) setSelectedScenarioId(cloned.id)
                }}
                className="touch-target inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded border bg-card hover:bg-muted"
                title="Clone this scenario"
              >
                <Copy className="w-3.5 h-3.5" />
                Clone
              </button>
            )}
            {scenarios.length > 1 && (
              <button
                onClick={() => removeScenario(activeFarmId, activeScenario.id)}
                className="touch-target inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20"
                title="Delete scenario"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            )}
          </div>
        )}
      </div>

      {activeScenario && (
        <div className="space-y-6">
          {/* Presets Row */}
          <div className="bg-card border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Apply Instant Quick Preset:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => applyPreset("a")}
                className="text-xs font-medium px-3 py-1.5 rounded-md border hover:bg-muted bg-background transition-colors"
              >
                Standard Baseline
              </button>
              <button
                onClick={() => applyPreset("b")}
                className="text-xs font-medium px-3 py-1.5 rounded-md border hover:bg-muted bg-background transition-colors"
              >
                Water Stress (60%)
              </button>
              <button
                onClick={() => applyPreset("c")}
                className="text-xs font-medium px-3 py-1.5 rounded-md border hover:bg-muted bg-background transition-colors"
              >
                Poor Weather + Delayed
              </button>
              <button
                onClick={() => applyPreset("d")}
                className="text-xs font-medium px-3 py-1.5 rounded-md border hover:bg-muted bg-background transition-colors"
              >
                Drip + High Efficiency
              </button>
            </div>
          </div>

          {/* Variables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Crop & Sowing */}
            <div className="bg-card border rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-base font-semibold border-b pb-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>Crop & Land Sown</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Selected Crop</label>
                <select
                  value={activeScenario.crop || "wheat"}
                  onChange={(e) => handleFieldChange("crop", e.target.value)}
                  className="input-base"
                >
                  {CROP_OPTIONS.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <label className="font-medium text-foreground">Area Sown (Acres)</label>
                  <span className="text-muted-foreground">Max {activeFarm.totalAcres} ac</span>
                </div>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max={activeFarm.totalAcres || 50}
                  value={activeScenario.areaAcres ?? 5}
                  onChange={(e) => handleFieldChange("areaAcres", parseFloat(e.target.value) || 1)}
                  className="input-base"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Sowing Timing</label>
                <select
                  value={activeScenario.planting?.type || "on_time"}
                  onChange={(e) => {
                    const type = e.target.value
                    handlePlantingChange({ type, delayDays: type === "delayed" ? 14 : 0 })
                  }}
                  className="input-base"
                >
                  <option value="on_time">On-time (Optimal window)</option>
                  <option value="delayed">Delayed Sowing (+14 Days)</option>
                  <option value="early">Early Sowing (-7 Days)</option>
                </select>
              </div>
            </div>

            {/* Card 2: Water & Irrigation */}
            <div className="bg-card border rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-base font-semibold border-b pb-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span>Irrigation & Water</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Irrigation Method</label>
                <select
                  value={activeScenario.irrigation || "flood"}
                  onChange={(e) => handleFieldChange("irrigation", e.target.value)}
                  className="input-base"
                >
                  <option value="flood">Flood / Furrow Irrigation</option>
                  <option value="drip">Drip Irrigation (High Efficiency)</option>
                  <option value="sprinkler">Sprinkler Irrigation</option>
                  <option value="rainfed">Pure Rainfed (Zero Groundwater)</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-medium text-foreground">Water Availability</label>
                  <span className="font-bold text-primary">{activeScenario.waterAvailabilityPercent ?? 100}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="10"
                  value={activeScenario.waterAvailabilityPercent ?? 100}
                  onChange={(e) => handleFieldChange("waterAvailabilityPercent", parseInt(e.target.value, 10))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Severe Drought (20%)</span>
                  <span>Normal (100%)</span>
                  <span>Surplus (120%)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-medium text-foreground">Optimization Priority</label>
                <select
                  value={activeScenario.priorityProfile || "balanced"}
                  onChange={(e) => handleFieldChange("priorityProfile", e.target.value)}
                  className="input-base"
                >
                  <option value="balanced">Balanced (Profit & Safety)</option>
                  <option value="max_profit">Maximum Profit Yield</option>
                  <option value="play_safe">Play Safe (Minimize Downside Risk)</option>
                </select>
              </div>
            </div>

            {/* Card 3: Weather & Input Costs */}
            <div className="bg-card border rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-base font-semibold border-b pb-2">
                <CloudSun className="w-5 h-5 text-amber-600" />
                <span>Weather & Inputs</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Seasonal Weather Projection</label>
                <select
                  value={activeScenario.weather || "normal"}
                  onChange={(e) => handleFieldChange("weather", e.target.value)}
                  className="input-base"
                >
                  <option value="normal">Normal Monsoon / Expected Weather</option>
                  <option value="poor">Deficient Monsoon / High Heat (Poor)</option>
                  <option value="good">Abundant Rainfall / Favorable (Good)</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <label className="font-medium text-foreground">Input Cost Multiplier</label>
                  <span className="font-bold text-foreground">{activeScenario.inputCostMultiplier ?? 1.0}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.1"
                  value={activeScenario.inputCostMultiplier ?? 1.0}
                  onChange={(e) => handleFieldChange("inputCostMultiplier", parseFloat(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Budget (0.8x)</span>
                  <span>Standard (1.0x)</span>
                  <span>Intensive (1.5x)</span>
                </div>
              </div>

              {/* Quick Realtime Preview */}
              {result && (
                <div className="mt-4 p-3 bg-muted/40 rounded-lg border text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Yield:</span>
                    <span className="font-semibold text-foreground">{result.yield?.total ?? 0} Qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Net Profit:</span>
                    <span className="font-semibold text-emerald-600">₹{(result.economics?.profit ?? 0).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level:</span>
                    <span className="font-semibold text-foreground">{result.risk?.level ?? "Low"} ({result.risk?.overall ?? 0}/100)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}