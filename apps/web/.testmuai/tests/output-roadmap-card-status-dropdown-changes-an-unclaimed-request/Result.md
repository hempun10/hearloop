---
test: ../roadmap-card-status-dropdown-changes-an-unclaimed-request_test.md
status: failed
started: 2026-11-23T16:29:25.949Z
duration_s: 133
session_id: 7ca90ae4-7bad-4f79-8883-519a370193cb
---

# Roadmap card status dropdown changes an unclaimed request — Result

## Step 1 ✓ passed (59.1s)
md5: a56e9a642b95519125f8c3472d7bf5b2
At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2 ✓ passed (37.7s)
md5: 4553d4b005cd88cb371a7838de7f21a2
On Acme's dashboard post list, collect all request titles and statuses for independent comparison after the status change.

## Step 3 ✗ failed (32.7s)
md5: 022ad7fe184e4f80a7cc8308bf3146b9
Reason: Weekly digest email is in In progress, not Open or Planned, as required. — bug verdict: Target request is not in an eligible status [automation_bug/test_data_issue, confidence 0.98]
On Acme's Roadmap page, identify {{unclaimed_request_title}} in Open or Planned and its current status.

## Step 4 ⏭ skipped
