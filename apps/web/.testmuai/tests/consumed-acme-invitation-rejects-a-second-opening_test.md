---
assurance:
  id: t-80
  base: sha256:a020ad6fc7dcc8c0e06d5a3a8b8acf1674cac85bc637377d98587acb0c0ea785
---
# Consumed Acme invitation rejects a second opening

> After a successful join, reuse the same link and see the invalid-link message.

## Import: t-79

@import ./nonmember-joins-acme-through-a-fresh-invitation_test.md

## Step 1 @verifies ac-154

At {{base_url}}/acme, open the invitation URL stored as invite_url by the fresh-join prerequisite, then assert "This invite link doesn't work" is shown for that used invitation.
