---
assurance:
  id: t-104
  base: sha256:92c385ba4141164684a0d97cfb4a83f1e62b0435c7f31e35a52abdbd4e55fa88
---
# Acme Roadmap reconciles complete inventory and an empty stage

> On a board with an empty status stage, compare the complete board request inventory to exactly one matching Roadmap column per request, and compare displayed counts including zero.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2

On the Acme dashboard post list, collect the complete board request inventory with each request's title and status for independent comparison with the roadmap.

## Step 3

Open the signed-in Acme dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate the four Planned cards: Dark mode toggle, Passkey sign-in, Two-factor login, and Mobile app.

## Step 4 @verifies ac-104

On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, use each of the four Planned cards' status dropdowns to move Dark mode toggle, Passkey sign-in, Two-factor login, and Mobile app to Open, then assert the Planned column shows 0 requests.

## Step 5 @verifies ac-101, ac-102, ac-103, ac-104

On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, reconcile all cards against the independently collected post-list inventory updated for the four Planned-to-Open moves, then assert exactly four columns named Open, Planned, In progress and Shipped, each board request appears exactly once in its matching status column, and every column's displayed count equals its actual membership, including the empty Planned column.
