---
assurance:
  id: t-18
  base: sha256:443f85c7d4e5ed9cee569a25e52b6ada863b15d99eef21673723d4c8d167236b
---
# First visitor vote increments tally and agrees across views

> A visitor browser with no earlier vote on the request casts one vote and the count rises once.

## Step 1

At {{base_url}}/acme in a signed-out browser, find the Acme public-board request {{visitor_first_vote_request_title}}, prepared without an earlier vote from this browser.

## Step 2

capture baseline: the displayed vote count for {{visitor_first_vote_request_title}} on the Acme public board before this browser votes

## Step 3 @verifies ac-44

On the Acme public board, cast this visitor browser's first vote for {{visitor_first_vote_request_title}}; then assert its displayed vote count changed by one from the captured pre-vote baseline.

## Step 4

At {{base_url}}/login sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 5 @verifies ac-41

At {{base_url}}/acme/dashboard, find {{visitor_first_vote_request_title}} in the post list and compare its vote count with the Acme public board's count for the same request; then assert the dashboard count equals the public-board count.
