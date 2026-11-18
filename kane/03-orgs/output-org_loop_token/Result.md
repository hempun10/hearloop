---
test: ../org_loop_token_test.md
status: passed
started: 2026-11-18T08:02:11.488Z
duration_s: 58
session_id: a0677c01-1924-45ea-895d-0a55b6f0ba6c
---

# Session: org_loop_token — Result

## Step 1 ✓ passed (38.7s)
md5: 9ec7cb0fd1318a787f2d839278523fcb
Go to {{base_url}}/login?next=/acme/dashboard/settings/token . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. On the 'Loop API token' settings page click 'Generate token' or 'Regenerate token' and accept any confirmation. Verify a token starting with 'hl_' is shown with the note 'Copy it now'.
