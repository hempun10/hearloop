---
test: ../invalid-short-title-leaves-acme-request-unchanged_test.md
status: passed
started: 2026-11-24T03:18:40.673Z
duration_s: 179
session_id: e96a4029-fc45-48ff-b7cd-157d9a9a8f0c
---

# Invalid short title leaves Acme request unchanged — Result

## Step 1 ✓ passed (31.3s)
md5: 29dd7d194ca892d7068b7b56e02cb83c
At {{base_url}}/login for the Acme board, sign in as a board member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (31.7s)
md5: 7580bd287e00c4186355b19ebca58291
On the Acme board, open the request titled {{other_status_title}}; beside Posted, assert Edit is available.

## Step 3 ✓ passed (31s)
md5: d372fbeebd32a0fdd50f922585443d10
capture baseline: original request title and details on the Acme request page titled {{other_status_title}}

## Step 4 ✓ passed (20.7s)
md5: 0cbe4385f21dd7a786d62c19759b049e
On that request page, open Edit, then assert the form offers an editable title and editable details.

## Step 5 ✓ passed (28.7s)
md5: 684757d2061fd5671700995a88375887
In the request edit form, enter 'abc' as the title and 'Invalid save must not change details.' as the details, then Save; assert an error is shown for the title shorter than four characters.

## Step 6 ✓ passed (32.5s)
md5: 1b8166f01f049d221442b6c5a8a4f184
Reload that Acme request page after the rejected Save, then assert its title equals the original title captured before Save and its details equal the original details captured before Save.
