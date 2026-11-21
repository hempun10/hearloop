---
test: ../confirm-agent-held-request-move-after-work-stopping-warning_test.md
status: passed
started: 2026-11-20T13:54:30.516Z
duration_s: 190
session_id: 35fc814d-c80e-4bd4-a118-f5270f5aa7c3
---

# Confirm agent-held request move after work-stopping warning — Result

## Step 1 ✓ passed (4.64s)
md5: a91b0f5dd3dd816ae41403e2df926a93
At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (23.97s)
md5: 1ca25a2e529ec7a3ce5c3170991b1720
Locate the In progress request titled {{claimed_request_title}} that is held by a coding agent; identify the agent and the claim on its request page, then return to its inbox row.

## Step 3 ✓ passed (16.66s)
md5: 96fef943c1d579cfe6211c52f927af59
Open {{claimed_request_title}}'s inbox status dropdown and identify a destination other than In progress or Shipped, then assert that destination is available to a member.

## Step 4 ✓ passed (38.6s)
md5: bb2db6ad55dda7889fe80164dd99bee2
Attempt to move {{claimed_request_title}} from In progress to that non-Shipped destination, then assert the warning reads "<agent> is building this. Moving it stops that work." with the identified agent's name in place of <agent>.

## Step 5 ✓ passed (39.9s)
md5: cb0a1b7e9ccc725f8f3b405e4f31b4c8
Confirm the warned move for {{claimed_request_title}}, then assert its inbox row shows the selected non-Shipped destination.

## Step 6 ✓ passed (34.5s)
md5: d84cdcdfb9cc9b4434d70f493cfc8799
Reload the Acme dashboard inbox and find {{claimed_request_title}}, then assert its row still shows the selected destination.

## Step 7 ✓ passed (27.9s)
md5: d6f14e9e300de145775143a915a123cc
Open {{claimed_request_title}}'s request page after the confirmed move, then assert the original agent's claim is absent.
