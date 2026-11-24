---
assurance:
  id: t-51
  base: sha256:366a01c1add9538ca587a2fabccdf874f046501d8d9ad61b4a3dedf37dab579f
---
# Signed-out visitor is sent to sign-in

> A signed-out visitor requesting /acme/dashboard is sent to the sign-in page rather than the private dashboard.

## Step 1

Open {{base_url}}/acme on hearloop and establish a signed-out browser session for the site by clearing its session cookies.

## Step 2 @verifies ac-108, ac-109, ac-110, ac-1

In that signed-out browser session, open {{base_url}}/acme/dashboard, then assert the address contains /login, the sign-in form is shown, the dashboard sidebar is not shown, and no private Acme dashboard content is accessible.
