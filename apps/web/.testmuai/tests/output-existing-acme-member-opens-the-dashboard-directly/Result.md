---
test: ../existing-acme-member-opens-the-dashboard-directly_test.md
status: passed
started: 2026-11-21T11:26:34.996Z
duration_s: 85
session_id: 4c4832c6-f967-4489-8af0-c2fc9f7f104c
---

# Existing Acme member opens the dashboard directly — Result

## Step 1 ✓ passed (47.7s)
md5: b330659a0f667088bcdf14a3fbb2ccd4
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}, then visit {{base_url}}/acme/dashboard as an Acme board member and assert the Acme member board dashboard is shown.

## Step 2 ✓ passed (33.7s)
md5: a2764ecdbbfb98a4023683527e075650
On the Acme member dashboard, inspect the board-management navigation, then assert the post list (inbox), roadmap, Kane runs, changelog and settings are all available.
