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

# Session: mcp_connect_deny

## Step 1
Go to {{mcp_deny_url}} . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the heading 'Allow Kane Deny Client to use hearloop?' appears. Click 'Deny'. Verify the browser leaves that page and the address bar URL contains 'error=access_denied' and does not contain 'code='.
