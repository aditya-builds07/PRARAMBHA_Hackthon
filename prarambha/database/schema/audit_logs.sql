-- Durable, append-only log of every meaningful mutation made through the API.
-- Written exclusively by the backend service role; browser clients have no access.

create extension if not exists "pgcrypto";

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  farm_id uuid references farms(id) on delete set null,
  scenario_id uuid references scenarios(id) on delete set null,
  action text not null check (action in (
    'CREATE_FARM',
    'CREATE_SCENARIO',
    'SIMULATE',
    'SAVE_SCENARIO',
    'UPDATE_SCENARIO',
    'DELETE_SCENARIO',
    'GENERATE_REPORT'
  )),
  model_version text,
  input_snapshot jsonb,
  output_snapshot jsonb,
  created_at timestamptz not null default now()
);

-- Indexes for the most common lookup patterns.
create index if not exists audit_logs_user_id_idx
  on audit_logs (user_id, created_at desc);

create index if not exists audit_logs_farm_id_idx
  on audit_logs (farm_id, created_at desc);

create index if not exists audit_logs_scenario_id_idx
  on audit_logs (scenario_id, created_at desc);

create index if not exists audit_logs_created_at_idx
  on audit_logs (created_at desc);

alter table audit_logs enable row level security;

-- The API writes audit events using the service role; no browser/anon access.
-- No permissive policies are created: omitting policies means the default-deny
-- RLS behaviour blocks all authenticated and anonymous direct access.
