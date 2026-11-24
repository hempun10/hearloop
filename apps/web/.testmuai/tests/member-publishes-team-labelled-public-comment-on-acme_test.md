---
assurance:
  id: t-71
  base: sha256:e896525c0ad344d337427ea9f935c865a1661fbd393e7308ac63e0cf7ab3de84
---
# Member publishes Team-labelled public comment on Acme request

> A member posts a public comment and sees its Team label, author and age on the request page.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 @verifies ac-126, ac-120, ac-122, ac-123, ac-124

On that request page, write 'Public member discussion probe {{kane_run_id}}' as a public comment and post with Comment, then assert the new public comment appears with its author, age, and Team label.
