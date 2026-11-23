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

# Session: mcp_connect_allow

## Step 1
Go to {{mcp_authorize_url}} . A sign-in page opens: sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify a page with the heading 'Allow Kane Test Client to use hearloop?' appears, names 'localhost:3000' as where approval is sent, and has no site navigation header or footer. Click 'Allow'. Verify the browser leaves that page and the address bar URL now contains 'code='.
