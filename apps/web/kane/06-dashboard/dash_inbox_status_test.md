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

# Session: dash_inbox_status

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the Inbox, change the status of 'Export posts to CSV' to 'Planned' and verify the 'Planned' count in the left list is 2. Then change it back to 'Open' and verify the 'Planned' count is 1.
