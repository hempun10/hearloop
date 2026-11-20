---
test: ../acme-dashboard-changelog-lists-newest-shipment-first_test.md
status: failed
started: 2026-11-20T05:46:05.311Z
duration_s: 67
session_id: 01319820-a996-456b-b0a8-f97ea37d4eb0
---

# Acme dashboard changelog lists newest shipment first — Result

## Step 1 ✓ passed (3.68s)
md5: c6fdc1a88a5b614c8c4b267038662184
At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (5.88s)
md5: dce1344abeed78efb3aab41506fbcca4
On the Acme dashboard post list, locate two distinct requests {{other_status_title}} and {{kane_request_title}} and move {{other_status_title}} to Shipped before moving {{kane_request_title}} to Shipped.

## Step 3 ✗ failed (54.1s)
md5: 119b493d79ecedf7d39d1df5edeac837
Reason: Final verification failed: "{{global.kane_request_title}} appears ahead of {{global.other_status_title}} and every displayed entry is ordered newest first." — bug verdict: Target request was not shipped before changelog verification [automation_bug/agent_misstep, confidence 0.94]
Open the Acme dashboard Changelog page after shipping {{kane_request_title}}, then assert {{kane_request_title}} appears ahead of {{other_status_title}} and every displayed entry is ordered newest first.
