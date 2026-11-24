---
assurance:
  id: t-102
  base: sha256:48e585301ee584c5bc3d37d767bb3c06836070c8137ae456da92f7ed30f98d79
---
# Signed-out visitor sees a member's tag on a request

> After a member adds a known tag, a signed-out visitor views the same request page and sees it.

## Step 1

At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3

On the request page, add public-tag-{{kane_run_id}} in Add a tag using Enter.

## Step 4 @verifies ac-193

In a signed-out browser session, open the same Acme request page, then assert its current tag public-tag-{{kane_run_id}} is visible.
