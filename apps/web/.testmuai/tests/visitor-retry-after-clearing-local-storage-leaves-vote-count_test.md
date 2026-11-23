---
assurance:
  id: t-15
  base: sha256:50209d34dde8e150f70386782d83aa9676400df19a61e527c0b6213ce8b5fb15
---
# Visitor retry after clearing local storage leaves vote count unchanged

> A visitor's first vote establishes a tally; the same browser's repeat vote after clearing page local storage does not raise it.

## Step 1

At {{base_url}}/acme in a signed-out browser, find the public-board request {{visitor_retry_vote_request_title}}, prepared without an earlier vote from this browser.

## Step 2

On the public board for Acme, cast this browser's first vote for {{visitor_retry_vote_request_title}}.

## Step 3

capture baseline: the displayed vote count for {{visitor_retry_vote_request_title}} on the Acme public board after this browser's first vote

## Step 4 @verifies ac-40, ac-42

On the Acme public board, clear only the page's local storage while retaining this browser's identity, return to {{visitor_retry_vote_request_title}}, and attempt another vote from the same browser; then assert its displayed vote count changed by zero from the captured post-first-vote baseline, so this browser contributed no second vote.

## Step 5

At {{base_url}}/login sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 6 @verifies ac-41

At {{base_url}}/acme/dashboard, find the post-list row for {{visitor_retry_vote_request_title}} and compare its vote count with that request on the Acme public board; then assert the dashboard count equals the public-board count.
