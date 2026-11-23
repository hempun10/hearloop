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

# Session: mcp_connection_revoke

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard/settings/token . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify 'Kane Test Client' is listed under Tokens with the note 'Connected via MCP'. Click 'Revoke' for 'Kane Test Client', confirm, and verify 'Kane Test Client' is no longer listed.
