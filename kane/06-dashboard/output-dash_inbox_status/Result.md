---
test: ../dash_inbox_status_test.md
status: passed
started: 2026-11-18T05:25:17.480Z
duration_s: 67
session_id: 061983cf-7fca-4d21-a7a2-580ca332fd90
---

# Session: dash_inbox_status — Result

## Step 1 ✓ passed (51.5s)
md5: 3c2ca4929fd7e45202bfa9fd6f7f1fcc
Go to {{base_url}}/login?next=/acme/dashboard . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the Inbox, change the status of 'Export posts to CSV' to 'Planned' and verify the 'Planned' count in the left list is 2. Then change it back to 'Open' and verify the 'Planned' count is 1.
