---
assurance:
  id: t-47
  base: sha256:66136ae13ee694ee4c83a47849ba27860c4bb39dbc6ce5aeba8dc457ca05913b
---
# Acme member creates a named Loop token and sees its issued value

> A signed-in Acme board member creates a named Loop API token and sees its value at creation.

## Step 1

Open {{base_url}}/login and sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}.

## Step 2

From the signed-in Acme dashboard, open Settings.

## Step 3

In Acme dashboard Settings, open Loop API tokens.

## Step 4 @verifies ac-60

In Acme dashboard Settings under Loop API tokens, create a Loop API token named 'Loop creation assurance', then assert the newly created token value is displayed.

## Step 5 @verifies ac-63

In Acme dashboard Settings under Loop API tokens, inspect the newly created token named 'Loop creation assurance', then assert the created token bears the supplied name.
