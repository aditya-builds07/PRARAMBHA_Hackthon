import { useNavigate } from "react-router-dom"
import { Sprout, ArrowRight, Droplets, CloudSun, Wheat } from "lucide-react"
import en from "../../i18n/en.json"

const FEATURES = [
  { icon: Wheat,    label: "Compare up to 4 crop scenarios side by side" },
  { icon: Droplets, label: "See how water shortage affects your yield" },
  { icon: CloudSun, label: "Test poor weather before the season hits" },
]

export default function EntryPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-8 px-4">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4 max-w-2xl">
        <div className="rounded-full bg-primary/10 p-4">
          <Sprout className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          {en.entry.headline}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
          {en.entry.subheadline}
        </p>
      </div>

      {/* Feature pills */}
      <ul className="flex flex-col sm:flex-row gap-3 text-sm" aria-label="Key features">
        {FEATURES.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 text-foreground"
          >
            <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden />
            {label}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate("/farms")}
          className="touch-target inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-3 font-semibold text-base hover:bg-primary/90 transition-colors"
          id="entry-cta"
        >
          {en.entry.cta}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground max-w-sm">{en.app.disclaimer}</p>
    </div>
  )
}
