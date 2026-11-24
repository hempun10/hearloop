---
assurance:
  id: t-11
  base: sha256:005c22ffdebb0d9ac9f7202bfffeb9cbf6a2b222757b1b29596c19cd6cb4bf0a
---
# Loop API token last use is visible after API use

> Use a freshly created token for an API request and review its last-use information on the Acme board dashboard.

## Step 1

At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 @verifies ac-16

Create a Loop API token named 'Assurance last-use probe' and store its displayed value as last_use_token_value, then assert the created token is identified by 'Assurance last-use probe'.

## Step 3

Make a successful token-authenticated API request to {{loop_api_probe_url}} using {{smart.last_use_token_value}}.

## Step 4 @verifies ac-17

In the Acme board dashboard's Settings > Loop API tokens, inspect the token entries including 'Assurance last-use probe', then assert each listed token shows its last-use information and the probe token reflects its completed use.
