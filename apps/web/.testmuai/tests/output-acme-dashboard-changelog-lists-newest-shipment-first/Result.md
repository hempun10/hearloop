---
test: ../acme-dashboard-changelog-lists-newest-shipment-first_test.md
status: failed
started: 2026-11-20T09:21:52.823Z
duration_s: 80
session_id: 1ff42a83-f41f-4fb8-91b1-84b147c2a96b
---

# Acme dashboard changelog lists newest shipment first — Result

## Step 1 ✓ passed (5.03s)
md5: c6fdc1a88a5b614c8c4b267038662184
At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (6.73s)
md5: dce1344abeed78efb3aab41506fbcca4
On the Acme dashboard post list, locate two distinct requests {{other_status_title}} and {{kane_request_title}} and move {{other_status_title}} to Shipped before moving {{kane_request_title}} to Shipped.

## Step 3 ✗ failed (64.6s)
md5: 119b493d79ecedf7d39d1df5edeac837
Reason: Final verification failed: "{{global.kane_request_title}} appears ahead of {{global.other_status_title}} and every displayed entry is ordered newest first." — bug verdict: Stale shipped fixture leaves target behind newer changelog entry [automation_bug/test_data_issue, confidence 0.86]
Open the Acme dashboard Changelog page after shipping {{kane_request_title}}, then assert {{kane_request_title}} appears ahead of {{other_status_title}} and every displayed entry is ordered newest first.
