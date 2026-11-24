---
assurance:
  id: t-30
  base: sha256:727b172b9cf265cb0a0d5a49f4734f9a6a47803d42748e9d79f83696a62ba8f4
---
# Acme Kane history matches inventory order and totals

> A member compares the board's full verification history and newest-first order with an independent board-run inventory and checks all, passed, and failed totals.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 @verifies ac-87, ac-88

On Acme's dashboard Kane runs page, compare the displayed run identities to the independently supplied {{kane_run_inventory}}, then assert every displayed run belongs to Acme and all board verifications in the inventory appear.

## Step 3 @verifies ac-89

On Acme's dashboard Kane runs page, compare successive displayed verifications with their times in {{kane_run_inventory}}, then assert the runs appear newest first.

## Step 4 @verifies ac-90, ac-91, ac-92

On Acme's dashboard Kane runs page, compare the displayed total, passed and failed run counts against the corresponding categories in {{kane_run_inventory}}, then assert each of the three displayed counts equals its independently derived inventory count.
