---
test: ../org_loop_token_test.md
status: passed
started: 2026-11-18T03:41:28.159Z
duration_s: 39.6
session_id: bd1b683c-737d-4c31-9406-30dfc6a2fb63
---

# Session: org_loop_token — Result

## Step 1 ✓ passed (39.6s)
md5: 9b40b32cc96b513d4c159b919fe49690
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the 'Loop API token' section click 'Generate token' or 'Regenerate token' and accept any confirmation. Verify a token starting with 'hl_' is shown with the note 'Copy it now'.
