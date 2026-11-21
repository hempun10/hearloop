---
test: ../empty-roadmap-status-retains-its-column-and-zero-count-2_test.md
status: failed
started: 2026-11-20T09:57:15.115Z
duration_s: 91
session_id: 9c7099f2-7178-4c42-a0eb-8b07b1e00649
---

# Empty roadmap status retains its column and zero count — Result

## Step 1 ✓ passed (40.3s)
md5: c3bc254fa35a89cfd96da1c41806d1b4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✗ failed (47s)
md5: c96a46a44f7c494abb3d4affeb25b766
Reason: All available statuses have at least one request, so no status with zero requests exists. — bug verdict: No zero-count request status in test inventory [automation_bug/test_data_issue, confidence 0.98]
On the Acme dashboard post list (inbox), establish the unfiltered inventory of requests by status and the available request statuses from a request's status choices; identify a status with no requests in the inventory.

## Step 3 ⏭ skipped
