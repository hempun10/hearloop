---
test: ../nonmember-posts-publicly-without-seeing-acme-internal-note_test.md
status: passed
started: 2026-11-24T03:12:35.593Z
duration_s: 187
session_id: b164296d-45ac-49f8-b0b8-4884b814017a
---

# Nonmember posts publicly without seeing Acme internal note — Result

## Step 1 ✓ passed (28.8s)
md5: bf33fa90589ec86af5c04e6c711c0401
At {{base_url}}/login, establish a signed-in nonmember session with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 ✓ passed (86.3s)
md5: e1ba28679ff0af1b7aa7aa582be58955
On Acme, open the request titled {{kane_request_title}} containing the previously posted 'Team-only discussion probe {{kane_run_id}}', then assert that the internal note is absent from the nonmember's request page.

## Step 3 ✓ passed (69.6s)
md5: b7ddde303553ae2e5408ad4254665d85
On that request page, write 'Public nonmember discussion probe {{kane_run_id}}' as a public comment and post with Comment, then assert the public comments include the new comment, show their authors and ages, retain the Team label on 'Public member discussion probe {{kane_run_id}}', and put that earlier member comment before the newer nonmember comment.
