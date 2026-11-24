---
assurance:
  id: t-86
  base: sha256:0ad54a21a99bbdb8d5e01f6321fa65b75afd4e35357110dd7781903277ba63e6
---
# Confirmed removal immediately denies the removed member's dashboard

> With two Acme members, confirm removal of the other member in Settings → Members; establish that they are removed and immediately cannot open the dashboard.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}; reach Acme's Settings → Members page.

## Step 2

On Acme's Settings → Members page, create a fresh invite link and store the shown link as member_invite_link.

## Step 3

Sign out of the member account; at the stored {{smart.member_invite_link}}, sign in using {{nonmember_email}} and {{nonmember_password}}, join Acme, and reach its dashboard.

## Step 4

Sign out of the newly joined account; at {{base_url}}/login, sign in again with {{e2e_email}} and {{e2e_password}} and reach Acme's Settings → Members page.

## Step 5 @verifies ac-162

On Acme's Settings → Members page, request removal of the row for {{nonmember_email}} without confirming it, then assert that the member remains listed before confirmation.

## Step 6 @verifies ac-164

In the open member-removal confirmation, confirm removal of {{nonmember_email}}, then assert that the member's row is absent from Acme's Settings → Members list.

## Step 7 @verifies ac-165

Immediately sign out, sign in with {{nonmember_email}} and {{nonmember_password}}, and open {{base_url}}/acme/dashboard, then assert that the removed account cannot enter the dashboard and is instead sent to Acme's public board.
