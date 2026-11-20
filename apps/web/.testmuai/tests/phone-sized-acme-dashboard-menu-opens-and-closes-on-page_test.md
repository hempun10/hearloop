---
assurance:
  id: t-4
  base: sha256:25f3d4ddb8de8ed2f3ce53cfc33c040ffbe4b0941c34bf1a06a2674f5dbe6f49
---
# Phone-sized Acme dashboard menu opens and closes on page selection

> Prove the dashboard menu opens on a phone-sized viewport and closes after choosing a dashboard page.

## Step 1

At {{base_url}}/login, sign in to hearloop using {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard as a member.

## Step 2 @verifies ac-6

On the Acme dashboard at a phone-sized browser viewport, use the dashboard menu button, then assert the dashboard menu is open.

## Step 3 @verifies ac-7

From the open phone-sized dashboard menu, choose the Roadmap page, then assert the dashboard menu is closed after the selection.
