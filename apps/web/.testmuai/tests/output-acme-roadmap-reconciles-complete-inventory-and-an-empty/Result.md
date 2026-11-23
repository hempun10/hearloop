---
test: ../acme-roadmap-reconciles-complete-inventory-and-an-empty_test.md
status: failed
started: 2026-11-23T16:16:17.089Z
duration_s: 161
session_id: 7aa17dd4-1152-4a4a-9985-9798e7f69504
---

# Acme Roadmap reconciles complete inventory and an empty stage — Result

## Step 1 ✓ passed (53.4s)
md5: a56e9a642b95519125f8c3472d7bf5b2
At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2 ✓ passed (63.1s)
md5: 488610b896ad6d3eb13b128933b10002
On Acme's dashboard post list (inbox), collect the complete board request inventory with each request's title and status as the independent expected Roadmap membership.

## Step 3 ✗ failed (40.7s)
md5: d0c5d39cebb606427a6d07eec3ce11cb
Reason: All four columns match inventory counts 3,1,2,2, so no status stage is empty. — bug verdict: Roadmap fixture lacks required empty status stage [automation_bug/config_issue, confidence 0.99]
On Acme's dashboard Roadmap page, compare every card and status-column count to that inbox inventory, including at least one empty status stage, then assert there are exactly four columns Open, Planned, In progress and Shipped, every inventoried request appears exactly once in its matching column, and every column count equals its inventory membership including zero.
