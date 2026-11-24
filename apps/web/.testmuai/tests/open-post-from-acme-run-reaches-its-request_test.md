---
assurance:
  id: t-32
  base: sha256:35bf4089c7a08257bd4d095789977a6af3bfa589a61c937477383ed503a2271a
---
# Open post from Acme run reaches its request

> A member opens a run row and follows Open post to that run's associated request.

## Step 1

From {{base_url}}/login, sign in as an Acme board member using {{e2e_email}} and {{e2e_password}}, then reach {{base_url}}/acme/dashboard and its Kane runs page.

## Step 2 @verifies ac-95

On Acme's dashboard Kane runs page, open the row for verification {{kane_run_id}}, then assert the opened run provides an Open post link.

## Step 3 @verifies ac-96

From the opened Acme Kane run {{kane_run_id}}, follow Open post, then assert the reached request is the associated post {{kane_request_title}}.
