---
test: ../phone-sized-acme-dashboard-menu-opens-and-closes-on-page-2_test.md
status: passed
started: 2026-11-20T10:12:43.561Z
duration_s: 109
session_id: 930b7cd1-238c-4734-aa89-6ee723d72ac7
---

# Phone-sized Acme dashboard menu opens and closes on page selection — Result

## Step 1 ✓ passed (36.8s)
md5: e4203f183d5f6a0c20b6a9473e961454
At {{base_url}}/login, sign in to hearloop using {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard as a member.

## Step 2 ✓ passed (41.3s)
md5: dc3e11a9489e526e9a55873856666d8b
On the Acme dashboard at a phone-sized browser viewport, use the top-left "Open menu" button, not the board name or board switcher, then assert the dashboard menu is open and lists Posts, Roadmap, Kane runs, Changelog and Settings.

## Step 3 ✓ passed (28s)
md5: 277aa9bcd61812e807d2a056dba35eb0
From that open dashboard menu, choose the Roadmap page, then assert the dashboard menu is closed after the selection.
