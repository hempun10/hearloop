---
assurance:
  id: t-100
  base: sha256:456bb0c3aee2d8a093156d1b9ae6cce8f1e3e3d653f6db23dfaa1e77cdacb200
---
# Member confirms removal of own Acme public comment

> Board member confirms removal of their own public comment on a request.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

From the Acme board at {{base_url}}/acme, open a request page and publish the public comment 'Own moderation probe {{kane_run_id}}' using Comment.

## Step 3 @verifies ac-191

On that request page, initiate removal using the remove button belonging to 'Own moderation probe {{kane_run_id}}', then assert that comment has not been removed before confirmation.

## Step 4 @verifies ac-192

Confirm removal of 'Own moderation probe {{kane_run_id}}' and inspect that request's comments, then assert the targeted comment is absent.
