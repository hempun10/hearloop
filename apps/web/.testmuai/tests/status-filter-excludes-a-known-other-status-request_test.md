---
assurance:
  id: t-27
  base: sha256:dbb222c65987f9479462c897c4f516c1b890b9595a27b959b996b9cd8ff7c0ba
---
# Status filter excludes a known other-status request

> Choose a status from Filter and show that a known request of a different status is absent, while displayed rows all have the chosen status and at most one status filter is active.

## Step 1

From {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, then open the inbox at {{base_url}}/acme/dashboard.

## Step 2

In the Acme inbox, locate {{other_status_title}} and another visible request of a different status to establish the known nonmatching request and the status to select.

## Step 3 @verifies ac-67, ac-69, ac-85

In the inbox Filter menu, select the other request's status, then assert every displayed row has that selected status, no more than one status filter is active, and {{other_status_title}} is absent from the displayed inbox.

## Step 4 @verifies ac-61, ac-62, ac-63, ac-64

Inspect the filtered request rows and the toolbar count, then assert every displayed row shows status, vote count and age, and the toolbar count equals the number of displayed request rows.
