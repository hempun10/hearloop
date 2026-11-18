---
test: ../auth_sign_in_out_test.md
status: passed
started: 2026-11-18T06:42:36.771Z
duration_s: 94
session_id: e140cb10-d35a-4672-9e07-e9589dca3cbf
---

# Session: auth_sign_in_out — Result

## Step 1 ✓ passed (68.6s)
md5: 3d7a389f63d49a4adc33d07b294f30f0
Go to {{base_url}}/login . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}' and verify the Acme board loads. Verify the header shows a 'Dashboard' link. Click 'Sign out' in the header, then verify the header shows 'Sign in' and no 'Dashboard' link.
