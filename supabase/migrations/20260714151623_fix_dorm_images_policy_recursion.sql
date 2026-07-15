grant usage on schema private to anon;
grant execute on function private.is_admin() to anon;

drop policy if exists "owners add images to owned dorms" on public.dorm_images;

create policy "owners add images to owned dorms"
on public.dorm_images for insert to authenticated
with check (
  (select private.is_active_owner())
  and exists (
    select 1
    from public.dorms d
    where d.id = dorm_id
      and d.owner_id = (select auth.uid())
  )
);
