---
test: ../acme-kane-history-matches-inventory-order-and-totals_test.md
status: passed
started: 2026-11-23T17:02:22.299Z
duration_s: 143
session_id: 0aa9f95b-6a34-4214-acf8-c8b0721e7c3e
---

# Acme Kane history matches inventory order and totals — Result

## Step 1 ✓ passed (6.26s)
md5: 5c83cdf3a8fe846491fe004ce82bc8c8
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 ✓ passed (22.67s)
md5: ce5b2c7213dd4a60173d097cbe1e282a
On Acme's dashboard Kane runs page, compare the displayed run identities to the independently supplied {{kane_run_inventory}}, then assert every displayed run belongs to Acme and all board verifications in the inventory appear.

## Step 3 ✓ passed (37.3s)
md5: 27ec76ad7981192e236b9671c59f6bcf
On Acme's dashboard Kane runs page, compare successive displayed verifications with their times in {{kane_run_inventory}}, then assert the runs appear newest first.

## Step 4 ✓ passed (71.7s)
md5: 890ec34e3823e9756aa8c54688fcd4f2
On Acme's dashboard Kane runs page, compare the displayed total, passed and failed run counts against the corresponding categories in {{kane_run_inventory}}, then assert each of the three displayed counts equals its independently derived inventory count.
