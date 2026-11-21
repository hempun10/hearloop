---
assurance:
  id: t-54
  base: sha256:730f98354b89f00db6e4f5861e175560294e6f7bbc08a7481ff10a6f48087cfe
---
# Signed-in Acme nonmember reaches the public board, not the dashboard

> Prove a signed-in nonmember is routed to the public board without dashboard access.

## Step 1

At {{base_url}}/login, sign in as a user who is not an Acme board member using {{nonmember_email}} and {{nonmember_password}}.

## Step 2 @verifies ac-1, ac-3, ac-97, ac-98, ac-99, ac-100

Visit {{base_url}}/acme/dashboard as that signed-in nonmember, then assert the browser reaches {{base_url}}/acme, the public board's request list and Post idea button are visible, dashboard content is inaccessible, the dashboard sidebar containing Posts, Roadmap, Kane runs and Settings is not visible, and no error message is displayed.
