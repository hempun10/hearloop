---
test: ../nonmember-is-redirected-away-from-acme-dashboard-2_test.md
status: failed
started: 2026-11-23T17:32:47.643Z
duration_s: 119
session_id: 5e70c23f-65da-4d18-b76d-6a1be0b108a0
---

# Nonmember is redirected away from Acme dashboard — Result

## Step 1 ✓ passed (30.3s)
md5: edc7eaf6446a86b2da67ea700260ed47
At {{base_url}}/login on hearloop, sign in with {{nonmember_email}} and {{nonmember_password}} as the account that is not an Acme board member.

## Step 2 ✗ failed (84.7s)
md5: c67eda52c412699ffe3983549e5f78c9
Reason: Checkpoint assertion failed: "the dashboard sidebar is not shown" — bug verdict: Public-board verification uses unresolved browser-state placeholders [automation_bug/config_issue, confidence 0.99]
In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the address has the Acme public-board path {{base_url}}/acme with any query parameters allowed, the dashboard sidebar is not shown, and no private Acme dashboard content is accessible.
