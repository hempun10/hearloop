---
assurance:
  id: t-48
  base: sha256:5d306038350c3a29edd182fbe2bc6fe97ae9c08824110db336071816fe12e3b1
---
# Cancel claimed roadmap move and preserve agent

> On the roadmap card status dropdown, cancel moving an agent-claimed In progress request to Open and preserve the claim and status.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-21

Open the signed-in Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap and review its status columns, then assert there are exactly four named Open, Planned, In progress and Shipped.

## Step 3 @verifies ac-22, ac-23

On the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap, reconcile the visible request cards in every column, including any empty column, against the column counts and each card's current status, then assert every count matches the number of its cards and every card occurs exactly once in its matching status column.

## Step 4 @verifies ac-28

For {{claimed_request_title}}, the In progress card held by an agent on the Acme dashboard roadmap at {{base_url}}/acme/dashboard/roadmap, select Open from its card status dropdown, then assert the warning says the named agent is building this and moving it stops that work.

## Step 5 @verifies ac-26

Cancel {{claimed_request_title}}'s warned move to Open on the dashboard roadmap, then assert the card remains In progress.

## Step 6 @verifies ac-27

Open {{claimed_request_title}}'s request page after cancelling, then assert the agent's claim on that request is still present.
