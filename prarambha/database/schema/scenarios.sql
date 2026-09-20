-- Saved what-if configurations. A scenario belongs to exactly one farm.

create table if not exists scenarios (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references farms(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  is_baseline boolean not null default false,
  crop_code text not null references crop_params(crop_code),
  area_acres numeric(10,2) not null check (area_acres > 0 and area_acres <= 10000),
  sowing_date date,
  water_availability_percent numeric(5,2) not null check (water_availability_percent between 0 and 120),
  available_water_m3 numeric(14,2) check (available_water_m3 is null or available_water_m3 >= 0),
  weather text not null check (weather in ('good', 'normal', 'poor')),
  planting_type text not null check (planting_type in ('early', 'on_time', 'delayed')),
  delay_days integer not null default 0 check (delay_days between 0 and 90),
  input_cost_multiplier numeric(5,2) not null default 1 check (input_cost_multiplier between 0.5 and 3),
  irrigation text not null check (irrigation in ('flood', 'sprinkler', 'drip')),
  priority_profile text not null check (priority_profile in ('balanced', 'max_profit', 'play_safe')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (farm_id, name)
);

-- The API enforces this as well; the index provides a database-level guarantee.
create unique index if not exists one_baseline_per_farm
  on scenarios (farm_id) where is_baseline;

create index if not exists scenarios_farm_created_idx
  on scenarios (farm_id, created_at desc);

alter table scenarios enable row level security;

-- No public policies: scenario data is accessible only through the server API.
