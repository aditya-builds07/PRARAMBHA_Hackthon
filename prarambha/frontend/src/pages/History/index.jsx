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
    const scId = params.scenarioId || "sc-001";

    if (page === "comparison") {
      const query = params?.selectedIds && params.selectedIds.length > 0
        ? `?ids=${params.selectedIds.join(",")}`
        : "";
      navigate(`/scenarios/${fId}/compare${query}`, { state: params });
    } else if (page === "report") {
      navigate(`/scenarios/${fId}/${scId}/report`);
    } else if (page === "results") {
      navigate(`/scenarios/${fId}/${scId}/report`);
    } else if (page === "builder") {
      navigate(`/scenarios/${fId}`);
    }
  };

  return (
    <LanguageProvider>
      <HistoryPage onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}
