#!/usr/bin/env bun
// Resets the local e2e fixture Kane tests rely on: user e2e@hearloop.test, board /acme with known posts.
// The password lives in .testmuai/variables/e2e.json (gitignored); Kane loads that file on every run.
import { $ } from 'bun'

const APP = process.env.APP_URL ?? 'http://localhost:3000'
const VARS = '.testmuai/variables/e2e.json'
const EMAIL = 'e2e@hearloop.test'
const NONMEMBER = 'nonmember@hearloop.test' // signed in, but not a member of /acme
const TEAMMATE = 'teammate@hearloop.test' // a second Acme member, for the member-removal tests
const LONG_TITLE = 'Supercalifragilisticexpialidociousintegrationwitheverythingplease'

const file = Bun.file(VARS)
let password: string
const e2eVars = (await file.exists()) ? await file.json() : {}
if (await file.exists()) password = e2eVars.e2e_password.value
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
await signUp(TEAMMATE, password, 'Team Mate')

// an invite link that expired a day ago; only its hash goes in the database
const expiredInvite = 'inv_' + [...crypto.getRandomValues(new Uint8Array(24))].map((b) => b.toString(16).padStart(2, '0')).join('')
const expiredHash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(expiredInvite)))].map((b) => b.toString(16).padStart(2, '0')).join('')
const nm = `(SELECT id FROM user WHERE email = '${NONMEMBER}')`
const acme = "(SELECT id FROM orgs WHERE slug = 'acme')"
const post = (title: string, body: string, status: string, votes: number, author = 'NULL') =>
  `INSERT INTO posts (org_id, title, body, status, votes, author_id) SELECT id, '${title}', '${body}', '${status}', ${votes}, ${author} FROM orgs WHERE slug = 'acme';`
const pid = (title: string) => `(SELECT id FROM posts WHERE title = '${title}' AND org_id = ${acme})`
const votes = (title: string, ...voters: string[]) => voters.map((v) => `INSERT INTO post_votes (post_id, voter) VALUES (${pid(title)}, '${v}');`).join('\n')
const comment = (title: string, author: string, body: string) => `INSERT INTO comments (post_id, author, body) VALUES (${pid(title)}, '${author}', '${body}');`
const tag = (title: string, name: string) => `INSERT OR IGNORE INTO tags (org_id, name) VALUES (${acme}, '${name}');
INSERT INTO post_tags (post_id, tag_id) VALUES (${pid(title)}, (SELECT id FROM tags WHERE org_id = ${acme} AND name = '${name}'));`

