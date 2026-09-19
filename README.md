# Sami Automates

Marketing site for Sami Automates (AI agents and workflow automation). Single-page
Next.js 15 App Router site. Portfolio content lives in Supabase (Postgres + Storage +
Auth) and is managed through a small admin panel at `/admin`. The contact form posts to a
server endpoint that forwards to an n8n webhook.

Stack: Next.js 15, React 19, Tailwind CSS 4, framer-motion, zod, Supabase. Package
manager: **npm** (`package-lock.json` is the lockfile; do not use bun/yarn/pnpm).

## Commands

```bash
npm ci               # install exactly what package-lock.json says (use this in CI/hosting)
npm run dev          # local dev server on http://localhost:3000
npm run lint         # ESLint (next lint)
npx tsc --noEmit
npm run build        # production build; fails on type or lint errors
npm start            # serve the production build (reads process.env.PORT, default 3000)
npm run db:migrate   # LOCAL ONLY: apply supabase/migrations/*.sql, ensure the media bucket
npm run db:seed      # LOCAL ONLY: idempotent content seed (projects + site settings)
```

Node.js 20 or newer is required (`engines.node`).

## Environment variables

Copy `.env.example` to `.env.local` for local work. Never commit real values.

| Variable | When | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Public origin, no trailing slash. Used for `metadataBase`, Open Graph URLs, `robots.txt`, `sitemap.xml`. Falls back to `http://localhost:3000`. |
| `NEXT_PUBLIC_SUPABASE_URL` | build | `https://<ref>.supabase.co`. Also read by `next.config.ts` (the build fails without it). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | build | Anon / publishable key. Public reads only; RLS exposes published rows. |
| `SUPABASE_SERVICE_ROLE_KEY` | runtime, server only | Used by admin server actions and `/api/admin/upload`. Never reaches the browser. |
| `ADMIN_EMAIL` | runtime, server only | The single email allowed into `/admin` (case-insensitive). |
| `CONTACT_WEBHOOK_URL` | runtime, server only | n8n webhook that receives `{ name, email, phone, message }` from `/api/contact`. |
| `SUPABASE_DB_URL` | **local only** | Postgres connection string for `npm run db:migrate`. Use the Session pooler string from Supabase → Connect (IPv4). **Do not add this on Hostinger.** |

`NEXT_PUBLIC_*` values are inlined at build time, so they must exist before `npm run build`
runs. Runtime values are read by the server on each request.

## Content model

`supabase/migrations/0001_content.sql` creates `projects`, `testimonials` and
`site_settings` with `updated_at` triggers and row level security: anyone may read
published rows (and settings); there are no write policies, so every write goes through
server code using the service role. Uploaded images go to the public `media` bucket
(created by `npm run db:migrate`) under `projects/<slug>/<uuid>.<ext>`.

The public page reads through `src/lib/content.ts` (cached, tag `content`). Every admin
write calls `revalidateTag("content")`, so the site updates immediately without a
redeploy.

## Admin panel

- Sign in at `/admin/login` with the Supabase Auth user whose email equals `ADMIN_EMAIL`.
  Sign-ups are disabled in Supabase; there is no password reset on the site. To reset the
  password, use Supabase → Authentication → Users.
- **Adding a project:** Projects → New project. Fill in title (the slug fills itself),
  category, summary (max 200 characters), the description and the one-per-line lists.
  Click **Upload cover** to store an image (JPEG/PNG/WebP up to 5 MB) or paste an image URL.
  Turn on **Published** and, to show it on the home page, **Featured**, then **Create
  project**. Use the arrows in the list to reorder; the home page shows featured projects in
  that order.
- Deleting a project also deletes its uploaded files under `media/projects/<slug>/`.

## Contact form

The browser posts to `POST /api/contact`. The route validates with zod (name 2–100,
email, optional phone up to 30 chars, message 10–2000), drops requests where the hidden
`website` honeypot field is filled (responds 200, forwards nothing), caps the body at 16 KB,
rate-limits to 5 requests per IP per 10 minutes (in-memory, per process, resets on restart),
and forwards valid submissions to `CONTACT_WEBHOOK_URL` with a 10-second timeout.

## Deploying on Hostinger (Business web hosting, Node.js web app)

Steps below follow Hostinger's documentation as of 2026-09-18
(docs.hostinger.com/node.js). Items marked **unverified** were not checked against the
live hPanel UI.

1. hPanel → **Websites** → **Add Website** → **Node.js web app** (older support pages call
   it "Deploy Web App").
2. Choose **Import Git repository** → **Connect with GitHub**. This installs the Hostinger
   GitHub App on the GitHub account; grant it access to `saern2/orchids-sami-automates`.
3. Select repository `saern2/orchids-sami-automates`, branch **`main`**, root directory `/`.
4. Build settings:
   - Framework preset: **Next.js** (auto-detected from `package.json`).
   - Build script: `build` (runs `npm run build`).
   - Node.js version: **20** (18/20/22/24 are offered; the default is 22, either works).
   - Package manager: **npm** (detected from `package-lock.json`).
   - There is no separate start-command field for Next.js: Hostinger forces
     `output: "standalone"` at build time and runs the generated server itself, listening on
     the port it assigns via `PORT`. `npm start` is used only for local checks.
   - **unverified**: whether an install command field exists (docs mention `npm install`
     only).
5. **Environment variables** (add before the first build; "Import .env" also works):
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `CONTACT_WEBHOOK_URL`

   Do **not** add `SUPABASE_DB_URL`; migrations run from a developer machine only.
6. Deploy. **Auto-deployment** on push to `main` is enabled automatically for Git-connected
   apps (shown as an "Auto-deployment" chip on the dashboard); use **Redeploy** for a manual
   run. **unverified**: whether it can be toggled off.
7. After the first deploy, open `/`, `/robots.txt`, `/sitemap.xml`, sign in at
   `/admin/login`, and submit the contact form once to confirm the webhook receives it.

Notes:

- The Hostinger filesystem is replaced on every deploy (`hbuilds/<version>`); nothing
  written at runtime survives. That is why images live in Supabase Storage.
- Build and install each have a 15-minute limit; the Business plan has 3 GB RAM.
- Do not set `output: "export"`; the site needs the Node runtime for `/api/*`, the
  middleware and server actions. The middleware is configured for the Node.js runtime; no
  route exports `runtime = "edge"`.
- `next.config.ts` must export a plain object (it does), not a function.
