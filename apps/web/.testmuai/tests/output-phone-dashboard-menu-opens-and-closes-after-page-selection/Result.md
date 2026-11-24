---
test: ../phone-dashboard-menu-opens-and-closes-after-page-selection_test.md
status: passed
started: 2026-11-24T02:04:02.045Z
duration_s: 124
session_id: d5295f4c-1157-43a3-8582-8bd6de489462
---

# Phone dashboard menu opens and closes after page selection — Result

## Step 1 ✓ passed (34.8s)
md5: aeb4f617eeb44be565f79effb50dabe8
In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the dashboard at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (24.1s)
md5: 5ce5cfaffc058fae47a0e78ac4c64c82
On the phone-sized Acme dashboard, use the dashboard menu button to open the page menu, then assert the dashboard menu is open.

## Step 3 ✓ passed (61.7s)
md5: f9f5d4ae60a75259b4ab763fa0b60075
From the open phone-sized dashboard menu, choose the Roadmap page, then assert the dashboard menu is no longer open.
