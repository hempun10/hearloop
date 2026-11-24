#!/usr/bin/env bun
// Resets the local e2e fixture Kane tests rely on: user e2e@hearloop.test, board /acme with known posts.
// The password lives in .testmuai/variables/e2e.json (gitignored); Kane loads that file on every run.
import { $ } from 'bun'

const APP = process.env.APP_URL ?? 'http://localhost:3000'
const VARS = '.testmuai/variables/e2e.json'
const EMAIL = 'e2e@hearloop.test'
const NONMEMBER = 'nonmember@hearloop.test' // signed in, but not a member of /acme
const LONG_TITLE = 'Supercalifragilisticexpialidociousintegrationwitheverythingplease'

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
const signUp = (email: string, pw: string, name: string) => fetch(`${APP}/api/auth/sign-up/email`, {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: APP },
  body: JSON.stringify({ email, password: pw, name }),
})
await signUp(EMAIL, password, 'E2E Tester')
await signUp(NONMEMBER, password, 'Not A Member')

const sql = `
DELETE FROM comments WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug IN ('acme', 'globex') OR o.slug LIKE 'kane-board-%');
DELETE FROM post_tags WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug IN ('acme', 'globex') OR o.slug LIKE 'kane-board-%');
DELETE FROM runs WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme');
DELETE FROM changelog WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme');
DELETE FROM post_votes WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug IN ('acme', 'globex') OR o.slug LIKE 'kane-board-%');
DELETE FROM posts WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM members WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM api_tokens WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM orgs WHERE slug = 'acme';
DELETE FROM runs WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'globex' OR o.slug LIKE 'kane-board-%');
DELETE FROM changelog WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'globex' OR o.slug LIKE 'kane-board-%');
DELETE FROM posts WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'globex' OR slug LIKE 'kane-board-%');
DELETE FROM members WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'globex' OR slug LIKE 'kane-board-%');
DELETE FROM orgs WHERE slug = 'globex' OR slug LIKE 'kane-board-%';
INSERT INTO orgs (slug, name, tagline) VALUES ('acme', 'Acme', 'Tell us what to build next.');
INSERT INTO members (org_id, user_id, role) SELECT o.id, u.id, 'owner' FROM orgs o, user u WHERE o.slug = 'acme' AND u.email = '${EMAIL}';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Dark mode toggle', 'A toggle in the header that switches theme and remembers it.', 'planned', 12 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Search the board', 'Filter posts by title as I type.', 'shipped', 9 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Export posts to CSV', 'One click export from the dashboard.', 'open', 7 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Slack notifications', 'Post to a channel when a request ships.', 'building', 5 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Weekly digest email', 'A Monday email with what shipped last week.', 'building', 4 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Kane check request', 'A request the Kane dashboard suite votes on, ships and deletes.', 'open', 0 FROM orgs WHERE slug = 'acme';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, '${LONG_TITLE}', 'A title with one very long word.', 'open', 1 FROM orgs WHERE slug = 'acme';
INSERT INTO api_tokens (org_id, name, token_hash, hint) SELECT id, 'Claude Code', 'seed-claim-not-a-real-token', 'mcp' FROM orgs WHERE slug = 'acme';
UPDATE posts SET claim_token_id = (SELECT t.id FROM api_tokens t JOIN orgs o ON o.id = t.org_id WHERE o.slug = 'acme' AND t.name = 'Claude Code'),
  claimed_by = 'E2E Tester · Claude Code', claim_expires_at = unixepoch() + 86400
  WHERE title = 'Slack notifications' AND org_id = (SELECT id FROM orgs WHERE slug = 'acme');
INSERT INTO runs (post_id, passed, summary, created_at) SELECT p.id, 0, 'Kane: failed (Checkpoint assertion failed)' || char(10) || 'The theme switched back after a reload.', unixepoch() - 3600 FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme' AND p.title = 'Dark mode toggle';
INSERT INTO orgs (slug, name, tagline) VALUES ('globex', 'Globex', 'Another board.');
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Globex secret feature', 'Only on Globex.', 'planned', 3 FROM orgs WHERE slug = 'globex';
INSERT INTO runs (post_id, passed, summary) SELECT p.id, 0, 'Kane: failed' || char(10) || 'A Globex run.' FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'globex';
INSERT INTO runs (post_id, passed, summary) SELECT p.id, 1, 'Kane: passed (Objective completed)' || char(10) || 'Typed in the search box and only matching requests stayed.' FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme' AND p.title = 'Search the board';
INSERT INTO changelog (post_id, title, body) SELECT p.id, p.title, 'You can now search the board as you type.' FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme' AND p.title = 'Search the board';
INSERT INTO posts (org_id, title, body, status, votes) SELECT id, 'Saved filters', 'Keep a filter and open it again later.', 'shipped', 6 FROM orgs WHERE slug = 'acme';
INSERT INTO changelog (post_id, title, body, verified) SELECT p.id, p.title, 'Save a filter and reopen it from the sidebar.', 0 FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme' AND p.title = 'Saved filters';
`
await $`bunx wrangler d1 execute hearloop-v2 --local --command ${sql}`.quiet()
// values for the tests Kane designed from kane/requirements/dashboard.md (it declared the names, with descriptions)
const ASSURANCE = '.testmuai/variables/assurance.json'
const decl = (await Bun.file(ASSURANCE).exists()) ? await Bun.file(ASSURANCE).json() : {}
const values: Record<string, string> = {
  nonmember_email: NONMEMBER,
  nonmember_password: password,
  fresh_board_name: `Kane Board ${crypto.randomUUID().slice(0, 6)}`,
  post_title: 'Kane check request',
  branding_logo_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
  unmatched_title: 'zzqxnomatch',
  other_status_title: 'Export posts to CSV',
  long_word_title: LONG_TITLE,
  kane_run_inventory: "Two Acme runs, newest first: 'Search the board' passed, 'Dark mode toggle' failed",
  foreign_board_run_id: "the failed Kane run for 'Globex secret feature' on the Globex board",
  kane_run_id: "the passed Kane run for 'Search the board'",
  kane_request_title: 'Search the board',
  loop_api_probe_url: `${APP}/api/acme/posts`,
  stale_changelog_title: 'Search the board',
  claimed_request_title: 'Slack notifications',
  unclaimed_request_title: 'Weekly digest email',
  planned_request_title: 'Dark mode toggle',
  public_roadmap_url: `${APP}/acme/roadmap`,
  public_changelog_url: `${APP}/acme/changelog`,
  visitor_first_vote_request_title: 'Export posts to CSV',
  visitor_retry_vote_request_title: 'Kane check request',
  account_first_vote_request_title: 'Dark mode toggle',
  account_retry_vote_request_title: 'Weekly digest email',
  removable_changelog_title: 'Saved filters',
}
for (const [k, value] of Object.entries(values)) decl[k] = { ...decl[k], value, secret: k.endsWith('password') }
await Bun.write(ASSURANCE, JSON.stringify(decl, null, 2))

console.log(`e2e fixture ready: ${EMAIL} on ${APP}/acme`)
