---
test: ../opened-acme-verification-shows-kane-s-report_test.md
status: passed
started: 2026-11-20T04:55:58.890Z
duration_s: 74
session_id: aca3721e-a157-440e-a6b2-11fc69f91bd8
---

# Opened Acme verification shows Kane's report — Result

## Step 1 ✓ passed (49.6s)
md5: 6b3fd7e43a4cb7b2a5963bd1d59d5c57
At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 ✓ passed (20.8s)
md5: 9cf1dff50ead39f21a02fdda3719d14b
On the Acme dashboard's Kane runs page, open the row for the independently identified Acme verification {{kane_run_id}}, then assert the opened row shows Kane's report for that verification.
