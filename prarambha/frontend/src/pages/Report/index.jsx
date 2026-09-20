import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import ReportPage from "./ReportPage";

/**
 * Printable Report Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full 12-section Printable Report implementation.
 */
export default function ReportRoute() {
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
    } else if (page === "resources") {
      navigate(`/scenarios/${fId}/${scId}/resources`);
    }
  };

  return (
    <LanguageProvider>
      <ReportPage
        scenarioId={scenarioId || "sc-001"}
        onNavigate={handleNavigate}
      />
    </LanguageProvider>
  );
}
