---
assurance:
  id: t-78
  base: sha256:adb3e31e2759fbd59e070dca0e2bb07af32aba6f626e3c8cb50b7a41f85f3fa0
---
# Member creates and initially copies an Acme invitation

> From Settings → Members, create a link shown once with a copy button and capture it for subsequent journeys.

## Step 1 @verifies ac-142, ac-143, ac-144

At {{base_url}}/acme/dashboard, sign in as an Acme member with {{e2e_email}} and {{e2e_password}}, then open Settings → Members and assert every listed member has a name and email and the current member's row says "You".

## Step 2 @verifies ac-145, ac-146

On Acme's Settings → Members page, create an invite link, then assert the new link is displayed with its copy button.

## Step 3 @verifies ac-147

On Acme's Settings → Members page, store the newly displayed invitation URL as invite_url, then leave its initial display and return to Members; assert the created link is not displayed again as a newly created link.
