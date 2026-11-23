---
assurance:
  id: t-25
  base: sha256:10e7df883485f143c63fb65d62fad33c79ddf2397140d34e805b5b7de745a9d8
---
# Default inbox shows details, count and vote order

> A member opens the inbox and inspects every displayed request's status, vote count and age, the toolbar row count, and default Most votes ordering.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then reach the inbox at {{base_url}}/acme/dashboard in a fresh browser session.

## Step 2 @verifies ac-61, ac-62, ac-63, ac-64, ac-65, ac-69

On the Acme dashboard inbox, inspect the displayed request rows and the toolbar count, then assert every displayed row shows its status, vote count and age, the toolbar count equals the number of displayed request rows, no more than one status filter is active, and the default row order is Most votes.
