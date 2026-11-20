---
test: ../foreign-board-run-stays-out-of-acme-kane-history_test.md
status: passed
started: 2026-11-20T04:44:50.724Z
duration_s: 83
session_id: 426fefac-7d3b-4a8b-8487-d088a3edaf91
---

# Foreign-board run stays out of Acme Kane history — Result

## Step 1 ✓ passed (37.9s)
md5: 6b3fd7e43a4cb7b2a5963bd1d59d5c57
At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 ✓ passed (41.7s)
md5: 2b27650765ac4631a11a1e348b2a5944
On the Acme dashboard's Kane runs page, compare the visible run rows against the independently identified other-board verification {{foreign_board_run_id}} and the Acme inventory {{kane_run_inventory}}, then assert every visible verification belongs to Acme and {{foreign_board_run_id}} does not appear.
