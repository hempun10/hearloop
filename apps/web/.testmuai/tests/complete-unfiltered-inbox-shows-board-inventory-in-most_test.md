---
assurance:
  id: t-66
  base: sha256:b7980b31b7986b5a63e68b957c103899138e709ec45abd138dfa505c31f07f37
---
# Complete unfiltered inbox shows board inventory in Most votes order

> Use an independently established complete board-request inventory to confirm every board request appears in the unfiltered inbox, inspect row details and toolbar count, and check Most votes order.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

On {{base_url}}/acme/dashboard, open the post list (inbox) in a fresh browser session without a previously chosen sort, status filter or search.

## Step 3 @verifies ac-61, ac-62, ac-63

On the Acme dashboard inbox, inspect each displayed request row, then assert every row shows its status, vote count and age.

## Step 4 @verifies ac-116

On the unfiltered Acme dashboard inbox, reconcile the rows with the independently compiled {{board_request_inventory}}, then assert every inventoried board request appears in the inbox.

## Step 5 @verifies ac-64

On the unfiltered Acme dashboard inbox, compare its toolbar count to the number of visible request rows, then assert the two counts are equal.

## Step 6 @verifies ac-65

On the Acme dashboard inbox before selecting a sort, inspect the displayed request rows' vote counts, then assert the default order is Most votes.
