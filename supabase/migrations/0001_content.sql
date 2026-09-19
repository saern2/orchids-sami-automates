-- 0001_content: projects, testimonials, site_settings with RLS (read published only).
create extension if not exists pgcrypto;

create table projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  subtitle      text,
  client_name   text,                             -- e.g. "Elite VCM"; null = not named
  client_public boolean not null default false,   -- false -> public page shows "Private client"
  category      text not null,                    -- free text ("Voice AI", "Automation", ...)
  summary       text not null,                    -- card text, <= 200 chars
  body          text not null,                    -- modal text, paragraphs separated by blank lines
  features      text[] not null default '{}',
  results       text[] not null default '{}',     -- only real, stated outcomes
  stack         text[] not null default '{}',
  use_case      text,
  cover_url     text,                             -- full URL (Supabase storage public URL or external)
  gallery_urls  text[] not null default '{}',
  featured      boolean not null default false,
  published     boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint projects_summary_length check (char_length(summary) <= 200)
);
create index projects_published_featured_sort_idx on projects (published, featured, sort_order);

create table testimonials (
  id          uuid primary key default gen_random_uuid(),
  author      text not null,                      -- reviewer handle or name
  source      text not null default 'Fiverr',
  country     text,
  rating      numeric(2,1),
  quote       text not null,
  source_url  text,
  published   boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table site_settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- updated_at maintenance
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on projects
  for each row execute function set_updated_at();

create trigger testimonials_set_updated_at
  before update on testimonials
  for each row execute function set_updated_at();

create trigger site_settings_set_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- Row level security. Public (anon + authenticated) may READ published rows only.
-- No write policies at all: every write uses the service role from server code.
alter table projects      enable row level security;
alter table testimonials  enable row level security;
alter table site_settings enable row level security;

create policy "public read published projects"     on projects      for select using (published);
create policy "public read published testimonials" on testimonials  for select using (published);
create policy "public read settings"               on site_settings for select using (true);
