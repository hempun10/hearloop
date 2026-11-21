---
test: ../reversing-shipment-removes-its-public-entry-without-deleting_test.md
status: failed
started: 2026-11-20T14:10:20.061Z
duration_s: 102
session_id: cec09f0a-58d5-48fc-8cd4-8646fb109f1c
---

# Reversing shipment removes its public entry without deleting Kane history — Result

## Step 1 ✓ passed (19.4s)
md5: a91b0f5dd3dd816ae41403e2df926a93
At {{base_url}}/login, sign in to the Acme board with {{e2e_email}} and {{e2e_password}}, and open the request inbox at {{base_url}}/acme/dashboard.

## Step 2 ✗ failed (21.1s)
md5: d438341ecd69c953e493e4a69cc6978a
Reason: The only {{global.kane_request_title}} row is visibly In progress, while Shipped shows zero requests. — bug verdict: Expected Shipped Kane request is absent [automation_bug/test_data_issue, confidence 0.97]
On the Acme board, identify the request titled {{kane_request_title}} that is currently Shipped; on its request page identify the existing Kane run {{kane_run_id}}, and return to its inbox row.

## Step 3 ✓ passed (—)
md5: c98c7be8e13021abcc2d14660dd0960b
In the inbox status dropdown of {{kane_request_title}}, inspect the destinations, then assert In progress is available to a member.

## Step 4 ✓ passed (—)
md5: 01aa93d48c4f3d4e58e41e579e8ca3cd
From that inbox row move {{kane_request_title}} from Shipped to In progress, then assert its row shows In progress.

## Step 5 ✓ passed (—)
md5: c9d9ab2b61ab505723441dedae518ab3
Reload the Acme dashboard inbox and locate {{kane_request_title}}, then assert its row still shows In progress.

## Step 6 ✓ passed (—)
md5: 516db51b9b268bcf55a4cd194f771919
Visit the Acme public changelog for {{kane_request_title}} after the move, then assert its shipped entry is absent.

## Step 7 ✓ passed (—)
md5: b178a763ffcff84895e73eac3f2711ef
Open {{kane_request_title}}'s request page after the move, then assert its pre-existing Kane run {{kane_run_id}} is still listed.
