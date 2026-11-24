---
test: ../cancelled-acme-invitation-displays-the-invalid-link-message_test.md
status: failed
started: 2026-11-24T03:42:37.028Z
duration_s: 142
session_id: bf170f52-edd9-46d9-96f1-82473b42153a
---

# Cancelled Acme invitation displays the invalid-link message — Result

## Step 1 ✓ passed (25.9s)
md5: 581b60e9f70157c730721bc2f287f3aa
At {{base_url}}/login, sign in as an Acme member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (68.8s)
md5: e371a291ef379b932aa37e8e7cdfb768
In Acme dashboard Settings → Members, create an invite link and store its displayed address as smart.invite_url.

## Step 3 ✓ passed (19.6s)
md5: ebf5c7d6fed72c575051f599a30f907d
On the same Members page, find the newly created link under Open invite links and cancel it.

## Step 4 ✗ failed (24.8s)
md5: 64308779e7d9614517bc2eb499b69ad6
Reason: Final verification failed: "the page says "This invite link doesn't work"" — bug verdict: Invite URL variable resolves to Members settings [automation_bug/config_issue, confidence 0.98]
Open {{smart.invite_url}} in the browser after cancellation, then assert the page says "This invite link doesn't work".
