---
test: ../member-creates-marked-team-only-note-on-acme-request-2_test.md
status: passed
started: 2026-11-24T04:11:52.286Z
duration_s: 72
session_id: 007b865e-908b-4824-9cda-30f6e283f652
---

# Member creates marked team-only note on Acme request — Result

## Step 1 ✓ passed (35.3s)
md5: 7b19061a7d20815d76d38a140945e70d
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 ✓ passed (33.5s)
md5: 1a44199e47d8be3b3ad20aaf0d678cae
On that request page, write 'Member-created team-only note probe', turn on Internal note (team only), and post with Comment, then assert the posted note is visible to the member and marked 'Internal note'.
