---
assurance:
  id: t-34
  base: sha256:f2bf353c28088f6cd50e89a6a070572251ec091eaf21cfa628d19bbe3bda08f8
---
# Empty roadmap status retains its column and zero count

> A member reviews a status with no Acme requests, ensuring its column remains present with a zero count.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list (inbox), establish the unfiltered inventory of requests by status and the available request statuses from a request's status choices; identify a status with no requests in the inventory.

## Step 3 @verifies ac-76, ac-77

On the Acme dashboard roadmap, inspect the column for the status with no inbox requests against the full set of available statuses, then assert that status has exactly one column showing a count of zero and every status column's displayed count equals the independently counted inbox requests for that status.
