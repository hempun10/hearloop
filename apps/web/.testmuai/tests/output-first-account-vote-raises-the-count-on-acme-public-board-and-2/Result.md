---
test: ../first-account-vote-raises-the-count-on-acme-public-board-and-2_test.md
status: passed
started: 2026-11-20T10:00:24.495Z
duration_s: 145
session_id: c00851b7-2305-4ea5-a1a5-9afe25b8397a
---

# First account vote raises the count on Acme public board and matches dashboard — Result

## Step 1 ✓ passed (28.9s)
md5: 3863297147f3bb8c8fd256d0178b2fa9
Open {{base_url}}/login, sign in as an Acme member with {{e2e_email}} and {{e2e_password}}, and reach the public Acme board at {{base_url}}/acme.

## Step 2 ✓ passed (21s)
md5: c139a2d4320de693aa314cc6ebafa3bf
On the Acme public board, locate the existing request {{post_title}} that this account has not yet voted for.

## Step 3 ✓ passed (25.9s)
md5: 1d8d7179e8d1fa9e75665b3d07622677
capture baseline: read the displayed vote count for {{post_title}} on the Acme public board before voting and store that number as pre_vote_count

## Step 4 ✓ passed (37.6s)
md5: 033f2ccace0f4d55150ac7fdeafb89d6
On the Acme public board, vote once for {{post_title}} and store its displayed new vote count as post_vote_count, then assert post_vote_count equals pre_vote_count plus one.

## Step 5 ✓ passed (27.7s)
md5: 07cf219649bb2feeab9327e23c30ef6e
From the public Acme board, open {{base_url}}/acme/dashboard and locate {{post_title}} in the post list, then assert its displayed vote count equals post_vote_count captured on the public board.
