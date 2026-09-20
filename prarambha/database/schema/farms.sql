-- Farms are the ownership boundary for scenarios, resources and saved results.
-- auth_user_id stays nullable while the hackathon MVP supports guest mode.

create extension if not exists "pgcrypto";

create table if not exists farms (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid,
  name text not null check (char_length(trim(name)) between 1 and 80),
  region text,
  area_acres numeric(10,2) not null check (area_acres > 0 and area_acres <= 10000),
  water_profile text,
  available_water_m3 numeric(14,2) check (available_water_m3 is null or available_water_m3 >= 0),
  budget_inr numeric(14,2) check (budget_inr is null or budget_inr >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists farms_owner_created_idx on farms (auth_user_id, created_at desc);

alter table farms enable row level security;

-- There are intentionally no public farm policies. The server-side API uses
-- the Supabase service role; browser clients must never access farm data directly.
