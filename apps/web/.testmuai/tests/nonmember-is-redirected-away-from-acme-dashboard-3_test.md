---
assurance:
  id: t-55
  base: sha256:97222bbff13076517e73a1c0f816712e1d56da715650298f8814fc5ef607194a
---
# Nonmember is redirected away from Acme dashboard

> A signed-in person who is not an Acme board member is sent to the public board rather than its private dashboard.

## Step 1

At {{base_url}}/login on hearloop, sign in with {{nonmember_email}} and {{nonmember_password}} as the account that is not an Acme board member.

## Step 2 @verifies ac-111, ac-114, ac-113, ac-1

In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the address has the Acme public-board path {{base_url}}/acme with any query parameters allowed, the Post idea button is shown, and no link named Kane runs or Settings is visible, so no private Acme dashboard content is accessible.
