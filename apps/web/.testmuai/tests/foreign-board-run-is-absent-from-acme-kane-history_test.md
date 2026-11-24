---
assurance:
  id: t-29
  base: sha256:ca2dfbe96a870323f983c3eee6f5bdf5eea280facdf331987fffeec060143c7f
---
# Foreign-board run is absent from Acme Kane history

> A member viewing Acme's Kane history does not see an independently known run belonging to another board.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 @verifies ac-87

On Acme's dashboard Kane runs page, compare every listed run with the independently supplied board membership in {{kane_run_inventory}}, then assert every listed verification belongs to Acme.

## Step 3 @verifies ac-93

On Acme's dashboard Kane runs page, locate the independently known other-board verification {{foreign_board_run_id}} against the displayed history, then assert that run is absent.
