import React, { useState } from "react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import LaunchPage from "./pages/Launch/index.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ScenarioComparisonPage from "./pages/ScenarioComparison/ScenarioComparisonPage";
import WhyPage from "./pages/Why/WhyPage";
import RecommendationsPage from "./pages/Recommendations/RecommendationsPage";
import ResourceCheckPage from "./pages/ResourceCheck/ResourceCheckPage";
import AssumptionsPage from "./pages/Assumptions/AssumptionsPage";
import HistoryPage from "./pages/History/HistoryPage";
import ReportPage from "./pages/Report/ReportPage";

/**
 * Main Application Shell - Member 4 Integration
 * Connects all 8 decision-support modules with unified navigation,
 * state passing, and trilingual localization.
 */
function AppShell() {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  // Active page: "launch" | "dashboard" | "comparison" | "why" | "recommendations" | "resources" | "assumptions" | "history" | "report"
  const [currentPage, setCurrentPage] = useState("launch");

  // Cross-module parameter passing
  const [navParams, setNavParams] = useState({});

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Centralized navigation handler
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setNavParams(params);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Full-screen video-first launch page experience
  if (currentPage === "launch") {
    return <LaunchPage onNavigate={handleNavigate} />;
  }

  const navItems = [
    { id: "launch", label: "Video Launch", icon: "🎬" },
    { id: "dashboard", label: t("nav.dashboard") || "Dashboard", icon: "📊" },
    { id: "comparison", label: t("nav.comparison") || "Scenario Comparison", icon: "⚖️" },
    { id: "why", label: t("nav.why") || "Why Did It Change?", icon: "💡" },
    { id: "recommendations", label: t("nav.recommendations") || "Recommendations", icon: "🚨" },
    { id: "resources", label: t("nav.resources") || "Resource Readiness", icon: "💧" },
    { id: "assumptions", label: t("nav.assumptions") || "Model Assumptions", icon: "📜" },
    { id: "history", label: t("nav.history") || "Scenario History", icon: "🕒" },
    { id: "report", label: t("nav.report") || "Printable Report", icon: "📄" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Global Application Top Bar */}
      <nav
        aria-label="Main Navigation"
        className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md print:hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Brand Identity */}
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer text-left focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden rounded-lg p-1 -m-1"
              onClick={() => handleNavigate("comparison")}
              aria-label="KrishiMitra home - scenario comparison"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-lg shadow-sm">
                KM
              </div>
              <div>
                <span className="font-black tracking-tight text-white text-base block leading-tight">
                  KrishiMitra
                </span>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  Agri Decision Simulator
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden ${
                    currentPage === item.id
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Language Selector & Mobile Hamburger */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg p-1">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-hidden ${
                      language === lang.code
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                <span className="text-lg">{mobileMenuOpen ? "✕" : "☰"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-left ${
                  currentPage === item.id
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area: Page Router */}
      <main className="flex-1">
        {currentPage === "dashboard" && (
          <DashboardPage onNavigate={handleNavigate} />
        )}
        {currentPage === "comparison" && (
          <ScenarioComparisonPage
            initialSelectedIds={navParams.selectedIds}
            initialBaselineId={navParams.baselineId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "why" && (
          <WhyPage
            initialTargetId={navParams.targetScenarioId || navParams.scenarioId || "sc-002"}
            initialReferenceId={navParams.baselineId || "sc-001"}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "recommendations" && (
          <RecommendationsPage
            scenarioId={navParams.scenarioId || "sc-003"}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "resources" && (
          <ResourceCheckPage
            farmId={navParams.farmId || "farm-001"}
            scenarioId={navParams.scenarioId || "sc-001"}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === "assumptions" && (
          <AssumptionsPage onNavigate={handleNavigate} />
        )}
        {currentPage === "history" && (
          <HistoryPage onNavigate={handleNavigate} />
        )}
        {currentPage === "report" && (
          <ReportPage
            scenarioId={navParams.scenarioId || "sc-001"}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-300">KrishiMitra — PRARAMBHA 2.0</span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Deterministic Agricultural Scenario & Decision Simulator. Results are estimates, not guaranteed predictions.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            Model Engine: v2.0-deterministic • Trilingual Support
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}
