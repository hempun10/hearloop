---
assurance:
  id: t-97
  base: sha256:34730d4d6d8107880981eeaccb984278aab1baeb6ad9572f68cc782d1a742f43
---
# Unconfirmed Acme comment removal retains comment

> Request removal of a public comment without confirming; it must remain visible.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

From the Acme board at {{base_url}}/acme, open a request page and post the public comment 'Keep moderation probe {{kane_run_id}}' with Comment.

## Step 3 @verifies ac-191

On that request page, initiate removal using the remove button belonging to 'Keep moderation probe {{kane_run_id}}', then assert the comment has not been removed before confirmation.

## Step 4 @verifies ac-191

Leave the removal confirmation without confirming, then return to the request page and locate 'Keep moderation probe {{kane_run_id}}', then assert the comment remains present.
