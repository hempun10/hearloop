---
test: ../first-visitor-browser-vote-raises-acme-request-count-and_test.md
status: passed
started: 2026-11-23T02:39:37.694Z
duration_s: 143
session_id: af6832c6-f427-4973-9a76-09637197e52e
---

# First visitor browser vote raises Acme request count and matches dashboard — Result

## Step 1 ✓ passed (0.29s)
md5: 15554f6d26244c6bb9aa3425215feef5
Open {{base_url}}/acme as an unsigned visitor in a browser and locate the existing request {{post_title}} that this browser has not yet voted for.

## Step 2 ✓ passed (22.35s)
md5: a95f350693b95f0bfc7fa2ea1a676213
capture baseline: vote count for {{post_title}} on the Acme public board

## Step 3 ✓ passed (12.82s)
md5: c0ccbde44d363a0f4adf76cfd6716f76
On the Acme public board, vote for {{post_title}} as the visitor, then assert its visible vote count increased by exactly one from the captured baseline.

## Step 4 ✓ passed (2.74s)
md5: c18db285c9d47b5dee2784aea84843bd
Open {{base_url}}/login and sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 5 ✓ passed (47.7s)
md5: 1b58fa11dfc3592575be8e2c8d15edb2
On {{base_url}}/acme/dashboard, locate {{post_title}} in the post list, then assert its displayed vote count equals the count observed for the same request on the public board.
