---
test: ../acme-member-opens-private-dashboard_test.md
status: passed
started: 2026-11-23T04:00:32.845Z
duration_s: 50
session_id: fba1e5fb-db5e-4a9a-b667-569c1fd48d74
---

# Acme member opens private dashboard — Result

## Step 1 ✓ passed (28.7s)
md5: 342aef7128afe31997a6ff6f12b32fc6
At {{base_url}}/login on hearloop, sign in with {{e2e_email}} and {{e2e_password}} as an Acme board member.

## Step 2 ✓ passed (17.8s)
md5: 2018b7be5e95752545ca843de5ee2ef6
In that signed-in browser session, open {{base_url}}/acme/dashboard, then assert the Acme private dashboard is visible to the signed-in Acme board member.
