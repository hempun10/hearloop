---
test: ../acme-roadmap-reconciles-complete-inventory-and-an-empty-3_test.md
status: failed
started: 2026-11-24T05:05:26.306Z
duration_s: 200
session_id: df84ceeb-c8a0-425d-84b4-9253d2fcb87e
---

# Acme Roadmap reconciles complete inventory and an empty stage — Result

## Step 1 ✓ passed (32.7s)
md5: 93fe54f4e71110900d1498e39f66a68f
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (27.4s)
md5: 0e01a448e5b6d79afae6f6547adaebbe
On the Acme dashboard post list, collect the complete board request inventory with each request's title and status for independent comparison with the roadmap.

## Step 3 ✓ passed (17.3s)
md5: bfbdcf57af29b521b1922c56fb55f86a
Open the signed-in Acme dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate the four Planned cards: Dark mode toggle, Passkey sign-in, Two-factor login, and Mobile app.

## Step 4 ✓ passed (73.2s)
md5: 87aa2443c32f96f44825cb5f6644d241
On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, use each of the four Planned cards' status dropdowns to move Dark mode toggle, Passkey sign-in, Two-factor login, and Mobile app to Open, then assert the Planned column shows 0 requests.

## Step 5 ✗ failed (45.8s)
md5: 8490c1591b7455d2d70a319d67ccae9a
Reason: Final verification failed: "Exactly four columns are named Open, Planned, In progress and Shipped; each board request in {{board_request_inventory}} appears exactly once in its matching status column; and every column's displayed count equals its actual membership, including the empty Planned column." — bug verdict: Roadmap verification uses unresolved inventory placeholders [automation_bug/config_issue, confidence 0.99]
On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, reconcile all cards against the independently collected post-list inventory updated for the four Planned-to-Open moves, then assert exactly four columns named Open, Planned, In progress and Shipped, each board request appears exactly once in its matching status column, and every column's displayed count equals its actual membership, including the empty Planned column.
