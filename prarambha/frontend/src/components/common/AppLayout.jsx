import { Outlet, NavLink, useNavigate } from "react-router-dom"
import { Sprout } from "lucide-react"
import { cn } from "../../lib/utils.js"
import en from "../../i18n/en.json"

const NAV_LINKS = [
  { to: "/farms", label: en.nav.farms },
]

export default function AppLayout() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-sm">
        <div className="container flex h-14 items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-bold text-primary hover:opacity-80 transition-opacity touch-target"
            aria-label={en.app.name}
          >
            <Sprout className="h-5 w-5" />
            <span className="text-base tracking-tight">PRARAMBHA</span>
            <span className="text-xs text-muted-foreground font-normal">2.0</span>
          </button>
          <span className="hidden lg:block text-xs text-muted-foreground italic">
            {en.app.tagline}
          </span>
          <nav className="ml-auto flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "touch-target rounded-md px-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="border-t border-border py-3 text-center text-xs text-muted-foreground">
        {en.app.disclaimer}
      </footer>
    </div>
  )
}
