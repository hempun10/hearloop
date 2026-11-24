---
test: ../member-publishes-team-labelled-public-comment-on-acme-2_test.md
status: passed
started: 2026-11-24T04:14:02.719Z
duration_s: 88
session_id: ff1f4798-6691-4f26-9bc8-6a31e47ac708
---

# Member publishes Team-labelled public comment on Acme request — Result

## Step 1 ✓ passed (43.2s)
md5: 7b19061a7d20815d76d38a140945e70d
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 ✓ passed (41.8s)
md5: c975b9b37c987b4ff1c2c79c7d181b1a
On that request page, write 'Member-created public comment probe' as a public comment and post with Comment, then assert the new public comment appears with its author, age, and Team label.
