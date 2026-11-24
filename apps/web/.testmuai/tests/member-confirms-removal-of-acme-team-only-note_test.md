---
assurance:
  id: t-99
  base: sha256:e09d4736e81f3c86139b3d7aacd572539a28641e0d7de0748f19ad97fcd975a5
---
# Member confirms removal of Acme team-only note

> The any-comment rule covers an internal note, which is visible to members.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

From the Acme board at {{base_url}}/acme, open a request page and post 'Internal moderation probe {{kane_run_id}}' after enabling Internal note (team only).

## Step 3 @verifies ac-191

On that request page, initiate removal using the remove button belonging to 'Internal moderation probe {{kane_run_id}}', then assert the targeted note has not been removed before confirmation.

## Step 4 @verifies ac-192

Confirm removal of 'Internal moderation probe {{kane_run_id}}' on that request page, then assert the targeted note is absent from the member's discussion.
