# Brayan Pallango — Full Stack Portfolio

Monorepo with **Next.js** (frontend) and **NestJS** (API).

## Live sections

- Profile, experience, projects, skills, certifications, education, contact
- **GitHub activity** (repos, contributions, stars, recent events)
- **CV download** (PDF)

## Repositories

- Project: [github.com/nayarbP/brayan-pallango-portfolio](https://github.com/nayarbP/brayan-pallango-portfolio)
- Profile README: [github.com/nayarbP/nayarbP](https://github.com/nayarbP/nayarbP)

## Development

```bash
npm install
cp backend/.env.example backend/.env
# Set GITHUB_TOKEN and GITHUB_USERNAME in backend/.env
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000/api/portfolio
- GitHub stats: http://localhost:4000/api/github/stats

## Environment variables (backend)

| Variable | Description |
|---|---|
| `GITHUB_USERNAME` | GitHub login (default `nayarbP`) |
| `GITHUB_TOKEN` | PAT with `read:user` and repo read scopes for stats |
| `PORT` | API port (default `4000`) |

Never commit `backend/.env`.
