---
assurance:
  id: t-69
  base: sha256:36621d4f562fc69798c4c926f0819a4bc4fd16ed1fcfd10f48d98b9d922c2a01
---
# Unmatched title search shows Nothing matches and entered text

> Search for an independently known absent request title and inspect the empty-state message and the entered search text.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

At {{base_url}}/acme/dashboard, open the Acme post list (inbox) and clear any previously selected status filter or search.

## Step 3 @verifies ac-72, ac-73

In the Acme dashboard inbox, search by the independently known absent title {{unmatched_title}}, then assert the no-match state displays "Nothing matches" and the entered search text {{unmatched_title}}.

## Step 4 @verifies ac-64

In the empty search results for {{unmatched_title}}, compare the inbox toolbar count to the displayed request rows, then assert the toolbar count equals zero displayed rows.
