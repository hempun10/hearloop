---
assurance:
  id: t-85
  base: sha256:b52add3d22c7cfcdc7f4c0b26ed48e2a9c5c349ba1be9b5e166d3e80708db73c
---
# Acme invitation older than seven days displays the invalid-link message

> An invitation older than its seven-day lifetime displays the specified invalid-link message.

## Step 1

At {{base_url}}, open the Acme board in the browser.

## Step 2 @verifies ac-161

Open {{expired_invite_url}}, an Acme invitation created more than seven days earlier and not already used or cancelled, then assert the page says "This invite link doesn't work".
