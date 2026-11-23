---
assurance:
  id: t-19
  base: sha256:2053822c508f23764a13c7612734455b6409d9e53ef7d74c2f7c3368087170b5
---
# Empty board name blocks General save

> Submitting an empty required board name produces a name-field error and saves no General changes.

## Step 1

At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > General and note the current saved board name and tagline.

## Step 2 @verifies ac-45

On the Acme dashboard's Settings > General page, leave the required board name empty, change the optional tagline to 'Uncommitted General change', and submit the settings; then assert an error appears next to the board name field.

## Step 3 @verifies ac-46, ac-48

From the rejected General submission, reopen Settings > General after a reload, then assert the prior saved board name and tagline remain rather than an empty board name or 'Uncommitted General change'.
