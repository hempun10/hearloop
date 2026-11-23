---
assurance:
  id: t-7
  base: sha256:4410809fa5e879c42e22ee1e6ffe70ca00db307e0b205a7623d17b8ab80b5cd2
---
# Direct visit to hidden Acme public changelog identifies it as not public

> Hide the public changelog and visit its address directly; the page identifies itself as not public.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}; reach the board dashboard.

## Step 2

On the Acme dashboard Changelog page, while its public changelog is shown, follow View public page and store the public changelog address.

## Step 3 @verifies ac-11

On the Acme board dashboard at {{base_url}}/acme/dashboard, in Settings > Access, hide the public changelog, then assert the show or hide public changelog choice is available and set to hidden.

## Step 4 @verifies ac-14

In a fresh signed-out browser context, directly open the stored public changelog address, then assert a notice says the public changelog is not public.
