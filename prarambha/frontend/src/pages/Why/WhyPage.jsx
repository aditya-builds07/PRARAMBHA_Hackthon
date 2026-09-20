import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS, MOCK_WHY_EXPLANATIONS } from "../../services/mockData";
import { getWhyExplanation } from "../../services/comparison.service";
import ExpandableCard from "../../components/common/ExpandableCard";

export default function WhyPage({
  initialTargetId = "sc-002",
  initialReferenceId = "sc-001",
  onNavigate = null,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const allScenarios = MOCK_SCENARIOS || [];
  const [targetId, setTargetId] = useState(initialTargetId);
  const [referenceId, setReferenceId] = useState(initialReferenceId);

  const targetScenario = useMemo(
    () => allScenarios.find((s) => s.id === targetId) || allScenarios[1] || allScenarios[0],
    [allScenarios, targetId]
  );

  const referenceScenario = useMemo(
    () => allScenarios.find((s) => s.id === referenceId) || allScenarios[0],
    [allScenarios, referenceId]
  );

  const explanation = useMemo(() => {
    if (!targetScenario || !referenceScenario) return null;
    return getWhyExplanation(targetScenario.id, referenceScenario.id, MOCK_WHY_EXPLANATIONS);
  }, [targetScenario, referenceScenario]);

  const targetProfit = targetScenario?.outputs?.profit ?? 184500;
  const refProfit = referenceScenario?.outputs?.profit ?? 146300;
  const profitDiff = targetProfit - refProfit;
  const profitPct = refProfit ? Math.round((profitDiff / refProfit) * 100) : 26;

  const targetWater = targetScenario?.outputs?.waterRequired ?? 3450;
  const refWater = referenceScenario?.outputs?.waterRequired ?? 4650;
  const waterDiff = targetWater - refWater;

  const targetYield = targetScenario?.outputs?.yieldPerAcre ?? 21.2;
  const refYield = referenceScenario?.outputs?.yieldPerAcre ?? 19.1;
  const yieldDiff = (targetYield - refYield).toFixed(1);

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Level 1 Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0DEC0] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#164A34] tracking-tight">
            Why Did It Change?
          </h1>
          <p className="text-xs text-[#596A61] font-medium mt-0.5">
            Comparing <strong className="text-[#164A34]">{targetScenario?.name || "Drip Precision Wheat"}</strong> against baseline <strong className="text-[#1E2924]">{referenceScenario?.name || "Standard Flood Plan"}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (onNavigate ? onNavigate("comparison") : navigate("/compare"))}
            className="px-4 py-2 bg-[#164A34] hover:bg-[#196C3E] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          >
            Compare All Plans
          </button>
        </div>
      </div>

      {/* Scenario Selection Strip */}
      <div className="bg-white rounded-2xl p-4 border border-[#D0DEC0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold">
        <div className="flex items-center gap-2">
          <span className="text-[#164A34]">Target Plan:</span>
          <select
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="bg-[#FAF9F5] border border-[#D0DEC0] px-3 py-1.5 rounded-xl text-xs font-bold text-[#1E2924] outline-none cursor-pointer"
          >
            {allScenarios.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#596A61]">Baseline Reference:</span>
          <select
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            className="bg-[#FAF9F5] border border-[#D0DEC0] px-3 py-1.5 rounded-xl text-xs font-bold text-[#1E2924] outline-none cursor-pointer"
          >
            {allScenarios.map((s) => (
              <option key={s.id} value={s.id}>{s.name} (Baseline)</option>
            ))}
          </select>
        </div>
      </div>

      {/* Level 1 Storytelling Top Banner — 5-Second Scan */}
      <div className="bg-white rounded-3xl p-6 border border-[#D0DEC0] shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-[#EBF3ED] space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-[#596A61] tracking-wider block">
            Baseline Practice
          </span>
          <h3 className="font-bold text-[#1E2924] text-base">{referenceScenario?.name || "Standard Flood Plan"}</h3>
          <div className="space-y-1 text-xs pt-2">
            <div className="flex justify-between"><span>Profit:</span><span className="font-bold">₹{refProfit.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span>Water:</span><span className="font-bold">{refWater.toLocaleString()} m³</span></div>
            <div className="flex justify-between"><span>Yield:</span><span className="font-bold">{refYield} Q/ac</span></div>
          </div>
        </div>

        <div className="bg-[#164A34] text-white p-5 rounded-2xl flex flex-col justify-center items-center text-center space-y-2 shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A1F1B7]">Key Differences</span>
          <div className="text-xl sm:text-2xl font-black text-white">
            {profitDiff >= 0 ? `+₹${profitDiff.toLocaleString("en-IN")} Net Profit` : `-₹${Math.abs(profitDiff).toLocaleString("en-IN")}`}
          </div>
          <div className="text-xs font-semibold text-[#A1F1B7]">
            {waterDiff <= 0 ? `${waterDiff} m³ Water Conserved` : `+${waterDiff} m³ Water`} • +{yieldDiff} Q/ac Yield
          </div>
        </div>

        <div className="bg-[#EBF3ED] p-5 rounded-2xl border border-[#D0DEC0] space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-[#164A34] tracking-wider block">
            Optimized Recommendation
          </span>
          <h3 className="font-bold text-[#164A34] text-base">{targetScenario?.name || "Drip Precision Wheat"}</h3>
          <div className="space-y-1 text-xs pt-2 text-[#1E2924]">
            <div className="flex justify-between"><span>Profit:</span><span className="font-bold text-[#164A34]">₹{targetProfit.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between"><span>Water:</span><span className="font-bold">{targetWater.toLocaleString()} m³</span></div>
            <div className="flex justify-between"><span>Yield:</span><span className="font-bold">{targetYield} Q/ac</span></div>
          </div>
        </div>
      </div>

      {/* Main Attribution Cards via ExpandableCard */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-[#164A34]">Main Reasons for Difference</h2>

        <ExpandableCard
          title="Sowing Date Shift (Nov 18 → Nov 02)"
          badge="+₹12,400 Profit"
          summaryContent={
            <p className="text-xs text-[#1E2924]">
              Shifting sowing date to Nov 02 captures peak soil moisture window and reduces terminal heat risk during grain filling.
            </p>
          }
          detailsContent={
            <div className="space-y-2 text-xs text-[#596A61]">
              <p>Soil Moisture Satellite Telemetry: 82% field capacity recorded on Nov 02.</p>
              <p>Aphid Risk Factor: Decreased by 64% by completing flowering prior to late-February heat waves.</p>
            </div>
          }
        />

        <ExpandableCard
          title="Micro-Drip Fertigation System"
          badge="+₹18,800 Profit"
          summaryContent={
            <p className="text-xs text-[#1E2924]">
              Replacing traditional flood irrigation with targeted drip fertigation reduces nitrogen fertilizer leaching and saves 1,200 m³ water.
            </p>
          }
          detailsContent={
            <div className="space-y-2 text-xs text-[#596A61]">
              <p>Water Efficiency Gain: From 45% (flood) to 92% (micro-drip).</p>
              <p>Fertilizer Runoff Reduction: 38% reduction in applied urea loss.</p>
            </div>
          }
        />

        <ExpandableCard
          title="Certified Seed Rate (HD-2967 Rust Resistant)"
          badge="+₹7,000 Profit"
          summaryContent={
            <p className="text-xs text-[#1E2924]">
              Upgrading to certified HD-2967 seed increases germination rate to 96% and guarantees resistance against yellow rust.
            </p>
          }
          detailsContent={
            <div className="space-y-2 text-xs text-[#596A61]">
              <p>Germination Rate: 96% certified vs 78% saved farm seed.</p>
              <p>Yield Resilience: Zero loss from yellow rust spore outbreaks.</p>
            </div>
          }
        />
      </div>
    </div>
  );
}
