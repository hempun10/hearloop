---
assurance:
  id: t-44
  base: sha256:d2d8331f62b67b7579d2b31999b94a1b4791bd42f894847d3fd42f75e86307a6
---
# Phone-sized Acme dashboard menu opens and closes on page selection

> Prove the dashboard menu opens on a phone-sized viewport and closes after choosing a dashboard page.

## Step 1

At {{base_url}}/login, sign in to hearloop using {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard as a member.

## Step 2 @verifies ac-6, ac-96

On the Acme dashboard at a phone-sized browser viewport, use the top-left "Open menu" button, not the board name or board switcher, then assert the dashboard menu is open and lists Posts, Roadmap, Kane runs, Changelog and Settings.

## Step 3 @verifies ac-7

From that open dashboard menu, choose the Roadmap page, then assert the dashboard menu is closed after the selection.
