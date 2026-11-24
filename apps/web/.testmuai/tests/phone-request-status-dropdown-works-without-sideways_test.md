---
assurance:
  id: t-61
  base: sha256:84c0e82190684d98178342cb793a0b1c5b9e831d18971ae8bdadc78843777b87
---
# Phone request status dropdown works without sideways scrolling

> In a phone-sized browser viewport open and use a request row's status dropdown without horizontal scrolling.

## Step 1

In a phone-sized browser viewport, start at {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and reach the post list at {{base_url}}/acme/dashboard.

## Step 2 @verifies ac-61, ac-62, ac-63, ac-64, ac-83

On the phone-sized Acme dashboard inbox, inspect the request rows and toolbar and reach a request's status control without sideways scrolling, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed rows, and horizontal scrolling is not required to use the inbox.

## Step 3 @verifies ac-84

In a request row of the phone-sized inbox, open the status dropdown and reach its available status choices without sideways scrolling, then assert horizontal scrolling is not required to use the request status dropdown.
