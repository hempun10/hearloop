---
assurance:
  id: t-79
  base: sha256:29908c0cd963ab0c948ab3819f6a3ef0660ab7ff0de633518cf18a4523ca84b1
---
# Nonmember joins Acme through a fresh invitation

> A nonmember opens a fresh link, signs in or signs up, chooses Join Acme and arrives at the dashboard as a member.

## Step 1

At {{base_url}}/acme/dashboard, sign in with {{e2e_email}} and {{e2e_password}}, open Settings → Members, create a fresh invite link and store its displayed URL as invite_url.

## Step 2 @verifies ac-150

From a signed-out browser session, open invite_url for Acme, then assert the invitee is asked to sign in or sign up before joining.

## Step 3 @verifies ac-151

From the Acme invitation's sign-in or sign-up prompt, sign in with {{nonmember_email}} and {{nonmember_password}}, then assert "Join Acme" is shown.

## Step 4 @verifies ac-153

On the Acme invitation, choose "Join Acme", then assert the Acme dashboard opens.

## Step 5 @verifies ac-152

From the Acme dashboard, open Settings → Members, then assert {{nonmember_email}} appears as a member.
