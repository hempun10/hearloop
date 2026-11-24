---
assurance:
  id: t-63
  base: sha256:4e647b3b537e788829e755924828c8a84d949d136ccf01cd547cfd3421e4be77
---
# Phone dashboard menu opens and closes after page selection

> In a phone-sized browser viewport open the dashboard menu with its button and select the inbox page; check the menu opens then closes.

## Step 1

In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the dashboard at {{base_url}}/acme/dashboard.

## Step 2 @verifies ac-81

On the phone-sized Acme dashboard, use the dashboard menu button to open the page menu, then assert the dashboard menu is open.

## Step 3 @verifies ac-82

From the open phone-sized dashboard menu, choose the Roadmap page, then assert the dashboard menu is no longer open.
