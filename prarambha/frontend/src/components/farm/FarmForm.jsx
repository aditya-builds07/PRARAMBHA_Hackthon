/**
 * FarmForm.jsx — create or edit a farm.
 * Controlled form; validates on submit; never calls fetch directly.
 */
import { useState } from "react"
import { Field, Button, CustomSelect } from "../common/index.jsx"
import { validateFarm } from "../../utils/validate.js"
import en from "../../i18n/en.json"

const EMPTY_FARM = {
  name: "", region: "", areaAcres: "", cropCycle: "",
  waterProfile: "normal",
  budgetInr: "", waterM3: "", seedKg: "", fertilizerKg: "",
}

export default function FarmForm({ initial = null, onSave, onCancel, saving = false }) {
  const [values, setValues] = useState(initial ?? EMPTY_FARM)
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validateFarm(values)
    if (Object.keys(errs).length) { setErrors(errs); return }
    await onSave({
      ...values,
      areaAcres:    Number(values.areaAcres) || 0,
      budgetInr:    values.budgetInr  ? Number(values.budgetInr)    : null,
      waterM3:      values.waterM3    ? Number(values.waterM3)      : null,
      seedKg:       values.seedKg     ? Number(values.seedKg)       : null,
      fertilizerKg: values.fertilizerKg ? Number(values.fertilizerKg) : null,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-foreground">
        {initial ? en.farms.editFarm : en.farms.addFarm}
      </h2>

      {/* Core fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={en.farms.fields.name} htmlFor="farm-name" error={errors.name} required className="sm:col-span-2">
          <input id="farm-name" type="text" placeholder={en.farms.fields.namePlaceholder}
            value={values.name} onChange={(e) => set("name", e.target.value)}
            className="input-base" aria-invalid={!!errors.name} aria-describedby={errors.name ? "farm-name-error" : undefined} />
        </Field>

        <Field label={en.farms.fields.region} htmlFor="farm-region" error={errors.region}>
          <input id="farm-region" type="text" placeholder={en.farms.fields.regionPlaceholder}
            value={values.region} onChange={(e) => set("region", e.target.value)}
            className="input-base" />
        </Field>

        <Field label={en.farms.fields.areaAcres} htmlFor="farm-area" error={errors.areaAcres} required>
          <input id="farm-area" type="number" min="0.1" step="0.1"
            value={values.areaAcres} onChange={(e) => set("areaAcres", e.target.value)}
            className="input-base" aria-invalid={!!errors.areaAcres} />
        </Field>

        <Field label={en.farms.fields.waterProfile} htmlFor="farm-water-profile">
          <CustomSelect
            id="farm-water-profile"
            value={values.waterProfile}
            onChange={(e) => set("waterProfile", e.target?.value ?? e)}
            options={Object.entries(en.farms.waterProfiles).map(([k, v]) => ({ value: k, label: v }))}
          />
        </Field>

        <Field label={en.farms.fields.cropCycle} htmlFor="farm-crop-cycle">
          <input id="farm-crop-cycle" type="text" placeholder="e.g. Rabi 2026-27"
            value={values.cropCycle} onChange={(e) => set("cropCycle", e.target.value)}
            className="input-base" />
        </Field>
      </div>

      {/* Resources */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors select-none">
          Resources (optional) ▸
        </summary>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Field label={en.farms.fields.budgetInr} htmlFor="farm-budget">
            <input id="farm-budget" type="number" min="0" step="1000"
              value={values.budgetInr} onChange={(e) => set("budgetInr", e.target.value)}
              className="input-base" placeholder="e.g. 50000" />
          </Field>
          <Field label={en.farms.fields.waterM3} htmlFor="farm-water-m3">
            <input id="farm-water-m3" type="number" min="0"
              value={values.waterM3} onChange={(e) => set("waterM3", e.target.value)}
              className="input-base" placeholder="e.g. 2400" />
          </Field>
          <Field label={en.farms.fields.seedKg} htmlFor="farm-seed">
            <input id="farm-seed" type="number" min="0"
              value={values.seedKg} onChange={(e) => set("seedKg", e.target.value)}
              className="input-base" placeholder="kg" />
          </Field>
          <Field label={en.farms.fields.fertilizerKg} htmlFor="farm-fertilizer">
            <input id="farm-fertilizer" type="number" min="0"
              value={values.fertilizerKg} onChange={(e) => set("fertilizerKg", e.target.value)}
              className="input-base" placeholder="kg" />
          </Field>
        </div>
      </details>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving} id="farm-form-save">
          {saving ? "Saving…" : en.common.save}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} id="farm-form-cancel">
          {en.common.cancel}
        </Button>
      </div>
    </form>
  )
}
