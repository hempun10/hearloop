---
test: ../unsigned-acme-visitor-posts-when-anyone-is-eligible_test.md
status: passed
started: 2026-11-20T14:20:28.981Z
duration_s: 146
session_id: 06169d0f-7c81-42d5-a603-01579be4370f
---

# Unsigned Acme visitor posts when anyone is eligible — Result

## Step 1 ✓ passed (35.9s)
md5: 8987d16595c721a560765476c27446c9
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 ✓ passed (43s)
md5: 90772a2e68436606b14066f7b908ff25
On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, set who can post to anyone, then assert the anyone posting choice is available and selected.

## Step 3 ✓ passed (64.3s)
md5: c1e462977669437d9e30ae3d2c4757fe
In a fresh signed-out browser context starting at {{base_url}}/acme, post a feedback request titled {{post_title}} to the public board, then assert the unsigned visitor can post it without being asked to sign in.
