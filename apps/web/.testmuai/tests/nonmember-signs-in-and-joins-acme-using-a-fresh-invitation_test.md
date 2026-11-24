---
assurance:
  id: t-82
  base: sha256:abd95a277c8ef3c31f82ac416c9514e19169c906d974b4c9232863134d752d0e
---
# Nonmember signs in and joins Acme using a fresh invitation

> A fresh invitation requires authentication before Join Acme, then grants board membership and opens the dashboard.

## Step 1

At {{base_url}}/login, sign in to the Acme board as its existing member using {{e2e_email}} and {{e2e_password}}.

## Step 2

In Acme dashboard Settings → Members, create an invite link and store the displayed link as smart.invite_url.

## Step 3

Sign out of the member account and return to the public Acme board.

## Step 4 @verifies ac-156

Open {{smart.invite_url}} while signed out, then assert sign-in or sign-up is required before Join Acme is offered.

## Step 5

On the invitation journey, sign in as the nonmember with {{nonmember_email}} and {{nonmember_password}} and reach Join Acme.

## Step 6 @verifies ac-158

Accept Join Acme on the fresh invitation, then assert the Acme dashboard opens.

## Step 7 @verifies ac-157

On the Acme dashboard, visit Settings → Members, then assert the joining account appears in the board members list.
