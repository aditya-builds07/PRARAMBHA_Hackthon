import React from "react";

/**
 * Skeleton components matching KrishiMitra design layout for API loading states.
 * Uses smooth neutral pulse shimmer.
 */
export function SkeletonMetric() {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#D0DEC0] space-y-2 animate-pulse">
      <div className="h-3 w-1/2 bg-[#EAE8DF] rounded" />
      <div className="h-6 w-3/4 bg-[#D9D6C7] rounded" />
      <div className="h-2 w-1/3 bg-[#EAE8DF] rounded" />
    </div>
  );
}

export function SkeletonCard({ height = "h-40" }) {
  return (
    <div className={`bg-white rounded-2xl p-6 border border-[#D0DEC0] space-y-4 animate-pulse ${height}`}>
      <div className="flex justify-between items-center">
        <div className="h-4 w-1/3 bg-[#D9D6C7] rounded" />
        <div className="h-6 w-16 bg-[#EAE8DF] rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#EAE8DF] rounded" />
        <div className="h-3 w-4/5 bg-[#EAE8DF] rounded" />
      </div>
      <div className="h-8 w-full bg-[#D9D6C7] rounded-xl" />
    </div>
  );
}

export function SkeletonTable({ rows = 4 }) {
  return (
    <div className="bg-white rounded-2xl border border-[#D0DEC0] overflow-hidden p-4 space-y-3 animate-pulse">
      <div className="h-8 w-full bg-[#EAE8DF] rounded-lg" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 w-full bg-[#FAF9F5] border border-[#EBF3ED] rounded-lg flex items-center px-4 justify-between">
          <div className="h-3 w-1/4 bg-[#D9D6C7] rounded" />
          <div className="h-3 w-1/6 bg-[#EAE8DF] rounded" />
          <div className="h-3 w-1/6 bg-[#EAE8DF] rounded" />
          <div className="h-6 w-20 bg-[#D9D6C7] rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default function Skeleton({ type = "card", ...props }) {
  if (type === "metric") return <SkeletonMetric {...props} />;
  if (type === "table") return <SkeletonTable {...props} />;
  return <SkeletonCard {...props} />;
}
