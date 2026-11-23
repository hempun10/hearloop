---
test: ../first-account-vote-increments-tally-and-agrees-across-views_test.md
status: passed
started: 2026-11-23T04:44:09.574Z
duration_s: 172
session_id: a7e38611-f6d4-4c9d-ab06-ef6d5afc67b3
---

# First account vote increments tally and agrees across views — Result

## Step 1 ✓ passed (35.6s)
md5: c30c079267b2c6fa5453c1bac0622c3f
At {{base_url}}/login sign in as an Acme member with {{e2e_email}} and {{e2e_password}}; open the Acme public board request {{account_first_vote_request_title}}, prepared without an earlier vote from this account.

## Step 2 ✓ passed (20.7s)
md5: 4247ebc32fe2c5d956859e805200ced6
capture baseline: the displayed vote count for {{account_first_vote_request_title}} on the Acme public board before this account votes

## Step 3 ✓ passed (25s)
md5: c120b4c0821e4ea7950aee64dbed2058
On the Acme public board, cast this account's first vote for {{account_first_vote_request_title}}; then assert its displayed vote count changed by one from the captured pre-vote baseline.

## Step 4 ✓ passed (87.5s)
md5: a65cef4b7ae7a55dd10e2e04e35d90f6
At {{base_url}}/acme/dashboard, find {{account_first_vote_request_title}} in the post list and compare its vote count with the Acme public board's count for the same request; then assert the dashboard count equals the public-board count.
