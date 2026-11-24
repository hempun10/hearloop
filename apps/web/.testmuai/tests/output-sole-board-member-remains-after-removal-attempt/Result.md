---
test: ../sole-board-member-remains-after-removal-attempt_test.md
status: passed
started: 2026-11-24T03:53:57.863Z
duration_s: 93
session_id: bfdbf8fb-ff5c-4e56-b163-06a4ca595379
---

# Sole board member remains after removal attempt — Result

## Step 1 ✓ passed (44.7s)
md5: 68be92759e5c796aa52b3de2b9a3ba05
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}; open the dashboard for {{base_url}}/{{sole_member_board_slug}} and reach Settings → Members, on a board where this account is the only member.

## Step 2 ✓ passed (46s)
md5: 037507a74b02c9a8aeec5c8b3a9a6351
On that board's Settings → Members page, try to remove the sole member if a removal action is offered, then assert that the final member's row remains listed.
