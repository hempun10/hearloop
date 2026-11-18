---
test: ../dash_inbox_status_test.md
status: passed
started: 2026-11-18T07:03:04.451Z
duration_s: 89
session_id: ddae5e08-1a0e-479c-9cf9-a5dc54a5e0c5
---

# Session: dash_inbox_status — Result

## Step 1 ✓ passed (61s)
md5: 3c2ca4929fd7e45202bfa9fd6f7f1fcc
Go to {{base_url}}/login?next=/acme/dashboard . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the Inbox, change the status of 'Export posts to CSV' to 'Planned' and verify the 'Planned' count in the left list is 2. Then change it back to 'Open' and verify the 'Planned' count is 1.
