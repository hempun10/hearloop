---
test: ../member-saves-valid-title-and-details-on-acme-request_test.md
status: passed
started: 2026-11-24T03:18:41.033Z
duration_s: 131
session_id: 58fd8e9f-0795-4f44-bad8-314f01d73ab0
---

# Member saves valid title and details on Acme request — Result

## Step 1 ✓ passed (30.4s)
md5: 29dd7d194ca892d7068b7b56e02cb83c
At {{base_url}}/login for the Acme board, sign in as a board member with {{e2e_email}} and {{e2e_password}}.

## Step 2 ✓ passed (33.7s)
md5: 31b246a81096972a8ece0774d9ec51ad
On the Acme board, open the non-Open request titled {{planned_request_title}}; beside Posted, assert Edit is available.

## Step 3 ✓ passed (23.4s)
md5: 94961f0ae370042a14e5b619c7647dfd
On that request page, open Edit, then assert the form offers an editable request title and editable request details.

## Step 4 ✓ passed (41s)
md5: 7e3cdf67347b9e1fa9714d2c8f4eb564
In that request's edit form, replace the title with 'Acme member edit proof' and the details with 'Member edit proof details.', then Save; assert the request page shows the submitted title 'Acme member edit proof' and submitted details 'Member edit proof details.'.
