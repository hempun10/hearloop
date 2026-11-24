---
test: ../member-confirms-removal-of-own-acme-public-comment_test.md
status: passed
started: 2026-11-24T03:08:22.980Z
duration_s: 136
session_id: d9217ebc-0e8e-4a4c-b2c5-94c2d925e728
---

# Member confirms removal of own Acme public comment — Result

## Step 1 ✓ passed (24.4s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (28.6s)
md5: b21262433a6e96a45f95cda3851733fd
From the Acme board at {{base_url}}/acme, open a request page and publish the public comment 'Own moderation probe {{kane_run_id}}' using Comment.

## Step 3 ✓ passed (29.4s)
md5: 994cf3a61ea7c9a29ff421b08cfbfefb
On that request page, initiate removal using the remove button belonging to 'Own moderation probe {{kane_run_id}}', then assert that comment has not been removed before confirmation.

## Step 4 ✓ passed (50s)
md5: b72a8cf4c4ac9ee1a080a024edabe514
Confirm removal of 'Own moderation probe {{kane_run_id}}' and inspect that request's comments, then assert the targeted comment is absent.
