---
assurance:
  id: t-1
  base: sha256:a663ccdabcc60f3553ab3d8a4675db5e63ad583ce9213663ccaba959daca6019
---
# Nonmember is redirected away from Acme dashboard

> A signed-in person who is not an Acme board member is sent to the public board rather than its private dashboard.

## Step 1

At {{base_url}}/login on hearloop, sign in with {{nonmember_email}} and {{nonmember_password}} as the account that is not an Acme board member.

## Step 2 @verifies ac-1, ac-2

In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the browser is at {{base_url}}/acme and no private Acme dashboard content is accessible.
