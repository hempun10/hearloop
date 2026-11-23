---
test: ../signed-in-acme-nonmember-reaches-the-public-board-not-the-3_test.md
status: passed
started: 2026-11-21T11:20:58.817Z
duration_s: 62
session_id: f990863b-177a-4f65-8973-3f348a2ef15f
---

# Signed-in Acme nonmember reaches the public board, not the dashboard — Result

## Step 1 ✓ passed (27.1s)
md5: db4551680c65fca9091f35d0c0ce5c3e
At {{base_url}}/login, sign in to hearloop with {{nonmember_email}} and {{nonmember_password}} as an account that is not a member of Acme.

## Step 2 ✓ passed (31.7s)
md5: 2d2e98ec4398cea8e92a86b8645c46da
As that signed-in nonmember, visit {{base_url}}/acme/dashboard, then assert the browser reaches {{base_url}}/acme, the public board request list and Post idea button are visible, the dashboard and its Posts, Roadmap, Kane runs and Settings sidebar are inaccessible, and no error message is shown.
