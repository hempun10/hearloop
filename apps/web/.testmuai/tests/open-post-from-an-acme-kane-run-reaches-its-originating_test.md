---
assurance:
  id: t-23
  base: sha256:76170d194a09772a80244b9d5b1781c4b0cc6caeddb78dd39fc73c800e14723c
---
# Open post from an Acme Kane run reaches its originating request

> A board member follows the Open post link of an opened run to the request that produced that verification.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2

On the Acme dashboard's Kane runs page, open the row for the independently identified Acme verification {{kane_run_id}} to expose its report and Open post link.

## Step 3 @verifies ac-58

In the opened {{kane_run_id}} verification row, follow Open post to the associated request {{kane_request_title}}, then assert the opened request is the independently identified request {{kane_request_title}} associated with that verification.
