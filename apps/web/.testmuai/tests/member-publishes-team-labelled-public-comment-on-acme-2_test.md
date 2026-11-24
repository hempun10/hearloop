---
assurance:
  id: t-108
  base: sha256:e4baed03d3e7680e4a3b5e9c7a8883dfe7c42014e4e8b1f762cb1d2aff4c2af2
---
# Member publishes Team-labelled public comment on Acme request

> A member posts a public comment and sees its Team label, author and age on the request page.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 @verifies ac-126, ac-120, ac-122, ac-123, ac-124

On that request page, write 'Member-created public comment probe' as a public comment and post with Comment, then assert the new public comment appears with its author, age, and Team label.
