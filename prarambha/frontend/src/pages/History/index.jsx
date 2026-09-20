import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import HistoryPage from "./HistoryPage";

/**
 * Scenario History Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full History implementation.
 */
export default function HistoryRoute() {
  const { farmId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (page, params = {}) => {
    const fId = farmId || "farm-001";
    if (page === "comparison") {
      navigate(`/scenarios/${fId}/compare`);
    } else if (page === "results") {
      navigate(`/scenarios/${fId}/${params.scenarioId || "sc-001"}/results`);
    }
  };

  return (
    <LanguageProvider>
      <HistoryPage onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}
