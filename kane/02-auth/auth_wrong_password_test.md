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

# Session: auth_wrong_password

## Step 1
Go to {{base_url}}/login . Sign in with email '{{e2e_email}}' and password 'not-the-password'. Verify an error message about invalid email or password is shown and the 'Sign in' heading is still on the page.
