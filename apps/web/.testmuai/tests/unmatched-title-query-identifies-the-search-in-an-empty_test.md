---
assurance:
  id: t-18
  base: sha256:b82596e9cbb62320ccf6ddb45ef29d45fba7905583f9b57e7d71d7497d440ff0
---
# Unmatched title query identifies the search in an empty inbox

> A title search with no matching request shows Nothing matches and shows the search text, without displaying an unrelated request.

## Step 1

At {{base_url}}/acme/dashboard, sign in to the Acme board as {{e2e_email}} with {{e2e_password}} and reach the dashboard post list.

## Step 2

In the Acme dashboard inbox, clear any active status filter and title query so the title search starts without restrictions.

## Step 3 @verifies ac-35, ac-45, ac-46, ac-47

In the Acme dashboard inbox, search request titles for {{unmatched_title}}, a query confirmed to match no request, then assert the empty state reads "Nothing matches" and shows {{unmatched_title}}, no request rows are displayed, and the toolbar count equals an independent count of zero displayed rows.
