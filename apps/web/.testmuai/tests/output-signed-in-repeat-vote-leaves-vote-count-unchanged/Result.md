---
test: ../signed-in-repeat-vote-leaves-vote-count-unchanged_test.md
status: failed
started: 2026-11-23T04:39:50.341Z
duration_s: 212
session_id: 4eaee6c1-34ea-40f3-9e76-ee31e34dd6ea
---

# Signed-in repeat vote leaves vote count unchanged — Result

## Step 1 ✓ passed (32.2s)
md5: 7f7a930219006d5be9b2b469a0192b89
At {{base_url}}/login sign in as an Acme member using {{e2e_email}} and {{e2e_password}}; open the Acme public board request {{account_retry_vote_request_title}}, prepared without an earlier vote from this account.

## Step 2 ✓ passed (19.8s)
md5: 3705eda7afab9c5177a0a52031ba1ba0
On the Acme public board, cast this signed-in account's first vote for {{account_retry_vote_request_title}}.

## Step 3 ✓ passed (22.9s)
md5: 6c687e1fee334c7b08c816b27fae2e05
capture baseline: the displayed vote count for {{account_retry_vote_request_title}} on the Acme public board after this account's first vote

## Step 4 ✓ passed (25.8s)
md5: 3a367c21817b3a2ce973cd13f922bb0c
On the Acme public board, attempt to vote again for {{account_retry_vote_request_title}} with the same signed-in account; then assert the displayed vote count changed by zero from the captured post-first-vote baseline, so the account contributed no second vote.

## Step 5 ✗ failed (107.3s)
md5: 735ddd8f75b6fa48cc41b895664e8114
Reason: The saved dashboard count is 5 while the saved public-board count is 6. — bug verdict: Public-board vote count read from the wrong post [automation_bug/agent_misstep, confidence 0.98]
At {{base_url}}/acme/dashboard, locate {{account_retry_vote_request_title}} in the post list and compare its vote count with the Acme public board's count for the same request; then assert the dashboard count equals the public-board count.
