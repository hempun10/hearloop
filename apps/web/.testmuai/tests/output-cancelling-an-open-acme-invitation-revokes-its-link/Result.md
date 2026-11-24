---
test: ../cancelling-an-open-acme-invitation-revokes-its-link_test.md
status: passed
started: 2026-11-24T03:44:13.750Z
duration_s: 177
session_id: beaa6a9c-1e2d-4fd0-8f2a-893f53d7e94b
---

# Cancelling an open Acme invitation revokes its link — Result

## Step 1 ✓ passed (80.1s)
md5: b9292d069b40397c66dd7e5c480c9f2d
At {{base_url}}/acme/dashboard, sign in with {{e2e_email}} and {{e2e_password}}, then open Settings → Members and assert each listed member has a name and email and the current member's row says "You".

## Step 2 ✓ passed (33.3s)
md5: a26bea2a963f4eca24ae38b06590c710
On Acme's Settings → Members page, create an invite link and store its displayed URL as cancelled_invite_url.

## Step 3 ✓ passed (25.3s)
md5: 3016909258e7d95412ed9cd44eacedc4
On Acme's Settings → Members page, locate the newly created link under "Open invite links", then assert that link is listed with "Cancel link".

## Step 4 ✓ passed (35.5s)
md5: 7d7ce7766f23c26fff6ef296b06f996f
On Acme's Settings → Members page, cancel that newly created open link and open cancelled_invite_url, then assert "This invite link doesn't work" is shown.
