---
assurance:
  id: t-35
  base: sha256:1aea98ea830784e4e45add3c513f9bc87e63022a8d66a2cfa72418b18d4aa2fa
---
# View public page opens Acme public changelog

> Use View public page on the member dashboard to reach the board's public changelog.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme dashboard, open the Changelog page.

## Step 3 @verifies ac-99

On the dashboard Changelog page, activate View public page, then assert the Acme board's public changelog page is open.
