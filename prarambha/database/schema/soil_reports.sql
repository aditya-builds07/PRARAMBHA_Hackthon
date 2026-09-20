-- OCR-extracted or manually entered soil test results linked to a farm.

create table if not exists soil_reports (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references farms(id) on delete cascade,
  report_date date,
  ph numeric(4,2) check (ph is null or (ph between 0 and 14)),
  nitrogen_kg_per_acre numeric(10,2) check (nitrogen_kg_per_acre is null or nitrogen_kg_per_acre >= 0),
  phosphorus_kg_per_acre numeric(10,2) check (phosphorus_kg_per_acre is null or phosphorus_kg_per_acre >= 0),
  potassium_kg_per_acre numeric(10,2) check (potassium_kg_per_acre is null or potassium_kg_per_acre >= 0),
  organic_matter_percent numeric(5,2) check (organic_matter_percent is null or organic_matter_percent >= 0),
  raw_text text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists soil_reports_farm_idx
  on soil_reports (farm_id, created_at desc);

alter table soil_reports enable row level security;

-- No public policies: soil data is accessible only via the service API.
