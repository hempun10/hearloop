---
test: ../auth_sign_in_out_test.md
status: passed
started: 2026-11-18T03:35:23.377Z
duration_s: 60.2
session_id: 7cbdb45b-51ef-42a6-8614-967d409365b8
---

# Session: auth_sign_in_out — Result

## Step 1 ✓ passed (60.2s)
md5: 3d7a389f63d49a4adc33d07b294f30f0
Go to {{base_url}}/login . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}' and verify the Acme board loads. Verify the header shows a 'Dashboard' link. Click 'Sign out' in the header, then verify the header shows 'Sign in' and no 'Dashboard' link.
