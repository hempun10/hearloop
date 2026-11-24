---
test: ../ineligible-request-statuses-cannot-be-merged_test.md
status: passed
started: 2026-11-24T03:27:55.034Z
duration_s: 292
session_id: d290855c-b08d-4586-a0c1-0cfb79109388
---

# Ineligible request statuses cannot be merged — Result

## Step 1 ✓ passed (27.1s)
md5: 83d01fdaad593299367808e941e85d8d
Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2 ✓ passed (59.7s)
md5: 8f0a65e684b73f0bb26c0edb0451aed9
On Acme, locate the In progress source {{merge_in_progress_source_title}} and the survivor {{merge_invalid_survivor_title}}; record the source address.

## Step 3 ✓ passed (90.6s)
md5: 3997cc875fa1b5a93c7d13de4784d725
On the In progress source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; revisit the recorded source address, then assert no merge of this In progress source completed and the address still identifies the unmerged source.

## Step 4 ✓ passed (41.1s)
md5: e065cbdfc21c16b51d6e6ec694f8586a
On Acme, locate the Shipped source {{merge_shipped_source_title}} and record its address.

## Step 5 ✓ passed (67.6s)
md5: ef48609fe706b4fc2121d45dd08f11d1
On the Shipped source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; revisit the recorded source address, then assert no merge of this Shipped source completed and the address still identifies the unmerged source.
