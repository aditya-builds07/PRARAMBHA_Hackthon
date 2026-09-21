# KrishiMitra Full Project Fix Plan

**Priority order:** fix authentication first, then connect persistence, then remove mock-path inconsistencies, then complete verification.

## Phase 1: Real Authentication

**Implementation status: complete.** The frontend now has a Supabase client, real password sign-in/sign-up, session restoration, API token propagation, logout, and a protected-route guard.

1. ~~Add a frontend Supabase client.~~
2. ~~Replace local login with `supabase.auth.signInWithPassword`.~~
3. ~~Replace local registration with `supabase.auth.signUp`.~~
4. ~~Restore sessions through `onAuthStateChange`.~~
5. ~~Set the API bearer token from the real session.~~
6. ~~Remove production reliance on local passwords and synthetic tokens.~~
7. ~~Keep the backend strict: no demo-token bypass.~~

**Remaining exit check:** a real Supabase user signs in in the browser, `GET /api/farms` returns a user-scoped response, logout removes the session, and reload restores the session.

## Phase 2: Farm and Scenario Persistence

1. Create a farm through the live form and verify the returned row.
2. Edit and delete the same farm through the API.
3. Create two scenarios under that farm.
4. Run simulation and save the result through the backend.
5. Verify scenario and result records survive a browser reload.
6. Verify the frontend maps API field names consistently to its store shape.

**Exit check:** farm -> scenario -> simulation -> result works with no mock fallback and survives reload.

## Phase 3: Tenant Isolation and Database Verification

1. Apply the RLS migration to the target Supabase project.
2. Use two real test users.
3. Confirm user B cannot read, update, delete, or compare user A's farm/scenarios/resources/results.
4. Confirm ownership fields are always set server-side.
5. Confirm audit records do not expose sensitive payloads.

**Exit check:** cross-user negative tests pass against live Supabase, not only mocked adapters.

## Phase 4: Centralize Mock Mode

1. Create one shared `isMockMode`/repository boundary.
2. Make recommendations, resources, assumptions, history, comparison, and reports return mock data without attempting the API when mock mode is enabled.
3. Remove avoidable 401s and fallback delays from local demo mode.
4. Ensure mock data uses the same scenario/result contracts as the real API.

**Exit check:** the full local demo works with the backend stopped and produces no API request failures.

## Phase 5: Route and Feature Wiring

1. Parse `farmId` and `scenarioId` from URL parameters at each page boundary.
2. Load the route-selected entities rather than defaulting to `farm-001`/`sc-001`.
3. Connect comparison to scenarios created in the current farm.
4. Connect Why, Recommendations, Resources, History, and Report to the selected saved result.
5. Add deep-link reload tests for every decision page.

**Exit check:** copying a results, comparison, history, or report URL opens the same entity after a hard reload.

## Phase 6: Verification Gate

Run:

```powershell
cd prarambha/backend
node tests/security/security.test.js
npm run test:vitest

cd ../frontend
npm test -- --run
npm run build
```

Then perform browser checks at desktop and mobile widths:

- Login, logout, and session restore
- Farm CRUD
- Scenario creation and cloning
- Simulation and saved result
- Comparison and baseline selection
- Why attribution
- Recommendations
- Resource readiness
- History actions
- Printable report
- Unauthorized access and cross-user isolation

## Release Gate

### Supabase Deployment Settings

Before deploying the frontend, configure Supabase Authentication:

1. Set **Site URL** to the deployed frontend origin, for example `https://app.example.com`.
2. Add `https://app.example.com/login` to **Redirect URLs**.
3. Set frontend `VITE_APP_URL=https://app.example.com`.
4. Set frontend `VITE_API_BASE_URL` to the deployed backend URL.
5. Keep email confirmation enabled; the confirmation link will return to `/login`, where the Supabase client detects the session.
6. Add the deployed frontend origin to backend `CORS_ORIGIN`.

Local development uses `VITE_APP_URL=http://localhost:5173` and requires `http://localhost:5173/login` in the Supabase redirect allow-list.

Do not push as complete until all of the following are true:

- Real Supabase Auth is used by the frontend.
- Real API persistence is verified in a browser.
- Live RLS isolation is verified with two users.
- No local password or synthetic-token auth remains in the production path.
- Mock mode is explicit and does not silently mask API failures.
- Full desktop/mobile browser verification is recorded.
