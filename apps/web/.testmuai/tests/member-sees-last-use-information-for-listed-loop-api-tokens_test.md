---
assurance:
  id: t-65
  base: sha256:ea70b62c718065dcb3ec2ea98d32284da84ac82f7ee324de521bfabba691b37a
---
# Member sees last-use information for listed Loop API tokens

> From the Acme board dashboard, inspect the last-use information for each listed token, without generating an API request or claiming a timestamp value.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme board dashboard.

## Step 2

On the Acme board dashboard under Settings → Loop API tokens, create a named token called audit-{{kane_run_id}} to ensure the token list contains a token.

## Step 3 @verifies ac-17

Return to the Acme board dashboard's Settings → Loop API tokens list and inspect its listed tokens, then assert every listed token has visible last-use information.
