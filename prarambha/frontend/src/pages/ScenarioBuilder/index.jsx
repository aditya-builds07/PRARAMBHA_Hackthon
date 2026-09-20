import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
import { CustomSelect } from "../../components/common/CustomSelect.jsx"

const CROP_OPTIONS = [
  { id: "wheat", name: "Wheat (गहू / गेहूं)", icon: "grain" },
  { id: "rice", name: "Rice / Paddy (भात / धान)", icon: "grass" },
  { id: "cotton", name: "Cotton (कापूस / कपास)", icon: "spa" },
  { id: "soybean", name: "Soybean (सोयाबीन)", icon: "nutrition" },
  { id: "sugarcane", name: "Sugarcane (ऊस / गन्ना)", icon: "forest" },
  { id: "chickpea", name: "Gram / Chickpea (हरभरा / चना)", icon: "eco" },
  { id: "maize", name: "Maize (मका / मक्का)", icon: "agriculture" }
]

const TIMING_OPTIONS = [
  { value: "on_time", label: "On-time (Optimal window)", description: "Recommended optimal agronomic window", icon: "schedule" },
  { value: "delayed", label: "Delayed Sowing (+14 Days)", description: "+14 Days — Potential heat/monsoon risk", icon: "update" },
  { value: "early", label: "Early Sowing (-7 Days)", description: "-7 Days — Early soil preparation required", icon: "history" }
]

const IRRIGATION_OPTIONS = [
  { value: "flood", label: "Flood / Furrow Irrigation", description: "Traditional furrow / basin method", icon: "water" },
  { value: "drip", label: "Drip Irrigation (High Efficiency)", description: "Targeted root-zone drip system", icon: "water_drop" },
  { value: "sprinkler", label: "Sprinkler Irrigation", description: "Overhead spray coverage", icon: "shower" },
  { value: "rainfed", label: "Pure Rainfed (Zero Groundwater)", description: "100% dependent on seasonal rainfall", icon: "cloud" }
]

const PRIORITY_OPTIONS = [
  { value: "balanced", label: "Balanced (Profit & Safety)", description: "Equal weight on yield profit & risk containment", icon: "balance" },
  { value: "max_profit", label: "Maximum Profit Yield", description: "Optimizes for maximum projected net margin", icon: "trending_up" },
  { value: "play_safe", label: "Play Safe (Minimize Downside Risk)", description: "Minimizes downside exposure under adversity", icon: "shield" }
]

const WEATHER_CHOICES = [
  { value: "normal", label: "Normal Monsoon / Expected Weather", description: "Standard seasonal rainfall and temperatures", icon: "wb_sunny" },
  { value: "poor", label: "Deficient Monsoon / High Heat (Poor)", description: "Lower rainfall, intermittent heatwaves", icon: "thermostat" },
  { value: "good", label: "Abundant Rainfall / Favorable (Good)", description: "Optimal rainfall distribution", icon: "cloud_queue" }
]

