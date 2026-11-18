---
test: ../dash_inbox_status_test.md
status: passed
started: 2026-11-18T03:49:07.115Z
duration_s: 64.6
session_id: 3ec82dd1-46a9-40a3-bb91-85e12c383c6c
---

# Session: dash_inbox_status — Result

## Step 1 ✓ passed (64.6s)
md5: 3c2ca4929fd7e45202bfa9fd6f7f1fcc
Go to {{base_url}}/login?next=/acme/dashboard . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the Inbox, change the status of 'Export posts to CSV' to 'Planned' and verify the 'Planned' count in the left list is 2. Then change it back to 'Open' and verify the 'Planned' count is 1.
