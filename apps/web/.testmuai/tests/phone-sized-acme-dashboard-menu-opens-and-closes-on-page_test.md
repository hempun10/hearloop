---
assurance:
  id: t-66
  base: sha256:cc6e8bb30605a51c5d126297b84d3cbf3ec217853860013734c05bbb542b1386
---
# Phone-sized Acme dashboard menu opens and closes on page selection

> Prove dashboard menu opens on a phone-sized viewport and closes after choosing a dashboard page.

## Step 1 @verifies ac-109

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard as an Acme member and assert the Acme member board dashboard is shown.

## Step 2 @verifies ac-6, ac-96, ac-110

On the Acme dashboard in a phone-sized browser viewport, open the dashboard menu from its menu button, then assert the menu is open and makes Posts, Roadmap, Kane runs, Changelog and Settings available.

## Step 3 @verifies ac-7

In that open dashboard menu, choose the Roadmap page, then assert the menu has closed.
