---
assurance:
  id: t-33
  base: sha256:8ede123817d0074a7452d6fce30d1b22b393ef81ed553373847ef038f0dc3bb6
---
# Populated roadmap columns match independent Acme request inventory

> A member reviews the Acme board's populated roadmap and checks each status column against the board's actual request statuses and request inventory.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list (inbox), establish the unfiltered board request inventory, noting each request's title and current status and the available statuses in the request status choices.

## Step 3 @verifies ac-75, ac-76, ac-77

On the Acme dashboard roadmap, inspect the status columns and their cards against the Acme inbox inventory, then assert each card appears under its current status, every column's displayed count equals the independently counted inbox requests with that status, and the number of columns equals the number of available request statuses with no duplicate status columns.
