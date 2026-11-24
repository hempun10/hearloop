---
test: ../nonmember-author-cannot-edit-own-non-open-acme-request_test.md
status: failed
started: 2026-11-24T03:21:46.005Z
duration_s: 142
session_id: 406fef21-1442-47b1-acc6-a97bc4876f9d
---

# Nonmember author cannot edit own non-Open Acme request — Result

## Step 1 ✓ passed (60.8s)
md5: 987060faf73bdd8a7bc77f1f05bfafa1
At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✗ failed (75.9s)
md5: 88ae6a4a3dc9eb01fd7e307e43e56c6f
Reason: The accessible board and roadmap contain no request titled Mobile app, so the specified request cannot be opened. — bug verdict: Required Mobile app request fixture is absent [automation_bug/test_data_issue, confidence 0.96]
On the Acme board, open the non-Open request titled {{author_nonopen_request_title}} that this signed-in account posted; inspect its request page, then assert no Edit control is present.
