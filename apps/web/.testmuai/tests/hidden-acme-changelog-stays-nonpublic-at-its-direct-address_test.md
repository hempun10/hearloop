---
assurance:
  id: t-6
  base: sha256:87cc961bd66d41a6337e98c8cd391903103e0c4316c03db43d0c10b4e0d1aee0
---
# Hidden Acme changelog stays nonpublic at its direct address

> A board member hides the public changelog; a signed-out visitor opens the changelog by its direct address and sees that it is not public.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set the public changelog to hide and save the access setting.

## Step 3 @verifies ac-8

In a signed-out browser context, open {{public_changelog_url}} directly, then assert the page reports that the changelog is not public.
