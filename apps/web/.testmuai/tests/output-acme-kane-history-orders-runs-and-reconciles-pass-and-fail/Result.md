---
test: ../acme-kane-history-orders-runs-and-reconciles-pass-and-fail_test.md
status: passed
started: 2026-11-20T03:45:01.884Z
duration_s: 133
session_id: 83853904-72ff-40a4-8d6c-66df6f6ac240
---

# Acme Kane history orders runs and reconciles pass and fail totals — Result

## Step 1 ✓ passed (43.5s)
md5: 6b3fd7e43a4cb7b2a5963bd1d59d5c57
At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 ✓ passed (47.3s)
md5: 0a3a2ac07394f14f7f090f7004957b4b
On the Acme dashboard's Kane runs page, review the run rows against the independently established board, run identities and timestamps in {{kane_run_inventory}}, then assert every displayed run belongs to Acme, all independently recorded Acme runs are present exactly once, and the displayed runs are newest first.

## Step 3 ✓ passed (39.2s)
md5: 27c2758b9515288389bca5c63cc7a6a5
On that Kane runs page, compare the displayed all, passed and failed totals with independently counted Acme verification records and outcomes in {{kane_run_inventory}}, then assert each displayed total equals its corresponding independently counted Acme run, passing-run or failing-run count.
