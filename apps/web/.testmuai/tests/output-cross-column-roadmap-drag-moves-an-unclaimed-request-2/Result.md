---
test: ../cross-column-roadmap-drag-moves-an-unclaimed-request-2_test.md
status: passed
started: 2026-11-23T17:14:14.190Z
duration_s: 226
session_id: a694f35a-4442-41ca-9d93-9634c0e872f8
---

# Cross-column Roadmap drag moves an unclaimed request — Result

## Step 1 ✓ passed (34.3s)
md5: 93fe54f4e71110900d1498e39f66a68f
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (34.2s)
md5: 74bb466db61910bc65fa550304adc13d
On the Acme dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3 ✓ passed (15.4s)
md5: 314a409950cc635d753a2c295507b407
Open the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{other_status_title}} in Open; this seeded request is not claimed by an agent.

## Step 4 ✓ passed (138.4s)
md5: 4d077fb3a74ff6a97686f3f9037ec458
On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, drag {{other_status_title}} from Open to Planned and reload that dashboard Roadmap, then assert its status is Planned, it appears exactly once in the matching Planned column, all four status columns remain present, and each column count agrees with the request inventory after the single Open-to-Planned move.
