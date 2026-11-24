---
assurance:
  id: t-40
  base: sha256:2718fc7c61b2ff81767f1962b14d902fddcfa8655f15e546bcf88753bb39f7ea
---
# Confirm claimed request move and release agent

> On the post list, confirm moving an agent-claimed In progress request to Planned; warn that work stops, update status, and release the claim.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme dashboard post list, locate {{claimed_request_title}} as an agent-claimed In progress request.

## Step 3 @verifies ac-24

From {{claimed_request_title}}'s post-list status dropdown, request a move to Planned, then assert a warning says the named agent is building this and moving it stops that work.

## Step 4 @verifies ac-19

Confirm the warned move of {{claimed_request_title}} to Planned on the post list, then assert its displayed status is Planned.

## Step 5 @verifies ac-25

Open {{claimed_request_title}}'s request page after the confirmed move, then assert the agent's claim on that request is absent.

## Step 6 @verifies ac-20

Reload the Acme dashboard and locate {{claimed_request_title}} in the post list, then assert its status remains Planned.
