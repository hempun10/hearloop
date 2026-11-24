---
test: ../restricted-acme-posting-asks-signed-out-visitor-to-sign-in_test.md
status: passed
started: 2026-11-23T04:07:34.690Z
duration_s: 131
session_id: 4fb0a7b8-8427-425b-bfcd-9aa246d3baf9
---

# Restricted Acme posting asks signed-out visitor to sign in — Result

## Step 1 ✓ passed (26.3s)
md5: f80182e078d584eee9828b26718f5ace
At {{base_url}}/login, sign in as an Acme board member with {{e2e_email}} and {{e2e_password}} and reach the Acme dashboard.

## Step 2 ✓ passed (64.7s)
md5: dd99e58217a0d13653066e480227056b
On the Acme dashboard Settings → Access page, set posting eligibility to signed-in people only and save the setting.

## Step 3 ✓ passed (36.8s)
md5: 9215a42c014346bdda716a74b9794f8d
In a signed-out browser context at {{base_url}}/acme, attempt to post to the public board, then assert the visitor is asked to sign in before posting.
