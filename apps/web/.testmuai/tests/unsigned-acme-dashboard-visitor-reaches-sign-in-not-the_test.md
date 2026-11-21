---
assurance:
  id: t-63
  base: sha256:342040d84a2c04d7dae206269ecddc327cb2f7a99331c91458850558837d03bc
---
# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard

> Prove direct dashboard entry by an unsigned visitor is redirected to sign-in without dashboard access.

## Step 1 @verifies ac-1, ac-2, ac-95

In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the browser reaches {{base_url}}/login, shows a sign-in form, and does not expose Acme dashboard content.
