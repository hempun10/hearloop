// The Kane suite: one Test Manager folder per feature area.
// Record with `bun run kane record <area>`; replay with `bun run kane run <area|all>`.
// Tests use the e2e fixture from `bun run e2e:seed` ({{e2e_email}} / {{e2e_password}}, board /acme).
// Every objective starts at {{base_url}}, so the same recordings replay locally or against production.

export const FOLDERS = {
  smoke: { dir: '01-smoke', id: '01M7P8FEGAF2RP2RM21RQDZVGN', name: '01 Smoke' },
  auth: { dir: '02-auth', id: '01M7P8FS0JYMBWRAXSR4GPA0QY', name: '02 Auth' },
  orgs: { dir: '03-orgs', id: '01M7P8FWZVE79K6AD3J2344ECM', name: '03 Orgs & onboarding' },
  board: { dir: '04-public-board', id: '01M7P8FZHE88458NH63TH4F3EY', name: '04 Public board' },
  roadmap: { dir: '05-roadmap-changelog', id: '01M7P8G1YZ6FFZN7V4R3YDGGBJ', name: '05 Roadmap & changelog' },
  dashboard: { dir: '06-dashboard', id: '01M7P8G4H1AZJV9AK13PCMVHMS', name: '06 Dashboard' },
  branding: { dir: '07-branding-access', id: '01M7P8G6948GZYH1XXSPW7KKR6', name: '07 Branding & access' },
  loop: { dir: '08-loop', id: '01M7P8G7RQ5T0JYG2GM80M8CQZ', name: '08 Loop verifications' },
  // needs `bun run e2e:mcp --prep` after the seed: fresh authorize links + a claim by "Kane Test Client"
  mcp: { dir: '09-mcp', id: '01M7SCZ5HFX4ERFSQR0W726CW1', name: '09 MCP connect' },
} as const

export type Area = keyof typeof FOLDERS
type Test = { slug: string; path: string; objective: string }

const signIn = "Sign in with email '{{e2e_email}}' and password '{{e2e_password}}' and verify the Acme board loads."

