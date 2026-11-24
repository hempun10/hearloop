---
test: ../nonmember-is-redirected-away-from-acme-dashboard-3_test.md
status: passed
started: 2026-11-24T01:23:14.578Z
duration_s: 119
session_id: 54b902ef-2dab-4aa8-afdf-4d44e9ce6699
---

# Nonmember is redirected away from Acme dashboard — Result

## Step 1 ✓ passed (32s)
md5: edc7eaf6446a86b2da67ea700260ed47
At {{base_url}}/login on hearloop, sign in with {{nonmember_email}} and {{nonmember_password}} as the account that is not an Acme board member.

## Step 2 ✓ passed (76.3s)
md5: 0fe1f9affff285095961b5ed89dcb7a2
In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the address has the Acme public-board path {{base_url}}/acme with any query parameters allowed, the Post idea button is shown, and no link named Kane runs or Settings is visible, so no private Acme dashboard content is accessible.
