import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import ExpandableCard from "../../components/common/ExpandableCard";

export default function HistoryPage({ onNavigate = null }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [selectedSeason, setSelectedSeason] = useState("all");

  const historyRecords = [
    {
      id: "rec-2025-rabi",
      season: "rabi-2425",
      title: "Rabi 2024-25 • Drip Wheat Precision",
      crop: "Sonalika HD-2967 Wheat",
      acres: "8.5 Acres",
      status: "Active Sowing (Nov 02)",
      statusClass: "bg-[#EBF3ED] text-[#164A34] border-[#D0DEC0]",
      predictedProfit: "₹1,84,500",
      realizedProfit: "Pending Harvest",
      waterUsed: "3,450 m³",
      yieldRate: "21.2 Q / ac",
      fidelity: "96.2%",
      uid: "MH-HNG-2025-901",
    },
    {
      id: "rec-2025-kharif",
      season: "kharif-2025",
      title: "Kharif 2025 • Hybrid Bt Cotton & Tur",
      crop: "Bt Cotton + Tur Intercrop",
      acres: "8.5 Acres",
      status: "APMC Mandi Audited",
      statusClass: "bg-[#EBF3ED] text-[#164A34] border-[#D0DEC0]",
      predictedProfit: "₹1,62,000",
      realizedProfit: "₹1,58,400",
      waterUsed: "5,100 m³",
      yieldRate: "14.8 Q / ac",
      fidelity: "97.7%",
      uid: "MH-HNG-2025-412",
    },
    {
      id: "rec-2024-rabi",
      season: "rabi-2324",
      title: "Rabi 2023-24 • Desi Gram / Chickpea",
      crop: "Vijay Gram (Chickpea)",
      acres: "8.5 Acres",
      status: "PMFBY Settled",
      statusClass: "bg-[#FAF9F5] text-[#596A61] border-[#D9D6C7]",
      predictedProfit: "₹1,12,000",
      realizedProfit: "₹1,14,200",
      waterUsed: "2,800 m³",
      yieldRate: "9.4 Q / ac",
      fidelity: "98.0%",
      uid: "MH-HNG-2024-884",
    },
    {
      id: "rec-2024-kharif",
      season: "kharif-2024",
      title: "Kharif 2024 • Soybean Rainfed Baseline",
      crop: "JS-335 Soybean (Flood)",
      acres: "8.5 Acres",
      status: "Baseline Record",
      statusClass: "bg-[#FAF9F5] text-[#596A61] border-[#D9D6C7]",
      predictedProfit: "₹95,000",
      realizedProfit: "₹88,000",
      waterUsed: "4,650 m³",
      yieldRate: "8.2 Q / ac",
      fidelity: "92.6%",
      uid: "MH-HNG-2024-102",
    },
  ];

  const filteredRecords = selectedSeason === "all"
    ? historyRecords
    : historyRecords.filter((r) => r.season === selectedSeason);

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Level 1 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0DEC0] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#164A34] tracking-tight">
            Scenario History & Saved Plans
          </h1>
          <p className="text-xs text-[#596A61] font-medium mt-0.5">
            Historical farm performance records across 4 cropping cycles for Shivaji Patil Farm
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (onNavigate ? onNavigate("report") : navigate("/report"))}
            className="px-4 py-2 bg-[#164A34] hover:bg-[#196C3E] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">description</span>
            <span>Export Printable Report</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-[#164A34] uppercase">Filter Cycle:</span>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="bg-white border border-[#D0DEC0] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#1E2924] outline-none cursor-pointer"
        >
          <option value="all">All Available Cycles (2023 - 2025)</option>
          <option value="rabi-2425">Rabi 2024-25 (Wheat Precision • Active)</option>
          <option value="kharif-2025">Kharif 2025 (Cotton & Tur • Harvested)</option>
          <option value="rabi-2324">Rabi 2023-24 (Desi Gram • Audited)</option>
          <option value="kharif-2024">Kharif 2024 (Soybean • Baseline)</option>
        </select>
      </div>

      {/* History Records via ExpandableCard */}
      <div className="space-y-4">
        {filteredRecords.map((item) => (
          <ExpandableCard
            key={item.id}
            title={item.title}
            badge={item.status}
            actionButton={
              <button
                type="button"
                onClick={() => (onNavigate ? onNavigate("report") : navigate("/report"))}
                className="px-3.5 py-1.5 bg-[#EBF3ED] hover:bg-[#D0DEC0] text-[#164A34] text-xs font-bold rounded-xl border border-[#3D8B5A]/30 transition-colors cursor-pointer"
              >
                View Dossier
              </button>
            }
            summaryContent={
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">PREDICTED PROFIT</span>
                  <span className="font-bold text-[#164A34]">{item.predictedProfit}</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">REALIZED MANDI</span>
                  <span className="font-bold text-[#1E2924]">{item.realizedProfit}</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">WATER DRAW</span>
                  <span className="font-bold text-[#1E2924]">{item.waterUsed}</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">FIDELITY</span>
                  <span className="font-bold text-[#164A34]">{item.fidelity}</span>
                </div>
              </div>
            }
            detailsContent={
              <div className="space-y-3 text-xs text-[#596A61]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0DEC0]/60 pb-2">
                  <span className="font-mono text-emerald-800 font-bold">UID Hash: {item.uid}</span>
                  <span className="font-semibold text-[#1E2924]">Yield Rate: {item.yieldRate}</span>
                </div>
                <p>
                  Forensic agronomic accountability log verified against APMC mandi returns, soil moisture sensor logs, and seasonal rainfall records.
                </p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
}
