# KrishiMitra — Database Reference

## Project

- **Supabase project**: Kisan Mitra (`ltzpntlwnqkuzoybtwdg`)
- **Region**: `ap-southeast-2`
- **Postgres**: 17.x
- **Applied schemas**: `prarambha/database/schema/`
- **Seed data**: `prarambha/database/seed/`

---

## Tables

| Table | Purpose | RLS | Public policies |
|-------|---------|-----|-----------------|
| `profiles` | Mirrors `auth.users` for display names and preferences | ✅ Enabled | Own-user SELECT + UPDATE |
| `crop_params` | Reference crop parameters for the simulation engine | ✅ Enabled | SELECT (active rows only) |
| `assumptions` | Model weights, priority profiles, disclaimer copy | ✅ Enabled | SELECT (active rows only) |
| `farms` | Ownership boundary — every scenario/resource belongs to a farm | ✅ Enabled | **None** — service role only |
| `scenarios` | Saved what-if configurations linked to a farm | ✅ Enabled | **None** — service role only |
| `simulation_results` | Immutable, versioned outputs from the deterministic engine | ✅ Enabled | **None** — service role only |
| `resources` | Farm resource inventory compared with scenario requirements | ✅ Enabled | **None** — service role only |
| `weather_snapshots` | Point-in-time Open-Meteo snapshots stored per farm | ✅ Enabled | **None** — service role only |
| `soil_reports` | OCR-extracted or manual soil test results | ✅ Enabled | **None** — service role only |
| `audit_logs` | Durable append-only mutation log for every API action | ✅ Enabled | **None** — service role only |

> [!IMPORTANT]
> Tables with no public policies rely on **RLS default-deny** behaviour.
> When RLS is enabled and no permissive policy matches, Supabase returns 0 rows to any role other than the Postgres superuser / service role.
> The backend API exclusively uses `SUPABASE_SERVICE_ROLE_KEY` which bypasses RLS — it is never exposed to browser clients.

---

## Indexes

| Table | Index | Columns |
|-------|-------|---------|
| `farms` | `farms_owner_created_idx` | `auth_user_id, created_at desc` |
| `scenarios` | `scenarios_farm_created_idx` | `farm_id, created_at desc` |
| `scenarios` | `one_baseline_per_farm` (unique partial) | `farm_id` where `is_baseline` |
| `simulation_results` | `simulation_results_scenario_created_idx` | `scenario_id, created_at desc` |
| `resources` | `resources_farm_idx` | `farm_id, resource_type` |
| `weather_snapshots` | `weather_snapshots_farm_idx` | `farm_id, fetched_at desc` |
| `soil_reports` | `soil_reports_farm_idx` | `farm_id, created_at desc` |
| `audit_logs` | `audit_logs_user_id_idx` | `user_id, created_at desc` |
| `audit_logs` | `audit_logs_farm_id_idx` | `farm_id, created_at desc` |
| `audit_logs` | `audit_logs_scenario_id_idx` | `scenario_id, created_at desc` |
| `audit_logs` | `audit_logs_created_at_idx` | `created_at desc` |

---

## audit_logs Schema

| Column | Type | Notes |
|--------|------|-------|
| `id` | `uuid` | PK, `gen_random_uuid()` |
| `user_id` | `uuid` | Nullable FK → `auth.users(id)`, on delete set null |
| `farm_id` | `uuid` | Nullable FK → `farms(id)`, on delete set null |
| `scenario_id` | `uuid` | Nullable FK → `scenarios(id)`, on delete set null |
| `action` | `text NOT NULL` | Enum: see allowed values below |
| `model_version` | `text` | Nullable — set only for SIMULATE/GENERATE_REPORT |
| `input_snapshot` | `jsonb` | Nullable — inputs at time of action |
| `output_snapshot` | `jsonb` | Nullable — result at time of action |
| `created_at` | `timestamptz NOT NULL` | `now()` default — never set from JS |

### Allowed `action` values

```
CREATE_FARM
UPDATE_FARM
DELETE_FARM
CREATE_SCENARIO
SIMULATE
SAVE_SCENARIO
UPDATE_SCENARIO
DELETE_SCENARIO
CREATE_RESOURCE
UPDATE_RESOURCE
GENERATE_REPORT
```

The application-layer check lives in [`audit.service.js`](../backend/src/services/audit.service.js) and throws immediately for any unknown action string. The DB-level CHECK constraint acts as a secondary guard.

---

## Seed Data

| Table | Rows | Source |
|-------|------|--------|
| `crop_params` | 6 crops (wheat, rice, maize, sugarcane, soybean, cotton) | `database/seed/crop_params.sql` |
| `assumptions` | 3 rows (risk_weights, priority_profiles, model_notice) | `database/seed/crop_params.sql` |

Both tables use `ON CONFLICT DO UPDATE` so re-running the seed file is idempotent.

---

## How to Add a New Index

1. Write the `CREATE INDEX IF NOT EXISTS` statement in the relevant `database/schema/<table>.sql` file.
2. Apply it to the live database via the Supabase MCP:
   ```
   execute_sql(project_id, "create index if not exists ...")
   ```
3. Commit the `.sql` file so the schema stays reproducible.

---

## How to Add a New RLS Policy

1. Write the policy SQL in `database/schema/<table>.sql` (always include `DROP POLICY IF EXISTS` first so it is idempotent).
2. Apply via MCP:
   ```
   execute_sql(project_id, "drop policy if exists ... ; create policy ...")
   ```
3. Commit and push.

> [!WARNING]
> Never add a permissive policy to `farms`, `scenarios`, `simulation_results`, `resources`, `weather_snapshots`, `soil_reports`, or `audit_logs` without a team review.
> These tables must only be accessible via the backend service role.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes | Project API URL from Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service-role key — **never expose to browser** |

Set these in `prarambha/.env` (git-ignored). See `prarambha/.env.example` for the template.
