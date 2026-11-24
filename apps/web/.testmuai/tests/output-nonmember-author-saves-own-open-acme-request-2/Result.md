---
test: ../nonmember-author-saves-own-open-acme-request-2_test.md
status: passed
started: 2026-11-24T04:16:23.878Z
duration_s: 131
session_id: 8fce24bf-29e4-43b0-b211-1ef6f5e9284d
---

# Nonmember author saves own Open Acme request — Result

## Step 1 ✓ passed (26.9s)
md5: 987060faf73bdd8a7bc77f1f05bfafa1
At {{base_url}}/login for the Acme board, sign in as the nonmember author with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✓ passed (14.7s)
md5: f9a1cf7b78da29adf2b9671a1fe710a8
After sign-in, open the Acme public board at {{base_url}}/acme directly, regardless of whether the account landed on 'Name your board'; use the Acme request list rather than a demo board.

## Step 3 ✓ passed (25.8s)
md5: 3593d8c2b1e51a1461f007b89a4b7a6e
From the request list at {{base_url}}/acme, open the Open request titled {{author_open_request_title}} that this signed-in account posted, then assert Edit is present.

## Step 4 ✓ passed (21.7s)
md5: 94961f0ae370042a14e5b619c7647dfd
On that request page, open Edit, then assert the form offers an editable request title and editable request details.

## Step 5 ✓ passed (36.7s)
md5: bae3647913e32412303dcb1c4f022ff7
In the Open request's edit form, replace the title with 'Acme author edit proof' and the details with 'Author edit proof details.', then Save; assert the request page shows the submitted title 'Acme author edit proof' and submitted details 'Author edit proof details.'.