const sql = `
DELETE FROM comments WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug IN ('acme', 'globex') OR o.slug LIKE 'kane-board-%');
DELETE FROM post_tags WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug IN ('acme', 'globex') OR o.slug LIKE 'kane-board-%');
DELETE FROM runs WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme');
DELETE FROM changelog WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug = 'acme');
DELETE FROM post_votes WHERE post_id IN (SELECT p.id FROM posts p JOIN orgs o ON o.id = p.org_id WHERE o.slug IN ('acme', 'globex') OR o.slug LIKE 'kane-board-%');
DELETE FROM posts WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM members WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM api_tokens WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM invites WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme' OR slug LIKE 'kane-board-%');
DELETE FROM integrations WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
DELETE FROM tags WHERE org_id IN (SELECT id FROM orgs WHERE slug = 'acme');
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
INSERT INTO members (org_id, user_id, role) SELECT o.id, u.id, 'owner' FROM orgs o, user u WHERE o.slug = 'acme' AND u.email = '${TEAMMATE}';
${post('Offline mode', 'Use the board without a connection.', 'open', 0, nm)}
${post('Mobile app', 'An app for phones.', 'planned', 0, nm)}
${post('Bulk export to Excel', 'Download every request as an xlsx file.', 'open', 2)}
${votes('Bulk export to Excel', 'v:kane-shared', 'v:kane-a')}
${comment('Bulk export to Excel', 'Priya', 'We need this for our quarterly report.')}
${tag('Bulk export to Excel', 'data')}
${post('Spreadsheet export', 'Export the board to a spreadsheet.', 'open', 2)}
${votes('Spreadsheet export', 'v:kane-shared', 'v:kane-b')}
${post('Calendar sync', 'Show planned work in my calendar.', 'open', 1)}
${post('Google Calendar integration', 'Add shipped dates to Google Calendar.', 'open', 1)}
${post('Merge check in progress', 'A request being built, for the merge rules.', 'building', 1)}
${post('Merge check shipped', 'A shipped request, for the merge rules.', 'shipped', 1)}
${post('Merge check survivor', 'The request the merge-rule checks try to merge into.', 'open', 1)}
${post('Two-factor login', 'Ask for a code at sign-in.', 'planned', 1)}
${votes('Two-factor login', 'v:kane-c')}
${comment('Two-factor login', 'Sam', 'Our security team requires this.')}
${tag('Two-factor login', 'security')}
${post('Passkey sign-in', 'Sign in with a passkey.', 'planned', 1)}
${votes('Passkey sign-in', 'v:kane-d')}
${post('Comment thread check', 'A request with a ready-made discussion.', 'open', 0)}
INSERT INTO comments (post_id, user_id, author, team, body, created_at) VALUES (${pid('Comment thread check')}, (SELECT id FROM user WHERE email = '${EMAIL}'), 'E2E Tester', 1, 'Public member discussion probe', unixepoch() - 300);
INSERT INTO comments (post_id, user_id, author, team, body, created_at) VALUES (${pid('Comment thread check')}, ${nm}, 'Not A Member', 0, 'Public nonmember discussion probe', unixepoch() - 200);
INSERT INTO comments (post_id, user_id, author, team, internal, body, created_at) VALUES (${pid('Comment thread check')}, (SELECT id FROM user WHERE email = '${EMAIL}'), 'E2E Tester', 1, 1, 'Team-only discussion probe', unixepoch() - 100);
INSERT INTO invites (org_id, token_hash, expires_at, created_at) VALUES (${acme}, '${expiredHash}', unixepoch() - 86400, unixepoch() - 8 * 86400);
INSERT INTO orgs (slug, name, tagline) VALUES ('kane-board-solo', 'Kane Solo', 'A board with one member.');
INSERT INTO members (org_id, user_id, role) SELECT o.id, u.id, 'owner' FROM orgs o, user u WHERE o.slug = 'kane-board-solo' AND u.email = '${EMAIL}';
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
  board_request_inventory: ((await (await fetch(`${APP}/api/acme/posts`)).json()) as { title: string }[]).map((p) => p.title).join('; '),
  author_open_request_title: 'Offline mode',
  discussion_request_title: 'Comment thread check',
  author_nonopen_request_title: 'Mobile app',
  expired_invite_url: `${APP}/invite/${expiredInvite}`,
  sole_member_board_slug: 'kane-board-solo',
  merge_open_source_title: 'Bulk export to Excel',
  merge_open_survivor_title: 'Spreadsheet export',
  merge_shared_voters: 'Bulk export to Excel has 2 votes (a shared voter and voter A); Spreadsheet export has 2 votes (the same shared voter and voter B). After the merge Spreadsheet export has 3 votes: the shared voter counts once.',
  merge_nonmember_source_title: 'Calendar sync',
  merge_nonmember_survivor_title: 'Google Calendar integration',
  merge_in_progress_source_title: 'Merge check in progress',
  merge_shipped_source_title: 'Merge check shipped',
  merge_invalid_survivor_title: 'Merge check survivor',
  merge_planned_source_title: 'Two-factor login',
  merge_planned_survivor_title: 'Passkey sign-in',
  merge_disjoint_voters: 'Two-factor login has 1 vote (voter C); Passkey sign-in has 1 vote (voter D). No voter is on both, so after the merge Passkey sign-in has 2 votes.',
  // real, throwaway webhooks for the notification tests; add them to .testmuai/variables/e2e.json yourself (never commit them)
  slack_webhook_url: e2eVars.slack_webhook_url?.value ?? '',
  discord_webhook_url: e2eVars.discord_webhook_url?.value ?? '',
}
for (const [k, value] of Object.entries(values)) decl[k] = { ...decl[k], value, secret: k.endsWith('password') || k.endsWith('webhook_url') || k.endsWith('invite_url') }
await Bun.write(ASSURANCE, JSON.stringify(decl, null, 2))

console.log(`e2e fixture ready: ${EMAIL} on ${APP}/acme`)
