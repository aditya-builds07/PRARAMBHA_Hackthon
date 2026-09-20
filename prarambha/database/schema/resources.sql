-- Farm resources are compared with scenario requirements by the readiness service.

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  farm_id uuid not null references farms(id) on delete cascade,
  resource_type text not null check (resource_type in ('budget', 'water', 'seed', 'fertilizer', 'other')),
  label text not null check (char_length(trim(label)) between 1 and 80),
  available_quantity numeric(14,2) not null check (available_quantity >= 0),
  unit text not null check (char_length(trim(unit)) between 1 and 30),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (farm_id, resource_type, label)
);

create index if not exists resources_farm_idx on resources (farm_id, resource_type);

alter table resources enable row level security;

-- No public policies: the backend API owns resource mutations and readiness checks.
