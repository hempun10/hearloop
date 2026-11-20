---
assurance:
  id: t-36
  base: sha256:7b0d5cf8595f5255c5e371b5a40de814ab71dab526c1dc13adbd31b1b60ceb2f
---
# First visitor browser vote raises Acme request count and matches dashboard

> Prove an unsigned visitor browser's first vote raises the request count.

## Step 1

Open {{base_url}}/acme as an unsigned visitor in a browser and locate the existing request {{post_title}} that this browser has not yet voted for.

## Step 2

capture baseline: vote count for {{post_title}} on the Acme public board

## Step 3 @verifies ac-81

On the Acme public board, vote for {{post_title}} as the visitor, then assert its visible vote count increased by exactly one from the captured baseline.

## Step 4

Open {{base_url}}/login and sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 5 @verifies ac-84

On {{base_url}}/acme/dashboard, locate {{post_title}} in the post list, then assert its displayed vote count equals the count observed for the same request on the public board.
