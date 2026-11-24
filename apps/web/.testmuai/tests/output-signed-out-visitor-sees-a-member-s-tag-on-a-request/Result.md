---
test: ../signed-out-visitor-sees-a-member-s-tag-on-a-request_test.md
status: passed
started: 2026-11-24T03:36:47.574Z
duration_s: 123
session_id: 19bf6e0e-2f07-4bb7-920e-ba8ae81b992c
---

# Signed-out visitor sees a member's tag on a request — Result

## Step 1 ✓ passed (28.4s)
md5: 51ee57fc7427a9f8404d163a7af56ae8
At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (12.8s)
md5: 4f69f6b7918d20f2666ccb2722fd1e00
On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3 ✓ passed (18.7s)
md5: 2646330187d3f756eda99fb0c0a1c8eb
On the request page, add public-tag-{{kane_run_id}} in Add a tag using Enter.

## Step 4 ✓ passed (61.1s)
md5: 622de0e940926c40a9c076a3a0728942
In a signed-out browser session, open the same Acme request page, then assert its current tag public-tag-{{kane_run_id}} is visible.
