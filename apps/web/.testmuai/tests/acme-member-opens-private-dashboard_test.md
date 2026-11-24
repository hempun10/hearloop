---
assurance:
  id: t-4
  base: sha256:43f5a9b22f4a9e596057e534aed0402d84c306fff671146374777dbfd7c15180
---
# Acme member opens private dashboard

> A signed-in Acme board member opens the member-only Acme dashboard.

## Step 1

At {{base_url}}/login on hearloop, sign in with {{e2e_email}} and {{e2e_password}} as an Acme board member.

## Step 2 @verifies ac-6

In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the Acme private dashboard is visible to the signed-in Acme board member.
