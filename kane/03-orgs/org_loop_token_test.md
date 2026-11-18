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

# Session: org_loop_token

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. In the 'Loop API token' section click 'Generate token' or 'Regenerate token' and accept any confirmation. Verify a token starting with 'hl_' is shown with the note 'Copy it now'.
