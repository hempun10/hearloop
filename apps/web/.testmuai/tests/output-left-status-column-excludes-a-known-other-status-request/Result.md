---
test: ../left-status-column-excludes-a-known-other-status-request_test.md
status: passed
started: 2026-11-24T01:49:17.116Z
duration_s: 159
session_id: a586ac95-6301-4861-8036-24dac399b808
---

# Left status column excludes a known other-status request — Result

## Step 1 ✓ passed (34.6s)
md5: ec349281b5afd039ec336d369f773181
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}} and open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (45.8s)
md5: 44eb366bbd3a52a1d178bbc3ee1fb392
On the Acme dashboard inbox, find the request titled {{other_status_title}} and identify its current status; identify another populated status in the left status column.

## Step 3 ✓ passed (74.9s)
md5: f3df49cbe42b358c50a4f20c84d87e6e
In the Acme dashboard inbox, select the populated left-column status different from the status of {{other_status_title}}, then assert every displayed request has that selected status, {{other_status_title}} is absent from the displayed rows, every displayed row shows status, vote count and age, the toolbar count equals the number of displayed rows, and no more than one status filter is active.
