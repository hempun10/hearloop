---
test: ../acme-loop-token-secret-is-unavailable-after-its-initial_test.md
status: passed
started: 2026-11-20T03:47:55.404Z
duration_s: 159
session_id: de93c021-605f-4bc0-ace1-66be7acd102a
---

# Acme Loop token secret is unavailable after its initial presentation — Result

## Step 1 ✓ passed (58.2s)
md5: 00ab13ffc0653adb2d6525cf7c588e85
At {{base_url}}/login, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}}, and reach the Acme dashboard's Settings area for Loop API tokens.

## Step 2 ✓ passed (38s)
md5: 8f3dfd1aa14c756a7a09e9ba32466fa5
In Acme dashboard Settings, create a Loop API token named 'Loop one-time assurance' and capture its initially displayed value as issued_token, then assert the newly created token value is displayed.

## Step 3 ✓ passed (59.7s)
md5: edd7e882ad997de692d5d39d746c3f16
Leave the initial token-value presentation, return to Acme dashboard Settings under Loop API tokens and inspect the created token named 'Loop one-time assurance', then assert the token bears that name but its previously displayed value issued_token is not displayed again.
