---
test: ../first-visitor-vote-increments-tally-and-agrees-across-views_test.md
status: passed
started: 2026-11-23T04:47:51.592Z
duration_s: 164
session_id: fc753af7-9bdd-4d23-a32d-bc9de5c3321f
---

# First visitor vote increments tally and agrees across views — Result

## Step 1 ✓ passed (16.5s)
md5: 9c988ec21ac4e8ffcf76367c06814757
At {{base_url}}/acme in a signed-out browser, find the Acme public-board request {{visitor_first_vote_request_title}}, prepared without an earlier vote from this browser.

## Step 2 ✓ passed (28.2s)
md5: b35d5ad342eb6e34904813c6f347e378
capture baseline: the displayed vote count for {{visitor_first_vote_request_title}} on the Acme public board before this browser votes

## Step 3 ✓ passed (30.5s)
md5: 5c205f2a1f5075c3abe5f1b039c85ad5
On the Acme public board, cast this visitor browser's first vote for {{visitor_first_vote_request_title}}; then assert its displayed vote count changed by one from the captured pre-vote baseline.

## Step 4 ✓ passed (25.2s)
md5: 5ce5c4f8ffb10a1651e3a12dc265c617
At {{base_url}}/login sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 5 ✓ passed (59.2s)
md5: f87ff79733c29e93732ad2826d4919d6
At {{base_url}}/acme/dashboard, find {{visitor_first_vote_request_title}} in the post list and compare its vote count with the Acme public board's count for the same request; then assert the dashboard count equals the public-board count.
