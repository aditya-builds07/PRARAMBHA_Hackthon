import en from "../../i18n/en.json"

/**
 * STUB — owned by Member 4.
 * Member 3 provides this route so routing works end-to-end.
 * Replace the body with the real implementation.
 *
 * Props available from router params: farmId, scenarioId (via useParams)
 * State available from: useAppStore() — getScenarios(), getResult(id), getSelectedForComparison()
 */
export default function Stub() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="text-center p-8 rounded-lg border border-dashed border-border">
        <p className="text-muted-foreground text-sm">{en.stubs["why"]}</p>
        <p className="text-xs text-muted-foreground mt-2 italic">Route stub — Member 4 fills this in.</p>
      </div>
    </div>
  )
}
