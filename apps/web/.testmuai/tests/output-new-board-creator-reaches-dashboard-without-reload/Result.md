---
test: ../new-board-creator-reaches-dashboard-without-reload_test.md
status: passed
started: 2026-11-23T03:57:26.857Z
duration_s: 136
session_id: 4338c4b7-519b-4b35-a40f-6e047c498ba5
---

# New board creator reaches dashboard without reload — Result

## Step 1 ✓ passed (26.3s)
md5: 50e0749e0c206571970388c149f39af7
At {{base_url}}/login on hearloop, sign in with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (55.2s)
md5: 277730603548102ff539728ac78ccb85
In the signed-in hearloop browser session, reach the new-board creation flow and enter {{fresh_board_name}} as the new board's name.

## Step 3 ✓ passed (17.9s)
md5: 448dfc202e8400da0fff67ce3948e8c5
On the board creation page immediately before completing creation, retain a browser-side document identity marker in the current page so a document reload can be detected.

## Step 4 ✓ passed (33.1s)
md5: 19295dfc19a2647c0117b2a20bb06586
Complete creation of the board named {{fresh_board_name}}, then assert its private dashboard opens for the creator and the pre-creation document identity marker remains unchanged without reloading the page.
