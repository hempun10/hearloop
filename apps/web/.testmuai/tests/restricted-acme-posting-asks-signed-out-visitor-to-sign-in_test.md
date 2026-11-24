---
assurance:
  id: t-7
  base: sha256:d5d67d1a8673eca8df133e54eb0d767f1408fc80938abf326b5b5e7f0f7fe9f9
---
# Restricted Acme posting asks signed-out visitor to sign in

> A board member chooses signed-in-only posting; a signed-out visitor tries to post and is asked to sign in first.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set posting eligibility to signed-in people only and save the setting.

## Step 3 @verifies ac-9

In a signed-out browser context at {{base_url}}/acme, attempt to post to the public board, then assert the visitor is asked to sign in before posting.
