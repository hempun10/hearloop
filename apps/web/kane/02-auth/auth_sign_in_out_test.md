---
mode: testing
max_steps: 40
timeout: 480
target: chrome
headless: true
variables:
  global.e2e_email:
    value: e2e@hearloop.test
    secret: false
    syntax: '{{e2e_email}}'
    type: global
  global.base_url:
    value: http://localhost:3000
    secret: false
    syntax: '{{base_url}}'
    type: global
---

# Session: auth_sign_in_out

## Step 1
Go to {{base_url}}/login . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}' and verify the Acme board loads. Verify the header shows a 'Dashboard' link. Click 'Sign out' in the header, then verify the header shows 'Sign in' and no 'Dashboard' link.
