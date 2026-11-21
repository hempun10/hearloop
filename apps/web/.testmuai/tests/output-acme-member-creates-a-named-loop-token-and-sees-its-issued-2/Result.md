---
test: ../acme-member-creates-a-named-loop-token-and-sees-its-issued-2_test.md
status: passed
started: 2026-11-20T09:26:14.378Z
duration_s: 130
session_id: 3ed38df2-6bcf-4f61-96c0-35764897323f
---

# Acme member creates a named Loop token and sees its issued value — Result

## Step 1 ✓ passed (26.4s)
md5: 65a6af41828c996f0edcabf1bde4e9d6
Open {{base_url}}/login and sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (17.7s)
md5: c71513cfee4be2a9ae39dc9f46dffae4
From the signed-in Acme dashboard, open Settings.

## Step 3 ✓ passed (32.1s)
md5: 663ab7ea2f417b2bdc89113907cde61a
In Acme dashboard Settings, open Loop API tokens.

## Step 4 ✓ passed (30s)
md5: 3446d847e063e6512870fcd6e1a1ac38
In Acme dashboard Settings under Loop API tokens, create a Loop API token named 'Loop creation assurance', then assert the newly created token value is displayed.

## Step 5 ✓ passed (18.2s)
md5: 11cd9828422928f91d4d9ee6eba630db
In Acme dashboard Settings under Loop API tokens, inspect the newly created token named 'Loop creation assurance', then assert the created token bears the supplied name.
