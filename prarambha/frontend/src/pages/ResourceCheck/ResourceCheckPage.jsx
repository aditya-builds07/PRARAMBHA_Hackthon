import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { getResourceReadiness } from "../../services/resources.service";
import ExpandableCard from "../../components/common/ExpandableCard";
import Skeleton from "../../components/common/Skeleton";

export default function ResourceCheckPage({
  farmId = "farm-001",
  scenarioId = "sc-001",
  onNavigate = null,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [readinessData, setReadinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPickedUp, setIsPickedUp] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getResourceReadiness(farmId, scenarioId)
      .then((data) => {
        setReadinessData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [farmId, scenarioId]);

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12">
      {/* Level 1 Simple Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0DEC0] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#164A34] tracking-tight">
            Resource Readiness
          </h1>
          <p className="text-xs text-[#596A61] font-medium mt-0.5">
            Shivaji Patil Farm (8.5 Acres) • Target Sowing: Nov 02
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPickedUp(!isPickedUp)}
            className="px-3.5 py-1.5 rounded-xl bg-[#164A34] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            {isPickedUp ? "Mark Seed as Pending" : "Mark Seed as Picked Up"}
          </button>
        </div>
      </div>

      {/* Level 1 Hero Status Overview */}
      <div className="bg-white rounded-2xl p-6 border border-[#D0DEC0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#164A34] text-white flex items-center justify-center text-2xl font-black shadow-md">
            84
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#164A34]">READY TO SOW</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3ED] text-[#164A34] border border-[#D0DEC0]">
                84 / 100 Readiness
              </span>
            </div>
            <p className="text-xs text-[#596A61] mt-0.5">
              Water: Ready • Budget: Ready • Seed: {isPickedUp ? "Ready" : "Pending Pickup"} • Equipment: Ready
            </p>
          </div>
        </div>
      </div>

      {/* Urgent Action Card if pending */}
      {!isPickedUp && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-rose-600 text-2xl shrink-0">notification_important</span>
            <div>
              <h3 className="font-bold text-rose-900 text-sm">1 Action Required Before Nov 02 Sowing</h3>
              <p className="text-xs text-rose-800 mt-0.5">
                Pick up remaining 160 kg HD-2967 certified wheat seed reserved at Hingoli Krishi Kendra.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPickedUp(true)}
            className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer shrink-0"
          >
            Mark Picked Up
          </button>
        </div>
      )}

      {/* Progressive Disclosure Itemized Cards */}
      {isLoading ? (
        <Skeleton type="card" />
      ) : (
        <div className="space-y-4">
          <ExpandableCard
            title="Working Capital & Budget"
            badge="₹20,000 Surplus"
            summaryContent={
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">REQUIRED</span>
                  <span className="font-bold text-[#1E2924]">₹85,000</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">AVAILABLE</span>
                  <span className="font-bold text-[#164A34]">₹1,05,000</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">STATUS</span>
                  <span className="font-bold text-[#164A34] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D0DEC0] inline-block">
                    Fully Funded
                  </span>
                </div>
              </div>
            }
            detailsContent={
              <div className="space-y-2 text-xs text-[#596A61]">
                <p>KCC Bank Credit Limit: ₹75,000 • Cash Buffer: ₹30,000</p>
                <p>Allocated Seed Purchase: ₹12,000 • Fertilizer Budget: ₹24,000 • Drip Lines: ₹18,000</p>
              </div>
            }
          />

          <ExpandableCard
            title="Irrigation Water Reserves"
            badge="2,750 m³ Buffer"
            summaryContent={
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">REQUIRED</span>
                  <span className="font-bold text-[#1E2924]">3,450 m³</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">CAPACITY</span>
                  <span className="font-bold text-[#164A34]">6,200 m³</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">STATUS</span>
                  <span className="font-bold text-[#164A34] bg-[#EBF3ED] px-2 py-0.5 rounded border border-[#D0DEC0] inline-block">
                    Safe Water Buffer
                  </span>
                </div>
              </div>
            }
            detailsContent={
              <div className="space-y-2 text-xs text-[#596A61]">
                <p>Source: Farm Pond (4,000 m³) + Canal Allocation (2,200 m³)</p>
                <p>Estimated Evaporation Losses: 8% • Efficiency: Drip 92%</p>
              </div>
            }
          />

          <ExpandableCard
            title="Certified Seed Inventory (HD-2967)"
            badge={isPickedUp ? "Fully Ready" : "160 kg Pending"}
            summaryContent={
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">REQUIRED</span>
                  <span className="font-bold text-[#1E2924]">340 kg</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">IN ON-FARM STORE</span>
                  <span className="font-bold text-[#1E2924]">{isPickedUp ? "340 kg" : "180 kg"}</span>
                </div>
                <div>
                  <span className="text-[#596A61] block text-[10px] font-semibold">STATUS</span>
                  <span className={`font-bold px-2 py-0.5 rounded border inline-block ${isPickedUp ? "bg-[#EBF3ED] text-[#164A34] border-[#D0DEC0]" : "bg-rose-50 text-rose-700 border-rose-200"}`}>
                    {isPickedUp ? "100% On-Farm" : "160 kg Dealer Pickup"}
                  </span>
                </div>
              </div>
            }
            detailsContent={
              <div className="space-y-2 text-xs text-[#596A61]">
                <p>Dealer Order #HKK-8821 • Hingoli Krishi Kendra • Contact: Anand Patil (+91 98221 44520)</p>
                <p>Disbursement Balance: ₹7,200</p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
