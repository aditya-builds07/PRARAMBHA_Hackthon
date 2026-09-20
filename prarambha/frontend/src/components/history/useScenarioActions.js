import { useState, useEffect, useCallback } from "react";
import { renameScenario, deleteScenario } from "../../services/history.service";

/**
 * useScenarioActions - Member 4
 * Reusable custom hook extracting scenario management operations:
 * - Compare selection management (2-4 scenarios)
 * - Optimistic rename with rollback on service failure
 * - Optimistic deletion with rollback on service failure
 * - Error reporting without localStorage or backend writes
 */
export function useScenarioActions({
  initialScenarios = [],
  defaultSelectedIds = ["sc-001", "sc-002"],
  onRenameService = renameScenario,
  onDeleteService = deleteScenario,
} = {}) {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [selectedIds, setSelectedIds] = useState(defaultSelectedIds);
  const [actionError, setActionError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync state when initialScenarios is fetched or updated from parent
  useEffect(() => {
    if (initialScenarios && Array.isArray(initialScenarios)) {
      setScenarios(initialScenarios);
    }
  }, [initialScenarios]);

  /**
   * Toggle scenario selection for multi-scenario comparison (cap at 4)
   */
  const toggleSelectScenario = useCallback((id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  /**
   * Optimistically rename a scenario and rollback if the operation fails.
   */
  const handleRename = useCallback(
    async (id, newName) => {
      if (!newName || !newName.trim()) return;
      const cleanName = newName.trim();

      // Snapshot prior state for rollback
      let previousSnapshot = [];
      setScenarios((prev) => {
        previousSnapshot = [...prev];
        return prev.map((s) => (s.id === id ? { ...s, name: cleanName } : s));
      });

      setActionError(null);
      setIsProcessing(true);

      try {
        await onRenameService(id, cleanName);
      } catch (err) {
        // Rollback optimistic update
        setScenarios(previousSnapshot);
        const errMsg = err?.message || "Failed to rename scenario. Changes were rolled back.";
        setActionError(errMsg);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [onRenameService]
  );

  /**
   * Optimistically delete a scenario and rollback if the operation fails.
   */
  const handleDelete = useCallback(
    async (id) => {
      // Snapshot prior state for rollback
      let previousScenariosSnapshot = [];
      let previousSelectedSnapshot = [];

      setScenarios((prev) => {
        previousScenariosSnapshot = [...prev];
        return prev.filter((s) => s.id !== id);
      });

      setSelectedIds((prev) => {
        previousSelectedSnapshot = [...prev];
        return prev.filter((item) => item !== id);
      });

      setActionError(null);
      setIsProcessing(true);

      try {
        await onDeleteService(id);
      } catch (err) {
        // Rollback optimistic removal
        setScenarios(previousScenariosSnapshot);
        setSelectedIds(previousSelectedSnapshot);
        const errMsg = err?.message || "Failed to delete scenario. Changes were rolled back.";
        setActionError(errMsg);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [onDeleteService]
  );

  const clearError = useCallback(() => {
    setActionError(null);
  }, []);

  return {
    scenarios,
    setScenarios,
    selectedIds,
    setSelectedIds,
    toggleSelectScenario,
    handleRename,
    handleDelete,
    actionError,
    clearError,
    isProcessing,
  };
}

export default useScenarioActions;
