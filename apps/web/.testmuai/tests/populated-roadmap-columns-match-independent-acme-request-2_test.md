---
assurance:
  id: t-45
  base: sha256:888378dbddad8e255370777ea21b5978b7d5bb0353644346da9ada4e457489d9
---
# Populated roadmap columns match independent Acme request inventory

> A member reviews the Acme board's populated roadmap and checks each status column against the board's actual request statuses and request inventory.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then open {{base_url}}/acme/dashboard/roadmap.

## Step 2

On the Acme dashboard post list (inbox), establish the unfiltered board request inventory, noting each request's title and current status and the available statuses in the request status choices.

## Step 3 @verifies ac-75, ac-76, ac-77

Open {{base_url}}/acme/dashboard/roadmap and inspect its status columns and cards against the independently established Acme inbox inventory, then assert each card appears under its current status, every column's displayed count equals the independently counted inbox requests with that status, and the number of columns equals the number of available request statuses with no duplicate status columns.
