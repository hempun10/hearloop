---
assurance:
  id: t-37
  base: sha256:eb47f52e7550bc29ea16a9067bc27e9d5c9fd2b666d717f8051cdc7e0251ada4
---
# Duplicate account votes do not raise Acme request count

> Prove the same account cannot increase the count through repeat voting, including after clearing page local storage.

## Step 1

Open {{base_url}}/login and sign in as an Acme member with {{e2e_email}} and {{e2e_password}}.

## Step 2

On {{base_url}}/acme, find {{post_title}} and establish a vote for it with this signed-in account.

## Step 3

capture baseline: vote count for {{post_title}} on the Acme public board after the account's initial vote

## Step 4 @verifies ac-80

On the Acme public board, revisit {{post_title}} and attempt a second vote with the same account, then assert the displayed vote count has not increased from the captured baseline.

## Step 5 @verifies ac-80

On the same browser, clear the page's local storage, return to {{base_url}}/acme and attempt another vote for {{post_title}} with the same signed-in account, then assert its vote count still has not increased from the captured baseline.

## Step 6 @verifies ac-84

On {{base_url}}/acme/dashboard, locate {{post_title}} in the post list, then assert its vote count equals the one observed on the public board after the repeat attempts.
