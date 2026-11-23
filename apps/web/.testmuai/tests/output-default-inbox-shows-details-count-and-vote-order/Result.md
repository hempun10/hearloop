---
test: ../default-inbox-shows-details-count-and-vote-order_test.md
status: passed
started: 2026-11-23T05:10:07.529Z
duration_s: 103
session_id: 43820d69-9e9f-4db8-ba67-d1ac667d68ba
---

# Default inbox shows details, count and vote order — Result

## Step 1 ✓ passed (36.9s)
md5: 96da299725592b34def4fc03116cd0cc
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then reach the inbox at {{base_url}}/acme/dashboard in a fresh browser session.

## Step 2 ✓ passed (62.1s)
md5: 4c3ffed247598438daa1deac9a26dc16
On the Acme dashboard inbox, inspect the displayed request rows and the toolbar count, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed request rows, no more than one status filter is active, and the default row order is Most votes.
