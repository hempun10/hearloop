---
test: ../member-confirms-removal-of-acme-team-only-note-2_test.md
status: passed
started: 2026-11-24T04:08:36.797Z
duration_s: 132
session_id: 695538de-efe1-4df4-9a73-a5336ef47101
---

# Member confirms removal of Acme team-only note — Result

## Step 1 ✓ passed (27.6s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (29.2s)
md5: 7b266bcdc11b84ec25697a792984049c
From the Acme board at {{base_url}}/acme, open a request page and post 'Internal moderation probe' after enabling Internal note (team only).

## Step 3 ✓ passed (29.3s)
md5: dd51ddcbd907546ab6a2e30726b0ab25
On that request page, initiate removal using the remove button belonging to 'Internal moderation probe', then assert the targeted note has not been removed before confirmation.

## Step 4 ✓ passed (42.2s)
md5: 86ef75a0e13e639f2ad7de36e726fba9
Confirm removal of 'Internal moderation probe' on that request page, then assert the targeted note is absent from the member's discussion.
