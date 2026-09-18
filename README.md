# Sami Automates

Marketing site for Sami Automates (AI agents and workflow automation). Single-page
Next.js 15 App Router site with a server-side contact endpoint that forwards
submissions to an n8n webhook.

Stack: Next.js 15, React 19, Tailwind CSS 4, framer-motion, zod. Package manager: **npm**
(`package-lock.json` is the lockfile; do not use bun/yarn/pnpm).

## Commands

```bash
npm ci          # install exactly what package-lock.json says (use this in CI/hosting)
npm run dev     # local dev server on http://localhost:3000
npm run lint    # ESLint (next lint)
npx tsc --noEmit
npm run build   # production build; fails on type or lint errors
npm start       # serve the production build (reads process.env.PORT, default 3000)
```

Node.js 20 or newer is required (`engines.node`).

## Environment variables

Copy `.env.example` to `.env.local` for local work. Never commit real values.

| Variable | Where used | Notes |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | server only (`/api/contact`) | n8n webhook that receives `{ name, email, phone, message }` as JSON. If unset, the form returns "not configured" (HTTP 500). |
| `NEXT_PUBLIC_SITE_URL` | build time | Public origin, no trailing slash (e.g. `https://samiautomates.com`). Used for `metadataBase`, Open Graph URLs, `robots.txt` and `sitemap.xml`. Falls back to `http://localhost:3000` when unset. Must be present when `npm run build` runs. |

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
5. **Environment variables**: add `CONTACT_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL` (or use
   "Import .env"). They are injected at build and run time. `NEXT_PUBLIC_SITE_URL` must be
   set **before** the first build because it is inlined.
6. Deploy. **Auto-deployment** on push to `main` is enabled automatically for Git-connected
   apps (shown as an "Auto-deployment" chip on the dashboard); use **Redeploy** for a manual
   run. **unverified**: whether it can be toggled off.
7. After the first deploy, open `/`, `/robots.txt`, `/sitemap.xml` and submit the contact
   form once to confirm the webhook receives it.

Notes:

- The Hostinger filesystem is replaced on every deploy (`hbuilds/<version>`); nothing
  written at runtime survives. Uploaded content must live in external storage.
- Build and install each have a 15-minute limit; the Business plan has 3 GB RAM.
- Do not set `output: "export"`; the site needs the Node runtime for `/api/contact`.
- `next.config.ts` must export a plain object (it does), not a function.

## Required asset not in the repo

`public/sami.png` (400×400 headshot) is referenced by the About section and must be added.
