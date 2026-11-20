---
assurance:
  id: t-20
  base: sha256:87e81de2e594cbcb525d45abe3100939d249ebeb4f18f0ec8b38166e2ed4f461
---
# Foreign-board run stays out of Acme Kane history

> A member reviewing Acme sees only Acme board verifications, not an independently known verification from another board.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 @verifies ac-50, ac-56

On the Acme dashboard's Kane runs page, compare the visible run rows against the independently identified other-board verification {{foreign_board_run_id}} and the Acme inventory {{kane_run_inventory}}, then assert every visible verification belongs to Acme and {{foreign_board_run_id}} does not appear.
