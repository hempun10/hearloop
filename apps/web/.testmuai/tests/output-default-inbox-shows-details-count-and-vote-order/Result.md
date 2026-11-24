---
test: ../default-inbox-shows-details-count-and-vote-order_test.md
status: passed
started: 2026-11-24T01:29:55.205Z
duration_s: 137
session_id: 4c57891d-d77e-415f-baf9-5bf8275fa2b0
---

# Default inbox shows details, count and vote order — Result

## Step 1 ✓ passed (36.2s)
md5: 96da299725592b34def4fc03116cd0cc
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then reach the inbox at {{base_url}}/acme/dashboard in a fresh browser session.

## Step 2 ✓ passed (64.7s)
md5: 4c3ffed247598438daa1deac9a26dc16
On the Acme dashboard inbox, inspect the displayed request rows and the toolbar count, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed request rows, no more than one status filter is active, and the default row order is Most votes.
