-- Transparent model weights and the required estimate disclaimer.

create table if not exists assumptions (
  key text primary key,
  value jsonb not null,
  description text not null,
  source text not null,
  version text not null default '1.0.0',
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table assumptions enable row level security;

drop policy if exists "public reads active assumptions" on assumptions;
create policy "public reads active assumptions"
  on assumptions for select using (active = true);
