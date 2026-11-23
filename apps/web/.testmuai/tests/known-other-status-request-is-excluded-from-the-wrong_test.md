---
assurance:
  id: t-32
  base: sha256:b38cc8ec2ff390089a80bb7a777063920c0d9d4f2f1b7e350e6110ea51c6787f
---
# Known other-status request is excluded from the wrong roadmap column

> Identify a known Acme request whose current status differs from a selected column, then verify that it is not placed in that column.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list (inbox), identify the request titled {{other_status_title}}, record its current status, and identify a different available status from the request status choices.

## Step 3 @verifies ac-78, ac-75

On the Acme dashboard roadmap, locate the column for the different status and the column matching {{other_status_title}}'s current status, then assert {{other_status_title}} is absent from the different-status column and every roadmap request card is in the column matching its current inbox status.
