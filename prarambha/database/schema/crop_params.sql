-- Reference crop parameters for the deterministic hackathon simulator.

create table if not exists crop_params (
  crop_code text primary key,
  display_name text not null,
  season text not null,
  potential_yield_q_per_acre numeric(10,2) not null check (potential_yield_q_per_acre > 0),
  price_inr_per_q numeric(12,2) not null check (price_inr_per_q > 0),
  base_cost_inr_per_acre numeric(12,2) not null check (base_cost_inr_per_acre >= 0),
  water_need_mm numeric(10,2) not null check (water_need_mm > 0),
  yield_response_factor numeric(5,3) not null check (yield_response_factor > 0),
  weather_sensitivity numeric(5,3) not null check (weather_sensitivity >= 0),
  delay_sensitivity numeric(5,3) not null check (delay_sensitivity >= 0),
  source_note text not null,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table crop_params enable row level security;

drop policy if exists "public reads active crop parameters" on crop_params;
create policy "public reads active crop parameters"
  on crop_params for select using (active = true);
