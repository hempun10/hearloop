---
test: ../known-other-status-request-is-excluded-from-the-wrong_test.md
status: failed
started: 2026-11-20T04:46:49.398Z
duration_s: 144
session_id: 49ca9d8f-f81a-48fe-861b-a43c624d171c
---

# Known other-status request is excluded from the wrong roadmap column — Result

## Step 1 ✓ passed (36.6s)
md5: c3bc254fa35a89cfd96da1c41806d1b4
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2 ✓ passed (41.5s)
md5: 5e3f7483347328f6e7dde26b8c215820
On the Acme dashboard post list (inbox), identify the request titled {{other_status_title}}, record its current status, and identify a different available status from the request status choices.

## Step 3 ✗ failed (62.3s)
md5: e8b9a0b829f7a41a5fa4a14fb0fc8ccf
Reason: Both required analyzer attempts were blocked by an external Cloudflare 403 response. — bug verdict: Cloudflare blocks roadmap analyzer requests [environment_issue/bot_detection, confidence 0.98]
On the Acme dashboard roadmap, locate the column for the different status and the column matching {{other_status_title}}'s current status, then assert {{other_status_title}} is absent from the different-status column and every roadmap request card is in the column matching its current inbox status.
