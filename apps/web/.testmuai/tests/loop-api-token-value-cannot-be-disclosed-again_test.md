---
assurance:
  id: t-10
  base: sha256:e75ac61d86ca8ccbec02af34d3b48b0a3073076fee5ac39381ec53da8e586f1a
---
# Loop API token value cannot be disclosed again

> Create a named token, observe its value once, then leave its initial disclosure and revisit the token to check that the value cannot be seen again.

## Step 1

At {{base_url}}/acme/dashboard, ensure the Acme board member is signed in with {{e2e_email}} and {{e2e_password}}, and open Settings > Loop API tokens.

## Step 2 @verifies ac-16

Create a Loop API token named 'Assurance one-time probe' and store its displayed value as one_time_token_value, then assert the token is identified by 'Assurance one-time probe'.

## Step 3 @verifies ac-15

Leave the newly created token's initial value display and return to Settings > Loop API tokens to inspect 'Assurance one-time probe', then assert {{smart.one_time_token_value}} was displayed only at creation and is not disclosed again.
