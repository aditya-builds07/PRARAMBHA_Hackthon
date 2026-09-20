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
import { Plus, ArrowRight } from "lucide-react"
import { useAppStore } from "../../state/store.js"
import { useFarm } from "../../hooks/useFarm.js"
import FarmList from "../../components/farm/FarmList.jsx"
import FarmForm from "../../components/farm/FarmForm.jsx"
import ErrorState from "../../components/common/ErrorState.jsx"
import { nextId } from "../../state/store.js"
import en from "../../i18n/en.json"
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
    if (!window.confirm(en.farms.confirmDelete)) return
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
          <h1 className="text-2xl font-bold text-foreground">{en.farms.title}</h1>
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
              className="touch-target inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              id="go-to-builder-btn"
            >
              {en.scenario.title}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          )}
          <button
            onClick={() => setFormMode("create")}
            className="touch-target inline-flex items-center gap-2 border border-border rounded-md px-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            id="add-farm-btn"
          >
            <Plus className="h-4 w-4" aria-hidden />
            {en.farms.addFarm}
          </button>
        </div>
      </div>

      {/* Inline form */}
      {formMode && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {saveError && (
            <p className="text-sm text-destructive mb-4" role="alert">{saveError}</p>
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
      {fetchError && !isMockMode ? (
        <ErrorState
          message={en.errors.apiError}
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
