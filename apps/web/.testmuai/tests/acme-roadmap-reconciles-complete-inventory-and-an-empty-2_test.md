---
assurance:
  id: t-44
  base: sha256:57a5ec89543e514aebcf82afc423f3a42dede3633b015a1882e68b91c6057134
---
# Acme Roadmap reconciles complete inventory and an empty stage

> On a board with an empty status stage, compare the complete board request inventory to exactly one matching Roadmap column per request, and compare displayed counts including zero.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2

On the Acme dashboard post list, collect the complete board request inventory with each request's title and status for independent comparison with the roadmap.

## Step 3

Open the signed-in Acme dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate the card {{planned_request_title}}, the only request in Planned.

## Step 4 @verifies ac-104

On that dashboard Roadmap card, use its status dropdown to move {{planned_request_title}} from Planned to Open, then assert the Planned column shows 0 requests.

## Step 5 @verifies ac-101, ac-102, ac-103, ac-104

On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, reconcile all cards against the independently collected post-list inventory updated for the single Planned-to-Open move, then assert exactly four columns named Open, Planned, In progress and Shipped, each board request appears exactly once in its matching status column, and every column's displayed count equals its actual membership, including the empty Planned column.
