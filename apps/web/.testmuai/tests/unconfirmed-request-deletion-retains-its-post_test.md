---
assurance:
  id: t-14
  base: sha256:ac33bc408e450f38b179e0d6edda2c42f7224c7b5ec16b66a333f543186da5e3
---
# Unconfirmed request deletion retains its post

> A board member initiates deletion of an existing request but does not confirm; the request remains in the dashboard post list.

## Step 1

At {{base_url}}/acme/dashboard, sign in as the Acme board member using {{e2e_email}} and {{e2e_password}}, and open the dashboard post list.

## Step 2 @verifies ac-34

In the dashboard post list, initiate deletion of the request titled {{planned_request_title}}, then assert a deletion confirmation appears before the request is removed.

## Step 3 @verifies ac-33

Decline the deletion confirmation and return to the dashboard post list, then assert the request titled {{planned_request_title}} remains in the post list.
