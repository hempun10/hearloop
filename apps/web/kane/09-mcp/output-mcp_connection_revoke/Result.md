---
test: ../mcp_connection_revoke_test.md
status: passed
started: 2026-11-19T08:03:16.863Z
duration_s: 63.7
session_id: c1e88f38-5190-4b2a-8e58-10f1755fb168
---

# Session: mcp_connection_revoke — Result

## Step 1 ✓ passed (63.7s)
md5: ad412c5a788ee2a26bd33b00cef234ec
Go to {{base_url}}/login?next=/acme/dashboard/settings/token . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify 'Kane Test Client' is listed under Tokens with the note 'Connected via MCP'. Click 'Revoke' for 'Kane Test Client', confirm, and verify 'Kane Test Client' is no longer listed.
