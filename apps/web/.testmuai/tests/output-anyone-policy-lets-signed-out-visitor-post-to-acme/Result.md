---
test: ../anyone-policy-lets-signed-out-visitor-post-to-acme_test.md
status: passed
started: 2026-11-23T04:10:36.470Z
duration_s: 138
session_id: 3f19cb8c-8ccc-4d36-84e1-9be9b377bf04
---

# Anyone policy lets signed-out visitor post to Acme — Result

## Step 1 ✓ passed (29.7s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (44.1s)
md5: 28a8707bde2b822abf14f4728bb82fb5
On the Acme dashboard Settings → Access page, set posting eligibility to anyone and save the setting.

## Step 3 ✓ passed (61s)
md5: 56e82fc42653e7c66ed2e60f5c33d19d
In a signed-out browser context at {{base_url}}/acme, submit a public-board post titled {{post_title}}, then assert the signed-out visitor's post was accepted.
