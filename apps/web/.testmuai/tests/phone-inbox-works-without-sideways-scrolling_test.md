---
assurance:
  id: t-62
  base: sha256:c384f44875b39d82da5626d41bd46e22208456d322310928885eedcae316d33e
---
# Phone inbox works without sideways scrolling

> In a phone-sized browser viewport use the dashboard inbox list without horizontal scrolling to reach request content.

## Step 1

In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the post list at {{base_url}}/acme/dashboard.

## Step 2 @verifies ac-61, ac-62, ac-63, ac-64, ac-83

On the phone-sized Acme dashboard post list, inspect the displayed request rows and toolbar and reach their request details without sideways scrolling, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed rows, and horizontal scrolling is not required to use the inbox.
