---
test: ../phone-sized-acme-dashboard-menu-opens-and-closes-on-page_test.md
status: failed
started: 2026-11-20T04:57:48.483Z
duration_s: 88
session_id: 040cf4f6-0764-469f-a183-4041f16f58ba
---

# Phone-sized Acme dashboard menu opens and closes on page selection — Result

## Step 1 ✓ passed (36s)
md5: e4203f183d5f6a0c20b6a9473e961454
At {{base_url}}/login, sign in to hearloop using {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard as a member.

## Step 2 ✓ passed (25.7s)
md5: 01211c8315a49fc3cccb2e80c199e748
On the Acme dashboard at a phone-sized browser viewport, use the dashboard menu button, then assert the dashboard menu is open.

## Step 3 ✗ failed (23.6s)
md5: 3d34ee1cee5c81cf3fadf35a368e6d5e
Reason: The open dashboard menu shows only Acme and New board; no Roadmap option is available. — bug verdict: Roadmap menu state was not established [automation_bug/state_transition_bug, confidence 0.93]
From the open phone-sized dashboard menu, choose the Roadmap page, then assert the dashboard menu is closed after the selection.
