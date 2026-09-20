import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import RecommendationsPage from "./RecommendationsPage";

/**
 * Recommendations Route Entry - Member 4
 * Wires route params (:farmId, :scenarioId) into RecommendationsPage.
 */
export default function RecommendationsRoute() {
  const { farmId, scenarioId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (page, params = {}) => {
    const fId = farmId || "farm-001";
    const scId = params.scenarioId || scenarioId || "sc-003";

    if (page === "comparison") {
      navigate(`/scenarios/${fId}/compare`);
    } else if (page === "history") {
      navigate(`/scenarios/${fId}/history`);
    } else if (page === "resources") {
      navigate(`/scenarios/${fId}/${scId}/resources`);
    } else if (page === "report") {
      navigate(`/scenarios/${fId}/${scId}/report`);
    } else if (page === "why") {
      navigate(`/scenarios/${fId}/${scId}/why`);
    }
  };

  return (
    <LanguageProvider>
      <RecommendationsPage
        scenarioId={scenarioId || "sc-003"}
        onNavigate={handleNavigate}
      />
    </LanguageProvider>
  );
}
