---
test: ../own-column-roadmap-drop-preserves-status-and-counts_test.md
status: passed
started: 2026-11-23T16:19:37.739Z
duration_s: 248
session_id: ca0032f0-16bc-45fb-af3a-1633f777cdb0
---

# Own-column Roadmap drop preserves status and counts — Result

## Step 1 ✓ passed (67.1s)
md5: a56e9a642b95519125f8c3472d7bf5b2
At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2 ✓ passed (44.3s)
md5: 338d24f615fd812873f57e563e0a8c52
On Acme's dashboard post list, collect all request titles and statuses for independent reconciliation with the Roadmap.

## Step 3 ✓ passed (48.5s)
md5: adea3dcef5acdf32c513483d3e5dd9e9
On Acme's dashboard Roadmap page, locate the card titled {{other_status_title}} and identify its current status column.

## Step 4 ✓ passed (83.8s)
md5: ed902f8ab07841ef848d63117084a4aa
On the Roadmap, drop {{other_status_title}} on its original status column and reload the page, then assert its status is its original status before the drop, the card occurs exactly once in the matching column, all four status columns remain present, and their counts agree with the unchanged board request inventory.
