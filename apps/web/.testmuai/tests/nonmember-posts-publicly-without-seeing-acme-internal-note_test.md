---
assurance:
  id: t-72
  base: sha256:825448515ea168ca27f20002d9310b9d7e774d697ec5ac8c795ea59438b89b0c
---
# Nonmember posts publicly without seeing Acme internal note

> A signed-in nonmember can publish a public comment but cannot see the member's internal note; the public discussion remains ordered.

## Step 1

At {{base_url}}/login, establish a signed-in nonmember session with {{nonmember_email}} and {{nonmember_password}}.

## Step 2 @verifies ac-118

On Acme, open the request titled {{kane_request_title}} containing the previously posted 'Team-only discussion probe {{kane_run_id}}', then assert that the internal note is absent from the nonmember's request page.

## Step 3 @verifies ac-126, ac-120, ac-121, ac-122, ac-123, ac-124

On that request page, write 'Public nonmember discussion probe {{kane_run_id}}' as a public comment and post with Comment, then assert the public comments include the new comment, show their authors and ages, retain the Team label on 'Public member discussion probe {{kane_run_id}}', and put that earlier member comment before the newer nonmember comment.
