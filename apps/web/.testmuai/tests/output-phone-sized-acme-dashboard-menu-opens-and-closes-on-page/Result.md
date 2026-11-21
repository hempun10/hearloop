---
test: ../phone-sized-acme-dashboard-menu-opens-and-closes-on-page_test.md
status: passed
started: 2026-11-21T11:22:37.480Z
duration_s: 131
session_id: 6ab9283c-02fd-4843-b4f1-a11fae371667
---

# Phone-sized Acme dashboard menu opens and closes on page selection — Result

## Step 1 ✓ passed (52.2s)
md5: 875ff4073ac84ef0ddb908e4771d3ea1
At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard as an Acme member and assert the Acme member board dashboard is shown.

## Step 2 ✓ passed (45.7s)
md5: 56f4d8b09cae872e83579e3ff191fd5b
On the Acme dashboard in a phone-sized browser viewport, open the dashboard menu from its menu button, then assert the menu is open and makes Posts, Roadmap, Kane runs, Changelog and Settings available.

## Step 3 ✓ passed (30.1s)
md5: 524e913bc56821ca4d20bb62e7901682
In that open dashboard menu, choose the Roadmap page, then assert the menu has closed.
