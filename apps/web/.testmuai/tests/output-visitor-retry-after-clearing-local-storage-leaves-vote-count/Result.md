---
test: ../visitor-retry-after-clearing-local-storage-leaves-vote-count_test.md
status: passed
started: 2026-11-23T04:34:20.951Z
duration_s: 270
session_id: 2bf7e6ba-8623-45ca-923f-53bc81ab2c2b
---

# Visitor retry after clearing local storage leaves vote count unchanged — Result

## Step 1 ✓ passed (18.2s)
md5: 4f27c68cd908aa76f8a09d31bd8e254e
At {{base_url}}/acme in a signed-out browser, find the public-board request {{visitor_retry_vote_request_title}}, prepared without an earlier vote from this browser.

## Step 2 ✓ passed (19.7s)
md5: 03aafe85e8f0add1074ae3a837693750
On the public board for Acme, cast this browser's first vote for {{visitor_retry_vote_request_title}}.

## Step 3 ✓ passed (24.4s)
md5: d508c2bcfa1ad2a49af2962b28a6c0c7
capture baseline: the displayed vote count for {{visitor_retry_vote_request_title}} on the Acme public board after this browser's first vote

## Step 4 ✓ passed (66.5s)
md5: 1fabfa8654f1fb402761398e4adbc3bd
On the Acme public board, clear only the page's local storage while retaining this browser's identity, return to {{visitor_retry_vote_request_title}}, and attempt another vote from the same browser; then assert its displayed vote count changed by zero from the captured post-first-vote baseline, so this browser contributed no second vote.

## Step 5 ✓ passed (28.4s)
md5: 5ce5c4f8ffb10a1651e3a12dc265c617
At {{base_url}}/login sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 6 ✓ passed (109.8s)
md5: 2bbee0bc73e5449bc2e6276e507f6baa
At {{base_url}}/acme/dashboard, find the post-list row for {{visitor_retry_vote_request_title}} and compare its vote count with that request on the Acme public board; then assert the dashboard count equals the public-board count.
