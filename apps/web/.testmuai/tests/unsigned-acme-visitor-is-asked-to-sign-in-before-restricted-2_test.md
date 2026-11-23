---
assurance:
  id: t-48
  base: sha256:522601366e989bf712b9aaadcd373ca39554865074857bc2812915efe4b7d92d
---
# Unsigned Acme visitor is asked to sign in before restricted posting

> A member restricts posting to signed-in people; an unsigned visitor attempting to post is asked to sign in before posting.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2 @verifies ac-9

On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, set who can post to signed-in people only, then assert that the signed-in people only posting choice is available and selected.

## Step 3

On the Acme board dashboard, sign out of the member account using the account menu; continue in this same browser session as a visitor who is not signed in.

## Step 4 @verifies ac-12

From {{base_url}}/acme in the same signed-out browser session, attempt to post to the public board, then assert a request to sign in appears before posting.
