---
test: ../complete-unfiltered-inbox-shows-board-inventory-in-most_test.md
status: passed
started: 2026-11-24T04:49:43.490Z
duration_s: 168
session_id: 092e8e04-f9d7-491c-a80b-3b454d7a3035
---

# Complete unfiltered inbox shows board inventory in Most votes order — Result

## Step 1 ✓ passed (25.6s)
md5: c8e651aa3df462dcf4d332ff2c807b1a
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (14.5s)
md5: a311c1c6af8c1c22c6fcdb09700f9d4c
On {{base_url}}/acme/dashboard, open the post list (inbox) in a fresh browser session without a previously chosen sort, status filter or search.

## Step 3 ✓ passed (34.4s)
md5: e5e4149668374f2b6ce9c75be7b65bb0
On the Acme dashboard inbox, inspect each displayed request row, then assert every row shows its status, vote count and age.

## Step 4 ✓ passed (25.4s)
md5: 5f8cc60d8d34bd250de415b143732090
On the unfiltered Acme dashboard inbox, reconcile the rows with the independently compiled {{board_request_inventory}}, then assert every inventoried board request appears in the inbox.

## Step 5 ✓ passed (37s)
md5: b663b1d2d2f38caa27a0f30b02d7ccd8
On the unfiltered Acme dashboard inbox, compare its toolbar count to the number of visible request rows, then assert the two counts are equal.

## Step 6 ✓ passed (28.1s)
md5: e00770607a103f126f53e452cdb42185
On the Acme dashboard inbox before selecting a sort, inspect the displayed request rows' vote counts, then assert the default order is Most votes.
