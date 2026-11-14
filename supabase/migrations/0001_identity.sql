-- Identity and tenant foundation. Run using Supabase SQL migration tooling.
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  created_at timestamptz not null default now()
);
create table public.organization_memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check(role in ('member','employer_admin','trainer')),
  primary key (organization_id,user_id)
);
create table public.platform_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check(role in ('platform_admin')),
  primary key(user_id,role)
);

alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.platform_roles enable row level security;

-- No browser-side writes to organizations, memberships, or platform roles.
-- Privileged provisioning must be performed through audited server workflows.
create policy organizations_read_member on public.organizations for select to authenticated
  using (exists(select 1 from public.organization_memberships m where m.organization_id=id and m.user_id=(select auth.uid())));
create policy membership_read_own on public.organization_memberships for select to authenticated
  using (user_id=(select auth.uid()));
create policy platform_roles_read_own on public.platform_roles for select to authenticated
  using (user_id=(select auth.uid()));

create index organization_memberships_user_idx on public.organization_memberships(user_id);
