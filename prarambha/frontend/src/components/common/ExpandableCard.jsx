import React, { useState } from "react";

/**
 * ExpandableCard — Implements Progressive Disclosure pattern.
 * Level 1: Immediate summary visible to farmer in < 5 seconds.
 * Level 2/3: Expandable detailed breakdown, technical audit telemetry, or model parameters.
 */
export default function ExpandableCard({
  title,
  subtitle,
  badge,
  actionButton,
  summaryContent,
  detailsContent,
  defaultExpanded = false,
  detailsLabel = "View details",
  hideDetailsLabel = "Hide details",
  className = "",
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      className={`bg-white rounded-2xl border border-[#D0DEC0] shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden ${className}`}
    >
      {/* Header & Level 1 Summary */}
      <div className="p-5 sm:p-6 space-y-4">
        {(title || subtitle || badge || actionButton) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBF3ED] pb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                {title && (
                  <h3 className="font-bold text-[#164A34] text-base sm:text-lg leading-tight">
                    {title}
                  </h3>
                )}
                {badge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF3ED] text-[#164A34] border border-[#D0DEC0]">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-[#596A61] leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {actionButton && <div className="shrink-0">{actionButton}</div>}
          </div>
        )}

        {/* Level 1 Summary View */}
        {summaryContent && <div>{summaryContent}</div>}

        {/* Expand / Collapse Toggle Button */}
        {detailsContent && (
          <div className="pt-2 flex justify-end border-t border-[#EBF3ED]/60">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164A34] hover:text-[#196C3E] bg-[#F5F8F5] hover:bg-[#EBF3ED] px-3 py-1.5 rounded-lg border border-[#D0DEC0]/60 transition-colors cursor-pointer"
            >
              <span>{expanded ? hideDetailsLabel : detailsLabel}</span>
              <span
                className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Level 2 & 3 Detailed Expandable Panel */}
      {detailsContent && expanded && (
        <div className="bg-[#FAF9F5] border-t border-[#D0DEC0]/60 p-5 sm:p-6 space-y-4 transition-all duration-200 animate-fadeIn">
          {detailsContent}
        </div>
      )}
    </div>
  );
}
