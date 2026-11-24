---
test: ../acme-roadmap-reconciles-complete-inventory-and-an-empty-2_test.md
status: passed
started: 2026-11-23T17:54:21.984Z
duration_s: 74
session_id: d7829fd0-8489-45b9-be90-160244c638ef
---

# Acme Roadmap reconciles complete inventory and an empty stage — Result

## Step 1 ✓ passed (3.83s)
md5: 93fe54f4e71110900d1498e39f66a68f
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (0.09s)
md5: 0e01a448e5b6d79afae6f6547adaebbe
On the Acme dashboard post list, collect the complete board request inventory with each request's title and status for independent comparison with the roadmap.

## Step 3 ✓ passed (0.26s)
md5: 17e0298d2ef080e6e788975e58b85759
Open the signed-in Acme dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate the card {{planned_request_title}}, the only request in Planned.

## Step 4 ✓ passed (8.06s)
md5: 038eae30109fd5967242f16fd992c9d1
On that dashboard Roadmap card, use its status dropdown to move {{planned_request_title}} from Planned to Open, then assert the Planned column shows 0 requests.

## Step 5 ✓ passed (55.8s)
md5: 5a1f273feeb044aeadae6a5ee084860b
On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, reconcile all cards against the independently collected post-list inventory updated for the single Planned-to-Open move, then assert exactly four columns named Open, Planned, In progress and Shipped, each board request appears exactly once in its matching status column, and every column's displayed count equals its actual membership, including the empty Planned column.
