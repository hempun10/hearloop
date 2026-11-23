---
test: ../own-column-roadmap-drop-preserves-status-and-counts-2_test.md
status: passed
started: 2026-11-23T17:09:35.749Z
duration_s: 229
session_id: e8857734-43ca-442f-945c-87737fa73663
---

# Own-column Roadmap drop preserves status and counts — Result

## Step 1 ✓ passed (48.4s)
md5: 93fe54f4e71110900d1498e39f66a68f
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (40.3s)
md5: 69faadeef377dbde4f10e49edd895f26
On the Acme dashboard post list, collect all request titles and statuses for independent reconciliation with the Roadmap.

## Step 3 ✓ passed (15.1s)
md5: 248153ef3a3532943d1f1087c6db1951
Open the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{other_status_title}} in its current status column.

## Step 4 ✓ passed (121.4s)
md5: 3f2371615e88e4d8d40d0d73ee8dcbc8
On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, drop {{other_status_title}} on its own status column and reload that dashboard Roadmap, then assert its status remains the original status, its card occurs exactly once in the matching column, all four status columns remain present, and their counts agree with the unchanged board request inventory.
