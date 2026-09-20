import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { MOCK_SCENARIOS } from "../../services/mockData";
import { getRecommendations } from "../../services/recommendations.service";
import ExpandableCard from "../../components/common/ExpandableCard";
import Skeleton from "../../components/common/Skeleton";

export default function RecommendationsPage({ scenarioId = "sc-003", onNavigate = null }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const allScenarios = MOCK_SCENARIOS || [];
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarioId);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    setIsLoading(true);
    getRecommendations(selectedScenarioId)
      .then((data) => {
        setRecommendations(data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [selectedScenarioId]);

  const activeScenario = allScenarios.find((s) => s.id === selectedScenarioId) || allScenarios[0];

  const items = [
    {
      id: "rec-1",
      category: "attention",
      title: "Shift Sowing Window to Nov 02",
      badge: "Needs Attention • Urgent",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      impact: "+₹12,400 Profit",
      shortWhy: "Moisture conditions are optimal; delay past Nov 15 increases aphid risk during terminal heat.",
      detailedWhy: "Satellite soil moisture readings indicate 82% field capacity on Nov 02. Advancing sowing by 14 days avoids severe heat stress at flowering stage.",
      actionText: "Adjust Sowing Date",
      icon: "event",
    },
    {
      id: "rec-2",
      category: "attention",
      title: "Seed Treatment with Trichoderma Viride",
      badge: "Needs Attention",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
      impact: "Protect Root System",
      shortWhy: "Prevents root rot in heavy Vertisol soils during early germination.",
      detailedWhy: "Bio-fungicide coating @ 6g/kg seed safeguards against seedling wilt and enhances root establishment under wet conditions.",
      actionText: "Add to Inventory",
      icon: "science",
    },
    {
      id: "rec-3",
      category: "improve",
      title: "Split Nitrogen Fertigation into 4 Doses",
      badge: "Can Improve",
      badgeClass: "bg-[#EBF3ED] text-[#164A34] border-[#D0DEC0]",
      impact: "+₹8,400 Yield Upside",
      shortWhy: "Reduces leaching and ensures steady nutrient intake through tillering & jointing.",
      detailedWhy: "Applying 25% basal, 35% tillering, 25% jointing, and 15% flowering via drip line increases nitrogen efficiency from 42% to 68%.",
      actionText: "View Fertigation Schedule",
      icon: "water_drop",
    },
    {
      id: "rec-4",
      category: "improve",
      title: "Intercrop Chickpea on Field Borders",
      badge: "Can Improve",
      badgeClass: "bg-[#EBF3ED] text-[#164A34] border-[#D0DEC0]",
      impact: "+₹4,000 Extra Income",
      shortWhy: "Natural atmospheric nitrogen fixation + secondary cash crop income.",
      detailedWhy: "Two border rows of HD-chickpea act as natural pest barrier while generating auxiliary grain yield without extra water allocation.",
      actionText: "Explore Intercrop",
      icon: "grass",
    },
    {
      id: "rec-5",
      category: "advice",
      title: "Lock PMFBY Crop Insurance by Nov 10",
      badge: "Helpful Advice",
      badgeClass: "bg-[#F5F3ED] text-[#596A61] border-[#D9D6C7]",
      impact: "Risk Coverage",
      shortWhy: "Subsidized premium @ ₹450/acre covers unseasonal hail or late dry spells.",
      detailedWhy: "Government subsidized crop insurance enrollment deadline is Nov 10 for Rabi wheat in Hingoli District.",
      actionText: "Apply Online",
      icon: "verified_user",
    },
  ];

  const filteredItems = activeFilter === "all"
    ? items
    : items.filter((i) => i.category === activeFilter);

  const currentUserName = typeof window !== "undefined"
    ? (localStorage.getItem("user_name") || "Your")
    : "Your";

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Level 1 Header — Simple 5-Second Scan */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0DEC0] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#164A34] tracking-tight">
            Recommendations
          </h1>
          <p className="text-xs text-[#596A61] mt-0.5 font-medium">
            5 recommendations for {currentUserName}'s Farm • 2 need attention, 2 can improve, 1 helpful advice
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EBF3ED] text-[#164A34] text-xs font-bold border border-[#D0DEC0]">
            Plan: {activeScenario?.name || "Drip Precision Wheat"}
          </span>
        </div>
      </div>

      {/* Filter Tabs Pill */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === "all"
              ? "bg-[#164A34] text-white shadow-sm"
              : "bg-white text-[#596A61] hover:bg-[#EBF3ED] border border-[#D0DEC0]"
          }`}
        >
          All Recommendations (5)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("attention")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === "attention"
              ? "bg-[#164A34] text-white shadow-sm"
              : "bg-white text-[#596A61] hover:bg-[#EBF3ED] border border-[#D0DEC0]"
          }`}
        >
          Needs Attention (2)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("improve")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === "improve"
              ? "bg-[#164A34] text-white shadow-sm"
              : "bg-white text-[#596A61] hover:bg-[#EBF3ED] border border-[#D0DEC0]"
          }`}
        >
          Can Improve (2)
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("advice")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeFilter === "advice"
              ? "bg-[#164A34] text-white shadow-sm"
              : "bg-white text-[#596A61] hover:bg-[#EBF3ED] border border-[#D0DEC0]"
          }`}
        >
          Helpful Advice (1)
        </button>
      </div>

      {/* Recommendations Cards using Progressive Disclosure (ExpandableCard) */}
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <ExpandableCard
              key={item.id}
              title={item.title}
              badge={item.badge}
              actionButton={
                <button
                  type="button"
                  className="px-4 py-2 bg-[#164A34] hover:bg-[#196C3E] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  {item.actionText}
                </button>
              }
              summaryContent={
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[#596A61] font-semibold block uppercase text-[10px]">What to do</span>
                    <span className="font-bold text-[#1E2924]">{item.title}</span>
                  </div>
                  <div>
                    <span className="text-[#596A61] font-semibold block uppercase text-[10px]">Why</span>
                    <span className="font-medium text-[#1E2924]">{item.shortWhy}</span>
                  </div>
                  <div>
                    <span className="text-[#596A61] font-semibold block uppercase text-[10px]">Impact</span>
                    <span className="font-bold text-[#164A34] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D0DEC0] inline-block">
                      {item.impact}
                    </span>
                  </div>
                </div>
              }
              detailsContent={
                <div className="space-y-3 text-xs text-[#1E2924]">
                  <div>
                    <h4 className="font-bold text-[#164A34] text-xs">Detailed Agronomic Explanation</h4>
                    <p className="text-[#596A61] leading-relaxed mt-1">{item.detailedWhy}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#D0DEC0] flex items-center justify-between">
                    <span className="font-semibold text-[#596A61]">Field Telemetry:</span>
                    <span className="font-mono text-emerald-800 font-bold">Moisture 82% • Sensor #MH-HNG-29</span>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
