---
assurance:
  id: t-24
  base: sha256:15bdf7b7313a9ce7f315fdd2f8308f7471b864bffc8e6363a12615aee4dc1184
---
# Revoke a used Acme Loop token and immediately reject its API access

> Create and use a named Loop token, revoke it, and show that using the revoked token immediately fails to gain Loop API access.

## Step 1

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, and reach the Acme dashboard's Settings area for Loop API tokens.

## Step 2 @verifies ac-60

In Acme dashboard Settings, create a Loop API token named 'Loop revocation assurance' and capture the issued secret value as issued_token, then assert the newly created token value is displayed.

## Step 3

Using issued_token, make a successful token-authenticated Loop API request to {{loop_api_probe_url}} to establish that this token works before revocation.

## Step 4 @verifies ac-63, ac-62

In Acme dashboard Settings under Loop API tokens, find the used token named 'Loop revocation assurance', then assert that it bears that name and has a visible last-use indication.

## Step 5 @verifies ac-59

In Acme dashboard Settings under Loop API tokens, revoke 'Loop revocation assurance' and immediately repeat the same token-authenticated Loop API request to {{loop_api_probe_url}} using issued_token, then assert that the revoked token cannot successfully access the Loop API.
