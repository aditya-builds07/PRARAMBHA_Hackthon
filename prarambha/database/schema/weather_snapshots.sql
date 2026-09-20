-- Point-in-time weather snapshots fetched from Open-Meteo and stored against
-- a farm for audit and offline scenario re-run purposes.

create table if not exists weather_snapshots (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references farms(id) on delete cascade,
  fetched_at timestamptz not null default now(),
  source text not null default 'open_meteo',
  latitude numeric(9,6),
  longitude numeric(9,6),
  condition text check (condition in ('good', 'normal', 'poor')),
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists weather_snapshots_farm_idx
  on weather_snapshots (farm_id, fetched_at desc);

alter table weather_snapshots enable row level security;

-- No public policies: weather snapshots are accessible only via the service API.
