---
assurance:
  id: t-39
  base: sha256:dc76d5fdabe5482331d1b48c277fff59edf4bdb9299164dfa093e0d88a944d90
---
# Reversing shipment removes its public entry without deleting Kane history

> Move a previously shipped request with a Kane run to another status and distinguish removed public entry from preserved request-run history.

## Step 1

At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2

On the Acme board, identify the request titled {{kane_request_title}} that is currently Shipped; on its request page identify the existing Kane run {{kane_run_id}}, and return to its inbox row.

## Step 3 @verifies ac-74

In the inbox status dropdown of {{kane_request_title}}, inspect the destinations, then assert In progress is available to a member.

## Step 4 @verifies ac-85

From that inbox row move {{kane_request_title}} from Shipped to In progress, then assert its row shows In progress.

## Step 5 @verifies ac-86

Reload the Acme dashboard inbox and locate {{kane_request_title}}, then assert its row still shows In progress.

## Step 6 @verifies ac-88

Visit the Acme public changelog for {{kane_request_title}} after the move, then assert its shipped entry is absent.

## Step 7 @verifies ac-89

Open {{kane_request_title}}'s request page after the move, then assert its pre-existing Kane run {{kane_run_id}} is still listed.
