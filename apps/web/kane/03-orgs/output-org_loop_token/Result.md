---
test: ../org_loop_token_test.md
status: passed
started: 2026-11-19T04:22:06.280Z
duration_s: 71.3
session_id: 5d99a06d-4aa6-462c-892c-7bf7393d9dfb
---

# Session: org_loop_token — Result

## Step 1 ✓ passed (71.3s)
md5: bc88bb6341be25ebed9bb918efeb1200
Go to {{base_url}}/login?next=/acme/dashboard/settings/token . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. On the 'Loop API tokens' page, type 'Kane laptop' in 'Token name' and click 'Create token'. Verify a token starting with 'hl_' is shown with the note 'Copy it now' and 'Kane laptop' is listed under Tokens. Click 'Revoke' for 'Kane laptop', confirm, and verify 'Kane laptop' is no longer listed.
