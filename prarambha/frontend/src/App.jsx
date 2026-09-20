import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import EntryPage from "./pages/Entry/index";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import FarmSelectionPage from "./pages/FarmSelection/index";
import ScenarioBuilderPage from "./pages/ScenarioBuilder/index";
import ScenarioResultsPage from "./pages/ScenarioResults/index";
import ScenarioComparisonPage from "./pages/ScenarioComparison/ScenarioComparisonPage";
import WhyPage from "./pages/Why/WhyPage";
import RecommendationsPage from "./pages/Recommendations/RecommendationsPage";
import ResourceCheckPage from "./pages/ResourceCheck/ResourceCheckPage";
import AssumptionsPage from "./pages/Assumptions/AssumptionsPage";
import HistoryPage from "./pages/History/HistoryPage";
import ReportPage from "./pages/Report/ReportPage";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";

/**
 * KrishiMitra Master Shell — PRARAMBHA 2.0
 * Unifies URL-based routing (React Router), state parameter passing,
 * Landing Home page (/), and Desktop/Mobile AppShell with active state tracking.
 */
function AppContent() {
  const { t, language, setLanguage, supportedLanguages } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Parameter state passed across decision modules
  const [navParams, setNavParams] = useState({
    farmId: "farm-001",
    scenarioId: "sc-001",
    baselineId: "sc-001",
    targetScenarioId: "sc-002",
  });

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine active page ID directly from URL location
  const pathname = location.pathname;
  let currentPage = "home";
  if (pathname === "/" || pathname === "") {
    currentPage = "home";
  } else if (pathname === "/login") {
    currentPage = "login";
  } else if (pathname === "/signup") {
    currentPage = "signup";
  } else if (pathname === "/forgot-password") {
    currentPage = "forgot-password";
  } else if (pathname.startsWith("/dashboard")) {
    currentPage = "dashboard";
  } else if (pathname.startsWith("/farms")) {
    currentPage = "farms";
  } else if (pathname.includes("/results")) {
    currentPage = "results";
  } else if (pathname.includes("/compare")) {
    currentPage = "comparison";
  } else if (pathname.includes("/why")) {
    currentPage = "why";
  } else if (pathname.includes("/recommendations")) {
    currentPage = "recommendations";
  } else if (pathname.includes("/resources")) {
    currentPage = "resources";
  } else if (pathname.includes("/assumptions")) {
    currentPage = "assumptions";
  } else if (pathname.includes("/history")) {
    currentPage = "history";
  } else if (pathname.includes("/report")) {
    currentPage = "report";
  } else if (pathname.startsWith("/scenarios")) {
    currentPage = "builder";
  }

  // Centralized navigation handler
  const handleNavigate = (page, params = {}) => {
    setNavParams((prev) => ({ ...prev, ...params }));
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const farmId = params.farmId || navParams.farmId || "farm-001";
    const scenarioId = params.scenarioId || navParams.scenarioId || "sc-001";

    switch (page) {
      case "home":
        navigate("/");
        break;
      case "login":
        navigate("/login");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "forgot-password":
        navigate("/forgot-password");
        break;
      case "dashboard":
        navigate("/dashboard");
        break;
      case "farms":
        navigate("/farms");
        break;
      case "builder":
        navigate(`/scenarios/${farmId}`);
        break;
      case "results":
        navigate(`/scenarios/${farmId}/${scenarioId}/results`);
        break;
      case "comparison":
        navigate(`/scenarios/${farmId}/compare`);
        break;
      case "why":
        navigate(`/scenarios/${farmId}/${params.targetScenarioId || "sc-002"}/why`);
        break;
      case "recommendations":
        navigate(`/scenarios/${farmId}/${scenarioId}/recommendations`);
        break;
      case "resources":
        navigate(`/scenarios/${farmId}/${scenarioId}/resources`);
        break;
      case "assumptions":
        navigate(`/scenarios/${farmId}/${scenarioId}/assumptions`);
        break;
      case "history":
        navigate(`/scenarios/${farmId}/history`);
        break;
      case "report":
        navigate(`/scenarios/${farmId}/${scenarioId}/report`);
        break;
      default:
        navigate("/");
    }
  };

  // Centralized logout handler
  const handleLogout = () => {
    try {
      localStorage.removeItem("supabase_token");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_name");
      sessionStorage.removeItem("sb-access-token");
    } catch {}
    navigate("/");
  };

  // Check if session token exists
  const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("supabase_token") || localStorage.getItem("sb-access-token"));

  // Auth Guard: Redirect unauthenticated users visiting protected pages to /login
  const isPublicPage = ["home", "login", "signup", "forgot-password"].includes(currentPage);
  useEffect(() => {
    if (!isPublicPage && !hasToken) {
      navigate("/login");
    }
  }, [currentPage, hasToken, isPublicPage, navigate]);

  // Standalone page rendering for Auth & Landing
  if (currentPage === "home") {
    return <EntryPage onNavigate={handleNavigate} isAuthenticated={hasToken} onLogout={handleLogout} />;
  }
  if (currentPage === "login") {
    return <LoginPage onNavigate={handleNavigate} />;
  }
  if (currentPage === "signup") {
    return <SignupPage onNavigate={handleNavigate} />;
  }
  if (currentPage === "forgot-password") {
    return <ForgotPasswordPage onNavigate={handleNavigate} />;
  }

  // If visiting protected route without token, render login page as fallback
  if (!isPublicPage && !hasToken) {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  // Navigation Items for AppShell Sidebar
  const navItems = [
    { id: "home", label: "Home Landing", icon: "home" },
    { id: "dashboard", label: t("nav.dashboard") || "Dashboard", icon: "dashboard" },
    { id: "farms", label: t("nav.farms") || "My Farms", icon: "agriculture" },
    { id: "builder", label: "Scenario Builder", icon: "edit_note" },
    { id: "results", label: t("nav.results") || "Results", icon: "analytics" },
    { id: "comparison", label: t("nav.comparison") || "Scenario Compare", icon: "compare" },
    { id: "why", label: t("nav.why") || "Why Did It Change?", icon: "help_outline" },
    { id: "recommendations", label: t("nav.recommendations") || "Recommendations", icon: "lightbulb" },
    { id: "resources", label: t("nav.resources") || "Resource Check", icon: "water_drop" },
    { id: "assumptions", label: t("nav.assumptions") || "Model Assumptions", icon: "article" },
    { id: "history", label: t("nav.history") || "Scenario History", icon: "history" },
    { id: "report", label: t("nav.report") || "Printable Report", icon: "description" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col lg:flex-row font-sans text-[#1E2924] relative">
      {/* ── DESKTOP LEFT SIDEBAR (>= 1024px) ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#003320] text-white border-r border-[#164A34] shrink-0 sticky top-0 h-screen overflow-y-auto print:hidden shadow-xl z-30">
        {/* Brand Header */}
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="p-5 border-b border-[#164A34]/60 flex items-center gap-3 text-left hover:bg-[#164A34]/30 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#164A34] border border-[#3D8B5A] flex items-center justify-center font-black text-white text-lg shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[22px]">psychiatry</span>
          </div>
          <div>
            <h1 className="font-extrabold tracking-tight text-white text-base leading-tight">
              KrishiMitra
            </h1>
            <span className="text-[10px] text-[#86C39C] font-semibold uppercase tracking-wider block">
              PRARAMBHA 2.0
            </span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1" aria-label="Main Navigation">
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#86C39C]/70 uppercase tracking-widest">
            Decision Simulator
          </div>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[#164A34] text-white shadow-sm border border-[#3D8B5A]"
                    : "text-emerald-100/70 hover:text-white hover:bg-[#164A34]/50"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Settings & Language Switcher */}
        <div className="p-4 border-t border-[#164A34]/60 bg-[#002416]/50 space-y-3">
          <div className="flex items-center justify-between text-xs text-emerald-200/80">
            <span className="font-medium text-[11px]">Language:</span>
            <div className="flex items-center bg-[#164A34] border border-[#3D8B5A]/40 rounded-lg p-0.5">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    language === lang.code
                      ? "bg-[#3D8B5A] text-white shadow-xs"
                      : "text-emerald-200 hover:text-white"
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
          <div className="text-[10px] text-[#596A61] font-mono leading-tight">
            Engine v2.0-deterministic<br />
            100% Offline Simulation
          </div>
        </div>
      </aside>

      {/* ── MOBILE HEADER (< 1024px) ── */}
      <header className="lg:hidden bg-[#003320] text-white border-b border-[#164A34] sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-md print:hidden">
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2.5 text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-[#164A34] border border-[#3D8B5A] flex items-center justify-center text-sm font-bold text-white">
            <span className="material-symbols-outlined text-[18px]">psychiatry</span>
          </div>
          <div>
            <span className="font-extrabold text-white text-sm block leading-none">
              KrishiMitra
            </span>
            <span className="text-[9px] text-[#86C39C] uppercase font-semibold">
              Agri Simulator
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {/* Language pill */}
          <div className="flex items-center bg-[#164A34] rounded-lg p-0.5 text-[10px]">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`px-1.5 py-0.5 rounded font-bold ${
                  language === lang.code ? "bg-[#3D8B5A] text-white" : "text-emerald-200"
                }`}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#164A34] text-white hover:bg-[#3D8B5A] transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[20px]">{mobileMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#003320] border-b border-[#164A34] px-4 py-3 space-y-1 sticky top-[57px] z-40 shadow-xl print:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                currentPage === item.id
                  ? "bg-[#164A34] text-white border border-[#3D8B5A]"
                  : "text-emerald-100/80 hover:bg-[#164A34]/50"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left text-rose-300 hover:bg-rose-950/40 border border-rose-800/40 transition-colors mt-2"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto transition-all duration-200 ease-out">
          {currentPage === "dashboard" && (
            <DashboardPage onNavigate={handleNavigate} />
          )}
          {currentPage === "farms" && (
            <FarmSelectionPage onNavigate={handleNavigate} />
          )}
          {currentPage === "builder" && (
            <ScenarioBuilderPage
              farmId={navParams.farmId}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === "results" && (
            <ScenarioResultsPage
              farmId={navParams.farmId}
              scenarioId={navParams.scenarioId}
              onNavigate={handleNavigate}
            />
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
        <footer className="bg-white border-t border-[#D0DEC0] text-[#596A61] text-xs py-5 px-4 sm:px-6 lg:px-8 mt-auto print:hidden">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-[#164A34]">
                KrishiMitra — PRARAMBHA 2.0
              </span>
              <p className="text-[11px] text-[#596A61] mt-0.5">
                Transparent, deterministic agricultural decision simulator. Yield & profit values are model-estimated projections, not guarantees.
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#596A61] shrink-0">
              Model Engine v2.0 • Offline Native
            </div>
          </div>
        </footer>
      </div>

      {/* ── MOBILE BOTTOM NAVIGATION BAR (< 1024px) ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#003320] text-white border-t border-[#164A34] z-40 px-2 py-1.5 flex items-center justify-around shadow-lg print:hidden">
        <button
          type="button"
          onClick={() => handleNavigate("home")}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            currentPage === "home" ? "text-white" : "text-emerald-200/70"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate("farms")}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            currentPage === "farms" ? "text-white" : "text-emerald-200/70"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">agriculture</span>
          <span>Farms</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate("builder")}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            currentPage === "builder" ? "text-white" : "text-emerald-200/70"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">edit_note</span>
          <span>Plans</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigate("comparison")}
          className={`flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold ${
            currentPage === "comparison" ? "text-white" : "text-emerald-200/70"
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">compare</span>
          <span>Compare</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center gap-0.5 p-1 text-[10px] font-bold text-emerald-200/70"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
          <span>More</span>
        </button>
      </nav>

      {/* ── FLOATING ENGINE STATUS ASSISTANT ── */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 bg-[#164A34] text-white border border-[#3D8B5A] px-3 py-1.5 rounded-full shadow-lg text-[11px] font-bold print:hidden">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Engine v2.0 • Deterministic</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
