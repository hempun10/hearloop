---
assurance:
  id: t-5
  base: sha256:e0841099e0b958fff052633988a4f627d41f903dd27a1d18096b7bf8bc03fce0
---
# Hidden Acme roadmap stays nonpublic at its direct address

> A board member hides the public roadmap; a signed-out visitor opens the roadmap by its direct address and sees that it is not public.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set the public roadmap to hide and save the access setting.

## Step 3 @verifies ac-7

In a signed-out browser context, open {{public_roadmap_url}} directly, then assert the page reports that the roadmap is not public.
