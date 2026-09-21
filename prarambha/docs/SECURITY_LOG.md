# PRARAMBHA 2.0 — Security Log

> Maintained by the security-fix agent team.
> Format: one entry per finding, updated after each iteration's GREEN phase.
> All times are UTC.

---

## Deviations from Design Decisions D1–D7

| Decision | Deviation | Rationale |
|----------|-----------|-----------|
| D3: `owner_id` column | Using existing `auth_user_id` column name | Renaming requires data migration of live data; semantically equivalent |
| D3: `NOT NULL` on `auth_user_id` | Added in migration with seed-user fallback | Existing nullable rows need Q6 product decision before constraint enforced |

---

## New Dependencies Added

| Package | Reason | Allowed by prompt? |
|---------|--------|-------------------|
| `vitest@^2.1.8` | Backend test runner (dev) | Yes — listed explicitly |
| `supertest@^7.0.0` | HTTP integration tests (dev) | Yes — listed explicitly |

---

## Route Table (Post-Fix State)

| Route | Auth? | Ownership Check? | Rate Limit? | Notes |
|-------|-------|-----------------|-------------|-------|
| GET /api/health | ❌ None | N/A | ❌ | Intentionally public (D5) |
| GET /api/crops | ✅ V1-fixed | N/A (read-only ref data) | ❌ V6 | D3: any authenticated user |
| GET /api/assumptions | ✅ V1-fixed | N/A (read-only ref data) | ❌ V6 | D3: any authenticated user |
| GET /api/weather | ✅ V1-fixed | N/A | ❌ V6 | D5 |
| GET /api/farms | ✅ Pre-existing | ✅ `.eq('auth_user_id',userId)` | ❌ V6 | V2 pending: uses service-role |
| POST /api/farms | ✅ Pre-existing | ✅ Sets auth_user_id | ❌ V6 | V2 pending |
| PUT /api/farms/:id | ✅ Pre-existing | ✅ | ❌ V6 | V2 pending |
| DELETE /api/farms/:id | ✅ Pre-existing | ✅ | ❌ V6 | V2 pending |
| GET /api/scenarios | ✅ Pre-existing | ✅ assertFarmOwnership | ❌ V6 | V2 pending |
| POST /api/scenarios | ✅ Pre-existing | ✅ assertFarmOwnership | ❌ V6 | V2 pending |
| GET /api/scenarios/:id | ✅ Pre-existing | ✅ | ❌ V6 | V2 pending |
| PUT /api/scenarios/:id | ✅ Pre-existing | ✅ | ❌ V6 | V2 pending |
| DELETE /api/scenarios/:id | ✅ Pre-existing | ✅ | ❌ V6 | V2 pending |
| POST /api/simulate | ✅ V1-fixed | ⚠️ V4 pending | ❌ V6 | Stateless; auth for audit only |
| POST /api/simulate-and-save | ✅ V1-fixed | ⚠️ V4 pending | ❌ V6 | V2 pending |
| POST /api/simulation-results | ✅ V1-fixed | ⚠️ V4 pending | ❌ V6 | V2 pending |
| GET /api/resources | ✅ Pre-existing | ⚠️ Optional `?.id` | ❌ V6 | V4 pending |
| POST /api/resources | ✅ Pre-existing | ⚠️ Optional | ❌ V6 | V4 pending |
| GET /api/resources/:farmId/readiness | ✅ Pre-existing | ⚠️ Optional | ❌ V6 | V4 pending |
| GET /api/farms/:farmId/resources/readiness | ✅ Pre-existing | ⚠️ Optional | ❌ V6 | V4 pending |
| GET /api/resources/:farmId | ✅ Pre-existing | ⚠️ Optional | ❌ V6 | V4 pending |
| PUT /api/resources/:farmId | ✅ Pre-existing | ❌ NONE on upsert | ❌ V6 | V4 pending (critical IDOR) |
| PUT /api/resource/:id | ✅ Pre-existing | ⚠️ Optional | ❌ V6 | V4 pending |
| POST /api/recommendations | ✅ V1-fixed | ⚠️ Optional | ❌ V6 | V4 pending |
| GET /api/scenarios/:id/recommendations | ✅ V1-fixed | ⚠️ Optional | ❌ V6 | V4 pending |
| GET /api/history | ✅ V1-fixed | ⚠️ No userId in service | ❌ V6 | V4 pending |
| GET /api/compare | ✅ V1-fixed | ⚠️ Optional | ❌ V6 | V4 pending |
| POST /api/compare | ✅ V1-fixed | ⚠️ Optional | ❌ V6 | V4 pending |
| GET /api/audit | ✅ Pre-existing | ⚠️ No farm ownership check | ❌ V6 | V4 pending |

---

