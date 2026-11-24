---
assurance:
  id: t-41
  base: sha256:6144aa64ffc2f052039f5525e3a853068c9afe53d265ee630de4c83c811e4a5b
---
# Cancel claimed roadmap move and preserve agent

> On the roadmap card status dropdown, cancel moving an agent-claimed In progress request to Open and preserve the claim and status.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-21

On the Acme dashboard Roadmap page, review the status columns, then assert there are exactly four named Open, Planned, In progress and Shipped.

## Step 3 @verifies ac-22, ac-23

On the Acme Roadmap, reconcile the visible request cards in every column, including any empty column, against the column counts and each card's current status, then assert every count matches the number of its cards and every card occurs exactly once in its matching status column.

## Step 4 @verifies ac-28

For the agent-claimed In progress card {{claimed_request_title}} on the Roadmap, select Open from its card status dropdown, then assert the warning says the named agent is building this and moving it stops that work.

## Step 5 @verifies ac-26

Cancel {{claimed_request_title}}'s warned move to Open on the Roadmap, then assert the card remains In progress.

## Step 6 @verifies ac-27

Open {{claimed_request_title}}'s request page after cancelling, then assert the agent's claim on that request is still present.
