# Deploy on Vercel

The **frontend** includes API routes (`/api/portfolio`, `/api/github/stats`), so you only need Vercel for the live site.

## 1. Import project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import GitHub repo: `nayarbP/brayan-pallango-portfolio`
3. **Root Directory:** `frontend`
4. Framework: Next.js (auto-detected)

## 2. Environment variables

In **Project → Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `GITHUB_USERNAME` | `nayarbP` |
| `GITHUB_TOKEN` | Your GitHub PAT (read-only is enough for stats) |

Do **not** set `NEXT_PUBLIC_API_URL` on Vercel (the app uses built-in `/api` routes).

## 3. Deploy

Click **Deploy**, or push to `main` if Git integration is enabled.

## Local development

- **Next-only:** remove or comment `NEXT_PUBLIC_API_URL` in `frontend/.env.local` → uses `/api/*`
- **Nest + Next:** keep `NEXT_PUBLIC_API_URL=http://localhost:4000/api` and run `npm run dev` from the repo root
