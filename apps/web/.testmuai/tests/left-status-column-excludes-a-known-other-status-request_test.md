---
assurance:
  id: t-59
  base: sha256:a49e170da611488e5cfd58c66ff9b2ec30fdff66528a6e1314a0ac77bb531087
---
# Left status column excludes a known other-status request

> Choose one status using the left status column, prove all displayed rows match it, and exclude a known request with another status.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}} and open the inbox at {{base_url}}/acme/dashboard.

## Step 2

On the Acme dashboard inbox, find the request titled {{other_status_title}} and identify its current status; identify another populated status in the left status column.

## Step 3 @verifies ac-61, ac-62, ac-63, ac-64, ac-68, ac-69, ac-115

In the Acme dashboard inbox, select the populated left-column status different from the status of {{other_status_title}}, then assert every displayed request has that selected status, {{other_status_title}} is absent from the displayed rows, every displayed row shows status, vote count and age, the toolbar count equals the number of displayed rows, and no more than one status filter is active.
