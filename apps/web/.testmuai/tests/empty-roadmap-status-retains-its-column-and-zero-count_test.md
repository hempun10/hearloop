---
assurance:
  id: t-53
  base: sha256:a7b6892a17e816a2096c40584f915f497421fa6b14c4349f7ce2dade7af02e49
---
# Empty roadmap status retains its column and zero count

> A member reviews a status with no Acme requests, ensuring its column remains present with a zero count.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list (inbox), establish the unfiltered request inventory by status and available statuses from a request's status choices; locate {{planned_request_title}} and confirm it is the sole request currently in Planned.

## Step 3

On the Acme dashboard post list (inbox), move {{planned_request_title}} from Planned to Open using its status dropdown.

## Step 4

On the Acme dashboard post list (inbox), establish the updated unfiltered request inventory by status independently of the roadmap, including that Planned has no requests after the move.

## Step 5 @verifies ac-76, ac-77

Open {{base_url}}/acme/dashboard/roadmap and inspect its columns against the updated inbox inventory and available status choices, then assert Planned still has exactly one column showing a count of zero, every roadmap status column's displayed count equals the independently counted inbox requests for that status, and there is exactly one roadmap column for each available request status.
