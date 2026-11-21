---
test: ../unsigned-acme-dashboard-visitor-reaches-sign-in-not-the-2_test.md
status: passed
started: 2026-11-20T14:15:53.856Z
duration_s: 33
session_id: a92a0147-bae3-4334-a29f-07e517463007
---

# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard — Result

## Step 1 ✓ passed (29.9s)
md5: 46f8e5e43bd1d5c62249ec6c85275e4c
In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the sign-in form is shown and Acme dashboard content is not accessible, even if the address has a return-path query string.
