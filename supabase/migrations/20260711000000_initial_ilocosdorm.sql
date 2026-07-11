create extension if not exists pgcrypto;

create type public.user_role as enum ('visitor', 'owner', 'admin');
create type public.gender_policy as enum ('male', 'female', 'mixed');
create type public.dorm_status as enum ('draft', 'pending', 'approved', 'rejected', 'unavailable');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 100),
  phone text,
  role public.user_role not null default 'visitor',
  is_suspended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.dorms (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  name text not null check (char_length(name) between 3 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null check (char_length(description) between 80 and 3000),
  monthly_price numeric(10,2) not null check (monthly_price >= 0),
  address text not null check (char_length(address) between 8 and 240),
  city text not null check (char_length(city) between 2 and 100),
  latitude numeric(9,6) not null check (latitude between -90 and 90),
  longitude numeric(9,6) not null check (longitude between -180 and 180),
  gender_policy public.gender_policy not null,
  status public.dorm_status not null default 'draft',
  contact_name text not null check (char_length(contact_name) between 2 and 100),
  contact_phone text not null check (char_length(contact_phone) between 7 and 30),
  contact_email text,
  rejection_reason text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint rejection_requires_reason check (status <> 'rejected' or nullif(trim(rejection_reason), '') is not null),
  constraint approval_requires_timestamp check (status <> 'approved' or approved_at is not null)
);

create table public.dorm_images (
  id uuid primary key default gen_random_uuid(),
  dorm_id uuid not null references public.dorms(id) on delete cascade,
  storage_path text not null unique,
  display_order smallint not null check (display_order between 0 and 4),
  created_at timestamptz not null default now(),
  unique (dorm_id, display_order)
);

create table public.amenities (
  id integer generated always as identity primary key,
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.dorm_amenities (
  dorm_id uuid not null references public.dorms(id) on delete cascade,
  amenity_id integer not null references public.amenities(id) on delete restrict,
  primary key (dorm_id, amenity_id)
);

create table public.moderation_logs (
  id uuid primary key default gen_random_uuid(),
  dorm_id uuid not null references public.dorms(id) on delete cascade,
  admin_id uuid not null references public.profiles(id) on delete restrict,
  previous_status public.dorm_status,
  new_status public.dorm_status not null,
  reason text,
  created_at timestamptz not null default now()
);

create index dorms_owner_id_idx on public.dorms(owner_id);
create index dorms_status_created_at_idx on public.dorms(status, created_at desc);
create index dorms_city_idx on public.dorms(city);
create index dorms_monthly_price_idx on public.dorms(monthly_price);
create index dorms_gender_policy_idx on public.dorms(gender_policy);
create index dorm_images_dorm_id_idx on public.dorm_images(dorm_id);
create index moderation_logs_dorm_id_idx on public.moderation_logs(dorm_id);
create index moderation_logs_admin_id_idx on public.moderation_logs(admin_id);

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin' and not is_suspended
  );
$$;
revoke all on function private.is_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

create or replace function private.is_active_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('owner', 'admin') and not is_suspended
  );
$$;
revoke all on function private.is_active_owner() from public;
grant execute on function private.is_active_owner() to authenticated;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'New user'));
  return new;
end;
$$;
revoke all on function private.handle_new_user() from public;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure private.handle_new_user();

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute procedure private.set_updated_at();
create trigger dorms_set_updated_at before update on public.dorms
for each row execute procedure private.set_updated_at();

alter table public.profiles enable row level security;
alter table public.dorms enable row level security;
alter table public.dorm_images enable row level security;
alter table public.amenities enable row level security;
alter table public.dorm_amenities enable row level security;
alter table public.moderation_logs enable row level security;

grant select on public.amenities to anon, authenticated;
grant select on public.dorms, public.dorm_images, public.dorm_amenities to anon;
grant select, insert, update, delete on public.dorms, public.dorm_images, public.dorm_amenities to authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.amenities, public.moderation_logs to authenticated;

create policy "approved dorms are public"
on public.dorms for select to anon, authenticated
using (status = 'approved' or owner_id = (select auth.uid()) or (select private.is_admin()));

create policy "active owners create drafts or pending listings"
on public.dorms for insert to authenticated
with check (
  owner_id = (select auth.uid())
  and status in ('draft', 'pending')
  and (select private.is_active_owner())
);

create policy "owners update owned listings"
on public.dorms for update to authenticated
using (owner_id = (select auth.uid()) and (select private.is_active_owner()))
with check (owner_id = (select auth.uid()) and status in ('draft', 'pending', 'unavailable') and (select private.is_active_owner()));

create policy "owners delete owned unreviewed listings"
on public.dorms for delete to authenticated
using (owner_id = (select auth.uid()) and status in ('draft', 'rejected') and (select private.is_active_owner()));

create policy "admins manage all dorms"
on public.dorms for all to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy "users read own profile and admins read all"
on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select private.is_admin()));

create policy "users update own profile and admins manage profiles"
on public.profiles for update to authenticated
using (id = (select auth.uid()) or (select private.is_admin()))
with check (id = (select auth.uid()) or (select private.is_admin()));

revoke update on public.profiles from authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

