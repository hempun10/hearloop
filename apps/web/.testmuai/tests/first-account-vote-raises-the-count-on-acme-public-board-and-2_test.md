---
assurance:
  id: t-49
  base: sha256:9f68ab12c792671b1ec7880551f1c0de2728674d53b761945f904981ddbf760c
---
# First account vote raises the count on Acme public board and matches dashboard

> Prove an account's first vote raises the request count and can be reconciled across the dashboard and public board.

## Step 1

Open {{base_url}}/login, sign in as an Acme member with {{e2e_email}} and {{e2e_password}}, and reach the public Acme board at {{base_url}}/acme.

## Step 2

On the Acme public board, locate the existing request {{post_title}} that this account has not yet voted for.

## Step 3

capture baseline: read the displayed vote count for {{post_title}} on the Acme public board before voting and store that number as pre_vote_count

## Step 4 @verifies ac-79

On the Acme public board, vote once for {{post_title}} and store its displayed new vote count as post_vote_count, then assert post_vote_count equals pre_vote_count plus one.

## Step 5 @verifies ac-84

From the public Acme board, open {{base_url}}/acme/dashboard and locate {{post_title}} in the post list, then assert its displayed vote count equals post_vote_count captured on the public board.
