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

# Session: dash_kane_runs

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard/runs . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Kane runs page lists a 'Passed' run for 'Search the board'. Click that row and verify the expanded report contains 'Kane: passed'.
