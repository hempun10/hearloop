---
test: ../ineligible-request-statuses-cannot-be-merged-2_test.md
status: failed
started: 2026-11-24T04:22:59.620Z
duration_s: 294
session_id: 7e910140-310d-4ea7-b62c-669520161500
---

# Ineligible request statuses cannot be merged — Result

## Step 1 ✓ passed (25.5s)
md5: 83d01fdaad593299367808e941e85d8d
Open {{base_url}}/login for the Acme board and sign in as member {{e2e_email}} with {{e2e_password}}.

## Step 2 ✓ passed (57.7s)
md5: 8ec7c11aa31ec163bc3b1aaf531008a5
Open the full Acme public-board address {{base_url}}/acme, find the In progress source {{merge_in_progress_source_title}} and survivor {{merge_invalid_survivor_title}} in its request list, and open the source by its title; record its actual address.

## Step 3 ✓ passed (88.7s)
md5: 9f1fac6312711863a7e4faa1d7eecffb
On the In progress source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; reopen the full Acme board at {{base_url}}/acme and open the listed source by its title, then assert no merge of this In progress source completed and the source page still identifies the unmerged source.

## Step 4 ✓ passed (40s)
md5: 08100f44055dfc9036521c41b6b25994
Open the full Acme public-board address {{base_url}}/acme, find the Shipped source {{merge_shipped_source_title}} in its request list and open it by its title; record its actual address.

## Step 5 ✗ failed (78.9s)
md5: a9190a1896096eaed9e353fb7704fd8c
Reason: Child agent failed: The shipped source page exposes only Edit and vote; no Merge into… action exists. — bug verdict: Agent treated unavailable merge action as terminal failure [automation_bug/agent_misstep, confidence 0.96]
On the Shipped source page, attempt Merge into… and Merge with {{merge_invalid_survivor_title}} if available; reopen the full Acme board at {{base_url}}/acme and open the listed source by its title, then assert no merge of this Shipped source completed and the source page still identifies the unmerged source.
