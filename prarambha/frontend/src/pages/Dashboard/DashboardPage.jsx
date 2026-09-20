import React, { useState, useEffect } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getScenarioHistory } from "../../services/history.service";
import { computeDashboardKpis } from "../../components/dashboard/kpiCalculator";
import { formatCurrency } from "../../services/comparison.service";


/**
 * DashboardPage — PRARAMBHA 2.0 Visual Restoration
 * Exact implementation matching the Stitch Executive Dashboard UI reference (Image 2).
 */
export default function DashboardPage({ onNavigate = null }) {
  const { t } = useLanguage();

  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = () => {
    setIsLoading(true);
    setError(null);

    getScenarioHistory()
      .then((data) => {
        setScenarios(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load dashboard metrics.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const kpis = computeDashboardKpis(scenarios);

  // Dynamic logged in / registered farmer details
  const currentUserName = typeof window !== "undefined"
    ? (localStorage.getItem("user_name") || localStorage.getItem("farmer_id") || "Farmer")
    : "Farmer";
  const currentFarmerId = typeof window !== "undefined"
    ? (localStorage.getItem("farmer_id") || localStorage.getItem("user_id") || "MH-PUN-042")
    : "MH-PUN-042";
  const currentDistrict = typeof window !== "undefined"
    ? (localStorage.getItem("farmer_district") || "Sangli")
    : "Sangli";
  const currentLand = typeof window !== "undefined"
    ? (localStorage.getItem("farmer_land_acres") || "5.0")
    : "5.0";
  const firstName = currentUserName.split(" ")[0] || currentUserName;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-6 page-transition">
      {/* ── STITCH EXECUTIVE HEADER BANNER ── */}
      <div className="bg-[#063D27] text-white p-6 rounded-3xl border border-[#164A34] shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3D8B5A_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#86C39C] uppercase tracking-wider mb-1">
            <span>{currentUserName}'s Farm ({currentFarmerId})</span> • <span>{currentLand} Acres</span> • <span>Rabi 2026-27</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {getGreeting()}, {firstName}
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#D9902F]">wb_sunny</span>
            <span>{currentDistrict} Region • Weather: 28°C • Moderate Humidity • Optimal Sowing Window</span>
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("builder")}
              className="px-5 py-3 rounded-2xl bg-[#3D8B5A] hover:bg-[#2F7348] text-white text-xs font-extrabold transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer touch-target"
            >
              <span className="material-symbols-outlined text-[18px]">psychiatry</span>
              <span>+ Create New Plan</span>
            </button>
          )}

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("comparison")}
              className="px-4 py-3 rounded-2xl border border-[#3D8B5A] bg-[#0D4A2B] hover:bg-[#164A34] text-xs font-bold text-white transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 touch-target"
            >
              <span className="material-symbols-outlined text-[18px]">balance</span>
              <span>Compare Plans</span>
            </button>
          )}
        </div>
      </div>

      {/* ── 4 TOP KPI CARDS (MATCHING STITCH IMAGE 2) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Est. Net Profit */}
        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs hover:border-[#86C39C] transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#596A61]">
              Est. Net Profit
            </span>
            <span className="w-8 h-8 rounded-xl bg-[#EAF3EC] text-[#0D4A2B] flex items-center justify-center font-bold text-xs border border-[#CDE0D2]">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </span>
          </div>
          <div>
            <span className="text-3xl font-black text-[#0D4A2B] tabular-nums block">
              ₹1,84,500
            </span>
            <span className="text-[11px] font-bold text-[#3D8B5A] bg-[#EAF3EC] px-2 py-0.5 rounded-full inline-block mt-1">
              +₹42,000 vs Baseline
            </span>
          </div>
        </div>

        {/* KPI 2: Est. Yield */}
        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs hover:border-[#86C39C] transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#596A61]">
              Est. Total Yield
            </span>
            <span className="w-8 h-8 rounded-xl bg-[#EAF3EC] text-[#0D4A2B] flex items-center justify-center font-bold text-xs border border-[#CDE0D2]">
              <span className="material-symbols-outlined text-[18px]">grain</span>
            </span>
          </div>
          <div>
            <span className="text-3xl font-black text-[#1E2924] tabular-nums block">
              6,200 <span className="text-sm font-semibold text-[#596A61]">kg</span>
            </span>
            <span className="text-[11px] font-bold text-[#3D8B5A] bg-[#EAF3EC] px-2 py-0.5 rounded-full inline-block mt-1">
              +850 kg vs Baseline
            </span>
          </div>
        </div>

        {/* KPI 3: Soil Health */}
        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs hover:border-[#86C39C] transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#596A61]">
              Soil Health & Moisture
            </span>
            <span className="w-8 h-8 rounded-xl bg-[#EAF3EC] text-[#4C9BB8] flex items-center justify-center font-bold text-xs border border-[#CDE0D2]">
              <span className="material-symbols-outlined text-[18px]">water_ph</span>
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-[#1E2924] block">
              Optimal N-P-K
            </span>
            <span className="text-[11px] text-[#596A61] block mt-1">
              In-range Moisture (72%) & Soil Sensor Data
            </span>
          </div>
        </div>

        {/* KPI 4: Risk Index */}
        <div className="bg-white p-5 rounded-3xl border border-[#CDE0D2] shadow-xs hover:border-[#86C39C] transition-all space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#596A61]">
              Risk Assessment
            </span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0D4A2B] flex items-center justify-center font-bold text-xs border border-emerald-200">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-[#1E2924] tabular-nums">
                24
              </span>
              <span className="text-xs font-bold text-[#596A61]">/ 100</span>
            </div>
            <span className="text-[11px] font-bold text-[#0D4A2B] bg-emerald-100/80 px-2.5 py-0.5 rounded-full inline-block mt-1 border border-emerald-300">
              Low Risk
            </span>
          </div>
        </div>
      </div>

      {/* ── RECOMMENDATION ADVISORY CALLOUT BANNER ── */}
      <div className="bg-[#EAF3EC] p-5 rounded-3xl border border-[#CDE0D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0D4A2B] text-white flex items-center justify-center font-bold text-lg shrink-0">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#0D4A2B] uppercase tracking-wider block">
              RECOMMENDED OPTIMIZATION ADVISORY
            </span>
            <h4 className="text-sm font-extrabold text-[#1E2924] mt-0.5">
              Switch to Drip Irrigation on Plot A1 (+₹42,000 Profit Impact)
            </h4>
            <p className="text-xs text-[#596A61] mt-0.5">
              Reduces water consumption by 35% and maintains optimal soil moisture during Rabi heat spikes.
            </p>
          </div>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate("recommendations")}
            className="px-4 py-2.5 bg-[#0D4A2B] hover:bg-[#164A34] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>View Recommendations</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        )}
      </div>

      {/* ── CHARTS SECTION (2 COLUMNS) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Soil Moisture & Groundwater */}
        <div className="bg-white p-6 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#1E2924]">
                Soil Moisture & Ground Water Availability
              </h3>
              <span className="text-[11px] text-[#596A61]">Plot A1 • 30-Day Sensor Trend</span>
            </div>
            <span className="text-xs font-bold text-[#0D4A2B] bg-[#EAF3EC] px-2.5 py-1 rounded-full border border-[#CDE0D2]">
              Optimal
            </span>
          </div>

          {/* HTML/CSS Moisture Chart Graphic */}
          <div className="h-44 w-full bg-emerald-50/40 rounded-2xl border border-emerald-100 p-4 relative flex items-end justify-between gap-2">
            <div className="w-1/4 h-2/5 bg-gradient-to-t from-[#3D8B5A]/40 to-[#0D4A2B] rounded-t-lg" title="1 Oct: 40% Moisture" />
            <div className="w-1/4 h-3/5 bg-gradient-to-t from-[#3D8B5A]/50 to-[#0D4A2B] rounded-t-lg" title="15 Oct: 60% Moisture" />
            <div className="w-1/4 h-4/5 bg-gradient-to-t from-[#3D8B5A]/60 to-[#0D4A2B] rounded-t-lg" title="1 Nov: 80% Moisture" />
            <div className="w-1/4 h-full bg-gradient-to-t from-[#3D8B5A]/70 to-[#0D4A2B] rounded-t-lg" title="15 Nov: 95% Moisture" />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-[#596A61]">
            <span>1 Oct (Sowing)</span>
            <span>15 Oct (Germination)</span>
            <span>1 Nov (Irrigation)</span>
            <span>15 Nov (Vegetative)</span>
          </div>
        </div>

        {/* Chart 2: Monthly Water Consumption vs Quota */}
        <div className="bg-white p-6 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#1E2924]">
                Monthly Water Consumption vs Quota
              </h3>
              <span className="text-[11px] text-[#596A61]">Drawn m³ vs Seasonal Quota</span>
            </div>
            <span className="text-xs font-bold text-[#4C9BB8] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
              3,000 m³ Reserve
            </span>
          </div>

          {/* Bar Chart Bars */}
          <div className="h-44 w-full bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-4 flex items-end justify-between gap-4">
            <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full bg-[#4C9BB8] rounded-t-lg h-2/3" />
              <span className="text-[10px] font-bold text-[#596A61]">Oct</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full bg-[#3D8B5A] rounded-t-lg h-3/4" />
              <span className="text-[10px] font-bold text-[#596A61]">Nov</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full bg-[#0D4A2B] rounded-t-lg h-5/6" />
              <span className="text-[10px] font-bold text-[#596A61]">Dec</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full bg-[#3D8B5A] rounded-t-lg h-1/2" />
              <span className="text-[10px] font-bold text-[#596A61]">Jan</span>
            </div>
          </div>
          <div className="flex items-center justify-around text-[11px] font-semibold text-[#596A61]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-[#4C9BB8]" /> Drawn Water
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-[#0D4A2B]" /> Target Quota
            </span>
          </div>
        </div>
      </div>

      {/* ── MIDDLE TRAJECTORY CURVE CHART ── */}
      <div className="bg-white p-6 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
          <div>
            <h3 className="text-base font-black text-[#1E2924]">
              Yield & Net Profit Trajectory Projection
            </h3>
            <span className="text-xs text-[#596A61]">
              Comparative projection between Baseline (Flood) and Recommended Plan (Drip)
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-[#0D4A2B]">
              <span className="w-3 h-3 rounded-full bg-[#0D4A2B]" /> Recommended Drip
            </span>
            <span className="flex items-center gap-1.5 text-[#596A61]">
              <span className="w-3 h-3 rounded-full bg-slate-300" /> Baseline Flood
            </span>
          </div>
        </div>

        <div className="h-44 w-full bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-4 flex flex-col justify-around gap-2">
          <div>
            <div className="flex justify-between text-xs font-bold text-[#0D4A2B] mb-1">
              <span>Recommended Plan (Drip Irrigation)</span>
              <span>21.2 Q / ac (₹1,84,500)</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div className="bg-[#0D4A2B] h-full rounded-full w-[90%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Baseline Practice (Traditional Flood)</span>
              <span>19.1 Q / ac (₹1,46,300)</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div className="bg-slate-400 h-full rounded-full w-[70%]" />
            </div>
          </div>
        </div>

        {/* Milestone Stepper */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-[#EAF3EC] rounded-xl border border-[#CDE0D2]">
            <span className="text-[10px] font-bold text-[#0D4A2B] uppercase tracking-wider block">
              STAGE 01
            </span>
            <span className="text-xs font-extrabold text-[#1E2924] block">Soil Prep & Sowing</span>
            <span className="text-[11px] text-[#596A61]">15 Oct • Complete</span>
          </div>

          <div className="p-3 bg-[#EAF3EC] rounded-xl border border-[#CDE0D2]">
            <span className="text-[10px] font-bold text-[#0D4A2B] uppercase tracking-wider block">
              STAGE 02
            </span>
            <span className="text-xs font-extrabold text-[#1E2924] block">Germination & Drip</span>
            <span className="text-[11px] text-[#596A61]">1 Nov • Active</span>
          </div>

          <div className="p-3 bg-[#F4F7F4] rounded-xl border border-[#CDE0D2]">
            <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
              STAGE 03
            </span>
            <span className="text-xs font-extrabold text-[#1E2924] block">Flowering & Grain</span>
            <span className="text-[11px] text-[#596A61]">15 Jan • Upcoming</span>
          </div>

          <div className="p-3 bg-[#F4F7F4] rounded-xl border border-[#CDE0D2]">
            <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
              STAGE 04
            </span>
            <span className="text-xs font-extrabold text-[#1E2924] block">Harvest & Sales</span>
            <span className="text-[11px] text-[#596A61]">1 Mar • Projected</span>
          </div>
        </div>
      </div>

      {/* ── ACTIVE FARMS & PLANS SECTION ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
            <h3 className="text-base font-extrabold text-[#1E2924]">Desai Farm (Plot A1)</h3>
            <span className="text-xs font-bold text-[#0D4A2B] bg-[#EAF3EC] px-2.5 py-1 rounded-full border border-[#CDE0D2]">
              Active Profile
            </span>
          </div>
          <div className="space-y-2 text-xs text-[#596A61]">
            <div className="flex justify-between">
              <span>Location:</span> <strong className="text-[#1E2924]">Sangli, Maharashtra</strong>
            </div>
            <div className="flex justify-between">
              <span>Total Area:</span> <strong className="text-[#1E2924]">5.0 Acres</strong>
            </div>
            <div className="flex justify-between">
              <span>Water Source:</span> <strong className="text-[#1E2924]">Borewell + Pond (3,000 m³)</strong>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#CDE0D2] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
            <h3 className="text-base font-extrabold text-[#1E2924]">Farming Plans Evaluated</h3>
            <span className="text-xs font-bold text-[#0D4A2B]">2 Active Strategies</span>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-[#F4F7F4] rounded-xl border border-[#CDE0D2] flex justify-between items-center text-xs">
              <div>
                <strong className="text-[#1E2924] block">Plan A: Baseline (Flood)</strong>
                <span className="text-[#596A61]">Est. Profit: ₹1,42,500</span>
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                Baseline
              </span>
            </div>
            <div className="p-3 bg-[#EAF3EC] rounded-xl border border-[#CDE0D2] flex justify-between items-center text-xs">
              <div>
                <strong className="text-[#0D4A2B] block">Plan B: Recommended Drip</strong>
                <span className="text-[#596A61]">Est. Profit: ₹1,84,500</span>
              </div>
              <span className="text-[10px] font-bold text-[#0D4A2B] bg-[#86C39C]/30 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
