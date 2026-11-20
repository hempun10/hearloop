---
assurance:
  id: t-8
  base: sha256:9b6ad5cf0799bb96e27cc4b43767f96b14d6a043353dde138c7c6c7f3a03bb3b
---
# Unsigned Acme visitor posts when anyone is eligible

> A member selects anyone as posting eligibility; an unsigned visitor can post rather than being required to sign in.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 @verifies ac-8

On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, set who can post to anyone, then assert the anyone posting choice is available and selected.

## Step 3 @verifies ac-15

In a fresh signed-out browser context starting at {{base_url}}/acme, post a feedback request titled {{post_title}} to the public board, then assert the unsigned visitor can post it without being asked to sign in.
