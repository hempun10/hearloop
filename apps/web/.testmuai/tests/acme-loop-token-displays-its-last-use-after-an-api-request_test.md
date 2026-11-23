---
assurance:
  id: t-26
  base: sha256:579a46c55a6f4f64132e460152284d89c8e55448bbbe383915c20d191abf9116
---
# Acme Loop token displays its last use after an API request

> Use a newly created Loop token, then inspect the last-use indication for that token in board settings.

## Step 1

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, and reach the Acme dashboard's Settings area for Loop API tokens.

## Step 2 @verifies ac-60

In Acme dashboard Settings, create a Loop API token named 'Loop last-use assurance' and capture the issued secret value as issued_token, then assert the newly created token value is displayed.

## Step 3

Using issued_token, make a successful token-authenticated Loop API request to {{loop_api_probe_url}} so that this token has been used.

## Step 4 @verifies ac-63, ac-62

In Acme dashboard Settings under Loop API tokens, inspect the token named 'Loop last-use assurance', then assert the token bears that name and has a visible last-use indication.
