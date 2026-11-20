---
assurance:
  id: t-35
  base: sha256:43c282e31b9739fc6b8e153223ab2b701657bc6be196dd97dc8c8ac623c0f572
---
# First account vote raises the count on Acme public board and matches dashboard

> Prove an account's first vote raises the request count and can be reconciled across the dashboard and public board.

## Step 1

Open {{base_url}}/login, sign in as an Acme member with {{e2e_email}} and {{e2e_password}}, and reach the public Acme board at {{base_url}}/acme.

## Step 2

On the Acme public board, locate the existing request {{post_title}} that this account has not yet voted for.

## Step 3

capture baseline: vote count for {{post_title}} on the Acme public board

## Step 4 @verifies ac-79

On the public Acme board, vote for {{post_title}}, then assert its visible vote count increased by exactly one from the captured baseline.

## Step 5 @verifies ac-84

From the public Acme board, open {{base_url}}/acme/dashboard and locate {{post_title}} in the post list, then assert its displayed vote count equals the count observed for the same request on the public board.
