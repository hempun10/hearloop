#!/usr/bin/env bun
// Resets the local e2e fixture Kane tests rely on: user e2e@hearloop.test, board /acme with known posts.
// The password lives in .testmuai/variables/e2e.json (gitignored); Kane loads that file on every run.
import { $ } from 'bun'

const APP = process.env.APP_URL ?? 'http://localhost:3000'
const VARS = '.testmuai/variables/e2e.json'
const EMAIL = 'e2e@hearloop.test'

const file = Bun.file(VARS)
let password: string
if (await file.exists()) password = (await file.json()).e2e_password.value
else {
  password = 'e2e-' + crypto.randomUUID().slice(0, 13)
  await Bun.write(VARS, JSON.stringify({
    base_url: { value: APP, secret: false },
    e2e_email: { value: EMAIL, secret: false },
    e2e_password: { value: password, secret: true }, // secret: kept out of the recorded _test.md
  }, null, 2))
}

// sign up (a 422 for an existing user is fine)
await fetch(`${APP}/api/auth/sign-up/email`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: APP },
  body: JSON.stringify({ email: EMAIL, password, name: 'E2E Tester' }),
})

const sql = `
DELETE FROM runs WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme');
DELETE FROM changelog WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme');
DELETE FROM posts WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM members WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM orgs WHERE slug = 'acme';
INSERT INTO orgs (slug, name, tagline) VALUES ('acme', 'Acme', 'Tell us what to build next.');
INSERT INTO members (org_id, user_id, role) SELECT o.id, u.id, 'owner' FROM orgs o, user u WHERE o.slug = 'acme' AND u.email = '${EMAIL}';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Dark mode toggle', 'A toggle in the header that switches theme and remembers it.', 'planned', 12 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Search the board', 'Filter posts by title as I type.', 'shipped', 9 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Export posts to CSV', 'One click export from the dashboard.', 'open', 7 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Slack notifications', 'Post to a channel when a request ships.', 'building', 5 FROM orgs WHERE slug = 'acme';
INSERT INTO runs (post_id, passed, summary) SELECT p.id, 1, 'Kane: passed (Objective completed)' || char(10) || 'Typed in the search box and only matching requests stayed.' FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme' AND p.title = 'Search the board';
INSERT INTO changelog (post_id, title, body) SELECT p.id, p.title, 'You can now search the board as you type.' FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme' AND p.title = 'Search the board';
`
await $`bunx wrangler d1 execute hearloop-v2 --local --command ${sql}`.quiet()
console.log(`e2e fixture ready: ${EMAIL} on ${APP}/acme`)
