---
test: ../unconfirmed-request-deletion-retains-its-post_test.md
status: passed
started: 2026-11-23T04:31:58.793Z
duration_s: 92
session_id: 9888496d-5990-41f7-a11c-05054e397ca4
---

# Unconfirmed request deletion retains its post — Result

## Step 1 ✓ passed (35.4s)
md5: 09a853f95002611ab695080fbe00d882
At {{base_url}}/acme/dashboard, sign in as the Acme board member using {{e2e_email}} and {{e2e_password}}, and open the dashboard post list.

## Step 2 ✓ passed (27.1s)
md5: 442e1d88c1dacb781c794de82468c2f1
In the dashboard post list, initiate deletion of the request titled {{planned_request_title}}, then assert a deletion confirmation appears before the request is removed.

## Step 3 ✓ passed (26.3s)
md5: 8cd85cf87881cf64ba2aa4a1b62979bc
Decline the deletion confirmation and return to the dashboard post list, then assert the request titled {{planned_request_title}} remains in the post list.
