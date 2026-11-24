---
assurance:
  id: t-110
  base: sha256:542a54e4c5ac0926e6891d6be941b281c8fe5e36229ecf801efbcdf571465701
---
# Member confirms removal of Acme team-only note

> The any-comment rule covers an internal note, which is visible to members.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

From the Acme board at {{base_url}}/acme, open a request page and post 'Internal moderation probe' after enabling Internal note (team only).

## Step 3 @verifies ac-191

On that request page, initiate removal using the remove button belonging to 'Internal moderation probe', then assert the targeted note has not been removed before confirmation.

## Step 4 @verifies ac-192

Confirm removal of 'Internal moderation probe' on that request page, then assert the targeted note is absent from the member's discussion.
