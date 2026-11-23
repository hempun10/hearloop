---
assurance:
  id: t-51
  base: sha256:fa3edba6547297e7be07eeb07648a4a57f1b58e8e022886af0cb21e8c2ac7fc9
---
# Reversing shipment removes its public entry without deleting Kane history

> Move a previously shipped request with a Kane run to another status and distinguish removed public entry from preserved request-run history.

## Step 1

At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2

In the Acme dashboard post list, locate {{kane_request_title}} in its Shipped row before changing its status.

## Step 3

Open {{kane_request_title}}'s request page, identify its pre-existing Kane run {{kane_run_id}}, and return to its dashboard post-list row.

## Step 4 @verifies ac-74

In the inbox status dropdown of {{kane_request_title}}, inspect the destinations, then assert Planned is available to a member.

## Step 5 @verifies ac-85

From its inbox row move {{kane_request_title}} directly from Shipped to Planned, then assert its row shows Planned.

## Step 6 @verifies ac-86

Reload the Acme dashboard inbox and locate {{kane_request_title}}, then assert its row still shows Planned.

## Step 7 @verifies ac-88

Visit the Acme public changelog after moving {{kane_request_title}} to Planned, then assert its shipped entry is absent.

## Step 8 @verifies ac-89

Open {{kane_request_title}}'s request page after the move to Planned, then assert its pre-existing Kane run {{kane_run_id}} is still listed.
