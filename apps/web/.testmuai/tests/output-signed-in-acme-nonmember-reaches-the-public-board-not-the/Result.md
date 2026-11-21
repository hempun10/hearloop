---
test: ../signed-in-acme-nonmember-reaches-the-public-board-not-the_test.md
status: failed
started: 2026-11-20T14:12:31.626Z
duration_s: 41
session_id: b5e028dc-4e7c-481c-9776-430281c6462e
---

# Signed-in Acme nonmember reaches the public board, not the dashboard — Result

## Step 1 ✓ passed (3.35s)
md5: 9125545f1d2d9d0a0ce2a369c05a6238
At {{base_url}}/login, sign in as a user who is not an Acme board member using {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✗ failed (34.5s)
md5: d99c2f6aa9ff99f9e3aa5842808a0d61
Reason: Final verification failed: "the browser reaches {{global.base_url}}/acme and Acme dashboard content is not accessible" — bug verdict: Acme access assertion contradicts the observed redirect state [automation_bug/config_issue, confidence 0.90]
Visit {{base_url}}/acme/dashboard as that signed-in nonmember, then assert the browser reaches {{base_url}}/acme and Acme dashboard content is not accessible.
