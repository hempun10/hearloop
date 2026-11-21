---
test: ../empty-roadmap-status-retains-its-column-and-zero-count_test.md
status: passed
started: 2026-11-20T14:51:16.121Z
duration_s: 349
session_id: 647cd567-31d6-4e30-b110-115a7a22f2f8
---

# Empty roadmap status retains its column and zero count — Result

## Step 1 ✓ passed (33.6s)
md5: c3bc254fa35a89cfd96da1c41806d1b4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (47.1s)
md5: d9dcf483beee5b73e85821c7cda218b1
On the Acme dashboard post list (inbox), establish the unfiltered request inventory by status and available statuses from a request's status choices; locate {{planned_request_title}} and confirm it is the sole request currently in Planned.

## Step 3 ✓ passed (88.2s)
md5: b4ce083c9707dfd5e7c9f29ade4d2754
On the Acme dashboard post list (inbox), move {{planned_request_title}} from Planned to Open using its status dropdown.

## Step 4 ✓ passed (24.7s)
md5: f94a4bb753e96c9b71e2a88603a9a573
On the Acme dashboard post list (inbox), establish the updated unfiltered request inventory by status independently of the roadmap, including that Planned has no requests after the move.

## Step 5 ✓ passed (152.2s)
md5: 091f5fefe6f0a818d357d577accda557
Open {{base_url}}/acme/dashboard/roadmap and inspect its columns against the updated inbox inventory and available status choices, then assert Planned still has exactly one column showing a count of zero, every roadmap status column's displayed count equals the independently counted inbox requests for that status, and there is exactly one roadmap column for each available request status.
