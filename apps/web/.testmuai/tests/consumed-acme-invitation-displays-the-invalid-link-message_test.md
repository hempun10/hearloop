---
assurance:
  id: t-83
  base: sha256:555659d512f2a1cc7f50640bc83a2f37ffd47dc9b7ca4ae33994482aa78cd205
---
# Consumed Acme invitation displays the invalid-link message on replay

> After successful consumption, opening the same one-use invitation displays the specified invalid-link message.

## Step 1

At {{base_url}}/login, sign in as an existing Acme member using {{e2e_email}} and {{e2e_password}}.

## Step 2

In Acme dashboard Settings → Members, create an invite link and store its displayed address as smart.invite_url.

## Step 3

Sign out of the member account, open {{smart.invite_url}}, and sign in as the nonmember using {{nonmember_email}} and {{nonmember_password}}.

## Step 4

On the fresh invitation, accept Join Acme to consume the one-use link.

## Step 5 @verifies ac-159

Reopen {{smart.invite_url}} in the browser, then assert the page says "This invite link doesn't work".
