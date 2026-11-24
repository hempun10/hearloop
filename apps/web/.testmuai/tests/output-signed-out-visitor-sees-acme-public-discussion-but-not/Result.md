---
test: ../signed-out-visitor-sees-acme-public-discussion-but-not_test.md
status: failed
started: 2026-11-24T03:13:44.626Z
duration_s: 70
session_id: 6ee5d474-adaa-4b62-8a01-d362deee1ece
---

# Signed-out visitor sees Acme public discussion but not private note or form — Result

## Step 1 ✓ passed (33.6s)
md5: 6dc6336336feb3fcb6cd2ad47bc14d36
In a signed-out browser session, open {{base_url}}/acme and navigate to the request titled {{kane_request_title}} containing the previously posted 'Team-only discussion probe {{kane_run_id}}', then assert that internal note is absent from the visitor's request page.

## Step 2 ✗ failed (32.5s)
md5: 359ed060d0475cc29ec9da186ab1b2a1
Reason: The page shows only the member comment; the required public nonmember comment is absent after refresh. — bug verdict: Expected public nonmember discussion fixture is absent [automation_bug/test_data_issue, confidence 0.88]
On the same request page, read the public discussion containing 'Public member discussion probe {{kane_run_id}}' and 'Public nonmember discussion probe {{kane_run_id}}', then assert both comments are visible oldest first with authors and ages, and the member comment has the Team label.

## Step 3 ⏭ skipped
