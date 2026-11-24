---
test: ../phone-dashboard-menu-opens-and-closes-after-page-selection_test.md
status: passed
started: 2026-11-24T04:41:02.768Z
duration_s: 142
session_id: 504a659d-96fb-4520-875e-5e88037e40c1
---

# Phone dashboard menu opens and closes after page selection — Result

## Step 1 ✓ passed (16.3s)
md5: aeb4f617eeb44be565f79effb50dabe8
In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the dashboard at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (23.7s)
md5: 5ce5cfaffc058fae47a0e78ac4c64c82
On the phone-sized Acme dashboard, use the dashboard menu button to open the page menu, then assert the dashboard menu is open.

## Step 3 ✓ passed (49.7s)
md5: f9f5d4ae60a75259b4ab763fa0b60075
From the open phone-sized dashboard menu, choose the Roadmap page, then assert the dashboard menu is no longer open.
