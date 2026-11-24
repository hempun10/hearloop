---
assurance:
  id: t-31
  base: sha256:37f30ea2171740dcb5e542f2b3f745b5cddc48888b30c16e1709d8636b6284fc
---
# Opening an Acme run shows its Kane report

> A member opens a board run row and inspects the associated Kane report.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 @verifies ac-94

On Acme's dashboard Kane runs page, open the row for the known Acme verification {{kane_run_id}}, then assert the opened content is that run's Kane report.
