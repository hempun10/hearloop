---
assurance:
  id: t-69
  base: sha256:d97959aa95dc64021964b4c965e0b7c12e4ec04f960ccbf1bfaa69e030affe3c
---
# Unsigned Acme dashboard visitor reaches sign-in, not the dashboard

> Prove direct dashboard entry by an unsigned visitor is redirected to sign-in without dashboard access.

## Step 1 @verifies ac-120, ac-115, ac-116, ac-117, ac-118

In a fresh signed-out browser session, visit {{base_url}}/acme/dashboard, then assert the browser address contains /login, the sign-in form shows an email field, a password field and a Sign in button, and the dashboard sidebar (Posts, Roadmap, Kane runs, Settings) is not shown.
