---
assurance:
  id: t-84
  base: sha256:7004d0fa41c3143a62e63e6acc654f98ebf0049719c21d9f633471e59d30acb6
---
# Cancelled Acme invitation displays the invalid-link message

> A member cancels an open invitation and its link displays the specified invalid-link message.

## Step 1

At {{base_url}}/login, sign in as an Acme member using {{e2e_email}} and {{e2e_password}}.

## Step 2

In Acme dashboard Settings → Members, create an invite link and store its displayed address as smart.invite_url.

## Step 3

On the same Members page, find the newly created link under Open invite links and cancel it.

## Step 4 @verifies ac-160

Open {{smart.invite_url}} in the browser after cancellation, then assert the page says "This invite link doesn't work".
