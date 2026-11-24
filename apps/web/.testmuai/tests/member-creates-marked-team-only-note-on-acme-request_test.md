---
assurance:
  id: t-70
  base: sha256:948b667179dcdcdc685f324ce08f3678f28d2e20f753ec8539bec769075108ff
---
# Member creates marked team-only note on Acme request

> A member selects Internal note (team only), posts a distinguishable note, and sees it marked Internal note on the request page.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then open the request titled {{kane_request_title}} on its request page.

## Step 2 @verifies ac-127, ac-119, ac-125

On that request page, write 'Team-only discussion probe {{kane_run_id}}', turn on Internal note (team only), and post with Comment, then assert the posted note is visible to the member and marked 'Internal note'.
