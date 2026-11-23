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

# Session: mcp_consent_forged_link

## Step 1
Go to {{base_url}}/login?next=%2Fconsent%3Fclient_id%3Devil%26sig%3Dforged . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the page says 'This link is invalid or expired' and there is no 'Allow' button.
