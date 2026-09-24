# ma77ball.com — personal website

A [Next.js](https://nextjs.org) site served at **https://ma77ball.com**, self-hosted
on the homelab edge (CT107) behind Cloudflare Tunnel + Traefik.

## Edit your site

Everything lives in `app/`:

- `app/page.tsx` — the homepage content (edit text, links, sections here).
- `app/globals.css` — styling / theme colors.
- `app/layout.tsx` — page title, description, `<head>` metadata.

Add pages by creating `app/<name>/page.tsx` (e.g. `app/about/page.tsx` → `/about`).

## Deploy

Just push to `main`:

```bash
git add -A && git commit -m "update site" && git push
```

A webhook on the edge server rebuilds and restarts the site within ~1–2 minutes
(the Docker image is rebuilt from this repo). No manual steps.

## Run locally (optional)

```bash
npm install
npm run dev     # http://localhost:3000
```

## How it's hosted

`git push` → GitHub webhook → `https://ma77ball.com/__deploy` (HMAC-verified) →
edge pulls this repo and runs `docker compose up -d --build` → Traefik serves the
new container at the apex domain.
