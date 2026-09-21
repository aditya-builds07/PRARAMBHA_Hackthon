-- Preserve the crop cycle entered in the farm form.
alter table if exists public.farms
  add column if not exists crop_cycle text;
