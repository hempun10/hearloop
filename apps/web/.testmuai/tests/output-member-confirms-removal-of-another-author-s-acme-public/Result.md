---
test: ../member-confirms-removal-of-another-author-s-acme-public_test.md
status: failed
started: 2026-11-24T03:06:08.889Z
duration_s: 201
session_id: 83ab65b5-e157-4692-9fff-19126f730832
---

# Member confirms removal of another author's Acme public comment — Result

## Step 1 ✓ passed (38.2s)
md5: 983c7f666f9d274fd39bb36ee00660ed
At {{base_url}}/login, sign in with {{nonmember_email}} and {{nonmember_password}} as a signed-in nonmember of Acme.

## Step 2 ✓ passed (23.6s)
md5: c9801e28d475abb5cebbf6f9d163b06d
From the Acme public board at {{base_url}}/acme, open a request page and publish the public comment 'Other author moderation probe {{kane_run_id}}' using Comment.

## Step 3 ✓ passed (62.1s)
md5: b53e98a751d0f604b3573fae85e3826b
End the nonmember session, sign in at {{base_url}}/login with the Acme member account {{e2e_email}} and {{e2e_password}}, and return to the request containing 'Other author moderation probe {{kane_run_id}}'.

## Step 4 ✓ passed (39.8s)
md5: 293f469911177f4afc129b1a92e5cfec
On that request page, initiate removal using that comment's remove button, then assert 'Other author moderation probe {{kane_run_id}}' has not been removed before confirmation.

## Step 5 ✗ failed (35.4s)
md5: 8061761522c55eea90eee04a7d12ee7e
Reason: Final verification failed: "the targeted comment is absent" — bug verdict: Targeted-comment absence check uses an unresolved placeholder [automation_bug/config_issue, confidence 0.98]
Confirm removal of 'Other author moderation probe {{kane_run_id}}' and inspect that request's comments, then assert the targeted comment is absent.
