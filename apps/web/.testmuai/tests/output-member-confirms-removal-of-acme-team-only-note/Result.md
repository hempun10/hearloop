---
test: ../member-confirms-removal-of-acme-team-only-note_test.md
status: failed
started: 2026-11-24T03:05:58.147Z
duration_s: 99
session_id: 4ea00068-cafa-462d-b73b-056929822e7e
---

# Member confirms removal of Acme team-only note — Result

## Step 1 ✓ passed (27.6s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (33.9s)
md5: f7bf73cfa50f3de4d5b5a2f491c94dc2
From the Acme board at {{base_url}}/acme, open a request page and post 'Internal moderation probe {{kane_run_id}}' after enabling Internal note (team only).

## Step 3 ✗ failed (33.3s)
md5: c113210fcecaeca59dcbd609e714a290
Reason: Final verification failed: "the targeted note 'Internal moderation probe {{global.kane_run_id}}' has not been removed before confirmation" — bug verdict: Pre-confirmation removal assertion uses unresolved check value [automation_bug/config_issue, confidence 0.93]
On that request page, initiate removal using the remove button belonging to 'Internal moderation probe {{kane_run_id}}', then assert the targeted note has not been removed before confirmation.

## Step 4 ⏭ skipped
