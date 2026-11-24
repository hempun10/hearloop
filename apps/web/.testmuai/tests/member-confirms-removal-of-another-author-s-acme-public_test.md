---
assurance:
  id: t-98
  base: sha256:c1cd71f0918a615bcbbf11f4fa882b0742a534749f07c1999e686d0f8d3448ad
---
# Member confirms removal of another author's Acme public comment

> A board member can remove a public comment written by a signed-in nonmember after confirming.

## Step 1

At {{base_url}}/login, sign in with {{nonmember_email}} and {{nonmember_password}} as a signed-in nonmember of Acme.

## Step 2

From the Acme public board at {{base_url}}/acme, open a request page and publish the public comment 'Other author moderation probe {{kane_run_id}}' using Comment.

## Step 3

End the nonmember session, sign in at {{base_url}}/login with the Acme member account {{e2e_email}} and {{e2e_password}}, and return to the request containing 'Other author moderation probe {{kane_run_id}}'.

## Step 4 @verifies ac-191

On that request page, initiate removal using that comment's remove button, then assert 'Other author moderation probe {{kane_run_id}}' has not been removed before confirmation.

## Step 5 @verifies ac-192

Confirm removal of 'Other author moderation probe {{kane_run_id}}' and inspect that request's comments, then assert the targeted comment is absent.
