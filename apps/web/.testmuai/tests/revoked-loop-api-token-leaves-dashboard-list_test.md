---
assurance:
  id: t-54
  base: sha256:62f14de8ef98b45fe7bace593986ab61ad3da171311f5c757c0daa307db3ef9b
---
# Revoked Loop API token leaves dashboard list

> Create a named token in the Acme board dashboard, revoke it there, and observe that its name is absent from the token list.

## Step 1

At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 @verifies ac-16

Create a Loop API token named 'Assurance revoke probe' in the Acme board dashboard's Settings > Loop API tokens, then assert a newly created token identified by 'Assurance revoke probe' appears in the token list.

## Step 3 @verifies ac-112

In the Acme board dashboard's Settings > Loop API tokens, revoke the token named 'Assurance revoke probe', then assert 'Assurance revoke probe' is absent from the dashboard token list.
