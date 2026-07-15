create type public.owner_application_status as enum ('pending', 'approved', 'rejected');
create type public.owner_relationship as enum ('owner', 'manager', 'authorized_representative');

create table public.owner_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  phone text not null check (char_length(phone) between 7 and 30),
  property_address text not null check (char_length(property_address) between 8 and 240),
  relationship public.owner_relationship not null,
  document_path text not null unique,
  status public.owner_application_status not null default 'pending',
  rejection_reason text,
  reviewed_by uuid references public.profiles(id) on delete restrict,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint owner_application_rejection_requires_reason check (
    status <> 'rejected' or nullif(trim(rejection_reason), '') is not null
  ),
  constraint owner_application_review_fields_match_status check (
    (status = 'pending' and reviewed_by is null and reviewed_at is null)
    or (status in ('approved', 'rejected') and reviewed_by is not null and reviewed_at is not null)
  )
);

create index owner_applications_user_id_created_at_idx
on public.owner_applications(user_id, created_at desc);

create index owner_applications_status_submitted_at_idx
on public.owner_applications(status, submitted_at);

create index owner_applications_reviewed_by_idx
on public.owner_applications(reviewed_by);

create unique index owner_applications_one_pending_per_user_idx
on public.owner_applications(user_id)
where status = 'pending';

create trigger owner_applications_set_updated_at
before update on public.owner_applications
for each row execute procedure private.set_updated_at();

alter table public.owner_applications enable row level security;

revoke all on table public.owner_applications from anon, authenticated;
grant select on table public.owner_applications to authenticated;
grant insert (user_id, phone, property_address, relationship, document_path)
on table public.owner_applications to authenticated;

create or replace function private.can_submit_owner_application()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    exists (
      select 1
      from public.profiles
      where id = (select auth.uid())
        and role = 'visitor'
        and not is_suspended
    )
    and not exists (
      select 1
      from public.owner_applications
      where user_id = (select auth.uid())
        and status = 'pending'
    )
    and (
      select count(*)
      from public.owner_applications
      where user_id = (select auth.uid())
        and created_at >= now() - interval '30 days'
    ) < 3;
$$;
revoke all on function private.can_submit_owner_application() from public, anon;
grant execute on function private.can_submit_owner_application() to authenticated;

create policy "applicants read their owner applications"
on public.owner_applications for select to authenticated
using (
  user_id = (select auth.uid())
  or (select private.is_admin())
);

create policy "visitors submit owner applications"
on public.owner_applications for insert to authenticated
with check (
  user_id = (select auth.uid())
  and status = 'pending'
  and reviewed_by is null
  and reviewed_at is null
  and (select private.can_submit_owner_application())
);

create or replace function public.review_owner_application(
  target_application_id uuid,
  next_status public.owner_application_status,
  review_reason text default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  applicant_id uuid;
  applicant_phone text;
begin
  if not private.is_admin() then
    raise exception 'Administrator access required';
  end if;

  if next_status not in ('approved', 'rejected') then
    raise exception 'Applications can only be approved or rejected';
  end if;

  if next_status = 'rejected' and nullif(trim(review_reason), '') is null then
    raise exception 'A rejection reason is required';
  end if;

  select user_id, phone
  into applicant_id, applicant_phone
  from public.owner_applications
  where id = target_application_id
    and status = 'pending'
  for update;

  if applicant_id is null then
    raise exception 'Pending owner application not found';
  end if;

  if next_status = 'approved' and not exists (
    select 1
    from public.profiles
    where id = applicant_id and not is_suspended
  ) then
    raise exception 'Suspended users cannot be approved';
  end if;

  update public.owner_applications
  set
    status = next_status,
    rejection_reason = case when next_status = 'rejected' then trim(review_reason) else null end,
    reviewed_by = (select auth.uid()),
    reviewed_at = now()
  where id = target_application_id;

  if next_status = 'approved' then
    update public.profiles
    set role = 'owner', phone = applicant_phone
    where id = applicant_id and role = 'visitor' and not is_suspended;

    if not found then
      raise exception 'Only active visitor accounts can become owners';
    end if;
  end if;
end;
$$;
revoke all on function public.review_owner_application(
  uuid,
  public.owner_application_status,
  text
) from public, anon;
grant execute on function public.review_owner_application(
  uuid,
  public.owner_application_status,
  text
) to authenticated;

revoke all on function public.request_owner_access() from authenticated;
drop function public.request_owner_access();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'owner-verification',
  'owner-verification',
  false,
  1048576,
  array['application/pdf', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "applicants upload owner verification documents"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'owner-verification'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and (select private.can_submit_owner_application())
);

create policy "applicants and admins read owner verification documents"
on storage.objects for select to authenticated
using (
  bucket_id = 'owner-verification'
  and (
    owner_id = (select auth.uid())::text
    or (select private.is_admin())
  )
);

create policy "applicants delete unused owner verification documents"
on storage.objects for delete to authenticated
using (
  bucket_id = 'owner-verification'
  and owner_id = (select auth.uid())::text
  and not exists (
    select 1
    from public.owner_applications
    where document_path = storage.objects.name
  )
);
