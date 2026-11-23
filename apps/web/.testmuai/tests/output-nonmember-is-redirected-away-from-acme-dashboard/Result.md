---
test: ../nonmember-is-redirected-away-from-acme-dashboard_test.md
status: failed
started: 2026-11-23T03:55:21.406Z
duration_s: 88
session_id: e4a52f26-3d2e-4259-a1ab-414af7030b86
---

# Nonmember is redirected away from Acme dashboard — Result

## Step 1 ✓ passed (33.1s)
md5: edc7eaf6446a86b2da67ea700260ed47
At {{base_url}}/login on hearloop, sign in with {{nonmember_email}} and {{nonmember_password}} as the account that is not an Acme board member.

## Step 2 ✗ failed (51.9s)
md5: 402192ba372dca238309632ec7ba1972
Reason: Final verification failed: "the browser is at {{global.base_url}}/acme and no private Acme dashboard content is accessible" — bug verdict: Final assertion leaves browser-state placeholders unresolved [automation_bug/config_issue, confidence 0.98]
In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the browser is at {{base_url}}/acme and no private Acme dashboard content is accessible.
