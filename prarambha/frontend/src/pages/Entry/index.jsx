import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";


/**
 * EntryPage — PRARAMBHA 2.0 KrishiMitra Home & Landing Page
 * Exact implementation matching the Stitch UI design references.
 */
export default function EntryPage({ onNavigate }) {
  const navigate = useNavigate();
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  const handleStartPlanning = () => {
    if (onNavigate) {
      onNavigate("farms");
    } else {
      navigate("/farms");
    }
  };

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById("how-it-works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F4] text-[#1E2924] flex flex-col font-sans transition-opacity duration-300 page-transition">
      {/* ── STITCH HERO BANNER (DARK FOREST GREEN WITH FARM PATTERN) ── */}
      <div className="stitch-hero-bg text-white relative overflow-hidden border-b border-[#164A34]">
        {/* Decorative farm landscape SVG overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3D8B5A_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* ── NAVBAR ── */}
        <header className="sticky top-0 z-50 bg-[#063D27]/90 backdrop-blur-md border-b border-[#164A34]/80 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 text-left cursor-pointer rounded-xl p-1 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0D4A2B] border border-[#3D8B5A] flex items-center justify-center font-black text-white text-xl shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[#A1F1B7]">psychiatry</span>
              </div>
              <div>
                <span className="font-extrabold tracking-tight text-white text-lg block leading-tight">
                  KrishiMitra
                </span>
                <span className="text-[10px] text-[#86C39C] font-semibold uppercase tracking-wider block">
                  Agri Decision Simulator
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-emerald-100/90">
              <a href="#how-it-works" className="hover:text-white transition-colors">
                {t("entry.ctaHow")}
              </a>
              <a href="#what-you-compare" className="hover:text-white transition-colors">
                {t("entry.compareTitle")}
              </a>
              <a href="#why-krishimitra" className="hover:text-white transition-colors">
                {t("entry.whyTitle")}
              </a>
            </nav>

            {/* Actions: Language Switcher & CTA */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#0D4A2B] border border-[#3D8B5A]/40 rounded-xl p-1 text-[11px] shadow-xs">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2.5 py-1 rounded-lg font-extrabold transition-all cursor-pointer ${
                      language === lang.code
                        ? "bg-[#3D8B5A] text-white shadow-sm scale-105"
                        : "text-emerald-200 hover:text-white hover:bg-[#164A34]/60"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleStartPlanning}
                className="px-4 py-2 bg-[#3D8B5A] hover:bg-[#2F7348] border border-[#86C39C]/40 text-white text-xs font-extrabold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
              >
                <span>Open App</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── HERO SECTION CONTENT ── */}
        <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#0D4A2B]/80 border border-[#3D8B5A] px-4 py-1.5 rounded-full text-xs font-bold text-emerald-200 shadow-xs">
                <span className="material-symbols-outlined text-[14px] text-emerald-400">auto_awesome</span>
                <span>{t("entry.badge")}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                {t("entry.headline1")} <br />
                <span className="text-[#86C39C] underline decoration-[#3D8B5A]/60 underline-offset-8">
                  {t("entry.headline2")}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                {t("entry.subheadline")}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleStartPlanning}
                  className="px-7 py-4 bg-[#3D8B5A] hover:bg-[#2F7348] text-white text-sm font-extrabold rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer touch-target active:scale-98"
                >
                  <span>{t("entry.ctaStart")}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <button
                  type="button"
                  onClick={handleScrollToHowItWorks}
                  className="px-7 py-4 bg-[#0D4A2B]/60 hover:bg-[#0D4A2B] text-white border border-[#3D8B5A] text-sm font-bold rounded-2xl shadow-xs hover:shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer touch-target"
                >
                  <span>{t("entry.ctaHow")}</span>
                  <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                </button>
              </div>

              {/* Quick Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-emerald-200/90 font-semibold border-t border-[#164A34]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#86C39C]">check_circle</span>
                  {t("entry.badgeDeterministic")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#86C39C]">check_circle</span>
                  {t("entry.badgeTrilingual")}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#86C39C]">check_circle</span>
                  {t("entry.badgeOffline")}
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Interactive Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-[#CDE0D2] p-6 shadow-2xl space-y-5 text-[#1E2924] relative">
                <div className="flex items-center justify-between border-b border-[#CDE0D2] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#0D4A2B] animate-pulse" />
                    <span className="text-xs font-bold text-[#1E2924] uppercase tracking-wider">
                      {t("entry.previewTitle")}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#0D4A2B] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full border border-[#CDE0D2]">
                    {t("entry.previewFarm")}
                  </span>
                </div>

                {/* Yield Banner */}
                <div className="bg-[#EAF3EC] p-4 rounded-2xl border border-[#CDE0D2] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
                      {t("entry.previewYieldTitle")}
                    </span>
                    <span className="text-3xl font-black text-[#0D4A2B] tabular-nums">
                      72–88 <span className="text-sm font-bold text-[#596A61]">qtl</span>
                    </span>
                  </div>
                  <span className="text-[10px] text-[#596A61] bg-white border border-[#CDE0D2] px-2.5 py-1 rounded-full font-semibold shadow-xs">
                    {t("entry.previewDisclaimer")}
                  </span>
                </div>

                {/* KPI Mini Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F4F7F4] rounded-xl border border-[#CDE0D2]/80">
                    <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
                      {t("entry.previewProfitTitle")}
                    </span>
                    <span className="text-xl font-extrabold text-[#0D4A2B] tabular-nums">
                      ₹1,34,800
                    </span>
                  </div>
                  <div className="p-3 bg-[#F4F7F4] rounded-xl border border-[#CDE0D2]/80">
                    <span className="text-[10px] font-bold text-[#596A61] uppercase tracking-wider block">
                      {t("entry.previewRiskTitle")}
                    </span>
                    <span className="text-xl font-extrabold text-[#1E2924] tabular-nums">
                      24 / 100 <span className="text-xs text-[#0D4A2B] font-bold">(Low)</span>
                    </span>
                  </div>
                </div>

                {/* Simulated Trajectory Sparkline */}
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#0D4A2B]">
                    <span>Seasonal Yield Curve</span>
                    <span className="text-[10px] text-[#596A61] block font-normal">Optimal Rabi Growth Window</span>
                  </div>
                  <div className="w-24 h-6 flex items-end gap-1">
                    <div className="w-full bg-[#3D8B5A] h-2 rounded-t" />
                    <div className="w-full bg-[#3D8B5A] h-4 rounded-t" />
                    <div className="w-full bg-[#0D4A2B] h-6 rounded-t" />
                    <div className="w-full bg-[#3D8B5A] h-5 rounded-t" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStartPlanning}
                  className="w-full py-3 bg-[#0D4A2B] hover:bg-[#164A34] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span>{t("entry.previewCta")}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── HOW IT WORKS SECTION (4 STEPS) ── */}
      <section id="how-it-works" className="py-16 bg-white border-b border-[#CDE0D2] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-[#0D4A2B] uppercase tracking-widest block">
              {t("entry.workflowSubtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E2924] tracking-tight">
              {t("entry.workflowTitle")}
            </h2>
            <p className="text-sm text-[#596A61]">
              {t("entry.workflowDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-6 space-y-3 relative hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md">
              <span className="text-3xl font-black text-[#0D4A2B]/30 block">01</span>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.step1Title")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.step1Desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-6 space-y-3 relative hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md">
              <span className="text-3xl font-black text-[#0D4A2B]/30 block">02</span>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.step2Title")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.step2Desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-6 space-y-3 relative hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md">
              <span className="text-3xl font-black text-[#0D4A2B]/30 block">03</span>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.step3Title")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.step3Desc")}
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F4F7F4] rounded-2xl border border-[#CDE0D2] p-6 space-y-3 relative hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs hover:shadow-md">
              <span className="text-3xl font-black text-[#0D4A2B]/30 block">04</span>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.step4Title")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.step4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN COMPARE ── */}
      <section id="what-you-compare" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold text-[#0D4A2B] uppercase tracking-widest block">
            {t("entry.compareSubtitle")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E2924] tracking-tight">
            {t("entry.compareTitle")}
          </h2>
          <p className="text-sm text-[#596A61]">
            {t("entry.compareDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#CDE0D2] space-y-2 hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <span className="material-symbols-outlined text-[#1E2924] text-2xl block">grain</span>
            <h4 className="text-sm font-extrabold text-[#1E2924]">{t("entry.metricYield")}</h4>
            <p className="text-xs text-[#596A61]">{t("entry.metricYieldDesc")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CDE0D2] space-y-2 hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <span className="material-symbols-outlined text-[#0D4A2B] text-2xl block">payments</span>
            <h4 className="text-sm font-extrabold text-[#0D4A2B]">{t("entry.metricProfit")}</h4>
            <p className="text-xs text-[#596A61]">{t("entry.metricProfitDesc")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CDE0D2] space-y-2 hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <span className="material-symbols-outlined text-[#4C9BB8] text-2xl block">water_voc</span>
            <h4 className="text-sm font-extrabold text-[#4C9BB8]">{t("entry.metricWater")}</h4>
            <p className="text-xs text-[#596A61]">{t("entry.metricWaterDesc")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CDE0D2] space-y-2 hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <span className="material-symbols-outlined text-[#D9902F] text-2xl block">shield</span>
            <h4 className="text-sm font-extrabold text-[#D9902F]">{t("entry.metricRisk")}</h4>
            <p className="text-xs text-[#596A61]">{t("entry.metricRiskDesc")}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#CDE0D2] space-y-2 hover:border-[#86C39C] hover:-translate-y-1 transition-all duration-200 shadow-xs">
            <span className="material-symbols-outlined text-[#1E2924] text-2xl block">analytics</span>
            <h4 className="text-sm font-extrabold text-[#1E2924]">{t("entry.metricRoi")}</h4>
            <p className="text-xs text-[#596A61]">{t("entry.metricRoiDesc")}</p>
          </div>
        </div>
      </section>

      {/* ── WHY KRISHIMITRA ── */}
      <section id="why-krishimitra" className="py-16 bg-[#EAF3EC] border-t border-[#CDE0D2] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-[#0D4A2B] uppercase tracking-widest block">
              {t("entry.whySubtitle")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1E2924] tracking-tight">
              {t("entry.whyTitle")}
            </h2>
            <p className="text-sm text-[#596A61]">
              {t("entry.whyDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#CDE0D2] space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EC] text-[#0D4A2B] flex items-center justify-center font-bold text-lg border border-[#CDE0D2]">
                <span className="material-symbols-outlined">science</span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.whyTransparentTitle")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.whyTransparentDesc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CDE0D2] space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EC] text-[#0D4A2B] flex items-center justify-center font-bold text-lg border border-[#CDE0D2]">
                <span className="material-symbols-outlined">tune</span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.whyDeterministicTitle")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.whyDeterministicDesc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CDE0D2] space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EC] text-[#0D4A2B] flex items-center justify-center font-bold text-lg border border-[#CDE0D2]">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.whyExplainableTitle")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.whyExplainableDesc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#CDE0D2] space-y-3 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EC] text-[#0D4A2B] flex items-center justify-center font-bold text-lg border border-[#CDE0D2]">
                <span className="material-symbols-outlined">water_voc</span>
              </div>
              <h3 className="text-base font-extrabold text-[#1E2924]">{t("entry.whyResourceTitle")}</h3>
              <p className="text-xs text-[#596A61] leading-relaxed">
                {t("entry.whyResourceDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA SECTION ── */}
      <section className="py-16 bg-[#063D27] text-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t("entry.finalCtaTitle")}
          </h2>
          <p className="text-sm text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            {t("entry.finalCtaDesc")}
          </p>
          <button
            type="button"
            onClick={handleStartPlanning}
            className="px-8 py-4 bg-[#3D8B5A] hover:bg-[#2F7348] border border-[#86C39C]/40 text-white text-sm font-extrabold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer touch-target"
          >
            <span>{t("entry.finalCtaButton")}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#032618] text-[#86C39C] text-xs py-6 px-4 border-t border-[#164A34]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-white">KrishiMitra — PRARAMBHA 2.0</span>
            <p className="text-[11px] text-[#596A61] mt-0.5">
              {t("app.disclaimer")}
            </p>
          </div>
          <div className="text-[11px] font-mono text-[#596A61]">
            Model Engine v2.0 • Trilingual Native
          </div>
        </div>
      </footer>
    </div>
  );
}
