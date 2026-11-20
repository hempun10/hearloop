---
test: ../signed-in-acme-nonmember-reaches-the-public-board-not-the_test.md
status: failed
started: 2026-11-20T05:04:13.116Z
duration_s: 69
session_id: 2fa82fcb-dfe7-4555-b111-b6bac2016922
---

# Signed-in Acme nonmember reaches the public board, not the dashboard — Result

## Step 1 ✓ passed (28.3s)
md5: 9125545f1d2d9d0a0ce2a369c05a6238
At {{base_url}}/login, sign in as a user who is not an Acme board member using {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✗ failed (37.6s)
md5: d99c2f6aa9ff99f9e3aa5842808a0d61
Reason: Final verification failed: "the browser reaches {{global.base_url}}/acme and Acme dashboard content is not accessible" — bug verdict: Access assertion conflicts with redirected Acme board state [automation_bug/state_transition_bug, confidence 0.88]
Visit {{base_url}}/acme/dashboard as that signed-in nonmember, then assert the browser reaches {{base_url}}/acme and Acme dashboard content is not accessible.
