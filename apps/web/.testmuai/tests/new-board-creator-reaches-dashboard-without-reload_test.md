---
assurance:
  id: t-3
  base: sha256:3b62902a3bf05c1339fc2d7da20810c4cbe29ff75edb1cc4c68caa95ecff97d6
---
# New board creator reaches dashboard without reload

> Immediately after creating a board, its member creator reaches that board’s dashboard without reloading.

## Step 1

At {{base_url}}/login on hearloop, sign in with {{e2e_email}} and {{e2e_password}}.

## Step 2

In the signed-in hearloop browser session, reach the new-board creation flow and enter {{fresh_board_name}} as the new board's name.

## Step 3

On the board creation page immediately before completing creation, retain a browser-side document identity marker in the current page so a document reload can be detected.

## Step 4 @verifies ac-4, ac-5

Complete creation of the board named {{fresh_board_name}}, then assert its private dashboard opens for the creator and the pre-creation document identity marker remains unchanged without reloading the page.
