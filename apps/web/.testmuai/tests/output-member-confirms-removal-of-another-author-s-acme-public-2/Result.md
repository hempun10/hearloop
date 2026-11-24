---
test: ../member-confirms-removal-of-another-author-s-acme-public-2_test.md
status: passed
started: 2026-11-24T04:08:37.822Z
duration_s: 356
session_id: 9fbf29b1-e4d5-4648-9dc4-a85b1ae4c431
---

# Member confirms removal of another author's Acme public comment — Result

## Step 1 ✓ passed (23s)
md5: 983c7f666f9d274fd39bb36ee00660ed
At {{base_url}}/login, sign in with {{nonmember_email}} and {{nonmember_password}} as a signed-in nonmember of Acme.

## Step 2 ✓ passed (23.9s)
md5: 1b9ebd0144c1b7c1d53f2cdd560091ef
From the Acme public board at {{base_url}}/acme, open a request page and publish the public comment 'Other author moderation probe' using Comment.

## Step 3 ✓ passed (238s)
md5: a7fafb475051591fb1a39678f90580f7
End the nonmember session, sign in at {{base_url}}/login with the Acme member account {{e2e_email}} and {{e2e_password}}, and return to the request containing 'Other author moderation probe'.

## Step 4 ✓ passed (30.4s)
md5: c26430b5b1225578f7084b6feea23822
On that request page, initiate removal using that comment's remove button, then assert 'Other author moderation probe' has not been removed before confirmation.

## Step 5 ✓ passed (38.4s)
md5: be47361450a3c04aee1fbbab8cb2115c
Confirm removal of 'Other author moderation probe' and inspect that request's comments, then assert the targeted comment is absent.
