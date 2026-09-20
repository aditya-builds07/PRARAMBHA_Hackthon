import en from "../../i18n/en.json"

// T5 — full Scenario Builder comes next.
// Shell for T1: route stub so router does not 404.
export default function ScenarioBuilderPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">{en.scenario.title}</h1>
      <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground text-sm">
        Scenario Builder — <strong>T5 work in progress</strong>
      </div>
    </div>
  )
}
