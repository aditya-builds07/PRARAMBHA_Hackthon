import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import ResourceCheckPage from "./ResourceCheckPage";

/**
 * Resource Check Route Entry - Member 4
 * Wires route params (:farmId, :scenarioId) into ResourceCheckPage.
 */
export default function ResourceCheckRoute() {
  const { farmId, scenarioId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (page, params = {}) => {
    const fId = farmId || "farm-001";
    const scId = params.scenarioId || scenarioId || "sc-001";

    if (page === "comparison") {
      navigate(`/scenarios/${fId}/compare`);
    } else if (page === "history") {
      navigate(`/scenarios/${fId}/history`);
    } else if (page === "recommendations") {
      navigate(`/scenarios/${fId}/${scId}/recommendations`);
    } else if (page === "report") {
      navigate(`/scenarios/${fId}/${scId}/report`);
    } else if (page === "why") {
      navigate(`/scenarios/${fId}/${scId}/why`);
    }
  };

  return (
    <LanguageProvider>
      <ResourceCheckPage
        farmId={farmId || "farm-001"}
        scenarioId={scenarioId || "sc-001"}
        onNavigate={handleNavigate}
      />
    </LanguageProvider>
  );
}