export const TESTS: Partial<Record<Area, Test[]>> = {
  smoke: [
    { slug: 'smoke_landing_to_demo', path: '/', objective: "Go to {{base_url}}/ . Verify the headline 'Feedback that ships itself.' is visible. Click 'Try the live demo' and verify a feedback board with a list of requests and a 'Post idea' button loads." },
    { slug: 'smoke_docs', path: '/', objective: "Go to {{base_url}}/ . Click 'Docs' in the header. Verify a documentation page with the title 'What hearloop does' and a sidebar loads. Click 'Choose a coding agent' in the sidebar and verify the page lists the agents 'codex' and 'manual'." },
    { slug: 'smoke_vote', path: '/acme', objective: "Go to {{base_url}}/acme . Click the vote button on the first request. Verify that button is now highlighted as voted and its accessible label ends with 'voted'." },
  ],
  auth: [
    { slug: 'auth_sign_up', path: '/login?mode=signup', objective: "Go to {{base_url}}/login?mode=signup . Fill in name 'New Tester', email '{{smart.random_email}}' and password 'correct-horse-9', click 'Create account', then verify the page heading is 'Name your board'." },
    { slug: 'auth_sign_in_out', path: '/login', objective: `Go to {{base_url}}/login . ${signIn} Verify the header shows a 'Dashboard' link. Click 'Sign out' in the header, then verify the header shows 'Sign in' and no 'Dashboard' link.` },
    { slug: 'auth_wrong_password', path: '/login', objective: "Go to {{base_url}}/login . Sign in with email '{{e2e_email}}' and password 'not-the-password'. Verify an error message about invalid email or password is shown and the 'Sign in' heading is still on the page." },
    { slug: 'auth_back_button', path: '/', objective: "Go to {{base_url}}/ . Click 'Sign in' in the header. Verify the sign-in page shows a 'Back' button and no 'How it works' link. Click 'Back' and verify the headline 'Feedback that ships itself.' is visible. Then go to {{base_url}}/acme , click 'Sign in' in the board header, click 'Back', and verify the Acme board with its list of requests is shown, not the landing page." },
    { slug: 'auth_dashboard_guard', path: '/acme/dashboard', objective: "Go to {{base_url}}/acme/dashboard . Verify the page shows the 'Sign in' heading with email and password fields, not the dashboard." },
  ],
  orgs: [
    { slug: 'org_create_board', path: '/login?mode=signup', objective: "Go to {{base_url}}/login?mode=signup . Create an account with name 'Org Tester', email '{{smart.random_email}}' and password 'correct-horse-9'. On 'Name your board', enter board name 'Team {{smart.random_string_8}}' and verify the Address field fills in with a lowercase version. Click 'Create board' and verify the settings page shows a message ending in 'is live.'" },
    { slug: 'org_reserved_address', path: '/login?next=/new', objective: `Go to {{base_url}}/login?next=/new . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. On 'Name your board', enter board name 'Login' and click 'Create board'. Verify an error says the address is reserved.` },
    { slug: 'org_slug_follows_name', path: '/', objective: "Go to {{base_url}}/ . Click 'Sign in' in the header and sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Then go to {{base_url}}/new . On 'Name your board', type 'Hello' in Board name and verify the Address field shows 'hello'. Clear the Board name completely and verify the Address field is empty. Type 'Second Team' in Board name and verify the Address field shows 'second-team'. Do not create the board. Click 'Back' and verify you leave the 'Name your board' page and do not see a sign-in form." },
    { slug: 'org_loop_token', path: '/login?next=/acme/dashboard/settings/token', objective: "Go to {{base_url}}/login?next=/acme/dashboard/settings/token . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. On the 'Loop API tokens' page, type 'Kane laptop' in 'Token name' and click 'Create token'. Verify a token starting with 'hl_' is shown with the note 'Copy it now' and 'Kane laptop' is listed under Tokens. Click 'Revoke' for 'Kane laptop', confirm, and verify 'Kane laptop' is no longer listed." },
  ],
  board: [
    { slug: 'board_new_post_similar', path: '/acme', objective: "Go to {{base_url}}/acme . Click 'Post idea'. Type the title 'Dark mode for the board' and verify a 'Similar requests' box lists 'Dark mode toggle'. Replace the title with 'Kane check {{smart.random_string_8}}', add details 'Created by the Kane suite.', click 'Post', and verify the post page opens with that title and the text 'Not verified yet'." },
    { slug: 'board_search', path: '/acme', objective: "Go to {{base_url}}/acme . Type 'export' in the 'Search requests' box. Verify 'Export posts to CSV' is listed and 'Dark mode toggle' is not. Replace the search with 'zzqxnomatch' and verify the message 'No requests match' is shown." },
    { slug: 'board_keyboard_nav', path: '/acme', objective: "Go to {{base_url}}/acme . Press the j key three times, then press k once, and verify the board is still shown with its list of requests and no error page. Then press Enter and verify the page of the selected request opens with its title." },
    { slug: 'board_post_escape', path: '/acme', objective: "Go to {{base_url}}/acme . Open the request 'Search the board' and verify its page shows the title 'Search the board'. Press the Escape key and verify the Acme board with its list of requests is shown again." },
    { slug: 'board_post_page', path: '/acme', objective: "Go to {{base_url}}/acme . Open the request 'Search the board'. Verify the post page shows its title, a status timeline where 'Shipped' is reached, and a 'Kane CLI verifications' section with a 'Passed' entry." },
  ],
  roadmap: [
    { slug: 'roadmap_public_columns', path: '/acme/roadmap', objective: "Go to {{base_url}}/acme/roadmap . Verify there are columns 'Planned', 'In progress' and 'Shipped'; 'Dark mode toggle' is under Planned, 'Slack notifications' under In progress, and 'Search the board' under Shipped." },
    { slug: 'changelog_links_to_post', path: '/acme/changelog', objective: "Go to {{base_url}}/acme/changelog . Verify an entry titled 'Search the board' is shown with a 'Verified with Kane CLI' link. Click that link and verify the post page for 'Search the board' opens." },
  ],
  dashboard: [
    { slug: 'dash_inbox_status', path: '/login?next=/acme/dashboard', objective: "Go to {{base_url}}/login?next=/acme/dashboard . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the Inbox, change the status of 'Export posts to CSV' to 'Planned' and verify the 'Planned' count in the left list is 2. Then change it back to 'Open' and verify the 'Planned' count is 1." },
    { slug: 'dash_roadmap_move', path: '/login?next=/acme/dashboard/roadmap', objective: "Go to {{base_url}}/login?next=/acme/dashboard/roadmap . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Roadmap shows columns Open, Planned, In progress and Shipped. Using the dropdown on the 'Export posts to CSV' card, move it to 'In progress' and verify the card is now in the In progress column. Move it back to 'Open' and verify it is in the Open column." },
    { slug: 'dash_kane_runs', path: '/login?next=/acme/dashboard/runs', objective: "Go to {{base_url}}/login?next=/acme/dashboard/runs . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Kane runs page lists a 'Passed' run for 'Search the board'. Click that row and verify the expanded report contains 'Kane: passed'." },
  ],
  branding: [
    { slug: 'brand_tagline_accent', path: '/login?next=/acme/dashboard/settings', objective: "Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Set the Tagline to 'Built with Kane {{smart.random_string_8}}', click 'Save changes' and verify 'Saved' appears. Store the tagline you typed as 'tagline'. Click 'Branding' in the settings menu, click the green accent swatch, click 'Save changes' and verify 'Saved' appears. Click 'View public board' and verify the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name." },
    { slug: 'access_hide_roadmap', path: '/login?next=/acme/dashboard/settings/access', objective: "Go to {{base_url}}/login?next=/acme/dashboard/settings/access . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Turn off 'Public roadmap' and click 'Save changes'. Open the address /acme and verify the header has no 'Roadmap' link. Go back to /acme/dashboard/settings/access, turn 'Public roadmap' on again, save, open /acme and verify the 'Roadmap' link is back." },
  ],
  mcp: [
    { slug: 'mcp_connect_allow', path: '{{mcp_authorize_url}}', objective: "Go to {{mcp_authorize_url}} . A sign-in page opens: sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify a page with the heading 'Allow Kane Test Client to use hearloop?' appears, names 'localhost:3000' as where approval is sent, and has no site navigation header or footer. Click 'Allow'. Verify the browser leaves that page and the address bar URL now contains 'code='." },
    { slug: 'mcp_connect_deny', path: '{{mcp_deny_url}}', objective: "Go to {{mcp_deny_url}} . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the heading 'Allow Kane Deny Client to use hearloop?' appears. Click 'Deny'. Verify the browser leaves that page and the address bar URL contains 'error=access_denied' and does not contain 'code='." },
    { slug: 'mcp_consent_forged_link', path: '/login', objective: "Go to {{base_url}}/login?next=%2Fconsent%3Fclient_id%3Devil%26sig%3Dforged . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the page says 'This link is invalid or expired' and there is no 'Allow' button." },
    { slug: 'mcp_connection_revoke', path: '/login?next=/acme/dashboard/settings/token', objective: "Go to {{base_url}}/login?next=/acme/dashboard/settings/token . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify 'Kane Test Client' is listed under Tokens with the note 'Connected via MCP'. Click 'Revoke' for 'Kane Test Client', confirm, and verify 'Kane Test Client' is no longer listed." },
    { slug: 'mcp_building_by', path: '/acme', objective: "Go to {{base_url}}/acme . Open the request 'Dark mode toggle'. Verify its status shows 'In progress' followed by 'by E2E Tester · Kane Test Client'." },
  ],
}
