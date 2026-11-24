---
assurance:
  id: t-109
  base: sha256:c6d5d9e910a66332ed4e39975d21af0e304873136c2f8de03998a4ec02c00538
---
# Member confirms removal of another author's Acme public comment

> A board member can remove a public comment written by a signed-in nonmember after confirming.

## Step 1

At {{base_url}}/login, sign in with {{nonmember_email}} and {{nonmember_password}} as a signed-in nonmember of Acme.

## Step 2

From the Acme public board at {{base_url}}/acme, open a request page and publish the public comment 'Other author moderation probe' using Comment.

## Step 3

End the nonmember session, sign in at {{base_url}}/login with the Acme member account {{e2e_email}} and {{e2e_password}}, and return to the request containing 'Other author moderation probe'.

## Step 4 @verifies ac-191

On that request page, initiate removal using that comment's remove button, then assert 'Other author moderation probe' has not been removed before confirmation.

## Step 5 @verifies ac-192

Confirm removal of 'Other author moderation probe' and inspect that request's comments, then assert the targeted comment is absent.
