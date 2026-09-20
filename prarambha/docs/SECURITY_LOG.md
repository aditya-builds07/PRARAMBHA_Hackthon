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
`/api/simulate`, `/api/simulate-and-save`, `/api/simulation-results`, `/api/recommendations` (both), `/api/history`, `/api/compare` (GET+POST), `/api/crops`, `/api/assumptions`, `/api/weather` had no `requireAuthenticatedUser` middleware applied. Any HTTP client could call these without a session token.

**Fix:**
Added `requireAuthenticatedUser` import and middleware to each of the 10 route files listed above. Auth middleware was already written (`authentication.middleware.js`) — it was simply not applied to these routes.

**Files modified:**
- `backend/src/routes/simulate.routes.js`
- `backend/src/routes/recommendations.routes.js`
- `backend/src/routes/reports.routes.js`
- `backend/src/routes/compare.routes.js`
- `backend/src/routes/crops.routes.js`
- `backend/src/routes/assumptions.routes.js`
- `backend/src/routes/weather.routes.js`

**Test names (RED → GREEN):**
- `V1 — Authentication: no token → 401 > POST /api/simulate` ✅
- `V1 — Authentication: no token → 401 > POST /api/simulate-and-save` ✅
- `V1 — Authentication: no token → 401 > POST /api/simulation-results` ✅
- `V1 — Authentication: no token → 401 > POST /api/recommendations` ✅
- `V1 — Authentication: no token → 401 > GET /api/scenarios/:id/recommendations` ✅
- `V1 — Authentication: no token → 401 > GET /api/history` ✅
- `V1 — Authentication: no token → 401 > GET /api/compare` ✅
- `V1 — Authentication: no token → 401 > POST /api/compare` ✅
- `V1 — Authentication: no token → 401 > GET /api/crops` ✅
- `V1 — Authentication: no token → 401 > GET /api/assumptions` ✅
- `V1 — Authentication: no token → 401 > GET /api/weather` ✅
- `V1 — Authentication: malformed Authorization header → 401` (16 cases) ✅
- `V1 — Authentication: invalid/expired token → 401` (5 cases) ✅
- `V1 — Authentication: valid token passes auth layer (not 401)` (4 cases) ✅
- `V1 — Authentication: public routes accessible without token` ✅

**Result:** 50/50 tests pass.

**Regression:** Auth middleware was pre-existing and already working on farms/scenarios — those routes are unaffected.

---

### V2 — Service-Role Key Bypasses RLS

**Status:** 🔴 OPEN — next iteration

---

### V3 — listFarms Returns All Farms

**Status:** 🔴 OPEN — fixed by V2 (RLS enforcement)

---

### V4 — IDOR: Client-Supplied IDs Not Ownership-Checked

**Status:** 🔴 OPEN

---

### V5 — CORS Allows Every Origin

**Status:** 🔴 OPEN

---

### V6 — No Rate Limiting

**Status:** 🔴 OPEN

---

### V7 — No Security Headers

**Status:** 🔴 OPEN

---

### V8 — Error Details Leak to Client

**Status:** 🔴 OPEN

---

### V9 — No Security Test Suite

**Status:** 🟡 PARTIAL — `tests/security/auth.test.js` created (V1 proof)

---

### V10 — VITE_USE_MOCK=true in Production

**Status:** 🔴 OPEN

---

### V11 — Hard-coded "Confidence: High"

**Status:** 🔴 OPEN (no literal "Confidence: High" found in grep; full audit in V11 iteration)

---

### V12 — Frontend Does Not Use Real Auth Tokens

**Status:** 🔴 OPEN — `LoginPage.jsx` uses `"km_session_" + Date.now()` as mock token
