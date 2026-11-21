---
assurance:
  id: t-41
  base: sha256:731792f7e83200f039719fd0337215f9f913534f7593f35ab78f454aef5085c6
---
# Confirm agent-held request move after work-stopping warning

> Confirm a status change for an agent-claimed In progress request and observe the claim drop.

## Step 1

At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2

Locate the In progress request titled {{claimed_request_title}} that is held by a coding agent; identify the agent and the claim on its request page, then return to its inbox row.

## Step 3 @verifies ac-74

Open {{claimed_request_title}}'s inbox status dropdown and identify a destination other than In progress or Shipped, then assert that destination is available to a member.

## Step 4 @verifies ac-90

Attempt to move {{claimed_request_title}} from In progress to that non-Shipped destination, then assert the warning reads "<agent> is building this. Moving it stops that work." with the identified agent's name in place of <agent>.

## Step 5 @verifies ac-85

Confirm the warned move for {{claimed_request_title}}, then assert its inbox row shows the selected non-Shipped destination.

## Step 6 @verifies ac-86

Reload the Acme dashboard inbox and find {{claimed_request_title}}, then assert its row still shows the selected destination.

## Step 7 @verifies ac-91

Open {{claimed_request_title}}'s request page after the confirmed move, then assert the original agent's claim is absent.
