create extension if not exists "pgcrypto";

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null,
  entity_type text not null check (entity_type in ('farm', 'scenario', 'resource')),
  entity_id uuid not null,
  action text not null check (action in ('CREATE', 'UPDATE', 'DELETE')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_logs_owner_created_idx on audit_logs (auth_user_id, created_at desc);
create index if not exists audit_logs_entity_idx on audit_logs (entity_type, entity_id, created_at desc);

alter table audit_logs enable row level security;

-- The API writes audit events with the service role; browser clients have no direct access.
