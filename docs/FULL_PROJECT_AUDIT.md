# KrishiMitra Full Project Audit

**Audit date:** 2026-09-21  
**Scope:** Frontend, backend, database boundaries, feature wiring, tests, and live browser validation.

## Executive Summary

The project is structurally complete and the deterministic simulation UI is runnable in local mock mode. Backend security boundaries and the frontend build are passing. Supabase authentication is now wired into the frontend; the remaining release check is a live sign-in against the configured Supabase project and validation of persisted data/RLS with real users.

**Current judgment: READY FOR LOCAL DEMO AND AUTH INTEGRATION TESTING, NOT YET LIVE-VERIFIED FOR PRODUCTION.**

## Verified Status

| Area | Status | Evidence |
|---|---|---|
| Backend security | PASS | `node tests/security/security.test.js`: 18 passed, 0 failed |
| Frontend tests | PASS | `npm test -- --run`: 7 passed, 0 failed |
| Frontend production build | PASS | `npm run build` succeeds |
| Farm form rendering | PASS | Live browser add-farm form renders after translation fix |
| Mock browser journey | PASS | Farms -> scenario builder -> preset -> results verified at `/scenarios/farm-001/.../results` |
| Real Supabase login | IMPLEMENTED, LIVE TEST PENDING | Frontend uses Supabase `signInWithPassword`/`signUp` |
| Real farm persistence | LIVE TEST PENDING | API receives the Supabase session bearer token |
| Real scenario persistence | LIVE TEST PENDING | Depends on live authenticated farm flow |
| Live RLS behavior | NOT VERIFIED | Requires a real Supabase JWT and database session |
| Responsive viewports | NOT VERIFIED | Desktop flow only was exercised |

## Findings

### P0: Live Supabase authentication still needs environment verification

The frontend now uses the configured Supabase publishable key, real password sign-in/sign-up, session restoration, and API bearer propagation. A real Supabase account and database session still need to be exercised in the browser.

Impact:
- Live persistence and RLS isolation are not yet evidenced by a browser run.
- Local browser success still proves mock UI behavior unless mock mode is disabled.

Required verification:
- Sign in with a real Supabase user.
- Create a farm and confirm the backend response and database row.
- Test a second user against the first user's data.
- Keep service-role credentials server-only.

### P1: Mock mode is only partially centralized

`VITE_USE_MOCK=true` handles farms and simulation, while recommendations, resources, assumptions, report, and some history paths still attempt API calls before fallback data.

Impact:
- Offline/demo navigation can generate avoidable 401s and delays.
- The mock journey is not a clean no-backend mode.

Required fix:
- Make every frontend service honor one shared mock-mode switch before calling the API.
- Add a mock-mode integration test covering all decision modules.

### P1: Browser validation is not persistence validation

The browser journey successfully rendered the farm list, scenario builder, preset changes, and deterministic result page. It used local Zustand/mock data. It did not prove database writes, ownership isolation against live records, or session refresh.

### P2: URL state and in-memory state are loosely coupled

The app shell determines the page from the URL but several pages still use `navParams` and default IDs. Directly opening a deep link after a reload can display default farm/scenario state instead of the URL-selected entity.

Required fix:
- Parse route parameters at the owning page boundary.
- Load the selected farm/scenario from the API or a documented mock repository.
- Add reload/deep-link tests.

### P2: Static fallback datasets are not connected to created scenarios

Comparison, history, and some advisory/report views use static mock records or fallback objects rather than the scenario created during the current builder flow.

Required fix:
- Define one scenario/result repository interface.
- Use the same source for builder, results, comparison, recommendations, history, and reports.

## Security Review

The backend currently has the correct high-level boundary:

- Protected routers use `requireAuthenticatedUser`.
- Missing, malformed, and forged tokens return `401`.
- User-scoped Supabase clients use the anon key plus the caller JWT.
- Service-role access is isolated to the admin adapter.
- Farm and related services apply ownership checks.
- Error responses sanitize database details and stack traces.

The backend must remain strict. Do not add a development token bypass to make the current fake frontend login work.

## Database Review

The schema and migration include ownership fields and RLS policy work, but live policy behavior remains unverified because no real authenticated browser session was available. Before production release, verify:

1. A real Supabase user can create a farm.
2. A second user cannot read, update, or delete the first user's farm.
3. Scenario, resource, simulation result, audit, and report queries remain farm-scoped.
4. Client payloads cannot override `auth_user_id`.

## Feature Matrix

| Feature | Local mock | Real backend | Notes |
|---|---:|---:|---|
| Login/signup | Yes, local only | No | Replace with Supabase Auth |
| Farm list/create/edit/delete | Yes | Not proven | API requires real JWT |
| Scenario builder | Yes | Not proven | Store is in-memory in current browser flow |
| Simulation | Yes | Not proven | Mock result was rendered successfully |
| Results | Yes | Not proven | Result page rendered successfully |
| Comparison | Partial | Not proven | Static/fallback records remain |
| Why/attribution | Partial | Not proven | Needs connected scenario/result data |
| Recommendations | Partial | Not proven | Fallback may call API first |
| Resources | Partial | Not proven | Fallback may call API first |
| History | Partial | Not proven | Not connected to newly-created mock scenario |
| Report | Partial | Not proven | Printing is local; persisted report not proven |

## Validation Commands

- Backend: `cd prarambha/backend; node tests/security/security.test.js`
- Frontend tests: `cd prarambha/frontend; npm test -- --run`
- Frontend build: `cd prarambha/frontend; npm run build`

## Files Changed During Stabilization

- `prarambha/backend/src/adapters/db/supabase.client.js`
- `prarambha/backend/src/app.js`
- `prarambha/frontend/src/i18n/LanguageContext.jsx`
- `prarambha/frontend/src/i18n/en.json`
- `prarambha/frontend/src/pages/Entry/index.jsx`
- `prarambha/.gitignore`

## Final Audit Decision

The repository is suitable for continued local demonstration and engineering work. It should not be described as fully production-verified or pushed as complete until real Supabase authentication, persistence, RLS isolation, and the full connected feature journey are validated.
