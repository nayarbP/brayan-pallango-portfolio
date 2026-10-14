import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const envPath = path.join(root, 'backend', '.env');
const envText = fs.readFileSync(envPath, 'utf8');
const token = envText.match(/^GITHUB_TOKEN=(.+)$/m)?.[1]?.trim();
const username = envText.match(/^GITHUB_USERNAME=(.+)$/m)?.[1]?.trim() ?? 'nayarbP';

if (!token) {
  console.error('Missing GITHUB_TOKEN in backend/.env');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-setup-script',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function gh(url, options = {}) {
  const res = await fetch(url, { ...options, headers: { ...headers, ...options.headers } });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text };
  }
  return { ok: res.ok, status: res.status, json };
}

async function ensureRepo(name, description, isPrivate = false) {
  const check = await gh(`https://api.github.com/repos/${username}/${name}`);
  if (check.ok) {
    console.log(`Repo exists: ${username}/${name}`);
    return check.json.html_url;
  }

  const created = await gh('https://api.github.com/user/repos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      description,
      private: isPrivate,
      auto_init: name === username,
    }),
  });

  if (!created.ok) {
    throw new Error(`Create repo ${name} failed: ${created.status} ${JSON.stringify(created.json)}`);
  }

  console.log(`Created repo: ${created.json.html_url}`);
  return created.json.html_url;
}

async function upsertReadme(repoName, readmePath) {
  const content = fs.readFileSync(readmePath, 'utf8');
  const encoded = Buffer.from(content, 'utf8').toString('base64');

  const existing = await gh(
    `https://api.github.com/repos/${username}/${repoName}/contents/README.md`,
  );

  const body = {
    message: 'docs: refresh animated GitHub profile README',
    content: encoded,
    committer: {
      name: 'Brayan Pallango',
      email: 'pallangoruben2021@gmail.com',
    },
  };

  if (existing.ok && existing.json?.sha) {
    body.sha = existing.json.sha;
  }

  const updated = await gh(
    `https://api.github.com/repos/${username}/${repoName}/contents/README.md`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  if (!updated.ok) {
    throw new Error(
      `Update README on ${repoName} failed: ${updated.status} ${JSON.stringify(updated.json)}`,
    );
  }

  console.log(`Updated profile README: https://github.com/${username}/${repoName}`);
}

const user = await gh('https://api.github.com/user');
if (!user.ok) {
  console.error('Invalid GitHub token:', user.status, user.json);
  process.exit(1);
}
console.log(`Authenticated as: ${user.json.login}`);

await ensureRepo(
  'brayan-pallango-portfolio',
  'Full Stack portfolio — Next.js + NestJS',
  false,
);
await ensureRepo(username, 'GitHub Profile README', false);
await upsertReadme(username, path.join(root, 'github-profile', 'README.md'));

console.log('GitHub setup complete.');
