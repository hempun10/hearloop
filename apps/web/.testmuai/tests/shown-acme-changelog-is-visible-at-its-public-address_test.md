---
assurance:
  id: t-58
  base: sha256:e8010e1f97616343c3d089242599b6d1ab4e15405fae45bae631d0c61aa4464c
---
# Shown Acme changelog is visible at its public address

> A board member sets the public changelog to show; the public changelog is visible from its direct address.

## Step 1

At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2

On the Acme dashboard Settings → Access page, set the public changelog to show and save the setting.

## Step 3 @verifies ac-13

In a signed-out browser context, open {{public_changelog_url}} directly, then assert the public changelog page is visible.
