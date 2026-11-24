---
assurance:
  id: t-36
  base: sha256:43da2ccef5fd77242398abcc5e6a392dfa6a69d62942f8485ce00f3d45054510
---
# Acme Roadmap reconciles complete inventory and an empty stage

> On a board with an empty status stage, compare the complete board request inventory to exactly one matching Roadmap column per request, and compare displayed counts including zero.

## Step 1

At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2

On Acme's dashboard post list (inbox), collect the complete board request inventory with each request's title and status as the independent expected Roadmap membership.

## Step 3 @verifies ac-101, ac-102, ac-103, ac-104

On Acme's dashboard Roadmap page, compare every card and status-column count to that inbox inventory, including at least one empty status stage, then assert there are exactly four columns Open, Planned, In progress and Shipped, every inventoried request appears exactly once in its matching column, and every column count equals its inventory membership including zero.
