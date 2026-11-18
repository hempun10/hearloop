---
test: ../org_loop_token_test.md
status: passed
started: 2026-11-18T05:43:49.852Z
duration_s: 63
session_id: cc813ad0-b541-413c-ae80-7bceac4296fd
---

# Session: org_loop_token — Result

## Step 1 ✓ passed (43.5s)
md5: 9b40b32cc96b513d4c159b919fe49690
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the 'Loop API token' section click 'Generate token' or 'Regenerate token' and accept any confirmation. Verify a token starting with 'hl_' is shown with the note 'Copy it now'.