create policy "public reads approved dorm images"
on public.dorm_images for select to anon, authenticated
using (exists (select 1 from public.dorms d where d.id = dorm_id and (d.status = 'approved' or d.owner_id = (select auth.uid()) or (select private.is_admin()))));

create policy "owners add images to owned dorms"
on public.dorm_images for insert to authenticated
with check (
  (select private.is_active_owner())
  and exists (select 1 from public.dorms d where d.id = dorm_id and d.owner_id = (select auth.uid()))
  and (select count(*) from public.dorm_images existing where existing.dorm_id = dorm_id) < 5
);

create policy "owners manage owned dorm images"
on public.dorm_images for update to authenticated
using (exists (select 1 from public.dorms d where d.id = dorm_id and d.owner_id = (select auth.uid())) or (select private.is_admin()))
with check (exists (select 1 from public.dorms d where d.id = dorm_id and d.owner_id = (select auth.uid())) or (select private.is_admin()));

create policy "owners delete owned dorm images"
on public.dorm_images for delete to authenticated
using (exists (select 1 from public.dorms d where d.id = dorm_id and d.owner_id = (select auth.uid())) or (select private.is_admin()));

create policy "amenities are public"
on public.amenities for select to anon, authenticated using (true);

create policy "admins manage amenities"
on public.amenities for all to authenticated
using ((select private.is_admin())) with check ((select private.is_admin()));

create policy "dorm amenity links follow dorm visibility"
on public.dorm_amenities for select to anon, authenticated
using (exists (select 1 from public.dorms d where d.id = dorm_id and (d.status = 'approved' or d.owner_id = (select auth.uid()) or (select private.is_admin()))));

create policy "owners manage owned dorm amenities"
on public.dorm_amenities for all to authenticated
using (exists (select 1 from public.dorms d where d.id = dorm_id and d.owner_id = (select auth.uid())) or (select private.is_admin()))
with check (exists (select 1 from public.dorms d where d.id = dorm_id and d.owner_id = (select auth.uid())) or (select private.is_admin()));

create policy "admins read moderation logs"
on public.moderation_logs for select to authenticated using ((select private.is_admin()));

create policy "admins add moderation logs"
on public.moderation_logs for insert to authenticated with check ((select private.is_admin()) and admin_id = (select auth.uid()));

create or replace function public.request_owner_access()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select auth.uid()) is null then raise exception 'Authentication required'; end if;
  update public.profiles set role = 'owner' where id = (select auth.uid()) and role = 'visitor';
end;
$$;
revoke all on function public.request_owner_access() from public, anon;
grant execute on function public.request_owner_access() to authenticated;

create or replace function public.moderate_dorm(target_dorm_id uuid, next_status public.dorm_status, moderation_reason text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare current_status public.dorm_status;
begin
  if not private.is_admin() then raise exception 'Administrator access required'; end if;
  if next_status not in ('approved', 'rejected', 'unavailable') then raise exception 'Invalid moderation status'; end if;
  if next_status = 'rejected' and nullif(trim(moderation_reason), '') is null then raise exception 'A rejection reason is required'; end if;
  select status into current_status from public.dorms where id = target_dorm_id for update;
  update public.dorms set
    status = next_status,
    rejection_reason = case when next_status = 'rejected' then moderation_reason else null end,
    approved_at = case when next_status = 'approved' then now() else approved_at end,
    reviewed_by = (select auth.uid())
  where id = target_dorm_id;
  insert into public.moderation_logs (dorm_id, admin_id, previous_status, new_status, reason)
  values (target_dorm_id, (select auth.uid()), current_status, next_status, moderation_reason);
end;
$$;
revoke all on function public.moderate_dorm(uuid, public.dorm_status, text) from public, anon;
grant execute on function public.moderate_dorm(uuid, public.dorm_status, text) to authenticated;

create or replace function public.set_user_suspension(target_user_id uuid, suspended boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.is_admin() then raise exception 'Administrator access required'; end if;
  if target_user_id = (select auth.uid()) then raise exception 'Administrators cannot suspend themselves'; end if;
  update public.profiles set is_suspended = suspended where id = target_user_id;
end;
$$;
revoke all on function public.set_user_suspension(uuid, boolean) from public, anon;
grant execute on function public.set_user_suspension(uuid, boolean) to authenticated;

insert into public.amenities (name, slug) values
  ('Wi-Fi', 'wifi'),
  ('Private bathroom', 'private-bathroom'),
  ('Air conditioning', 'air-conditioning'),
  ('Kitchen', 'kitchen'),
  ('Parking', 'parking'),
  ('Laundry area', 'laundry-area'),
  ('Study area', 'study-area'),
  ('CCTV', 'cctv'),
  ('Water included', 'water-included'),
  ('Electricity included', 'electricity-included');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('dorm-images', 'dorm-images', true, 1048576, array['image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "owners upload to assigned dorm image path"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'dorm-images'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and (select private.is_active_owner())
);

create policy "owners update their dorm images"
on storage.objects for update to authenticated
using (bucket_id = 'dorm-images' and owner_id = (select auth.uid())::text)
with check (bucket_id = 'dorm-images' and owner_id = (select auth.uid())::text);

create policy "owners delete their dorm images"
on storage.objects for delete to authenticated
using (bucket_id = 'dorm-images' and (owner_id = (select auth.uid())::text or (select private.is_admin())));
