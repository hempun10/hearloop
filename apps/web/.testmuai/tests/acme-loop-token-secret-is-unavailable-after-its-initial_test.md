---
assurance:
  id: t-25
  base: sha256:e70155d9c2502a663540d4b660cc1574f7301af84129e33df2c979ee95e5144b
---
# Acme Loop token secret is unavailable after its initial presentation

> Create a named token, leave its initial presentation and return to token settings to show that its secret value cannot be displayed again.

## Step 1

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, and reach the Acme dashboard's Settings area for Loop API tokens.

## Step 2 @verifies ac-60

In Acme dashboard Settings, create a Loop API token named 'Loop one-time assurance' and capture its initially displayed value as issued_token, then assert the newly created token value is displayed.

## Step 3 @verifies ac-63, ac-61

Leave the initial token-value presentation, return to Acme dashboard Settings under Loop API tokens and inspect the created token named 'Loop one-time assurance', then assert the token bears that name but its previously displayed value issued_token is not displayed again.
