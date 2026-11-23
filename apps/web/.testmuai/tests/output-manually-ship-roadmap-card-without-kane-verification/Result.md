---
test: ../manually-ship-roadmap-card-without-kane-verification_test.md
status: failed
started: 2026-11-23T16:45:56.740Z
duration_s: 73
session_id: 7f2c9d11-97c3-485c-96cf-64a7de35c1ac
---

# Manually ship roadmap card without Kane verification — Result

## Step 1 ✓ passed (29.2s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✗ failed (39.9s)
md5: 7f55b6b5916118367c98317d68bc5a5e
Reason: Dark mode toggle is Planned, but the page shows only Planned, In progress, and Shipped; no Open column exists. — bug verdict: Roadmap omits the Open status column [application_issue/ui_state_mismatch, confidence 0.92]
On the Acme dashboard Roadmap page, locate the unclaimed Planned request {{planned_request_title}} and inspect the status columns, then assert there are exactly four named Open, Planned, In progress and Shipped.

## Step 3 ⏭ skipped

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 ⏭ skipped

## Step 7 ⏭ skipped
