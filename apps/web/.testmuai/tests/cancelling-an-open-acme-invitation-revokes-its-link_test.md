---
assurance:
  id: t-81
  base: sha256:36549e3f4828bca69982d58075c8435fed3533854d08d0c7d4d015dcc0099a0f
---
# Cancelling an open Acme invitation revokes its link

> Find a newly created open invitation, cancel it, then attempt to open that link and see the invalid-link message.

## Step 1 @verifies ac-142, ac-143, ac-144

At {{base_url}}/acme/dashboard, sign in with {{e2e_email}} and {{e2e_password}}, then open Settings → Members and assert each listed member has a name and email and the current member's row says "You".

## Step 2

On Acme's Settings → Members page, create an invite link and store its displayed URL as cancelled_invite_url.

## Step 3 @verifies ac-148, ac-149

On Acme's Settings → Members page, locate the newly created link under "Open invite links", then assert that link is listed with "Cancel link".

## Step 4 @verifies ac-155

On Acme's Settings → Members page, cancel that newly created open link and open cancelled_invite_url, then assert "This invite link doesn't work" is shown.
