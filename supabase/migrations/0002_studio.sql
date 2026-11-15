-- Admin-managed content and campaign records. No employee wellness data here.
create table public.studio_content (
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(trim(title)) between 1 and 160),
 kind text not null check(kind in ('video','recipe','article','activity')),
 pillar text not null check(pillar in ('move','nourish','thrive')),
 description text not null check(length(trim(description)) between 1 and 2000),
 url text not null default '',
 status text not null default 'draft' check(status in ('draft','published')),
 updated_at timestamptz not null default now()
);
create table public.studio_campaigns (
 id uuid primary key default gen_random_uuid(),
 title text not null check(length(trim(title)) between 1 and 160),
 start_date date not null,
 end_date date not null check(end_date >= start_date),
 audience text not null default 'all' check(audience in ('all','organizations')),
 status text not null default 'draft' check(status in ('draft','scheduled')),
 notification_text text not null default '',
 content_ids uuid[] not null default '{}',
 updated_at timestamptz not null default now()
);
alter table public.studio_content enable row level security;
alter table public.studio_campaigns enable row level security;
-- No general authenticated-user access. Server and RLS both verify platform_admin.
create policy studio_content_admin on public.studio_content for all to authenticated
 using(exists(select 1 from public.platform_roles p where p.user_id=(select auth.uid()) and p.role='platform_admin'))
 with check(exists(select 1 from public.platform_roles p where p.user_id=(select auth.uid()) and p.role='platform_admin'));
create policy studio_campaigns_admin on public.studio_campaigns for all to authenticated
 using(exists(select 1 from public.platform_roles p where p.user_id=(select auth.uid()) and p.role='platform_admin'))
 with check(exists(select 1 from public.platform_roles p where p.user_id=(select auth.uid()) and p.role='platform_admin'));
