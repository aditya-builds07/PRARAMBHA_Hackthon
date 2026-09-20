-- Immutable, versioned outputs from the deterministic simulation engine.

create table if not exists simulation_results (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid not null references scenarios(id) on delete cascade,
  model_version text not null,
  assumptions_version text not null,
  estimated boolean not null default true,
  yield_per_acre_q numeric(12,3) not null check (yield_per_acre_q >= 0),
  yield_total_q numeric(12,3) not null check (yield_total_q >= 0),
  yield_low_q numeric(12,3) not null check (yield_low_q >= 0),
  yield_high_q numeric(12,3) not null check (yield_high_q >= yield_low_q),
  cost_inr numeric(14,2) not null check (cost_inr >= 0),
  revenue_inr numeric(14,2) not null check (revenue_inr >= 0),
  profit_inr numeric(14,2) not null,
  roi_percent numeric(10,2) not null,
  water_drawn_m3 numeric(14,2) not null check (water_drawn_m3 >= 0),
  water_productivity_kg_m3 numeric(10,4) not null check (water_productivity_kg_m3 >= 0),
  water_risk numeric(5,2) not null check (water_risk between 0 and 100),
  weather_risk numeric(5,2) not null check (weather_risk between 0 and 100),
  planting_risk numeric(5,2) not null check (planting_risk between 0 and 100),
  financial_risk numeric(5,2) not null check (financial_risk between 0 and 100),
  overall_risk numeric(5,2) not null check (overall_risk between 0 and 100),
  risk_level text not null check (risk_level in ('low', 'medium', 'high')),
  decision_score numeric(5,2) not null check (decision_score between 0 and 100),
  result_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists simulation_results_scenario_created_idx
  on simulation_results (scenario_id, created_at desc);

alter table simulation_results enable row level security;

-- No public policies: the API controls persistence and report access.
