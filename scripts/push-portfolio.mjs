import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const envText = fs.readFileSync(path.join(root, 'backend', '.env'), 'utf8');
const token = envText.match(/^GITHUB_TOKEN=(.+)$/m)?.[1]?.trim();
const username = envText.match(/^GITHUB_USERNAME=(.+)$/m)?.[1]?.trim() ?? 'nayarbP';

if (!token) process.exit(1);

const remote = `https://${username}:${token}@github.com/${username}/brayan-pallango-portfolio.git`;

try {
  execSync(`git remote add origin ${remote}`, { cwd: root, stdio: 'inherit' });
} catch {
  execSync(`git remote set-url origin ${remote}`, { cwd: root, stdio: 'inherit' });
}

execSync('git push -u origin main', { cwd: root, stdio: 'inherit' });
console.log('Pushed to GitHub.');
