---
assurance:
  id: t-67
  base: sha256:9f3fad91ff29a514792c37dca3ec5892659dd905f00d439af15b4930d8dacd6d
---
# Matching-title search excludes a known different request

> Search by a known matching request title; check the matching row remains while an independently known request with a different title is absent.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

At {{base_url}}/acme/dashboard, open the Acme post list (inbox) and clear any existing search or status filter.

## Step 3

In the unfiltered inbox, identify the row titled {{other_status_title}} as a known request with a different title from {{planned_request_title}}.

## Step 4 @verifies ac-71, ac-117

In the Acme dashboard inbox, search by the title {{planned_request_title}}, then assert every displayed request title matches the active search text and the known request titled {{other_status_title}} is absent.

## Step 5 @verifies ac-61, ac-62, ac-63

In the resulting Acme inbox, inspect each displayed request row, then assert every row shows a status, vote count and age.

## Step 6 @verifies ac-64

In the searched Acme inbox, compare the toolbar count to the visible request rows, then assert it equals the number of displayed rows.
