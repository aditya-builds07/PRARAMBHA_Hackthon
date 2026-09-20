import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import ResourceCheckPage from "./ResourceCheckPage";

/**
 * Resource Check Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full Resource Readiness implementation.
 */
export default function ResourceCheckRoute() {
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
      <ResourceCheckPage onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}
