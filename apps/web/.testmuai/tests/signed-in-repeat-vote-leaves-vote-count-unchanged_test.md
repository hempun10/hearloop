---
assurance:
  id: t-16
  base: sha256:4c8de293d3c3f1c4cf52a30bc1d2ba2ea04d596382c38df725881fd2da49b939
---
# Signed-in repeat vote leaves vote count unchanged

> After an account's first vote, another vote by that same account on the same request leaves the tally unchanged.

## Step 1

At {{base_url}}/login sign in as an Acme member using {{e2e_email}} and {{e2e_password}}; open the Acme public board request {{account_retry_vote_request_title}}, prepared without an earlier vote from this account.

## Step 2

On the Acme public board, cast this signed-in account's first vote for {{account_retry_vote_request_title}}.

## Step 3

capture baseline: the displayed vote count for {{account_retry_vote_request_title}} on the Acme public board after this account's first vote

## Step 4 @verifies ac-39, ac-43

On the Acme public board, attempt to vote again for {{account_retry_vote_request_title}} with the same signed-in account; then assert the displayed vote count changed by zero from the captured post-first-vote baseline, so the account contributed no second vote.

## Step 5 @verifies ac-41

At {{base_url}}/acme/dashboard, locate {{account_retry_vote_request_title}} in the post list and compare its vote count with the Acme public board's count for the same request; then assert the dashboard count equals the public-board count.
