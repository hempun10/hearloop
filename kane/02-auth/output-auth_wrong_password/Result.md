---
test: ../auth_wrong_password_test.md
status: passed
started: 2026-11-18T03:36:49.097Z
duration_s: 37.5
session_id: 3cc58a08-ca05-4a50-a6b1-c887e9fb50d2
---

# Session: auth_wrong_password — Result

## Step 1 ✓ passed (37.5s)
md5: 0eb9232bd918a623d6079f65f0503da0
Go to {{base_url}}/login . Sign in with email '{{e2e_email}}' and password 'not-the-password'. Verify an error message about invalid email or password is shown and the 'Sign in' heading is still on the page.
