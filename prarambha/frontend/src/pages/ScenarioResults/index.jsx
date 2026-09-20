import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Sprout, TrendingUp, Droplets, ShieldAlert, Award, ArrowLeft, 
  Layers, CheckCircle, BarChart3, HelpCircle, Lightbulb, 
  FileText, Boxes, ArrowUpRight, ArrowDownRight, Minus
} from "lucide-react"
import { 
  useAppStore, 
  getActiveFarm, 
  getResult, 
  isLoading,
  getSelectedForComparison
} from "../../state/store.js"
import { formatCurrency, formatNumber } from "../../utils/format.js"
import en from "../../i18n/en.json"

export default function ScenarioResultsPage() {
  const navigate = useNavigate()
  
  const activeFarm = useAppStore(getActiveFarm)
  const activeFarmId = useAppStore((s) => s.activeFarmId)
  const scenariosMap = useAppStore((s) => s.scenarios)
  const toggleComparison = useAppStore((s) => s.toggleComparisonSelection)
  const selectedForComparison = useAppStore(getSelectedForComparison)

  const scenarios = activeFarmId ? (scenariosMap[activeFarmId] || []) : []
  const [selectedScenarioId, setSelectedScenarioId] = useState(null)

  useEffect(() => {
    if (scenarios.length > 0 && (!selectedScenarioId || !scenarios.some(s => s.id === selectedScenarioId))) {
      setSelectedScenarioId(scenarios[0].id)
    }
  }, [scenarios, selectedScenarioId])

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0] || null
  const baselineScenario = scenarios[0] || null

  const result = useAppStore(getResult(activeScenario?.id))
  const baselineResult = useAppStore(getResult(baselineScenario?.id))
  const loading = useAppStore(isLoading(activeScenario?.id))

  const isBaseline = activeScenario?.id === baselineScenario?.id
  const isSelectedForComp = selectedForComparison.includes(activeScenario?.id)

  if (!activeFarm || !activeScenario) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <Sprout className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">No Scenario Found</h2>
        <p className="text-muted-foreground mb-6">Create or configure a scenario in the Scenario Builder first.</p>
        <button 
          onClick={() => navigate("/scenarios")} 
          className="touch-target bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium shadow"
        >
          Go to Scenario Builder
        </button>
      </div>
    )
  }

  // Calculate deltas against baseline
  const profitDelta = (result?.economics?.profit ?? 0) - (baselineResult?.economics?.profit ?? 0)
  const yieldDelta = (result?.yield?.total ?? 0) - (baselineResult?.yield?.total ?? 0)

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={() => navigate("/scenarios")}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Builder</span>
            </button>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-primary font-medium">{activeFarm.name}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <span>{activeScenario.label || "Scenario Results"}</span>
            {isBaseline && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                Baseline Plan
              </span>
            )}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleComparison(activeScenario.id)}
            className={`touch-target text-xs font-semibold px-4 py-2 rounded-lg border transition-colors flex items-center gap-1.5 ${
              isSelectedForComp 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-background hover:bg-muted text-foreground"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isSelectedForComp ? "Selected for Comparison" : "Add to Comparison"}</span>
          </button>

          <button
            onClick={() => navigate("/comparison")}
            className="touch-target bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Compare All</span>
          </button>
        </div>
      </div>

      {/* Scenario Switcher Pills */}
      {scenarios.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {scenarios.map((sc) => {
            const isCur = sc.id === activeScenario.id
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`touch-target px-4 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                  isCur 
                    ? "bg-foreground text-background shadow" 
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{sc.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Net Profit */}
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Estimated Net Profit</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">
            ₹{(result?.economics?.profit ?? 0).toLocaleString("en-IN")}
          </div>
          <div className="text-xs flex items-center gap-1">
            {!isBaseline ? (
              profitDelta >= 0 ? (
                <span className="text-emerald-600 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +₹{profitDelta.toLocaleString("en-IN")} vs baseline
                </span>
              ) : (
                <span className="text-rose-600 font-semibold flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  -₹{Math.abs(profitDelta).toLocaleString("en-IN")} vs baseline
                </span>
              )
            ) : (
              <span className="text-muted-foreground flex items-center">
                <Minus className="w-3.5 h-3.5 mr-1" />
                Baseline standard
              </span>
            )}
          </div>
          <div className="pt-2 border-t text-[11px] text-muted-foreground flex justify-between">
            <span>Rev: ₹{(result?.economics?.revenue ?? 0).toLocaleString("en-IN")}</span>
            <span>Cost: ₹{(result?.economics?.cost ?? 0).toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Card 2: Yield */}
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Estimated Yield</span>
            <Sprout className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">
            {result?.yield?.total ?? 0} <span className="text-sm font-normal text-muted-foreground">Quintals</span>
          </div>
          <div className="text-xs flex items-center gap-1">
            {!isBaseline ? (
              yieldDelta >= 0 ? (
                <span className="text-emerald-600 font-semibold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +{yieldDelta.toFixed(1)} Qtl vs baseline
                </span>
              ) : (
                <span className="text-rose-600 font-semibold flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  {yieldDelta.toFixed(1)} Qtl vs baseline
                </span>
              )
            ) : (
              <span className="text-muted-foreground flex items-center">
                <Minus className="w-3.5 h-3.5 mr-1" />
                {result?.yield?.perAcre ?? 0} Qtl / acre
              </span>
            )}
          </div>
          <div className="pt-2 border-t text-[11px] text-muted-foreground flex justify-between">
            <span>Range: {result?.yield?.low ?? 0} – {result?.yield?.high ?? 0} Qtl</span>
          </div>
        </div>

        {/* Card 3: Water Requirement */}
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Water Required</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">
            {(result?.water?.requiredM3 ?? 0).toLocaleString()} <span className="text-sm font-normal text-muted-foreground">m³</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Efficiency: <span className="font-semibold text-foreground">{(result?.water?.productivity ?? 0).toFixed(4)} Q/m³</span>
          </div>
          <div className="pt-2 border-t text-[11px] text-muted-foreground flex justify-between">
            <span>Method: {activeScenario.irrigation || "flood"}</span>
            <span>Availability: {activeScenario.waterAvailabilityPercent ?? 100}%</span>
          </div>
        </div>

        {/* Card 4: Decision Score & Risk */}
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">Decision Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <span>{result?.decisionScore ?? 75}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {result?.risk?.level ?? "Low"} Risk
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500 rounded-full" 
              style={{ width: `${result?.decisionScore ?? 75}%` }}
            />
          </div>
          <div className="pt-2 border-t text-[11px] text-muted-foreground flex justify-between">
            <span>Risk Index: {result?.risk?.overall ?? 20}/100</span>
            <span>Confidence: High</span>
          </div>
        </div>
      </div>

      {/* Decision Support Deep-Dives Hub */}
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Decision Support Analysis</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore underlying agronomic factors, diagnostic attributions, and resource requirements before committing your budget:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <button
            onClick={() => navigate("/why")}
            className="touch-target p-4 text-left border rounded-xl hover:border-primary hover:bg-muted/50 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-semibold text-sm text-foreground">Why Did It Change?</div>
            <div className="text-xs text-muted-foreground">Attribution breakdown of weather, sowing, and water impact.</div>
          </button>

          <button
            onClick={() => navigate("/recommendations")}
            className="touch-target p-4 text-left border rounded-xl hover:border-primary hover:bg-muted/50 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-semibold text-sm text-foreground">Advisory Triggers</div>
            <div className="text-xs text-muted-foreground">Actionable agronomic rules and suggestions.</div>
          </button>

          <button
            onClick={() => navigate("/resources")}
            className="touch-target p-4 text-left border rounded-xl hover:border-primary hover:bg-muted/50 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <Boxes className="w-5 h-5 text-purple-600" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-semibold text-sm text-foreground">Resource Readiness</div>
            <div className="text-xs text-muted-foreground">Verify cash, water, and input inventory adequacy.</div>
          </button>

          <button
            onClick={() => navigate("/report")}
            className="touch-target p-4 text-left border rounded-xl hover:border-primary hover:bg-muted/50 transition-all space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <FileText className="w-5 h-5 text-amber-600" />
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="font-semibold text-sm text-foreground">Printable Report</div>
            <div className="text-xs text-muted-foreground">Export clean summary report for bank or record-keeping.</div>
          </button>
        </div>
      </div>
    </div>
  )
}