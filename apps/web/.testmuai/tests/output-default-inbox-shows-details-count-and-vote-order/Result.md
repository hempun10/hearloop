---
test: ../default-inbox-shows-details-count-and-vote-order_test.md
status: passed
started: 2026-11-24T04:37:57.639Z
duration_s: 136
session_id: dab7904b-d02d-474a-9e66-9f2ec894ad7d
---

# Default inbox shows details, count and vote order — Result

## Step 1 ✓ passed (26.6s)
md5: 96da299725592b34def4fc03116cd0cc
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then reach the inbox at {{base_url}}/acme/dashboard in a fresh browser session.

## Step 2 ✓ passed (39.2s)
md5: 4c3ffed247598438daa1deac9a26dc16
On the Acme dashboard inbox, inspect the displayed request rows and the toolbar count, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed request rows, no more than one status filter is active, and the default row order is Most votes.
