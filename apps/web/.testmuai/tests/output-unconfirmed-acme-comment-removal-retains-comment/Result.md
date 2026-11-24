---
test: ../unconfirmed-acme-comment-removal-retains-comment_test.md
status: passed
started: 2026-11-24T03:15:40.614Z
duration_s: 107
session_id: 6d03d11f-14f8-44ab-a48c-4fc5705520aa
---

# Unconfirmed Acme comment removal retains comment — Result

## Step 1 ✓ passed (26s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (24.3s)
md5: 5e6fa777893bfc99754bd5ddd4767655
From the Acme board at {{base_url}}/acme, open a request page and post the public comment 'Keep moderation probe {{kane_run_id}}' with Comment.

## Step 3 ✓ passed (30.1s)
md5: 549a7d138aebd16bc2bdbbee45b89a15
On that request page, initiate removal using the remove button belonging to 'Keep moderation probe {{kane_run_id}}', then assert the comment has not been removed before confirmation.

## Step 4 ✓ passed (22.6s)
md5: bc9f3c5092f3841a52535e03c41f1c19
Leave the removal confirmation without confirming, then return to the request page and locate 'Keep moderation probe {{kane_run_id}}', then assert the comment remains present.
