---
test: ../first-account-vote-raises-the-count-on-acme-public-board-and_test.md
status: failed
started: 2026-11-20T04:38:08.906Z
duration_s: 153
session_id: 440b6098-a40a-4c97-b993-a8fe3f694ce3
---

# First account vote raises the count on Acme public board and matches dashboard — Result

## Step 1 ✓ passed (28.8s)
md5: 3863297147f3bb8c8fd256d0178b2fa9
Open {{base_url}}/login, sign in as an Acme member with {{e2e_email}} and {{e2e_password}}, and reach the public Acme board at {{base_url}}/acme.

## Step 2 ✓ passed (12.5s)
md5: c139a2d4320de693aa314cc6ebafa3bf
On the Acme public board, locate the existing request {{post_title}} that this account has not yet voted for.

## Step 3 ✓ passed (30.4s)
md5: a95f350693b95f0bfc7fa2ea1a676213
capture baseline: vote count for {{post_title}} on the Acme public board

## Step 4 ✓ passed (30.2s)
md5: 76b0737efaa668dd1bdf9670004c61f4
On the public Acme board, vote for {{post_title}}, then assert its visible vote count increased by exactly one from the captured baseline.

## Step 5 ✗ failed (47.7s)
md5: f28d91fbdd745b88d73cdf0cd35f8f33
Reason: Final verification failed: "the displayed vote count for {{global.post_title}} equals {{baseline_vote_count}}" — bug verdict: Unresolved post-title and vote-count variables in verification [automation_bug/config_issue, confidence 0.99]
From the public Acme board, open {{base_url}}/acme/dashboard and locate {{post_title}} in the post list, then assert its displayed vote count equals the count observed for the same request on the public board.
