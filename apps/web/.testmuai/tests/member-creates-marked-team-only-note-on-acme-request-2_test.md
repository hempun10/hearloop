---
assurance:
  id: t-107
  base: sha256:c52180c2dba599eef32ac65170b24aa1df71f7f3ff5d7b1b71edea162cc409a4
---
# Member creates marked team-only note on Acme request

> A member selects Internal note (team only), posts a distinguishable note, and sees it marked Internal note on the request page.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 @verifies ac-127, ac-119, ac-125

On that request page, write 'Member-created team-only note probe', turn on Internal note (team only), and post with Comment, then assert the posted note is visible to the member and marked 'Internal note'.
