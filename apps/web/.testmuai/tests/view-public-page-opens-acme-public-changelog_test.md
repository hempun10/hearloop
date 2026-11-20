---
assurance:
  id: t-31
  base: sha256:4697c7a9a9013b73c526434ad07d1588f5a4a561676d7e64eacf383ad21a0bcf
---
# View public page opens Acme public changelog

> Follow View public page from the member dashboard changelog to the board's public changelog.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 @verifies ac-72

On the Acme dashboard Changelog page, follow View public page, then assert the Acme public changelog page opens.
