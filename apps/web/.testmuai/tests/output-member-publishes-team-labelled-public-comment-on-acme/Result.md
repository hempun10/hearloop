---
test: ../member-publishes-team-labelled-public-comment-on-acme_test.md
status: passed
started: 2026-11-24T03:11:38.431Z
duration_s: 76
session_id: e1c05421-9a50-4b0b-8a68-268c58ecf968
---

# Member publishes Team-labelled public comment on Acme request — Result

## Step 1 ✓ passed (28.7s)
md5: 7b19061a7d20815d76d38a140945e70d
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 ✓ passed (44.9s)
md5: c2b040e7bfec9e72b20419721d564d18
On that request page, write 'Public member discussion probe {{kane_run_id}}' as a public comment and post with Comment, then assert the new public comment appears with its author, age, and Team label.
