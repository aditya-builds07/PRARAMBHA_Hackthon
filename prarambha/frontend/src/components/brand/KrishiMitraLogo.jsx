import React from "react";

/**
 * KrishiMitra Logo Component
 * Non-SVG HTML/CSS implementation matching Stitch design typography and colors.
 */
export default function KrishiMitraLogo({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="w-10 h-10 rounded-[14px] bg-[#164A34] flex items-center justify-center shrink-0 shadow-xs">
        <span className="material-symbols-outlined text-[#A1F1B7] text-[24px]">
          psychiatry
        </span>
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-[20px] leading-none tracking-tight text-[#164A34]">
          Krishi<span className="text-[#3D8B5A]">Mitra</span>
        </div>
        <div className="font-semibold text-[9px] uppercase tracking-widest text-[#596A61] mt-0.5">
          PLAN BEFORE YOU PLANT
        </div>
      </div>
    </div>
  );
}
