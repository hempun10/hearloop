---
assurance:
  id: t-2
  base: sha256:56e5d06089a7e2f7e86a72917a14dad7ff5d08bb99e7b723cd400bd7a32b4e0c
---
# Signed-out visitor is sent to sign-in

> A signed-out visitor requesting /acme/dashboard is sent to the sign-in page rather than the private dashboard.

## Step 1

Open {{base_url}}/acme on hearloop and establish a signed-out browser session for the site by clearing its session cookies.

## Step 2 @verifies ac-1, ac-3

In that signed-out browser session, open {{base_url}}/acme/dashboard, then assert the browser is at {{base_url}}/login and no private Acme dashboard content is accessible.
