---
test: ../cancel-claimed-roadmap-move-and-preserve-agent_test.md
status: failed
started: 2026-11-23T16:38:08.213Z
duration_s: 102
session_id: cc2adc46-a239-4a1c-9943-45924aef6064
---

# Cancel claimed roadmap move and preserve agent — Result

## Step 1 ✓ passed (31.2s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✗ failed (67.8s)
md5: 6dcbe3447ffd6be378f79882cdf2bd93
Reason: Final verification failed: "there are exactly four named Open, Planned, In progress and Shipped" — bug verdict: Roadmap fixture lacks Open status column [automation_bug/test_data_issue, confidence 0.90]
On the Acme dashboard Roadmap page, review the status columns, then assert there are exactly four named Open, Planned, In progress and Shipped.

## Step 3 ⏭ skipped

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped

## Step 6 ⏭ skipped
