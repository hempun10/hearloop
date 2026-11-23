---
assurance:
  id: t-62
  base: sha256:40f0a1dd87ae783a2b2dc8429c1124a78ae617e378600d3e56eceefa9b311da3
---
# Signed-in Acme nonmember reaches the public board, not the dashboard

> Prove a signed-in nonmember is routed to the public board without dashboard access.

## Step 1

At {{base_url}}/login, sign in to hearloop with {{nonmember_email}} and {{nonmember_password}} as an account that is not a member of Acme.

## Step 2 @verifies ac-1, ac-3, ac-97, ac-98, ac-99, ac-100

As that signed-in nonmember, visit {{base_url}}/acme/dashboard, then assert the browser reaches {{base_url}}/acme, the public board request list and Post idea button are visible, the dashboard and its Posts, Roadmap, Kane runs and Settings sidebar are inaccessible, and no error message is shown.
