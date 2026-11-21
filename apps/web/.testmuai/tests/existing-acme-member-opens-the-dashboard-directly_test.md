---
assurance:
  id: t-64
  base: sha256:8a3b186f590273e75ecc92f70a5407dc8cc824474f99ad0eff25d8ecbbd19eb4
---
# Existing Acme member opens the dashboard directly

> Prove an existing Acme member can navigate directly to /acme/dashboard and access its board-management destinations.

## Step 1 @verifies ac-109

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}, then visit {{base_url}}/acme/dashboard as an Acme board member and assert the Acme member board dashboard is shown.

## Step 2 @verifies ac-110

On the Acme member dashboard, inspect the board-management navigation, then assert the post list (inbox), roadmap, Kane runs, changelog and settings are all available.
