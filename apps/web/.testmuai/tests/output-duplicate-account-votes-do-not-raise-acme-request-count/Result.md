---
test: ../duplicate-account-votes-do-not-raise-acme-request-count_test.md
status: passed
started: 2026-11-20T04:26:05.698Z
duration_s: 184
session_id: 2729573f-6ca7-43ef-8627-3adc02bc4052
---

# Duplicate account votes do not raise Acme request count — Result

## Step 1 ✓ passed (23.8s)
md5: c18db285c9d47b5dee2784aea84843bd
Open {{base_url}}/login and sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (20.4s)
md5: 9f59c2b9c1b90b4b760c10619ef51547
On {{base_url}}/acme, find {{post_title}} and establish a vote for it with this signed-in account.

## Step 3 ✓ passed (23.8s)
md5: ce429c0deff3a584d125c7c41dd9eb5d
capture baseline: vote count for {{post_title}} on the Acme public board after the account's initial vote

## Step 4 ✓ passed (33.2s)
md5: 78523829164a1e20bf3a631fdb8b092d
On the Acme public board, revisit {{post_title}} and attempt a second vote with the same account, then assert the displayed vote count has not increased from the captured baseline.

## Step 5 ✓ passed (45.4s)
md5: 16d96e0e30579d3499a9ceecfc42eec9
On the same browser, clear the page's local storage, return to {{base_url}}/acme and attempt another vote for {{post_title}} with the same signed-in account, then assert its vote count still has not increased from the captured baseline.

## Step 6 ✓ passed (33s)
md5: c5481f26b5e5feb9d7fdb07d0acc8c3b
On {{base_url}}/acme/dashboard, locate {{post_title}} in the post list, then assert its vote count equals the one observed on the public board after the repeat attempts.
