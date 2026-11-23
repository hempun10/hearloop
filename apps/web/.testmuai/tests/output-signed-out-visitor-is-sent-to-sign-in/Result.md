---
test: ../signed-out-visitor-is-sent-to-sign-in_test.md
status: failed
started: 2026-11-23T03:53:40.820Z
duration_s: 53
session_id: 072eb163-ef05-4e61-b235-51295ebd7310
---

# Signed-out visitor is sent to sign-in — Result

## Step 1 ✓ passed (12.9s)
md5: 510365e75a105b048760ec7516cb9a85
Open {{base_url}}/acme on hearloop and establish a signed-out browser session for the site by clearing its session cookies.

## Step 2 ✗ failed (37.4s)
md5: e472fd837b5ee2e2d3ff23ce72ed4642
Reason: Final verification failed: "the browser is at {{global.base_url}}/login and no private Acme dashboard content is accessible" — bug verdict: Login assertion rejects valid redirect query [automation_bug/config_issue, confidence 0.98]
In that signed-out browser session, open {{base_url}}/acme/dashboard, then assert the browser is at {{base_url}}/login and no private Acme dashboard content is accessible.
