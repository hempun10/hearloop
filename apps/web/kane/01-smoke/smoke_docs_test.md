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

# Session: smoke_docs

## Step 1
Go to {{base_url}}/ . Click 'Docs' in the header. Verify a documentation page with the title 'What hearloop does' and a sidebar loads. Click 'Choose a coding agent' in the sidebar and verify the page lists the agents 'codex' and 'manual'.
