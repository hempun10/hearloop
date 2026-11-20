---
assurance:
  id: t-5
  base: sha256:3a4dbc028776f517acc51be22b00396f8ba944f815f0702711aebe3216ba3eea
---
# Unsigned Acme visitor is asked to sign in before restricted posting

> A member restricts posting to signed-in people; an unsigned visitor attempting to post is asked to sign in before posting.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 @verifies ac-9

On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, set who can post to signed-in people only, then assert that the signed-in people only posting choice is available and selected.

## Step 3 @verifies ac-12

In a fresh signed-out browser context starting at {{base_url}}/acme, attempt to post to the public board, then assert a request to sign in appears before posting.
