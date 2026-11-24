---
assurance:
  id: t-87
  base: sha256:63c073d944ecf3f77f7ff40f1154a4717dc1093470b9c7856fc044c26b7ad8ae
---
# Sole board member remains after removal attempt

> On a board with exactly one member, attempt the member-removal route and establish that the final member remains.

## Step 1

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}; open the dashboard for {{base_url}}/{{sole_member_board_slug}} and reach Settings → Members, on a board where this account is the only member.

## Step 2 @verifies ac-163

On that board's Settings → Members page, try to remove the sole member if a removal action is offered, then assert that the final member's row remains listed.
