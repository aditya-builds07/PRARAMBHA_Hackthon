import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./components/common/AppLayout.jsx"

// --- Member 3 pages (owned) ---
import EntryPage          from "./pages/Entry/index.jsx"
import FarmSelectionPage  from "./pages/FarmSelection/index.jsx"
import ScenarioBuilderPage from "./pages/ScenarioBuilder/index.jsx"
import ScenarioResultsPage from "./pages/ScenarioResults/index.jsx"

// --- Member 4 pages ---
import DashboardPage       from "./pages/Dashboard/index.jsx"
import ComparisonStub     from "./pages/ScenarioComparison/index.jsx"
import WhyStub            from "./pages/Why/index.jsx"
import RecommendationsStub from "./pages/Recommendations/index.jsx"
import ResourceCheckStub  from "./pages/ResourceCheck/index.jsx"
import AssumptionsStub    from "./pages/Assumptions/index.jsx"
import HistoryStub        from "./pages/History/index.jsx"
import ReportStub         from "./pages/Report/index.jsx"

export const ROUTES = {
  ENTRY:        "/",
  FARMS:        "/farms",
  BUILDER:      "/scenarios/:farmId",
  RESULTS:      "/scenarios/:farmId/:scenarioId/results",
  DASHBOARD:    "/dashboard",
  COMPARISON:   "/scenarios/:farmId/compare",
  WHY:          "/scenarios/:farmId/:scenarioId/why",
  RECOMMENDATIONS: "/scenarios/:farmId/:scenarioId/recommendations",
  RESOURCE_CHECK:  "/scenarios/:farmId/:scenarioId/resources",
  ASSUMPTIONS:  "/scenarios/:farmId/:scenarioId/assumptions",
  HISTORY:      "/scenarios/:farmId/history",
  REPORT:       "/scenarios/:farmId/:scenarioId/report",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true,              element: <EntryPage /> },
      { path: "farms",            element: <FarmSelectionPage /> },
      { path: "scenarios/:farmId",                          element: <ScenarioBuilderPage /> },
      { path: "scenarios/:farmId/:scenarioId/results",      element: <ScenarioResultsPage /> },
      // Member 4 routes
      { path: "dashboard",                                  element: <DashboardPage /> },
      { path: "scenarios/:farmId/compare",                  element: <ComparisonStub /> },
      { path: "scenarios/:farmId/:scenarioId/why",          element: <WhyStub /> },
      { path: "scenarios/:farmId/:scenarioId/recommendations", element: <RecommendationsStub /> },
      { path: "scenarios/:farmId/:scenarioId/resources",    element: <ResourceCheckStub /> },
      { path: "scenarios/:farmId/:scenarioId/assumptions",  element: <AssumptionsStub /> },
      { path: "scenarios/:farmId/history",                  element: <HistoryStub /> },
      { path: "scenarios/:farmId/:scenarioId/report",       element: <ReportStub /> },
    ],
  },
])