export default function ScenarioBuilderPage({ farmId, onNavigate }) {
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

  useSimulation(activeFarmId, activeScenario?.id, activeScenario)
  const loading = useAppStore(isLoading(activeScenario?.id))

  const result = useAppStore(getResult(activeScenario?.id))

  const handleFieldChange = (field, value) => {
    if (!activeScenario || !activeFarmId) return
    updateScenario(activeFarmId, activeScenario.id, { [field]: value })
  }

  const handleCreateNewScenario = () => {
    if (!activeFarmId) return
    const created = addScenario(activeFarmId, {
      label: `Alternative Plan ${scenarios.length + 1}`,
      crop: activeScenario?.crop || "wheat"
    })
    setSelectedScenarioId(created.id)
  }

  const handleCloneCurrent = () => {
    if (!activeScenario || !activeFarmId) return
    const cloned = cloneScenario(activeFarmId, activeScenario.id)
    if (cloned) {
      setSelectedScenarioId(cloned.id)
    }
  }

  const handleDeleteCurrent = () => {
    if (!activeScenario || !activeFarmId || scenarios.length <= 1) return
    if (window.confirm("Are you sure you want to remove this scenario?")) {
      removeScenario(activeFarmId, activeScenario.id)
    }
  }

  const handleViewResults = () => {
    if (onNavigate) {
      onNavigate("results", { farmId: activeFarmId, scenarioId: activeScenario?.id })
    } else {
      navigate(`/scenarios/${activeFarmId}/${activeScenario?.id}/results`)
    }
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
      <div className="max-w-2xl mx-auto text-center py-16">
        <Sprout className="w-12 h-12 text-[#164A34] mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">No Active Farm Selected</h2>
        <p className="text-[#596A61] mb-6">Select or create a farm to begin scenario simulation.</p>
        <button 
          onClick={() => onNavigate ? onNavigate("farms") : navigate("/farms")} 
          className="touch-target bg-[#164A34] text-white px-6 py-2.5 rounded-xl font-bold shadow-xs hover:bg-[#196C3E]"
        >
          Go to Farm Selection
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D0DEC0]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#164A34] uppercase tracking-widest mb-1">
            <span>SCENARIO BUILDER</span> • <span>PLANNING ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#1E2924] tracking-tight">
            {activeFarm.name || "Desai Farm"} — Farming Plan Configurator
          </h1>
          <p className="text-xs text-[#596A61] mt-1">
            {activeFarm.region ? `${activeFarm.region} • ` : ""}{activeFarm.areaAcres || 5} Acres • Test crop parameters before planting
          </p>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#D9902F] bg-[#FDF5EA] px-3.5 py-1.5 rounded-full border border-[#F7D8B5]">
              <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
              Simulating Plan...
            </span>
          ) : result ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164A34] bg-[#EBF3ED] px-3.5 py-1.5 rounded-full border border-[#D0DEC0]">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Simulated Realtime
            </span>
          ) : null}

          <button
            onClick={handleViewResults}
            className="touch-target inline-flex items-center gap-2 bg-[#164A34] hover:bg-[#196C3E] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <span>View Detailed Results</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
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
                <span className="material-symbols-outlined text-base">layers</span>
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
              <span className="material-symbols-outlined text-base">add</span>
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
                className="touch-target inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded border bg-card hover:bg-muted transition-colors"
                title="Clone this scenario"
              >
                <span className="material-symbols-outlined text-xs">content_copy</span>
                Clone
              </button>
            )}
            {scenarios.length > 1 && (
              <button
                onClick={() => removeScenario(activeFarmId, activeScenario.id)}
                className="touch-target inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 px-2.5 py-1.5 rounded border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 transition-colors"
                title="Delete scenario"
              >
                <span className="material-symbols-outlined text-xs">delete</span>
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
              <span className="material-symbols-outlined text-amber-500 text-sm">auto_awesome</span>
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
                <span className="material-symbols-outlined text-emerald-600 text-lg">eco</span>
                <span>Crop & Land Sown</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Selected Crop</label>
                <CustomSelect
                  id="scenario-crop"
                  value={activeScenario.crop || "wheat"}
                  onChange={(e) => handleFieldChange("crop", e.target?.value ?? e)}
                  options={CROP_OPTIONS.map((c) => ({ value: c.id, label: c.name, icon: c.icon }))}
                />
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
                <CustomSelect
                  id="scenario-timing"
                  value={activeScenario.planting?.type || "on_time"}
                  onChange={(e) => {
                    const type = e.target?.value ?? e
                    handlePlantingChange({ type, delayDays: type === "delayed" ? 14 : 0 })
                  }}
                  options={TIMING_OPTIONS}
                />
              </div>
            </div>

            {/* Card 2: Water & Irrigation */}
            <div className="bg-card border rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-base font-semibold border-b pb-2">
                <span className="material-symbols-outlined text-blue-600 text-lg">water_drop</span>
                <span>Irrigation & Water</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Irrigation Method</label>
                <CustomSelect
                  id="scenario-irrigation"
                  value={activeScenario.irrigation || "flood"}
                  onChange={(e) => handleFieldChange("irrigation", e.target?.value ?? e)}
                  options={IRRIGATION_OPTIONS}
                />
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
                <CustomSelect
                  id="scenario-priority"
                  value={activeScenario.priorityProfile || "balanced"}
                  onChange={(e) => handleFieldChange("priorityProfile", e.target?.value ?? e)}
                  options={PRIORITY_OPTIONS}
                />
              </div>
            </div>

            {/* Card 3: Weather & Input Costs */}
            <div className="bg-card border rounded-xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-base font-semibold border-b pb-2">
                <span className="material-symbols-outlined text-amber-600 text-lg">wb_sunny</span>
                <span>Weather & Inputs</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Seasonal Weather Projection</label>
                <CustomSelect
                  id="scenario-weather"
                  value={activeScenario.weather || "normal"}
                  onChange={(e) => handleFieldChange("weather", e.target?.value ?? e)}
                  options={WEATHER_CHOICES}
                />
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