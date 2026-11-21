---
assurance:
  id: t-46
  base: sha256:9258cb9d315aabd71c138933f880ceaa1f2c5e8aac2902fc4561505a4a779f44
---
# Empty roadmap status retains its column and zero count

> A member reviews a status with no Acme requests, ensuring its column remains present with a zero count.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list (inbox), establish the unfiltered inventory of requests by status and the available request statuses from a request's status choices; identify a status with no requests in the inventory.

## Step 3 @verifies ac-76, ac-77

Open {{base_url}}/acme/dashboard/roadmap and inspect the status column with no Acme inbox requests against the full set of available statuses, then assert that empty status has exactly one roadmap column showing a count of zero and every roadmap status column's displayed count equals the independently counted inbox requests for that status.
