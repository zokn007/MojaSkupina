-- Run in Supabase SQL Editor. Each account gets a private workspace.
create table if not exists public.band_data (
 group_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.band_data enable row level security;
create policy "Owners can read" on public.band_data for select to authenticated using (auth.uid() = group_id);
create policy "Owners can create" on public.band_data for insert to authenticated with check (auth.uid() = group_id);
create policy "Owners can edit" on public.band_data for update to authenticated using (auth.uid() = group_id) with check (auth.uid() = group_id);
alter publication supabase_realtime add table public.band_data;
