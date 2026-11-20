---
test: ../mcp_connect_deny_test.md
status: passed
started: 2026-11-19T08:00:36.360Z
duration_s: 67.9
session_id: 27053964-a159-4984-a511-be8683128a26
---

# Session: mcp_connect_deny — Result

## Step 1 ✓ passed (67.9s)
md5: 9b215e88453e8dcacb47d0514b00a25b
Go to {{mcp_deny_url}} . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the heading 'Allow Kane Deny Client to use hearloop?' appears. Click 'Deny'. Verify the browser leaves that page and the address bar URL contains 'error=access_denied' and does not contain 'code='.
