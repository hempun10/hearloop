---
test: ../empty-roadmap-status-retains-its-column-and-zero-count_test.md
status: failed
started: 2026-11-20T04:33:31.879Z
duration_s: 92
session_id: cc07e253-1f5e-41a5-8c34-2dc2b2e82cb8
---

# Empty roadmap status retains its column and zero count — Result

## Step 1 ✓ passed (36.4s)
md5: c3bc254fa35a89cfd96da1c41806d1b4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✗ failed (52.1s)
md5: c96a46a44f7c494abb3d4affeb25b766
Reason: Current inbox exposes no status-choice list, so the remaining requested values cannot be extracted. — bug verdict: Run stopped before opening a request status menu [automation_bug/state_transition_bug, confidence 0.96]
On the Acme dashboard post list (inbox), establish the unfiltered inventory of requests by status and the available request statuses from a request's status choices; identify a status with no requests in the inventory.

## Step 3 ⏭ skipped
