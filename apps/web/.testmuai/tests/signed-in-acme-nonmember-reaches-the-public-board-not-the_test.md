---
assurance:
  id: t-2
  base: sha256:4d35e8b6a4953eb77d76341efa91bd1eea3b3f2fb9d5a60a95217f0395f93fbf
---
# Signed-in Acme nonmember reaches the public board, not the dashboard

> Prove a signed-in nonmember is routed to the public board without dashboard access.

## Step 1

At {{base_url}}/login, sign in as a user who is not an Acme board member using {{nonmember_email}} and {{nonmember_password}}.

## Step 2 @verifies ac-1, ac-3

Visit {{base_url}}/acme/dashboard as that signed-in nonmember, then assert the browser reaches {{base_url}}/acme and Acme dashboard content is not accessible.
