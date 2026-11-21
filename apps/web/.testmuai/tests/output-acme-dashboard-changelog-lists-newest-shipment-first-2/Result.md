---
test: ../acme-dashboard-changelog-lists-newest-shipment-first-2_test.md
status: passed
started: 2026-11-20T14:48:16.534Z
duration_s: 139
session_id: 2a6ad735-a9e2-4801-b7ea-e22159326a29
---

# Acme dashboard changelog lists newest shipment first — Result

## Step 1 ✓ passed (36.9s)
md5: c6fdc1a88a5b614c8c4b267038662184
At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (27.9s)
md5: bd82de0263011072b6f873c4dffdfbe2
On the Acme dashboard post list, locate {{other_status_title}} and move it to Shipped.

## Step 3 ✓ passed (24.6s)
md5: f6137a62f0f5a759409b86372d3916da
On the Acme dashboard post list, locate {{post_title}} and move it to Shipped after {{other_status_title}}.

## Step 4 ✓ passed (45.9s)
md5: 8f40662d782735f811616f78893618e1
Open the Acme dashboard Changelog page after shipping {{post_title}}, then assert {{post_title}} is listed above {{other_status_title}} and each earlier displayed entry is at least as new as the next.
