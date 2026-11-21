---
test: ../unsigned-acme-visitor-is-asked-to-sign-in-before-restricted-2_test.md
status: passed
started: 2026-11-20T14:17:04.690Z
duration_s: 165
session_id: 66f612a1-1dcc-4465-adf8-79b506b7ba81
---

# Unsigned Acme visitor is asked to sign in before restricted posting — Result

## Step 1 ✓ passed (35.3s)
md5: 8987d16595c721a560765476c27446c9
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 ✓ passed (59.9s)
md5: c164b2312caa9d88064081a7a917b07c
On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, set who can post to signed-in people only, then assert that the signed-in people only posting choice is available and selected.

## Step 3 ✓ passed (25s)
md5: a15269481c3398cf1013defaa63c9147
On the Acme board dashboard, sign out of the member account using the account menu; continue in this same browser session as a visitor who is not signed in.

## Step 4 ✓ passed (41.2s)
md5: 52aa8f5ecc39e5a564b81ffefa2d9d57
From {{base_url}}/acme in the same signed-out browser session, attempt to post to the public board, then assert a request to sign in appears before posting.
