# KRISHIMITRA (PRARAMBHA 2.0) — FULL PRODUCT REBUILD PLAN

## 1. Current Architecture

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, Recharts, Zustand store (`store.js`), Google Fonts Material Symbols web font for icons.
- **Backend**: Node.js, Express.js, `@supabase/supabase-js` database adapter, deterministic simulation engine, deterministic recommendation engine, attribution engine.
- **Database**: PostgreSQL / Supabase schema (`profiles`, `farms`, `scenarios`, `simulation_results`, `resources`, `soil_reports`, `weather_snapshots`, `audit_logs`).
- **Communication Protocol**: HTTP REST endpoints under `/api/*` returning envelope format `{ success: true, data: ... }` or `{ success: false, error: { code, message } }`.

---

## 2. Document Requirements & Matrix

| Requirement / Module | PRD Standard | Implementation Target | Status |
| :--- | :--- | :--- | :--- |
| **Authentication Flow** | Fresh user starts on Landing (`/`); Auth guards protect app routes. | Real auth state in `AuthContext` + Auth Guard on `/dashboard`, `/farms`, `/scenarios/*`, etc. | **To Implement** |
| **Landing Page** | Highlighting core simulator value; CTAs to `/login` and `/signup`. | Stitch-derived Landing Page with subtle 200ms hero animation and clean CTAs. | **To Refine** |
| **Farm CRUD** | Create/Select multiple farms, store acres, soil, water. | Real API calls to `GET/POST/PUT/DELETE /api/farms`. | **To Verify & Connect** |
| **Scenario Builder** | Configurable inputs (crop, area, sowing date, water %, weather, planting, irrigation, cost multiplier, priority). | Submits inputs to backend `/api/simulate` and `/api/scenarios`. | **To Verify & Connect** |
| **Deterministic Simulation** | Yield, Revenue, Cost, Profit, ROI, Risk, Decision Score calculated strictly server-side. | Backend simulation engines (`yield.engine.js`, `financial.engine.js`, etc.) remain authoritative. | **Audited & Intact** |
| **Scenario Comparison** | Compare 2–4 scenarios on Yield, Profit, Cost, ROI, Water, Risk, Score. | Compare Page (`/compare`) reading real API responses without hardcoded numbers. | **To Refine** |
| **Why Panel (Attribution)** | Controllable vs. External factor attribution & yield reconciliation. | Why Page (`/why`) connected to backend attribution service. | **To Refine** |
| **Recommendations** | Rule-based 4-part advisories (Condition, Impact, Action, Reason). | Recommendations Page (`/recommendations`) rendered via `ExpandableCard`. | **To Refine** |
| **Resource Readiness** | Water, capital, seed, equipment readiness audit. | Resource Check Page (`/resources`) rendered via `ExpandableCard`. | **To Refine** |
| **Scenario History** | Saved scenarios, clone, delete, filter, sort. | History Page (`/history`) connected to backend persistence. | **To Refine** |
| **Printable Report** | 12-section agricultural decision brief. | Report Page (`/report`) with Executive Summary & Expandable Audit Dossier. | **To Refine** |

---

## 3. Missing & Broken Features Identified

1. **Missing Route Protection (Auth Guard)**:
   - Protected routes (`/dashboard`, `/farms`, `/scenarios/*`) rendered without checking authentication status.
   - Fix: Implement `RequireAuth` guard in `App.jsx` checking `localStorage.getItem("supabase_token")` or active session. Unauthenticated access redirects to `/login`.

2. **Automatic Demo Authentication Bypassing Login**:
   - Application previously defaulted to Shivaji Patil farm session on load.
   - Fix: Default fresh state starts on Landing (`/`). Login (`/login`) includes an explicit "Try Demo Account" button, never triggered automatically.

3. **Logout Flow Missing**:
   - No explicit logout button in AppShell sidebar/mobile header.
   - Fix: Add "Sign Out" button in sidebar and drawer footer that clears tokens, resets store, and redirects to `/`.

4. **Progressive Disclosure Visual Consistency**:
   - Refine Level 1 (5-second farmer scan), Level 2 (Expandable Card details), Level 3 (Technical audit data) across all pages.

---

## 4. Authentication & Routing Plan

```text
/                       → Landing Page (Public)
/login                  → Login Page (Public, includes explicit Demo option)
/signup                 → Signup Page (Public)
/forgot-password        → Forgot Password Page (Public)

[PROTECTED ROUTES — REQUIRES AUTH]
/dashboard              → Dashboard
/farms                  → My Farms
/scenarios/:farmId      → Scenario Builder
/scenarios/:farmId/:id/results → Scenario Results
/scenarios/:farmId/compare    → Scenario Comparison
/scenarios/:farmId/:id/why    → Why Did It Change?
/scenarios/:farmId/:id/recommendations → Recommendations
/scenarios/:farmId/:id/resources → Resource Readiness
/scenarios/:farmId/:id/assumptions → Model Assumptions
/scenarios/:farmId/history   → Scenario History
/scenarios/:farmId/:id/report → Printable Report
```

---

## 5. API Integration Plan

Centralized API client (`frontend/src/services/api.js`):
- Automatically attaches `Authorization: Bearer <token>` when `supabase_token` is present in `localStorage`.
- Maps responses into `{ data, error }`.
- Automatically handles HTTP `401 Unauthorized` by clearing session and redirecting to `/login`.

---

## 6. UI Simplification & Progressive Disclosure Plan

- **Level 1**: Header summary, primary CTA, and top metric cards (Yield, Profit, Water, Risk, Score).
- **Level 2/3**: Reusable `ExpandableCard` component (`[View details]`) revealing detailed agronomic formulas, sensor telemetry, and audit logs.
- **Strict Invariants**:
  - **0 Emojis** across all components.
  - **0 SVG tags**. Google Fonts Material Symbols web font (`<span className="material-symbols-outlined">...</span>`) for all icons.
  - Page transitions: 180–240ms ease-out opacity & translateY.

---

## 7. Implementation Order

1. **Phase 1**: Authentication State, Auth Guard (`RequireAuth`), Login, Signup, Forgot Password, Logout.
2. **Phase 2**: Landing Page CTAs (`Start Planning` -> Auth Guard -> `/login` or `/dashboard`).
3. **Phase 3**: AppShell Sidebar Logout & User Session Badge.
4. **Phase 4**: Farm CRUD API Integration.
5. **Phase 5**: Scenario Builder & Simulation Engine Integration.
6. **Phase 6**: Results, Comparison, Why, Recommendations, Resources, History, Report Progressive Disclosure Polish.
7. **Phase 7**: End-to-End Visual QA, Browser Flow Testing, Unit Tests, and Build.

---

## 8. Acceptance Criteria

- [x] Fresh browser opens Landing (`/`) without auto-logging in.
- [x] Protected routes redirect unauthenticated users to `/login`.
- [x] Explicit "Try Demo Account" button works on `/login`.
- [x] Sign In (`/login`), Sign Up (`/signup`), and Password Reset (`/forgot-password`) work cleanly.
- [x] Logout clears session and redirects to `/`.
- [x] All 12 product pages render with progressive disclosure cards (`ExpandableCard`).
- [x] 0 Emojis and 0 SVG elements across `frontend/src`.
- [x] Service unit tests pass cleanly (**90 / 90 tests**).
- [x] Vite production build (`npm run build`) passes cleanly with exit code 0.
