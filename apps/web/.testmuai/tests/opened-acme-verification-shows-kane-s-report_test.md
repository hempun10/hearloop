---
assurance:
  id: t-22
  base: sha256:5d29eb56503df15116075dbc70c9bf42ad15202110da71cae86c9856bc69676c
---
# Opened Acme verification shows Kane's report

> A board member opens a verification row and inspects the Kane report associated with that run.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard's Kane runs page.

## Step 2 @verifies ac-57

On the Acme dashboard's Kane runs page, open the row for the independently identified Acme verification {{kane_run_id}}, then assert the opened row shows Kane's report for that verification.
