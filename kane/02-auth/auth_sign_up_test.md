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

# Session: auth_sign_up

## Step 1
Go to {{base_url}}/login?mode=signup . Fill in name 'New Tester', email '{{smart.random_email}}' and password 'correct-horse-9', click 'Create account', then verify the page heading is 'Name your board'.
