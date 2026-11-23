---
test: ../mcp_consent_forged_link_test.md
status: passed
started: 2026-11-19T08:02:14.010Z
duration_s: 36.7
session_id: 07c127c9-e27c-4e73-954c-18c36f0426a4
---

# Session: mcp_consent_forged_link — Result

## Step 1 ✓ passed (36.7s)
md5: 4aa6b7325ce49fbb5ca34f8b5398681a
Go to {{base_url}}/login?next=%2Fconsent%3Fclient_id%3Devil%26sig%3Dforged . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the page says 'This link is invalid or expired' and there is no 'Allow' button.
