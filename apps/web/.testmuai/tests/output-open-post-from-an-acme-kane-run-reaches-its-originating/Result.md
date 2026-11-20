---
test: ../open-post-from-an-acme-kane-run-reaches-its-originating_test.md
status: passed
started: 2026-11-20T04:53:56.428Z
duration_s: 85
session_id: 3aa8c9f3-260c-4ff4-809a-26774719a605
---

# Open post from an Acme Kane run reaches its originating request — Result

## Step 1 ✓ passed (39.4s)
md5: 6b3fd7e43a4cb7b2a5963bd1d59d5c57
At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 ✓ passed (12.7s)
md5: 19d166460e1a7742e8dcb5dfe61c6636
On the Acme dashboard's Kane runs page, open the row for the independently identified Acme verification {{kane_run_id}} to expose its report and Open post link.

## Step 3 ✓ passed (29.2s)
md5: db410f02f804bc4603f18479f9194227
In the opened {{kane_run_id}} verification row, follow Open post to the associated request {{kane_request_title}}, then assert the opened request is the independently identified request {{kane_request_title}} associated with that verification.
