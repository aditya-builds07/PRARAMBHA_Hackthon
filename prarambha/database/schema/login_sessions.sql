-- ============================================================================
-- KRISHIMITRA (PRARAMBHA 2.0) — LOGIN SESSIONS & AUTHENTICATION AUDIT
-- ============================================================================
-- Tracks active farmer sessions, token life cycle, and security audit logs.

create table if not exists login_sessions (
  id uuid primary key default gen_random_uuid(),
  farmer_id varchar(30) not null references farmer_accounts(farmer_id) on delete cascade,
  session_token text unique not null,
  ip_address inet,
  user_agent text,
  device_type varchar(50) default 'web',
  login_time timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  expires_at timestamptz not null,
  is_revoked boolean not null default false
);

create index if not exists idx_login_sessions_token on login_sessions (session_token);
create index if not exists idx_login_sessions_farmer_id on login_sessions (farmer_id);

-- Enable Row Level Security
alter table login_sessions enable row level security;

-- Policies
drop policy if exists "allow session verification" on login_sessions;
create policy "allow session verification"
  on login_sessions for select
  using (is_revoked = false);

drop policy if exists "allow session creation on login" on login_sessions;
create policy "allow session creation on login"
  on login_sessions for insert
  with check (true);

drop policy if exists "allow session revocation on logout" on login_sessions;
create policy "allow session revocation on logout"
  on login_sessions for update
  using (true);
