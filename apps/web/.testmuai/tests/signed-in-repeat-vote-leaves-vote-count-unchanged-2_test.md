---
assurance:
  id: t-52
  base: sha256:b0ea323d2878a9695c2bc79478aef9a77730fc2c39061182d080efcb5ea09c41
---
# Signed-in repeat vote leaves vote count unchanged

> After an account's first vote, another vote by that same account on the same request leaves the tally unchanged.

## Step 1

At {{base_url}}/login, sign in as an Acme member using {{e2e_email}} and {{e2e_password}}; on the Acme public board open the request titled {{account_retry_vote_request_title}}, prepared without an earlier vote from this account.

## Step 2

On the Acme public board row titled {{account_retry_vote_request_title}}, cast this account's first vote.

## Step 3

capture baseline: the displayed vote count on the Acme public board row titled {{account_retry_vote_request_title}} after this account's first vote

## Step 4 @verifies ac-39, ac-43

On the Acme public board row titled {{account_retry_vote_request_title}}, attempt another vote with the same signed-in account, then assert that exact row's vote count changed by zero from the captured post-first-vote baseline, so this account contributed no second vote to that request.

## Step 5 @verifies ac-41

On the Acme public board row titled {{account_retry_vote_request_title}}, store its displayed vote count as account_retry_public_count; at {{base_url}}/acme/dashboard, locate the post-list row titled {{account_retry_vote_request_title}} and compare its displayed vote count with account_retry_public_count, then assert the two counts are equal.
