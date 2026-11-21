---
test: ../manual-shipped-status-does-not-imply-kane-verification_test.md
status: failed
started: 2026-11-20T14:01:07.416Z
duration_s: 36
session_id: 89febfc9-c8e3-4435-a9bf-087897af8974
---

# Manual Shipped status does not imply Kane verification — Result

## Step 1 ✓ passed (4.88s)
md5: a91b0f5dd3dd816ae41403e2df926a93
At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 ✓ passed (0.76s)
md5: 7a84259bee0682259ff39d3c491009c8
In the Acme inbox, locate an unclaimed In progress request without a passing Kane run and open its status dropdown, then assert Shipped is an available destination.

## Step 3 ✗ failed (25.8s)
md5: f4315948c7cfc89fb05c5d622b71e043
Reason: Selecting Shipped opened a move-confirmation dialog, contrary to the required outcome. — bug verdict: Status move opens an unexpected confirmation dialog [application_issue/functional_defect, confidence 0.89]
Move that unclaimed request from In progress to Shipped using its inbox dropdown, then assert its inbox row immediately shows Shipped and no move-confirmation dialog appears.

## Step 4 ⏭ skipped

## Step 5 ⏭ skipped
