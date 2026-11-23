---
test: ../signed-in-repeat-vote-leaves-vote-count-unchanged-2_test.md
status: passed
started: 2026-11-23T17:37:27.915Z
duration_s: 260
session_id: 4fb95779-cd76-40a1-89dd-947b1632676b
---

# Signed-in repeat vote leaves vote count unchanged — Result

## Step 1 ✓ passed (35.8s)
md5: bce78a151a7006524ad2a5718a132d97
At {{base_url}}/login, sign in as an Acme member using {{e2e_email}} and {{e2e_password}}; on the Acme public board open the request titled {{account_retry_vote_request_title}}, prepared without an earlier vote from this account.

## Step 2 ✓ passed (20.8s)
md5: a51bd444815764b013ce3d9b738ee4db
On the Acme public board row titled {{account_retry_vote_request_title}}, cast this account's first vote.

## Step 3 ✓ passed (28s)
md5: f5e69d763ee06ca47ba27b6efd30d33d
capture baseline: the displayed vote count on the Acme public board row titled {{account_retry_vote_request_title}} after this account's first vote

## Step 4 ✓ passed (57.7s)
md5: c0f552a8199659c2ac452508bd52ce82
On the Acme public board row titled {{account_retry_vote_request_title}}, attempt another vote with the same signed-in account, then assert that exact row's vote count changed by zero from the captured post-first-vote baseline, so this account contributed no second vote to that request.

## Step 5 ✓ passed (114.1s)
md5: ca8f9b8e6e44016849a313ad6cf41d72
On the Acme public board row titled {{account_retry_vote_request_title}}, store its displayed vote count as account_retry_public_count; at {{base_url}}/acme/dashboard, locate the post-list row titled {{account_retry_vote_request_title}} and compare its displayed vote count with account_retry_public_count, then assert the two counts are equal.
