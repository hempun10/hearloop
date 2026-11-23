---
assurance:
  id: t-28
  base: sha256:e712713294935d0c3b6364f54104b480fb73a145833afd81ae693b250f505a0f
---
# Unmatched title shows an empty inbox with query

> Search for a known absent request title and observe Nothing matches together with the entered text, without nonmatching requests in the results.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2 @verifies ac-64, ac-72, ac-73, ac-86

In the Acme inbox, search for the known absent title {{unmatched_title}}, then assert there are zero displayed request rows, the toolbar count equals zero displayed rows, the message "Nothing matches" is shown, and {{unmatched_title}} appears with the no-match message.
