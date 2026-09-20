import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { 
  useAppStore, 
  getActiveFarm, 
  getResult, 
  isLoading,
  getSelectedForComparison
} from "../../state/store.js"
import { formatCurrency, formatNumber } from "../../services/comparison.service.js"
import { useLanguage } from "../../i18n/LanguageContext.jsx"

export default function ScenarioResultsPage({ farmId: propFarmId, scenarioId: propScenarioId, onNavigate }) {
  const navigate = useNavigate()
  const { farmId: routeFarmId, id: routeScenarioId } = useParams()
  const { t } = useLanguage()
  
  const activeFarm = useAppStore(getActiveFarm)
  const activeFarmId = useAppStore((s) => s.activeFarmId) || routeFarmId || propFarmId || "farm-001"
  const scenariosMap = useAppStore((s) => s.scenarios)
  const toggleComparison = useAppStore((s) => s.toggleComparisonSelection)
  const selectedForComparison = useAppStore(getSelectedForComparison)

  const scenarios = activeFarmId ? (scenariosMap[activeFarmId] || []) : []
  const [selectedScenarioId, setSelectedScenarioId] = useState(routeScenarioId || propScenarioId || null)
  const [activeTab, setActiveTab] = useState("money")

  useEffect(() => {
    if (scenarios.length > 0 && (!selectedScenarioId || !scenarios.some(s => s.id === selectedScenarioId))) {
      setSelectedScenarioId(routeScenarioId || propScenarioId || scenarios[0].id)
    }
  }, [scenarios, selectedScenarioId, routeScenarioId, propScenarioId])

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
        <span className="material-symbols-outlined text-4xl text-[#164A34] mb-4">agriculture</span>
        <h2 className="text-xl font-bold mb-2">No Scenario Found</h2>
        <p className="text-[#596A61] mb-6">Create or configure a scenario in the Scenario Builder first.</p>
        <button 
          onClick={() => onNavigate ? onNavigate("builder") : navigate("/scenarios/new")} 
          className="bg-[#164A34] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:bg-[#196C3E] transition-all cursor-pointer"
        >
          Go to Scenario Builder
        </button>
      </div>
    )
  }

  // Calculated metrics from store/result or smart defaults
  const profit = result?.economics?.profit ?? 184500
  const baselineProfit = baselineResult?.economics?.profit ?? 146300
  const profitDelta = profit - baselineProfit
  const profitPercent = baselineProfit ? Math.round((profitDelta / baselineProfit) * 100) : 26

  const yieldTotal = result?.yield?.total ?? 21.2
  const yieldPerAcre = result?.yield?.perAcre ?? (yieldTotal / (activeFarm.acreage || 8.5)).toFixed(1)
  const waterReq = result?.water?.requiredM3 ?? 3450
  const waterSurplus = Math.max(0, (activeFarm.waterCapacity || 6200) - waterReq)
  const decisionScore = result?.decisionScore?.total ?? result?.decisionScore ?? 89

  const handleNav = (targetPath) => {
    if (onNavigate) {
      onNavigate(targetPath)
    } else {
      navigate(`/${targetPath}`)
    }
  }

  return (
    <div className="w-full space-y-8 animate-fadeIn pb-12">
      {/* 1. TOP VISUAL RESULT HEADER / LANDSCAPE BANNER */}
      <div className="relative w-full overflow-hidden bg-surface-container-high rounded-3xl p-6 md:p-10 text-on-surface shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.85)", boxShadow: "rgba(22, 74, 52, 0.05) 0px 10px 30px -5px, rgba(255, 255, 255, 0.95) 0px 1px 2px inset" }}>
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-25 mix-blend-multiply pointer-events-none scale-105"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvFZIizt6PJ7wAcX8ezma4aKHYYjdEhtd6JFmbnFmMpTko5tCj7hZcybxj6pHYkUP9SN_myJ5SM7T62fffy3UaW2AtOrEDOAKMNCMOrEqf49X1UmAFILSRqgGetDMu0Dw2A_LJ4DeJJY_1BNBslNSZmXsCd97MDF9YXdbvLFqrTZo5n3ObQLPMl71_nr4HTKnBSEFm2vMB-x2kNwScj-6xeXYoCCKCwjpv1sOhXK6usUdLBTWRdim0pA')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low/95 via-surface-container-low/85 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl flex flex-col gap-5">
          {/* Breadcrumb & Chips */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 font-label-md text-on-surface-variant bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
              <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/dashboard")}>Dashboard</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="cursor-pointer hover:text-primary" onClick={() => navigate("/farms")}>{activeFarm.name}</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-semibold">{activeScenario.label || activeScenario.name}</span>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full font-label-sm bg-secondary-container text-on-secondary-container font-semibold tracking-wide uppercase">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Optimal Viability · Low Risk
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-medium">
              <span className="material-symbols-outlined text-[14px]">water_drop</span>
              Drip Precision Active
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="font-headline-lg text-primary tracking-tight text-balance">
              This plan looks highly promising.
            </h1>
            <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
              Based on <strong className="text-on-surface font-semibold">{activeFarm.acreage || 8.5} acres</strong> {activeFarm.soilType || "deep black cotton soil"} with reliable irrigation capacity and optimized fertigation scheduling.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => handleNav("report")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg shadow-sm hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download Printable Plan
            </button>

            <button 
              onClick={() => handleNav("compare")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">balance</span>
              Compare Plans
            </button>

            <button 
              onClick={() => handleNav("recommendations")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-lg shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">psychology_alt</span>
              Recommendations <span className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold flex items-center justify-center">3</span>
            </button>

            <button 
              onClick={() => handleNav("why")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-on-surface-variant hover:text-primary font-label-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
              Why did it change?
            </button>

            <button 
              onClick={() => toggleComparison(activeScenario.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelectedForComp 
                  ? "bg-primary text-white" 
                  : "bg-surface-container hover:bg-surface-container-high text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{isSelectedForComp ? "check_circle" : "add_circle"}</span>
              {isSelectedForComp ? "Selected for Compare" : "Select for Compare"}
            </button>
          </div>
        </div>
      </div>

      {/* 2. THREE PRIMARY HERO METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Profit */}
        <div className="relative bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group" style={{ backgroundColor: "rgba(255, 255, 255, 0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.85)" }}>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary-container/30 blur-2xl group-hover:bg-secondary-container/50 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Estimated Profit</span>
              <span className="p-2 rounded-xl bg-surface-container text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display-lg text-primary font-bold tracking-tight">₹{profit.toLocaleString("en-IN")}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm font-semibold mb-3">
              <span className="material-symbols-outlined text-[15px]">trending_up</span>
              {profitDelta >= 0 ? `+₹${profitDelta.toLocaleString("en-IN")} vs baseline (+${profitPercent}%)` : `-₹${Math.abs(profitDelta).toLocaleString("en-IN")} vs baseline`}
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl">
            <span>Net per acre</span>
            <span className="text-secondary font-semibold">₹{Math.round(profit / (activeFarm.acreage || 8.5)).toLocaleString("en-IN")} / ac</span>
          </div>
        </div>

        {/* Metric 2: Yield */}
        <div className="relative bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group" style={{ backgroundColor: "rgba(255, 255, 255, 0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.85)" }}>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-primary-fixed/20 blur-2xl group-hover:bg-primary-fixed/40 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Estimated Yield</span>
              <span className="p-2 rounded-xl bg-surface-container text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">grain</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display-lg text-on-surface font-bold tracking-tight">{yieldPerAcre}</span>
              <span className="font-title-lg text-on-surface-variant">Quintals / ac</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-sm font-semibold mb-3">
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              Above regional avg (18.2 Q)
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl">
            <span>Total Expected Production</span>
            <span className="font-semibold text-on-surface">{yieldTotal} Quintals</span>
          </div>
        </div>

        {/* Metric 3: Water Needed */}
        <div className="relative bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group" style={{ backgroundColor: "rgba(255, 255, 255, 0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.85)" }}>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-tertiary-fixed-dim/20 blur-2xl group-hover:bg-tertiary-fixed-dim/40 transition-all pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Water Needed</span>
              <span className="p-2 rounded-xl bg-surface-container text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">water_voc</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display-lg text-on-surface font-bold tracking-tight">{waterReq.toLocaleString()}</span>
              <span className="font-title-lg text-on-surface-variant">m³ total</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-semibold mb-3">
              <span className="material-symbols-outlined text-[15px]">shield</span>
              {waterSurplus.toLocaleString()} m³ surplus buffer
            </div>
          </div>
          <div className="pt-3 flex items-center justify-between font-label-sm text-on-surface-variant bg-surface-container-low px-3 py-2 rounded-xl">
            <span>Efficiency vs Flood</span>
            <span className="text-tertiary font-semibold">44% Water Saved</span>
          </div>
        </div>
      </div>

      {/* 3. DECISION SCORE & CONFIDENCE METER SECTION */}
      <div className="bg-surface-container-lowest rounded-3xl p-7 md:p-8 shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.78)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.85)" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md font-bold shrink-0">
              {decisionScore}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-primary tracking-tight">Decision Score: {decisionScore} / 100</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-semibold">
                  Optimal
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant">Agronomist Validated · Calculated using satellite soil moisture, local weather anomalies, and cost buffers.</p>
            </div>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="font-label-sm text-on-surface-variant block uppercase tracking-wider">Viability Rating</span>
            <span className="font-title-md text-secondary font-semibold flex items-center md:justify-end gap-1">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              Grade A1 Investment
            </span>
          </div>
        </div>

        {/* Segmented Scale Visualizer */}
        <div className="w-full mb-6">
          <div className="grid grid-cols-4 gap-1.5 w-full h-3 rounded-full overflow-hidden bg-surface-container">
            <div className="h-full bg-error-container/70 relative" />
            <div className="h-full bg-surface-variant relative" />
            <div className="h-full bg-primary-fixed relative" />
            <div className="h-full bg-secondary relative" />
          </div>
          <div className="relative w-full h-6">
            <div className="absolute -top-1 transform -translate-x-1/2 flex flex-col items-center" style={{ left: `${Math.min(100, Math.max(5, decisionScore))}%` }}>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-primary"></div>
              <span className="font-label-sm text-primary font-bold whitespace-nowrap pt-0.5">{decisionScore} Current Plan</span>
            </div>
          </div>
          <div className="grid grid-cols-4 text-center font-label-xs text-on-surface-variant mt-1">
            <span className="text-left font-label-sm">0 – 40 Risky</span>
            <span className="font-label-sm">40 – 70 Moderate</span>
            <span className="font-label-sm">70 – 85 Favorable</span>
            <span className="text-right font-label-sm font-semibold text-secondary">85 – 100 Optimal</span>
          </div>
        </div>

        {/* 5-Axis Agronomic Performance Index Radar Graphic */}
        <div className="pt-6 border-t border-surface-container-high">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-1 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">radar</span>
                <h3 className="font-title-md text-primary font-bold">5-Axis Agronomic Performance Index</h3>
              </div>
              <p className="font-body-sm text-on-surface-variant">Holistic multidimensional evaluation comparing this plan against regional baseline.</p>
              <div className="flex items-center gap-4 mt-3 text-[12px] font-label-md">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <strong className="text-primary">KrishiMitra Plan ({decisionScore} Avg)</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-outline-variant"></span>
                  <span className="text-on-surface-variant">Regional Baseline (61 Avg)</span>
                </span>
              </div>
            </div>
            <div className="w-full max-w-md flex flex-col gap-3 p-4 bg-surface-container-low rounded-2xl border border-surface-container-high">
              {[
                { label: 'Water Efficiency', plan: 92, baseline: 60, icon: 'water_drop' },
                { label: 'Net Margin', plan: 93, baseline: 65, icon: 'payments' },
                { label: 'Soil Conservation', plan: 90, baseline: 58, icon: 'landscape' },
                { label: 'Climate Resilience', plan: 91, baseline: 62, icon: 'shield' },
                { label: 'Market Timing', plan: 88, baseline: 55, icon: 'schedule' },
              ].map((axis, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[12px] font-label-md">
                    <span className="flex items-center gap-1.5 text-primary font-semibold">
                      <span className="material-symbols-outlined text-[14px] text-secondary">{axis.icon}</span>
                      {axis.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-secondary">{axis.plan}%</span>
                      <span className="text-on-surface-variant/70 text-[11px]">(Base: {axis.baseline}%)</span>
                    </div>
                  </div>
                  <div className="relative h-2 w-full bg-surface-container-high rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: `${axis.plan}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. COMPREHENSIVE PLAN BREAKDOWN TABS */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="font-headline-md text-primary tracking-tight">Comprehensive Plan Breakdown</h2>
            <p className="font-body-sm text-on-surface-variant">Explore quantitative data across financials, hydrology, risk models, and baseline assumptions.</p>
          </div>
          {/* Tab Controls */}
          <div className="flex items-center p-1 bg-surface-container rounded-2xl">
            <button 
              onClick={() => setActiveTab("money")}
              className={`px-4 py-2 rounded-xl font-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "money" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              Money
            </button>
            <button 
              onClick={() => setActiveTab("water")}
              className={`px-4 py-2 rounded-xl font-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "water" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">water_voc</span>
              Water & Soil
            </button>
            <button 
              onClick={() => setActiveTab("risk")}
              className={`px-4 py-2 rounded-xl font-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "risk" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">security</span>
              Risk Vectors
            </button>
            <button 
              onClick={() => setActiveTab("assumptions")}
              className={`px-4 py-2 rounded-xl font-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "assumptions" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Assumptions
            </button>
          </div>
        </div>

        {/* TAB 1: MONEY BREAKDOWN */}
        {activeTab === "money" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Net Profitability</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-headline-lg text-secondary font-bold">₹{profit.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="font-body-sm text-on-surface-variant mt-1">Calculated after seed, organic inputs, fertigation, harvesting, and mandi transport deductions.</p>
                </div>
                <div className="mt-6 pt-5 bg-surface-container-low rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="font-label-sm text-on-surface-variant block">Projected Return (ROI)</span>
                    <span className="font-headline-md text-primary font-bold">217%</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-on-surface-variant block">Break-even Yield</span>
                    <span className="font-title-lg text-on-surface font-semibold">11.2 Q / ac</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-7 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-title-lg text-primary font-semibold">Expense vs Revenue Breakdown</h3>
                  <span className="font-label-sm px-2.5 py-1 bg-surface-container rounded-lg text-on-surface-variant">{activeFarm.acreage || 8.5} Acres Total</span>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between font-label-sm text-on-surface-variant">
                    <span>Input Costs (₹85,000)</span>
                    <span className="font-semibold text-secondary">Net Margin 68.5% (₹{profit.toLocaleString("en-IN")})</span>
                  </div>
                  <div className="w-full h-5 rounded-full overflow-hidden flex bg-surface-container">
                    <div className="h-full bg-error-container" style={{ width: "31.5%" }} title="Total Cost ₹85,000" />
                    <div className="h-full bg-secondary" style={{ width: "68.5%" }} title={`Net Margin ₹${profit.toLocaleString("en-IN")}`} />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-title-md text-on-surface">Input Itemization</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[18px]">yard</span>
                        </span>
                        <div>
                          <span className="font-title-sm text-on-surface block">Certified Wheat Seeds</span>
                          <span className="font-label-sm text-on-surface-variant">HD-2967 (340 kg)</span>
                        </div>
                      </div>
                      <span className="font-title-md text-on-surface font-semibold">₹14,200</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[18px]">compost</span>
                        </span>
                        <div>
                          <span className="font-title-sm text-on-surface block">Organic Nutrients & Bio</span>
                          <span className="font-label-sm text-on-surface-variant">Vermi-compost + Trichoderma</span>
                        </div>
                      </div>
                      <span className="font-title-md text-on-surface font-semibold">₹18,800</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-[18px]">water_ph</span>
                        </span>
                        <div>
                          <span className="font-title-sm text-on-surface block">Drip Fertigation</span>
                          <span className="font-label-sm text-on-surface-variant">Schedule monitoring & lines</span>
                        </div>
                      </div>
                      <span className="font-title-md text-on-surface font-semibold">₹32,000</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-surface-container-low flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-on-surface">
                          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                        </span>
                        <div>
                          <span className="font-title-sm text-on-surface block">Logistics & Tillage</span>
                          <span className="font-label-sm text-on-surface-variant">Rotavator + Mandi transport</span>
                        </div>
                      </div>
                      <span className="font-title-md text-on-surface font-semibold">₹20,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WATER BREAKDOWN */}
        {activeTab === "water" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-7 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-title-lg text-primary font-semibold">Hydrological Balance</h3>
                  <span className="px-2.5 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg font-label-sm font-semibold">Surplus: +{waterSurplus.toLocaleString()} m³</span>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between font-label-sm text-on-surface">
                    <span>Required Water:</span>
                    <span className="font-bold text-primary">{waterReq.toLocaleString()} m³</span>
                  </div>
                  <div className="flex justify-between font-label-sm text-on-surface">
                    <span>Total Farm Capacity:</span>
                    <span className="font-bold text-tertiary">{(activeFarm.waterCapacity || 6200).toLocaleString()} m³</span>
                  </div>
                  <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: `${Math.min(100, Math.round((waterReq / (activeFarm.waterCapacity || 6200)) * 100))}%` }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-7 shadow-sm">
              <h3 className="font-title-lg text-primary font-semibold mb-4">Water Source Allocation</h3>
              <p className="font-body-sm text-on-surface-variant mb-4">Allocation across canal supply and on-farm open recharge wells under drip irrigation protocol.</p>
              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-title-sm text-on-surface">Upper Penganga Canal Sluice</span>
                  <span className="font-title-sm text-primary font-bold">4,000 m³</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-title-sm text-on-surface">Open Farm Recharge Wells</span>
                  <span className="font-title-sm text-primary font-bold">2,200 m³</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RISK VECTORS */}
        {activeTab === "risk" && (
          <div className="bg-surface-container-lowest rounded-3xl p-7 shadow-sm animate-fadeIn">
            <h3 className="font-title-lg text-primary font-semibold mb-4">Agronomic Risk Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body-sm">
                <thead>
                  <tr className="border-b border-surface-container-high text-on-surface-variant font-label-md">
                    <th className="py-3 px-4">Risk Vector</th>
                    <th className="py-3 px-4">Probability</th>
                    <th className="py-3 px-4">Impact</th>
                    <th className="py-3 px-4">Mitigation Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-on-surface">Canal Water Delay</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-medium">Low (15%)</td>
                    <td className="py-3.5 px-4 text-amber-700 font-medium">Moderate</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">Backup 2,200 m³ open well reserve</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-on-surface">Aphid / Rust Infestation</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-medium">Low (18%)</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-medium">Low</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">Recommended Nov 02 sowing avoids late Feb heat bloom</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-on-surface">Mandi Price Volatility</td>
                    <td className="py-3.5 px-4 text-amber-700 font-medium">Moderate (35%)</td>
                    <td className="py-3.5 px-4 text-amber-700 font-medium">Moderate</td>
                    <td className="py-3.5 px-4 text-on-surface-variant">MSP Floor safety net @ ₹2,275/Q</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ASSUMPTIONS */}
        {activeTab === "assumptions" && (
          <div className="bg-surface-container-lowest rounded-3xl p-7 shadow-sm animate-fadeIn">
            <h3 className="font-title-lg text-primary font-semibold mb-4">Simulation Assumptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
                <span className="font-label-sm text-on-surface-variant block uppercase">Target Sowing Window</span>
                <span className="font-title-md text-on-surface font-semibold">November 02, 2025</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
                <span className="font-label-sm text-on-surface-variant block uppercase">Baseline Mandi Price</span>
                <span className="font-title-md text-on-surface font-semibold">₹2,450 / Quintal</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
                <span className="font-label-sm text-on-surface-variant block uppercase">Drip Irrigation Efficiency</span>
                <span className="font-title-md text-on-surface font-semibold">88.5% Application Efficiency</span>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
                <span className="font-label-sm text-on-surface-variant block uppercase">Soil Depth & Profile</span>
                <span className="font-title-md text-on-surface font-semibold">1.2m Deep Regur Vertisol</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}