---
assurance:
  id: t-3
  base: sha256:d5e3ca89d89d29c34364043bf95ed71263899ce8f01d8cb4f29c893d966cd8e0
---
# Creator enters newly created board dashboard without a reload

> Prove immediate entry to a newly created board dashboard without a reload.

## Step 1

At {{base_url}}/login, sign in to hearloop using {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-4, ac-5

From the signed-in hearloop board area, create a new board named {{fresh_board_name}}, then assert that the newly created board's dashboard is visible to its creator without a full-page reload during the transition.
