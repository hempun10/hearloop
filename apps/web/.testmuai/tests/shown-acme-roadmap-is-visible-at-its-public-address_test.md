---
assurance:
  id: t-57
  base: sha256:da061d01ef7b01549375453fae72129839540505ee457fdb7178a23408f9014a
---
# Shown Acme roadmap is visible at its public address

> A board member sets the public roadmap to show; the public roadmap is visible from its direct address.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set the public roadmap to show and save the setting.

## Step 3 @verifies ac-12

In a signed-out browser context, open {{public_roadmap_url}} directly, then assert the public roadmap page is visible.
