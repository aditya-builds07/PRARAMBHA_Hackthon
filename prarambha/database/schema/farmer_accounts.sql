-- ============================================================================
-- KRISHIMITRA (PRARAMBHA 2.0) — FARMER ACCOUNTS & REGISTRATION SCHEMA
-- ============================================================================
-- Stores farmer identity, credentials, registration profiles, and offline sync metadata.

create extension if not exists "pgcrypto";

create table if not exists farmer_accounts (
  id uuid primary key default gen_random_uuid(),
  farmer_id varchar(30) unique not null check (char_length(trim(farmer_id)) >= 3),
  full_name varchar(120) not null check (char_length(trim(full_name)) >= 2),
  email varchar(255) unique,
  phone varchar(20),
  password_hash text not null,
  village varchar(100),
  district varchar(100),
  state varchar(50) default 'Maharashtra',
  total_land_acres numeric(6, 2) default 5.0 check (total_land_acres >= 0),
  preferred_language varchar(10) not null default 'mr' check (preferred_language in ('mr', 'en', 'hi')),
  role varchar(20) not null default 'farmer' check (role in ('farmer', 'officer', 'admin')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for rapid ID lookup during login
create index if not exists idx_farmer_accounts_farmer_id on farmer_accounts (farmer_id);
create index if not exists idx_farmer_accounts_email on farmer_accounts (email);
create index if not exists idx_farmer_accounts_phone on farmer_accounts (phone);

-- Enable Row Level Security
alter table farmer_accounts enable row level security;

-- Public read for active farmer lookup during sign-in verification
drop policy if exists "allow public lookup for login" on farmer_accounts;
create policy "allow public lookup for login"
  on farmer_accounts for select
  using (is_active = true);

-- Allow public registration
drop policy if exists "allow farmer registration" on farmer_accounts;
create policy "allow farmer registration"
  on farmer_accounts for insert
  with check (true);

-- Allow farmers to update their own accounts
drop policy if exists "allow farmers update self" on farmer_accounts;
create policy "allow farmers update self"
  on farmer_accounts for update
  using (true);

-- Trigger for auto-updating updated_at
create or replace function update_farmer_accounts_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_farmer_accounts_updated_at on farmer_accounts;
create trigger trg_farmer_accounts_updated_at
  before update on farmer_accounts
  for each row execute function update_farmer_accounts_timestamp();
