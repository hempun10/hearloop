---
test: ../non-member-cannot-complete-eligible-request-merge_test.md
status: failed
started: 2026-11-24T03:33:43.388Z
duration_s: 139
session_id: 9c20e615-c755-4a89-9b6e-36f5ff4b58c5
---

# Non-member cannot complete eligible request merge — Result

## Step 1 ✓ passed (29.5s)
md5: 7473f3fb6bf4b4665e089e234c0d5f7b
Open {{base_url}}/login for the Acme board and sign in as the non-member {{nonmember_email}} with {{nonmember_password}}.

## Step 2 ✗ failed (106.4s)
md5: 374146955345b39980ba336f1d350e94
Reason: The derived Acme Open address displays “No board here,” so the requested source cannot be opened as written. — bug verdict: Acme Open source board is unavailable [automation_bug/test_data_issue, confidence 0.92]
Open the Acme Open source request {{merge_nonmember_source_title}} and establish that its address still identifies the unmerged source before the attempt.

## Step 3 ⏭ skipped
