---
test: ../creator-enters-newly-created-board-dashboard-without-a-2_test.md
status: passed
started: 2026-11-21T11:07:51.229Z
duration_s: 99
session_id: 67fd25b2-b4a1-4400-a43d-e49e3ef30c8f
---

# Creator enters newly created board dashboard without a reload — Result

## Step 1 ✓ passed (26.2s)
md5: b656e730a9807b62fbdcaba0d552967e
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (69.6s)
md5: b362634cdc30ec87dca94ce53b8aadf4
From the signed-in hearloop board area, create a new board named {{fresh_board_name}}, then assert its dashboard appears for the creator immediately without a full-page reload during the creation-to-dashboard transition.
