---
test: ../unsigned-acme-visitor-is-asked-to-sign-in-before-restricted_test.md
status: failed
started: 2026-11-20T05:12:05.047Z
duration_s: 158
session_id: a0e97b2a-b697-4248-83bd-08675a30c024
---

# Unsigned Acme visitor is asked to sign in before restricted posting — Result

## Step 1 ✓ passed (35.8s)
md5: 8987d16595c721a560765476c27446c9
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 ✓ passed (66.4s)
md5: c164b2312caa9d88064081a7a917b07c
On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, set who can post to signed-in people only, then assert that the signed-in people only posting choice is available and selected.

## Step 3 ✗ failed (51.9s)
md5: eb6e310fe45631b0bf1afd1a6de09e37
Reason: Final verification failed: "a request to sign in appears before posting" — bug verdict: Authenticated session invalidates sign-in prompt check [automation_bug/config_issue, confidence 0.98]
In a fresh signed-out browser context starting at {{base_url}}/acme, attempt to post to the public board, then assert a request to sign in appears before posting.
