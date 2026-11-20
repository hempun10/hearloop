---
assurance:
  id: t-1
  base: sha256:89dca39159ab212bf73b89d784caeb18be9511c7da45779c901c0795540d3772
---
# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard

> Prove direct dashboard entry by an unsigned visitor is redirected to sign-in without dashboard access.

## Step 1 @verifies ac-1, ac-2

In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the browser reaches {{base_url}}/login and Acme dashboard content is not accessible.
