---
test: ../known-other-status-request-is-excluded-from-the-wrong_test.md
status: passed
started: 2026-11-20T10:05:43.469Z
duration_s: 62
session_id: a9259bc0-1f38-4bb5-a5b1-9b3389f778fb
---

# Known other-status request is excluded from the wrong roadmap column — Result

## Step 1 ✓ passed (3.47s)
md5: c3bc254fa35a89cfd96da1c41806d1b4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (15.84s)
md5: 5e3f7483347328f6e7dde26b8c215820
On the Acme dashboard post list (inbox), identify the request titled {{other_status_title}}, record its current status, and identify a different available status from the request status choices.

## Step 3 ✓ passed (38.6s)
md5: e8b9a0b829f7a41a5fa4a14fb0fc8ccf
On the Acme dashboard roadmap, locate the column for the different status and the column matching {{other_status_title}}'s current status, then assert {{other_status_title}} is absent from the different-status column and every roadmap request card is in the column matching its current inbox status.
