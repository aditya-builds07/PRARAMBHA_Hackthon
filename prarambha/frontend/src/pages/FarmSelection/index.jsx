/**
 * FarmSelection/index.jsx — T3: Full Farm Selection page.
 *
 * Features:
 *  - List all farms for the user
 *  - Create / Edit / Delete a farm (inline modal-like form)
 *  - Select active farm → navigate to Scenario Builder
 *  - Farm data stays isolated per farm in the store
 *  - Handles API errors with Retry; shows friendly degraded state
 */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppStore } from "../../state/store.js"
import { useFarm } from "../../hooks/useFarm.js"
import { useLanguage } from "../../i18n/LanguageContext.jsx"
import FarmList from "../../components/farm/FarmList.jsx"
import FarmForm from "../../components/farm/FarmForm.jsx"
import ErrorState from "../../components/common/ErrorState.jsx"
import { nextId } from "../../state/store.js"
import { isMockMode } from "../../services/simulation.service.js"

// ── Mock farms used when VITE_USE_MOCK=true ──────────────────────────────────
const MOCK_FARMS = [
  {
    id: "farm-001",
    name: "Desai Farm",
    region: "Sangli, Maharashtra",
    areaAcres: 5,
    cropCycle: "Rabi 2026-27",
    waterProfile: "normal",
    budgetInr: 50000,
    waterM3: 3000,
    seedKg: null,
    fertilizerKg: null,
  },
]

export default function FarmSelectionPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const farms       = useAppStore((s) => s.farms)
  const activeFarmId = useAppStore((s) => s.activeFarmId)
  const { fetching, fetchError, fetchFarms, fetchCrops, create, update, remove, select } = useFarm()
  const setFarms = useAppStore((s) => s.setFarms)

  // Form state: null = hidden, "create" = new farm, Farm object = edit
  const [formMode, setFormMode] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState(null)

  // On mount: load farms + crops
  useEffect(() => {
    if (isMockMode) {
      // Seed mock farms so the demo works without a backend
      setFarms(MOCK_FARMS)
    } else {
      fetchFarms()
      fetchCrops()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handlers ──────────────────────────────────────────────────────────────
  async function handleSave(farmData) {
    setSaving(true)
    setSaveError(null)
    if (formMode === "create") {
      if (isMockMode) {
        const mock = { ...farmData, id: nextId("farm") }
        useAppStore.getState().addFarm(mock)
        setFormMode(null)
      } else {
        const { error } = await create(farmData)
        if (error) { setSaveError(error) } else { setFormMode(null) }
      }
    } else {
      // editing existing
      if (isMockMode) {
        useAppStore.getState().updateFarm(formMode.id, farmData)
        setFormMode(null)
      } else {
        const { error } = await update(formMode.id, farmData)
        if (error) { setSaveError(error) } else { setFormMode(null) }
      }
    }
    setSaving(false)
  }

  async function handleDelete(farmId) {
    if (!window.confirm(t("farms.deleteConfirm") || "Are you sure you want to delete this farm?")) return
    if (isMockMode) {
      useAppStore.getState().removeFarm(farmId)
    } else {
      await remove(farmId)
    }
  }

  function handleSelect(farmId) {
    select(farmId)
    navigate(`/scenarios/${farmId}`)
  }

  function handleGoToBuilder() {
    if (activeFarmId) navigate(`/scenarios/${activeFarmId}`)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("farms.title") || "My Farms"}</h1>
          {isMockMode && (
            <span className="inline-block mt-1 text-xs bg-amber-100 text-amber-800 border border-amber-200 rounded-full px-2 py-0.5 font-medium">
              MOCK MODE — demo data
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {activeFarmId && (
            <button
              onClick={handleGoToBuilder}
              className="touch-target inline-flex items-center gap-2 bg-[#164A34] text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-[#196C3E] transition-colors cursor-pointer shadow-xs"
              id="go-to-builder-btn"
            >
              <span>{t("builder.title") || "Scenario Builder"}</span>
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
            </button>
          )}
          <button
            onClick={() => setFormMode("create")}
            className="touch-target inline-flex items-center gap-2 border border-[#D0DEC0] bg-white rounded-xl px-4 py-2 text-sm font-semibold text-[#164A34] hover:bg-[#EBF3ED] transition-colors cursor-pointer shadow-xs"
            id="add-farm-btn"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">add</span>
            <span>{t("farms.addFarm") || "Add Farm"}</span>
          </button>
        </div>
      </div>

      {/* Inline form */}
      {formMode && (
        <div className="rounded-xl border border-[#D0DEC0] bg-white p-6 shadow-sm">
          {saveError && (
            <p className="text-sm text-rose-600 mb-4" role="alert">{saveError}</p>
          )}
          <FarmForm
            initial={formMode === "create" ? null : formMode}
            onSave={handleSave}
            onCancel={() => { setFormMode(null); setSaveError(null) }}
            saving={saving}
          />
        </div>
      )}

      {/* Farm list or error */}
      {fetchError && (!farms || farms.length === 0) && !isMockMode ? (
        <ErrorState
          message={t("errors.apiError") || "Unable to load farm records from API"}
          onRetry={fetchFarms}
        />
      ) : (
        <FarmList
          farms={farms}
          activeFarmId={activeFarmId}
          loading={fetching}
          onSelect={handleSelect}
          onEdit={(farm) => setFormMode(farm)}
          onDelete={handleDelete}
          onAdd={() => setFormMode("create")}
        />
      )}
    </div>
  )
}
