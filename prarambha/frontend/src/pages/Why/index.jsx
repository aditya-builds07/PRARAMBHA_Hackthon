import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import WhyPage from "./WhyPage";

/**
 * Why / Factor Attribution Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full Why Panel implementation.
 */
export default function WhyRoute() {
  const { farmId, scenarioId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    const fId = farmId || "farm-001";
    if (page === "comparison") {
      navigate(`/scenarios/${fId}/compare`);
    } else if (page === "history") {
      navigate(`/scenarios/${fId}/history`);
    } else if (page === "report") {
      navigate(`/scenarios/${fId}/${scenarioId || "sc-002"}/report`);
    }
  };

  return (
    <LanguageProvider>
      <WhyPage
        initialTargetId={scenarioId || "sc-002"}
        initialReferenceId="sc-001"
        onNavigate={handleNavigate}
      />
    </LanguageProvider>
  );
}
