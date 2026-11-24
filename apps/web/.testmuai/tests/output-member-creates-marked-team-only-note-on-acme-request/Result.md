---
test: ../member-creates-marked-team-only-note-on-acme-request_test.md
status: passed
started: 2026-11-24T03:10:15.547Z
duration_s: 86
session_id: ecc661d7-73cc-4810-9def-e34a35c5c0be
---

# Member creates marked team-only note on Acme request — Result

## Step 1 ✓ passed (36.6s)
md5: 7b19061a7d20815d76d38a140945e70d
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 ✓ passed (46.5s)
md5: 964dcb1bb96f240cc46de59c0e838506
On that request page, write 'Team-only discussion probe {{kane_run_id}}', turn on Internal note (team only), and post with Comment, then assert the posted note is visible to the member and marked 'Internal note'.
