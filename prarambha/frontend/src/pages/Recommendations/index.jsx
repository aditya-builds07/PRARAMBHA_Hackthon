import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import RecommendationsPage from "./RecommendationsPage";

/**
 * Recommendations Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full Recommendations implementation.
 */
export default function RecommendationsRoute() {
  const { farmId } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    const fId = farmId || "farm-001";
    if (page === "comparison") {
      navigate(`/scenarios/${fId}/compare`);
    } else if (page === "history") {
      navigate(`/scenarios/${fId}/history`);
    }
  };

  return (
    <LanguageProvider>
      <RecommendationsPage onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}
