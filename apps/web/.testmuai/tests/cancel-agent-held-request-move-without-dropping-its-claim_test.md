---
assurance:
  id: t-42
  base: sha256:5a360447e2289d1f86932aafb80a66161372b78ebf7e39c64b3e160d1021b67b
---
# Cancel agent-held request move without dropping its claim

> Cancel the warning for an agent-claimed In progress request; the request remains In progress.

## Step 1

At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2

Locate the In progress request titled {{claimed_request_title}} held by a coding agent and identify that agent's claim on its request page; return to its inbox row.

## Step 3 @verifies ac-74

Open {{claimed_request_title}}'s inbox status dropdown, then assert Shipped is an available destination.

## Step 4 @verifies ac-90

Attempt to move {{claimed_request_title}} from In progress to Shipped, then assert the warning reads "<agent> is building this. Moving it stops that work." with the identified agent's name in place of <agent>.

## Step 5 @verifies ac-92

Cancel the warned move for {{claimed_request_title}}, then assert its inbox row still shows In progress.

## Step 6 @verifies ac-94

Return to {{claimed_request_title}}'s request page after cancellation, then assert the original coding agent's claim remains.
