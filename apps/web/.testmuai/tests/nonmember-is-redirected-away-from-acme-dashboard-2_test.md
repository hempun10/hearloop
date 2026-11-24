---
assurance:
  id: t-50
  base: sha256:316ce4ab69b7dd525a2af24396dbda4fa65498b22f706e2550f04c68352f1c7f
---
# Nonmember is redirected away from Acme dashboard

> A signed-in person who is not an Acme board member is sent to the public board rather than its private dashboard.

## Step 1

At {{base_url}}/login on hearloop, sign in with {{nonmember_email}} and {{nonmember_password}} as the account that is not an Acme board member.

## Step 2 @verifies ac-111, ac-110, ac-1

In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the address has the Acme public-board path {{base_url}}/acme with any query parameters allowed, the dashboard sidebar is not shown, and no private Acme dashboard content is accessible.
