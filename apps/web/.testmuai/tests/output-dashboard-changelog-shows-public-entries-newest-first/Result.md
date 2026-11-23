---
test: ../dashboard-changelog-shows-public-entries-newest-first_test.md
status: passed
started: 2026-11-23T16:06:26.989Z
duration_s: 361
session_id: 11559c7e-e284-4ff3-af17-2f4f9a5a71d2
---

# Dashboard changelog shows public entries newest first — Result

## Step 1 ✓ passed (28.6s)
md5: fee310169ecb7ad29721be8fb7419a56
At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (217.1s)
md5: 29d47650e0db7ea9f8eb1ade72eec45b
On the Acme dashboard post list, move {{planned_request_title}} and {{other_status_title}} out of Shipped if necessary, then publish {{planned_request_title}} followed by {{other_status_title}} by moving each to Shipped.

## Step 3 ✓ passed (54.8s)
md5: 9050d0318b2fa4cf2d5c589ac3835e0f
Open the Acme dashboard Changelog page and store its displayed entry titles as the dashboard entry set, then assert the newly published {{other_status_title}} entry precedes {{planned_request_title}} and the whole list is newest first.

## Step 4 ✓ passed (57.2s)
md5: 840b246d3c3a34bda35c647afb14e74a
From the Acme dashboard Changelog page, use View public page to compare the stored dashboard entry set with the Acme public changelog, then assert every stored dashboard entry belongs to this board's public changelog.
