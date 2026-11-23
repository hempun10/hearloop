---
assurance:
  id: t-38
  base: sha256:b4153b4b0a1c0393521cec73d23e50aa00ca334074910ab39a3c84e4cdd863bc
---
# Duplicate visitor votes remain ineffective after clearing local storage

> Prove repeat votes from the same browser cannot increase the count with local storage intact or cleared.

## Step 1

Open {{base_url}}/acme as an unsigned visitor in the same browser to be used throughout the repeat-vote checks.

## Step 2

On the Acme public board, locate {{post_title}} and establish a visitor vote for this request from this browser.

## Step 3

capture baseline: vote count for {{post_title}} on the Acme public board after the browser's initial vote

## Step 4 @verifies ac-82

On the Acme public board, attempt to vote for {{post_title}} again in this browser, then assert its visible vote count has not increased from the captured baseline.

## Step 5

capture baseline: vote count for {{post_title}} on the Acme public board before clearing the page's local storage

## Step 6 @verifies ac-83

Clear the Acme public board page's local storage in this same browser, return to {{base_url}}/acme and attempt to vote for {{post_title}} again, then assert the request's visible vote count has not increased from the baseline captured before clearing.

## Step 7

Open {{base_url}}/login and sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 8 @verifies ac-84

On {{base_url}}/acme/dashboard, locate {{post_title}} in the post list, then assert its displayed vote count equals the count observed for the same request on the public board after the repeat attempts.
