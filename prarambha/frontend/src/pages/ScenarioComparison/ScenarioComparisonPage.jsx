import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS, MOCK_WHY_EXPLANATIONS } from "../../services/mockData";
import { compareScenarios, getWhyExplanation, formatCurrency } from "../../services/comparison.service";
import ScenarioSelector from "../../components/comparison/ScenarioSelector";
import ComparisonTable from "../../components/comparison/ComparisonTable";
import EconomicsChart from "../../components/comparison/EconomicsChart";
import RiskWaterChart from "../../components/comparison/RiskWaterChart";
import WhyPanel from "../../components/why/WhyPanel";
import { api } from "../../services/api.js";


/**
 * Trade-off Pentagon Radar Component (Stitch Design Specification)
 * 5-axis trade-off chart: Yield, Net Profit, Water Efficiency, Low Risk, ROI.
 */
function TradeoffPentagon({ scenarios = [] }) {
  // Center (120, 120), Radius 80
  const center = 120;
  const radius = 85;
  const angles = [-90, -18, 54, 126, 198]; // 5 pentagon vertices in degrees

  const getPoint = (angleDeg, rRatio) => {
    const rad = (angleDeg * Math.PI) / 180;
    const r = radius * Math.min(Math.max(rRatio, 0.1), 1.0);
    const x = center + r * Math.cos(rad);
    const y = center + r * Math.sin(rad);
    return { x, y };
  };

  const getPointsString = (ratios) => {
    return angles
      .map((angle, i) => {
        const pt = getPoint(angle, ratios[i] || 0.5);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(" ");
  };

  // Pre-calculated pentagon grid lines (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const colors = [
    { stroke: "#0D4A2B", fill: "rgba(13, 74, 43, 0.25)" }, // Dark Green (Plan A)
    { stroke: "#3D8B5A", fill: "rgba(61, 139, 90, 0.25)" }, // Sage Green (Plan B)
    { stroke: "#4C9BB8", fill: "rgba(76, 155, 184, 0.25)" }, // Water Blue (Plan C)
    { stroke: "#D9902F", fill: "rgba(217, 144, 47, 0.25)" }, // Amber (Plan D)
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
        <div>
          <h3 className="text-base font-black text-[#1E2924]">
            5-Axis Trade-off Pentagon Radar
          </h3>
          <span className="text-xs text-[#596A61]">
            Multi-dimensional evaluation: Yield, Net Profit, Water Efficiency, Low Risk, ROI
          </span>
        </div>
        <span className="text-xs font-bold text-[#0D4A2B] bg-[#EAF3EC] px-2.5 py-1 rounded-full border border-[#CDE0D2]">
          Trade-off Balanced
        </span>
      </div>

      <div className="w-full space-y-4 py-2">
        {/* Multi-axis HTML/CSS Tradeoff Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-bold">
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-1">
            <span className="text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">grain</span> Yield
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#196C3E] h-full rounded-full w-[90%]" />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-1">
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">payments</span> Net Profit
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#196C3E] h-full rounded-full w-[95%]" />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-1">
            <span className="text-tertiary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">water_voc</span> Water Eff.
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#00475A] h-full rounded-full w-[88%]" />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-1">
            <span className="text-amber-700 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">shield</span> Low Risk
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#196C3E] h-full rounded-full w-[92%]" />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/60 space-y-1">
            <span className="text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">analytics</span> ROI
            </span>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-[#003320] h-full rounded-full w-[85%]" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          {scenarios.slice(0, 4).map((sc, idx) => {
            const color = colors[idx % colors.length];
            return (
              <div key={sc.id} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color.stroke }} />
                <span>{sc.name || sc.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * ScenarioComparisonPage - Owned by Member 4 (Section 9, 10 & 12 in Task_Distribution.md)
 * Rebuilt to match the exact Stitch visual design specifications (Image 1 & Image 2).
 */
export default function ScenarioComparisonPage({
  initialSelectedIds = null,
  initialBaselineId = null,
  onNavigate = null,
}) {
  const { t } = useLanguage();
  const { farmId } = useParams();
  const [liveScenarios, setLiveScenarios] = useState(null);

  useEffect(() => {
    if (!farmId) return;
    let active = true;
    api.get(`/api/scenarios?farmId=${encodeURIComponent(farmId)}`).then(async ({ data }) => {
      const scenarios = Array.isArray(data) ? data : [];
      if (scenarios.length < 2) return;
      const ids = scenarios.slice(0, 4).map((scenario) => scenario.id);
      const comparison = await api.get(`/api/compare?farmId=${encodeURIComponent(farmId)}&scenarioIds=${ids.join(",")}`);
      if (!active || comparison.error || !comparison.data?.scenarios) return;
      setLiveScenarios(comparison.data.scenarios.map((scenario) => ({
        id: scenario.id,
        name: scenario.name,
        crop: scenario.cropCode,
        area: scenario.result?.result_json?.scenario?.areaAcres ?? scenario.result?.yield_total_q,
        results: scenario.result?.result_json ?? {},
      })));
    });
    return () => { active = false; };
  }, [farmId]);

  const allScenarios = liveScenarios || MOCK_SCENARIOS;

  const [selectedIds, setSelectedIds] = useState(
    initialSelectedIds && initialSelectedIds.length >= 2
      ? initialSelectedIds
      : ["sc-001", "sc-002", "sc-003"]
  );

  const [baselineId, setBaselineId] = useState(
    initialBaselineId || (initialSelectedIds && initialSelectedIds[0]) || "sc-001"
  );

  const [activeTab, setActiveTab] = useState("comparison");
  const [targetWhyId, setTargetWhyId] = useState("sc-002");

  useEffect(() => {
    if (!liveScenarios?.length) return;
    setSelectedIds(liveScenarios.map((scenario) => scenario.id).slice(0, 4));
    setBaselineId(liveScenarios[0].id);
    setTargetWhyId(liveScenarios[1]?.id || liveScenarios[0].id);
  }, [liveScenarios]);

  const handleToggleScenario = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((item) => item !== id);
        if (id === baselineId && next.length > 0) {
          setBaselineId(next[0]);
        }
        return next;
      } else {
        if (prev.length >= 4) return prev;
        return [...prev, id];
      }
    });
  };

  const selectedScenarios = useMemo(() => {
    return allScenarios.filter((s) => selectedIds.includes(s.id));
  }, [allScenarios, selectedIds]);

  const comparisonData = useMemo(() => {
    return compareScenarios(selectedScenarios, baselineId);
  }, [selectedScenarios, baselineId]);

  const targetWhyScenario = useMemo(() => {
    return allScenarios.find((s) => s.id === targetWhyId) || selectedScenarios[1] || selectedScenarios[0];
  }, [allScenarios, targetWhyId, selectedScenarios]);

  const baselineScenario = useMemo(() => {
    return allScenarios.find((s) => s.id === baselineId) || allScenarios[0];
  }, [allScenarios, baselineId]);

  const whyExplanation = useMemo(() => {
    if (!targetWhyScenario || !baselineScenario) return null;
    return getWhyExplanation(targetWhyScenario.id, baselineScenario.id, MOCK_WHY_EXPLANATIONS);
  }, [targetWhyScenario, baselineScenario]);

  return (
    <div className="space-y-6 page-transition">
      {/* ── STITCH PAGE HEADER ── */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#CDE0D2]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0D4A2B] uppercase tracking-widest mb-1">
            <span>KRISHIMITRA</span> • <span>SCENARIO COMPARISON MATRIX</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E2924] tracking-tight">
            {t("comparison.title") || "Scenario Comparison Matrix"}
          </h1>
          <p className="text-sm text-[#596A61] mt-1 max-w-2xl">
            {t("comparison.subtitle") || "Side-by-side evaluation of yield, net profit, water productivity, and risk index."}
          </p>
        </div>
      </header>

      {/* ── COMPARISON HIGHLIGHT TILES (STITCH STYLE) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
            ESTIMATED HIGHEST YIELD
          </span>
          <span className="text-2xl font-black text-[#0D4A2B] block">
            88 qtl <span className="text-xs font-bold text-[#3D8B5A] bg-[#EAF3EC] px-2 py-0.5 rounded-full inline-block ml-2">+18.2%</span>
          </span>
          <span className="text-xs text-[#596A61]">Plan B (Drip Recommended)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
            ESTIMATED MAX NET PROFIT
          </span>
          <span className="text-2xl font-black text-[#0D4A2B] block">
            ₹2,15,000 <span className="text-xs font-bold text-[#3D8B5A] bg-[#EAF3EC] px-2 py-0.5 rounded-full inline-block ml-2">+₹43,000</span>
          </span>
          <span className="text-xs text-[#596A61]">vs Plan A Baseline (₹1,72,000)</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
            HIGHEST WATER PRODUCTIVITY
          </span>
          <span className="text-2xl font-black text-[#4C9BB8] block">
            4.2 kg/m³ <span className="text-xs font-bold text-[#4C9BB8] bg-sky-50 px-2 py-0.5 rounded-full inline-block ml-2">+35% Efficiency</span>
          </span>
          <span className="text-xs text-[#596A61]">Drip Irrigation System</span>
        </div>
      </div>

      {/* 1. Scenario Selector */}
      <ScenarioSelector
        allScenarios={allScenarios}
        selectedIds={selectedIds}
        baselineId={baselineId}
        onToggleScenario={handleToggleScenario}
        onSetBaseline={setBaselineId}
      />

      {/* View Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#CDE0D2] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("comparison")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "comparison"
              ? "bg-[#0D4A2B] text-white shadow-xs"
              : "bg-white text-[#1E2924] hover:bg-[#EAF3EC] border border-[#CDE0D2]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">bar_chart</span>
          <span>Scenario Comparison Matrix & Charts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("why")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "why"
              ? "bg-[#0D4A2B] text-white shadow-xs"
              : "bg-white text-[#1E2924] hover:bg-[#EAF3EC] border border-[#CDE0D2]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">lightbulb</span>
          <span>Why Did It Change? (Explainability)</span>
        </button>
      </div>

      {/* Check if at least 2 scenarios are selected */}
      {selectedIds.length < 2 ? (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 text-center my-8">
          <div className="text-3xl mb-2 flex justify-center text-amber-900">
            <span className="material-symbols-outlined text-4xl">balance</span>
          </div>
          <h3 className="font-bold text-amber-900 text-base mb-1">
            {t("comparison.minSelectionHint")}
          </h3>
          <p className="text-xs text-amber-700 max-w-md mx-auto">
            Comparing plans side-by-side helps identify hidden water and financial trade-offs before investing. Check at least 2 scenario cards above.
          </p>
        </div>
      ) : activeTab === "comparison" ? (
        <>
          {/* 2. Visual Charts & Trade-off Pentagon Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EconomicsChart scenarios={selectedScenarios} />
            <RiskWaterChart scenarios={selectedScenarios} />
          </div>

          {/* 5-Axis Trade-off Pentagon Radar Chart */}
          <TradeoffPentagon scenarios={selectedScenarios} />

          {/* 3. Detailed Neutral Comparison Matrix Table */}
          <ComparisonTable
            scenarios={selectedScenarios}
            baselineId={baselineId}
            differences={comparisonData.differences}
            tradeoffs={comparisonData.tradeoffs}
            onSelectWhyScenario={(id) => {
              setTargetWhyId(id);
              setActiveTab("why");
            }}
          />
        </>
      ) : (
        /* 4. Integrated Why Panel Explainability View */
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-[#CDE0D2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1E2924]">Select Plan to Explain:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {selectedScenarios
                  .filter((s) => s.id !== baselineId)
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setTargetWhyId(s.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        targetWhyId === s.id
                          ? "bg-[#0D4A2B] text-white border-[#0D4A2B] shadow-xs"
                          : "bg-white text-[#1E2924] border-[#CDE0D2] hover:bg-[#EAF3EC]"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
              </div>
            </div>

            <div className="text-xs text-[#596A61]">
              Baseline: <strong className="text-[#0D4A2B] font-semibold">{baselineScenario?.name}</strong>
            </div>
          </div>

          <WhyPanel
            targetScenario={targetWhyScenario}
            referenceScenario={baselineScenario}
            explanation={whyExplanation}
          />
        </div>
      )}
    </div>
  );
}
