---
assurance:
  id: t-43
  base: sha256:87bd93474e4eac3aefb261b6692116f27ffa54627eb1f1a801c24c4fb8c54374
---
# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard

> Prove direct dashboard entry by an unsigned visitor is redirected to sign-in without dashboard access.

## Step 1 @verifies ac-1, ac-95

In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the sign-in form is shown and Acme dashboard content is not accessible, even if the address has a return-path query string.
