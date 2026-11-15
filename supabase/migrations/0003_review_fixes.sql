-- Follow-up fixes from code review. Run after 0001 and 0002.
-- Written as a new migration so test projects that already applied 0002 can upgrade.

-- 1. Keep updated_at current on edit, so the studio lists recently edited records first.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger studio_content_set_updated_at
  before update on public.studio_content
  for each row execute function public.set_updated_at();

create trigger studio_campaigns_set_updated_at
  before update on public.studio_campaigns
  for each row execute function public.set_updated_at();

-- 2. Length limits that were only enforced in the app. Keep in sync with
--    LIMITS in src/features/studio/validation.ts.
alter table public.studio_content
  add constraint studio_content_url_length check (length(url) <= 2000);

alter table public.studio_campaigns
  add constraint studio_campaigns_notification_text_length check (length(notification_text) <= 500);

-- 3. Qualify the column in the organizations policy. Inside the subquery, a bare
--    "id" resolves to the nearest table that has one. Today that is organizations,
--    but if organization_memberships ever gains an id column, re-creating or
--    copying the original policy text would compare m.organization_id = m.id and
--    lock every member out. (Existing policies are not affected: Postgres binds
--    columns when the policy is created.) Tested on Postgres 16.
drop policy organizations_read_member on public.organizations;

create policy organizations_read_member on public.organizations
  for select to authenticated
  using (
    exists (
      select 1
      from public.organization_memberships m
      where m.organization_id = organizations.id
        and m.user_id = (select auth.uid())
    )
  );
