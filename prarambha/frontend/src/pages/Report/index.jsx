import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "../../i18n/LanguageContext";
import ReportPage from "./ReportPage";

/**
 * Printable Report Route Entry - Member 4
 * Replaces Member 3 placeholder stub with full 12-section Printable Report implementation.
 */
export default function ReportRoute() {
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
      <ReportPage onNavigate={handleNavigate} />
    </LanguageProvider>
  );
}
