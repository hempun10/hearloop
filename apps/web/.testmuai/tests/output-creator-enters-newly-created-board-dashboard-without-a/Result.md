---
test: ../creator-enters-newly-created-board-dashboard-without-a_test.md
status: passed
started: 2026-11-20T09:45:26.800Z
duration_s: 159
session_id: e9f88dd2-8712-4267-8da5-82e8c6152e70
---

# Creator enters newly created board dashboard without a reload — Result

## Step 1 ✓ passed (13.5s)
md5: 0ca5d9a23bfcde9fce25eaeaec06136e
At {{base_url}}/login, sign in to hearloop using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (87.3s)
md5: 66c862ab4abcf6a8b774a0bc61f3a6d6
From the signed-in hearloop board area, create a new board named {{fresh_board_name}}, then assert that the newly created board's dashboard is visible to its creator without a full-page reload during the transition.
