---
test: ../consumed-acme-invitation-displays-the-invalid-link-message_test.md
status: failed
started: 2026-11-24T03:45:46.557Z
duration_s: 173
session_id: d98eb658-3375-411d-ae80-49514eb1f122
---

# Consumed Acme invitation displays the invalid-link message on replay — Result

## Step 1 ✓ passed (31.8s)
md5: 7b3859c359fa3f12decf8920bb783a14
At {{base_url}}/login, sign in as an existing Acme member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (57.6s)
md5: e371a291ef379b932aa37e8e7cdfb768
In Acme dashboard Settings → Members, create an invite link and store its displayed address as smart.invite_url.

## Step 3 ✓ passed (43.5s)
md5: 3f9dd273a47f4cea893fb00301107421
Sign out of the member account, open {{smart.invite_url}}, and sign in as the nonmember using {{nonmember_email}} and {{nonmember_password}}.

## Step 4 ✓ passed (13.1s)
md5: d15a9493ffc5480db1d2876486121776
On the fresh invitation, accept Join Acme to consume the one-use link.

## Step 5 ✗ failed (24.1s)
md5: eb0ddc6ad4a050d0bd1fde8d54d77a8a
Reason: Final verification failed: "the page says "This invite link doesn't work"" — bug verdict: Invite URL resolves to board creation route [automation_bug/config_issue, confidence 0.98]
Reopen {{smart.invite_url}} in the browser, then assert the page says "This invite link doesn't work".
