---
assurance:
  id: t-27
  base: sha256:678bfd8b64162779d5271ab0a27d0a0e17e8bfc26ef1c4002e3d8e17665732eb
---
# Acme member creates a named Loop token and sees its issued value

> A signed-in Acme board member creates a named Loop API token and sees its value at creation.

## Step 1

At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, and reach the Acme dashboard's Settings area for Loop API tokens.

## Step 2 @verifies ac-60

In Acme dashboard Settings, create a Loop API token named 'Loop creation assurance', then assert the newly created token value is displayed.

## Step 3 @verifies ac-63

In Acme dashboard Settings under Loop API tokens, inspect the newly created token named 'Loop creation assurance', then assert the created token bears the supplied name.
