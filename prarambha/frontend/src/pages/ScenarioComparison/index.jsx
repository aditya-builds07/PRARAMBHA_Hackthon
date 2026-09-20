import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import ScenarioComparisonPage from "./ScenarioComparisonPage";

/**
 * Scenario Comparison Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full Scenario Comparison implementation.
 */
export default function ScenarioComparisonRoute() {
  const { farmId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (page, params = {}) => {
    const fId = farmId || "farm-001";
    if (page === "why") {
      navigate(`/scenarios/${fId}/${params.targetScenarioId || "sc-002"}/why`);
    } else if (page === "history") {
      navigate(`/scenarios/${fId}/history`);
    } else if (page === "report") {
      navigate(`/scenarios/${fId}/${params.scenarioId || "sc-002"}/report`);
    } else if (page === "recommendations") {
      navigate(`/scenarios/${fId}/${params.scenarioId || "sc-003"}/recommendations`);
    } else if (page === "resources") {
      navigate(`/scenarios/${fId}/${params.scenarioId || "sc-001"}/resources`);
    } else if (page === "assumptions") {
      navigate(`/scenarios/${fId}/${params.scenarioId || "sc-001"}/assumptions`);
    }
  };

  return (
    <LanguageProvider>
      <ScenarioComparisonPage onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}
