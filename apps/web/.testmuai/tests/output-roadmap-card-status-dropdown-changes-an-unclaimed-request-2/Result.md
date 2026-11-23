---
test: ../roadmap-card-status-dropdown-changes-an-unclaimed-request-2_test.md
status: passed
started: 2026-11-23T17:18:48.323Z
duration_s: 213
session_id: 31cf6eb3-927f-4284-9a02-46f4774615ca
---

# Roadmap card status dropdown changes an unclaimed request — Result

## Step 1 ✓ passed (35.2s)
md5: 93fe54f4e71110900d1498e39f66a68f
At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (71.9s)
md5: 74bb466db61910bc65fa550304adc13d
On the Acme dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3 ✓ passed (20.7s)
md5: 314a409950cc635d753a2c295507b407
Open the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{other_status_title}} in Open; this seeded request is not claimed by an agent.

## Step 4 ✓ passed (81.6s)
md5: 60178154fe596973de7fb67fa6771856
On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, use the status dropdown on {{other_status_title}} to change it from Open to Planned and reload that dashboard Roadmap, then assert its status is Planned, it appears exactly once in the matching Planned column, all four columns remain present, and each column count agrees with the request inventory after that single Open-to-Planned move.