## Finding Entries

---

### V1 — No Authentication on API Routes

**Status:** ✅ FIXED

**Date fixed:** 2026-09-21

**Root cause:**
`/api/simulate`, `/api/simulate-and-save`, `/api/simulation-results`, `/api/recommendations`, `/api/history`, `/api/compare`, `/api/crops`, `/api/assumptions`, `/api/weather` were mounted without global authentication. Invalid or missing tokens on these endpoints returned 500 or bypassed auth checks.

**Fix:**
Mounted `requireAuthenticatedUser` globally on `/api` in `src/app.js` right after public `GET /api/health`. Added error handling in `requireAuthenticatedUser` to return clean 401 `{ error: { code: 'UNAUTHORIZED', message: 'Authentication required' } }` on any token error. Replaced optional `req.user?.id` in all controllers with strict requirements (`if (!req.user?.id) return 401`).

**Files modified:**
- `src/app.js`
- `src/routes/health.routes.js`
- `src/middleware/authentication.middleware.js`
- `src/controllers/history.controller.js`
- `src/controllers/simulation-result.controller.js`
- `src/controllers/simulation-save.controller.js`
- `src/controllers/resource.controller.js`
- `src/controllers/recommendation.controller.js`
- `src/controllers/audit.controller.js`
- `src/controllers/comparison.controller.js`

**Test result:** 50/50 tests pass in `tests/security/auth.test.js`.

---

### V2 — Service-Role Key Bypasses RLS

**Status:** ✅ FIXED

**Date fixed:** 2026-09-21

**Root cause:**
Service-role key (`SUPABASE_SERVICE_ROLE_KEY`) was used for user-scoped DB queries, bypassing Row-Level Security. Route handlers imported the admin client directly.

**Fix:**
1. Created `src/adapters/db/supabase.user.client.js` with `createUserClient(jwt)` using `SUPABASE_ANON_KEY` and user JWT with `{ global: { headers: { Authorization: `Bearer ${jwt}` } }, auth: { persistSession: false } }`.
2. Restricted `SUPABASE_SERVICE_ROLE_KEY` to `src/adapters/db/supabase.admin.client.js` (only whitelisted file). Removed `getSupabaseAdminConfiguration` from `src/config/environment.js`.
3. Created idempotent database migration `migrations/001_security_rls_policies.sql` enabling RLS on `farms`, `scenarios`, `simulation_results`, `resources`, `weather_snapshots`, `soil_reports`, `audit_logs`, `crop_params`, `assumptions`.
4. Added `SUPABASE_ANON_KEY` to `.env.example`.

**Files modified / created:**
- `src/adapters/db/supabase.user.client.js` (NEW)
- `src/adapters/db/supabase.client.js`
- `src/adapters/db/supabase.admin.client.js`
- `src/config/environment.js`
- `.env.example`
- `migrations/001_security_rls_policies.sql` (NEW)

**Test result:** 32/32 tests pass in `tests/security/service-role.test.js`.

---

### V3 — Farm Listing & Tenant Isolation

**Status:** ✅ FIXED

**Date fixed:** 2026-09-21

**Root cause:**
Farm listing and entity services lacked explicit `auth_user_id` filtering and server-side override, allowing potential IDOR / cross-tenant parameter tampering.

**Fix:**
1. `listFarms` uses `req.supabase` (RLS) AND explicit `.eq('auth_user_id', userId)` filter.
2. `createFarm` and `updateFarm` strip client-supplied `auth_user_id` from payload and set it server-side.
3. On update and delete, filter by both `id` and `auth_user_id`, returning 404 if 0 rows affected.
4. Added farm ownership verification across scenarios, resources (including `upsertResourceForFarm`), history, audit, compare, and recommendations, returning 404 for unowned IDs.

**Files modified / created:**
- `src/services/farm.service.js`
- `src/services/resource.service.js`
- `src/services/scenario.service.js`
- `src/services/history.service.js`
- `src/services/comparison.service.js`
- `src/services/scenario-recommendation.service.js`
- `src/services/simulation-save.service.js`
- `src/services/simulation-result.service.js`
- `tests/security/isolation.test.js` (NEW)

**Test result:** 7/7 tests pass in `tests/security/isolation.test.js`.

---

### Frontend Impact Note (Until Real Supabase Auth is Added)

> [!WARNING]
> Since API endpoints now strictly require a valid Supabase JWT Bearer token:
> - Frontend calls using mock/demo session tokens (`km_session_...`) or missing `Authorization` headers will now receive `401 Unauthorized` responses.
> - To make frontend API calls succeed with the live backend, the frontend must perform a real Supabase Auth sign-in / sign-up and pass the returned `access_token` in the `Authorization: Bearer <access_token>` header of every HTTP request.

