---
test: ../member-adds-a-visible-request-tag-with-enter_test.md
status: failed
started: 2026-11-24T03:27:55.954Z
duration_s: 110
session_id: 469bac17-863c-466e-9634-1db4532006fe
---

# Member adds a visible request tag with Enter — Result

## Step 1 ✓ passed (39.6s)
md5: 51ee57fc7427a9f8404d163a7af56ae8
At {{base_url}}/acme, ensure you are signed in as an Acme board member using {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (15.1s)
md5: 4f69f6b7918d20f2666ccb2722fd1e00
On the Acme board, open the request titled {{kane_request_title}} and reach its request page.

## Step 3 ✗ failed (50.7s)
md5: f5442761e515cd6fc400ca2827841530
Reason: Final verification failed: "the entered tag added-tag-{{global.kane_run_id}} appears among the current request tags visible on the page" — bug verdict: Tag visibility assertion uses an unresolved check value [automation_bug/config_issue, confidence 0.99]
On that request page, enter added-tag-{{kane_run_id}} in Add a tag and press Enter, then assert the entered tag appears among the current request tags visible on the page.
