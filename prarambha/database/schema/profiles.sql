-- Mirrors auth.users so the backend can store display names and preferences
-- without directly mutating the auth schema.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(trim(display_name)) between 1 and 80),
  preferred_language text not null default 'en' check (preferred_language in ('en', 'hi', 'mr')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- A user can read and update only their own profile.
drop policy if exists "users read own profile" on profiles;
create policy "users read own profile"
  on profiles for select using (auth.uid() = id);

drop policy if exists "users update own profile" on profiles;
create policy "users update own profile"
  on profiles for update using (auth.uid() = id);

-- The backend service role creates the profile row on first login.
