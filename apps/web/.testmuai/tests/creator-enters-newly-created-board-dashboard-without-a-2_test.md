---
assurance:
  id: t-65
  base: sha256:ee196ea9a9260afb599a1a80d0a12725db7938d844aec180fc19474d194016df
---
# Creator enters newly created board dashboard without a reload

> Prove immediate entry to a newly created board dashboard without a reload.

## Step 1

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}}.

## Step 2 @verifies ac-4, ac-5

From the signed-in hearloop board area, create a new board named {{fresh_board_name}}, then assert its dashboard appears for the creator immediately without a full-page reload during the creation-to-dashboard transition.
