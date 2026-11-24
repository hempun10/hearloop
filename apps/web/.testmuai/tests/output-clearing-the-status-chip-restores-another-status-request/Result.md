---
test: ../clearing-the-status-chip-restores-another-status-request_test.md
status: passed
started: 2026-11-24T01:52:45.438Z
duration_s: 190
session_id: 4c7eb6fe-a35f-41fc-98cd-8a782bcaf3d8
---

# Clearing the status chip restores another-status request — Result

## Step 1 ✓ passed (32.8s)
md5: ec349281b5afd039ec336d369f773181
From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}} and open the inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (51.2s)
md5: 86480f07f26f23240339bfbd9dcaf818
In the Acme dashboard inbox, locate {{other_status_title}} and identify its current status and another populated status in the Filter menu.

## Step 3 ✓ passed (48.8s)
md5: 77b403203acfc8678ee2bda73c6febeb
On the Acme dashboard inbox, choose the populated Filter-menu status different from {{other_status_title}}'s status, then assert every displayed row has the selected status and at most one status filter is active.

## Step 4 ✓ passed (54.4s)
md5: c2e3efe797e99116616903f8624fa0d5
In the inbox, clear the active status chip using its x, then assert a request of a different status, {{other_status_title}}, appears again, every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed rows.
