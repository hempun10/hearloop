---
test: ../signed-out-visitor-is-sent-to-sign-in-2_test.md
status: passed
started: 2026-11-23T17:35:25.126Z
duration_s: 76
session_id: 5a5f56e2-44b6-4c35-a74b-5219697071a4
---

# Signed-out visitor is sent to sign-in — Result

## Step 1 ✓ passed (18.3s)
md5: 510365e75a105b048760ec7516cb9a85
Open {{base_url}}/acme on hearloop and establish a signed-out browser session for the site by clearing its session cookies.

## Step 2 ✓ passed (54.1s)
md5: e9834830381f067abb2c40c2b305d090
In that signed-out browser session, open {{base_url}}/acme/dashboard, then assert the address contains /login, the sign-in form is shown, the dashboard sidebar is not shown, and no private Acme dashboard content is accessible.
