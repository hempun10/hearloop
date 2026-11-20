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

# Session: org_reserved_address

## Step 1
Go to {{base_url}}/login?next=/new . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. On 'Name your board', enter board name 'Login' and click 'Create board'. Verify an error says the address is reserved.
