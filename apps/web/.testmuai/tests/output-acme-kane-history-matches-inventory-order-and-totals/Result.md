---
test: ../acme-kane-history-matches-inventory-order-and-totals_test.md
status: failed
started: 2026-11-23T05:28:02.829Z
duration_s: 112
session_id: 0ead7920-8ab5-4161-83f2-dfda11752680
---

# Acme Kane history matches inventory order and totals — Result

## Step 1 ✓ passed (38.9s)
md5: 5c83cdf3a8fe846491fe004ce82bc8c8
From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 ✓ passed (28.1s)
md5: ce5b2c7213dd4a60173d097cbe1e282a
On Acme's dashboard Kane runs page, compare the displayed run identities to the independently supplied {{kane_run_inventory}}, then assert every displayed run belongs to Acme and all board verifications in the inventory appear.

## Step 3 ✗ failed (41.7s)
md5: 27ec76ad7981192e236b9671c59f6bcf
Reason: Both displayed runs have identical timestamps and no hidden ordering metadata, so newest-first cannot be verified. — bug verdict: Run-order assertion lacks distinguishable timestamps [automation_bug/test_data_issue, confidence 0.94]
On Acme's dashboard Kane runs page, compare successive displayed verifications with their times in {{kane_run_inventory}}, then assert the runs appear newest first.

## Step 4 ⏭ skipped
