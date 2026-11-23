---
assurance:
  id: t-17
  base: sha256:7883f32934792016d817b482bff42c2f4be34a48bdf3f316ba6c7948005fd247
---
# First account vote increments tally and agrees across views

> A previously unvoted signed-in account casts one vote on a request; the updated public board and dashboard counts agree.

## Step 1

At {{base_url}}/login sign in as an Acme member with {{e2e_email}} and {{e2e_password}}; open the Acme public board request {{account_first_vote_request_title}}, prepared without an earlier vote from this account.

## Step 2

capture baseline: the displayed vote count for {{account_first_vote_request_title}} on the Acme public board before this account votes

## Step 3 @verifies ac-44

On the Acme public board, cast this account's first vote for {{account_first_vote_request_title}}; then assert its displayed vote count changed by one from the captured pre-vote baseline.

## Step 4 @verifies ac-41

At {{base_url}}/acme/dashboard, find {{account_first_vote_request_title}} in the post list and compare its vote count with the Acme public board's count for the same request; then assert the dashboard count equals the public-board count.
