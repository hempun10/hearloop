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

# Session: roadmap_public_columns

## Step 1
Go to {{base_url}}/acme/roadmap . Verify there are columns 'Planned', 'In progress' and 'Shipped'; 'Dark mode toggle' is under Planned, 'Slack notifications' under In progress, and 'Search the board' under Shipped.
