---
test: ../nonmember-author-cannot-edit-own-non-open-acme-request-2_test.md
status: passed
started: 2026-11-24T04:15:31.741Z
duration_s: 84
session_id: e65a6a84-d75a-4bba-ba88-3a7ac8b6e682
---

# Nonmember author cannot edit own non-Open Acme request — Result

## Step 1 ✓ passed (25s)
md5: 987060faf73bdd8a7bc77f1f05bfafa1
At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✓ passed (14.6s)
md5: f9a1cf7b78da29adf2b9671a1fe710a8
After sign-in, open the Acme public board at {{base_url}}/acme directly, regardless of whether the account landed on 'Name your board'; use the Acme request list rather than a demo board.

## Step 3 ✓ passed (41.4s)
md5: 5adeaa174ee9d8ce417d8341c1483d68
From the request list at {{base_url}}/acme, open the non-Open request titled {{author_nonopen_request_title}} that this signed-in account posted; inspect its request page, then assert no Edit control is present.
