---
test: ../foreign-board-run-is-absent-from-acme-kane-history_test.md
status: passed
started: 2026-11-23T05:24:52.505Z
duration_s: 139
session_id: 163649aa-61f6-4c0c-b11d-23fb8ba11c29
---

# Foreign-board run is absent from Acme Kane history — Result

## Step 1 ✓ passed (42.4s)
md5: 5c83cdf3a8fe846491fe004ce82bc8c8
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 ✓ passed (47s)
md5: 8924f8b18e2fece56f1f1e4cc48c7f37
On Acme's dashboard Kane runs page, compare every listed run with the independently supplied board membership in {{kane_run_inventory}}, then assert every listed verification belongs to Acme.

## Step 3 ✓ passed (43.8s)
md5: bff94cb70aac66f7f0d302c4b34f460c
On Acme's dashboard Kane runs page, locate the independently known other-board verification {{foreign_board_run_id}} against the displayed history, then assert that run is absent.
