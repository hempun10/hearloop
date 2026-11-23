---
assurance:
  id: t-9
  base: sha256:22d69dc96b2b50f26934bff8b7283014de14e4797046fda227531f3fbe6f53d7
---
# Revoked Loop API token cannot authenticate immediately

> Create and successfully use a member's token, revoke that token and establish that an immediate repeat request cannot authenticate with it.

## Step 1

At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 @verifies ac-16

Create a Loop API token named 'Assurance revoke probe' and store its displayed value as revoked_token_value, then assert the created token is identified by 'Assurance revoke probe'.

## Step 3

Establish a successful token-authenticated API request to {{loop_api_probe_url}} using {{smart.revoked_token_value}}.

## Step 4

In the Acme board dashboard's Settings > Loop API tokens, revoke 'Assurance revoke probe'.

## Step 5 @verifies ac-14

Immediately repeat the same token-authenticated API request to {{loop_api_probe_url}} using {{smart.revoked_token_value}}, then assert the revoked token does not authenticate a successful API request.
