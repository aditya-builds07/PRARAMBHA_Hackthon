import en from "../../i18n/en.json"

// T7 — full Results screen comes next.
// Shell for T1.
export default function ScenarioResultsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-foreground mb-6">{en.results.title}</h1>
      <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground text-sm">
        Results — <strong>T7 work in progress</strong>
      </div>
    </div>
  )
}
