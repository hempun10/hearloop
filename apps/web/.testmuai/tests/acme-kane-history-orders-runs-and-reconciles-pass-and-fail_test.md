---
assurance:
  id: t-21
  base: sha256:44a2376e5dd2251c7559d9bb75202b3d0a93b5aec7d8e723942dd294b1e53d11
---
# Acme Kane history orders runs and reconciles pass and fail totals

> A member reviews all Acme verifications with passing and failing outcomes, checks chronological ordering and independently established all/passed/failed totals.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 @verifies ac-50, ac-51, ac-52

On the Acme dashboard's Kane runs page, review the run rows against the independently established board, run identities and timestamps in {{kane_run_inventory}}, then assert every displayed run belongs to Acme, all independently recorded Acme runs are present exactly once, and the displayed runs are newest first.

## Step 3 @verifies ac-53, ac-54, ac-55

On that Kane runs page, compare the displayed all, passed and failed totals with independently counted Acme verification records and outcomes in {{kane_run_inventory}}, then assert each displayed total equals its corresponding independently counted Acme run, passing-run or failing-run count.
