---
test: ../signed-in-acme-nonmember-reaches-the-public-board-not-the-2_test.md
status: passed
started: 2026-11-20T14:57:49.773Z
duration_s: 59
session_id: f0239b4c-5369-4237-9b17-5cba53ba8074
---

# Signed-in Acme nonmember reaches the public board, not the dashboard — Result

## Step 1 ✓ passed (25.3s)
md5: 9125545f1d2d9d0a0ce2a369c05a6238
At {{base_url}}/login, sign in as a user who is not an Acme board member using {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✓ passed (30s)
md5: a3fbc227b2b11d1d51c137b4a8d4363c
Visit {{base_url}}/acme/dashboard as that signed-in nonmember, then assert the browser reaches {{base_url}}/acme, the public board's request list and Post idea button are visible, dashboard content is inaccessible, the dashboard sidebar containing Posts, Roadmap, Kane runs and Settings is not visible, and no error message is displayed.
