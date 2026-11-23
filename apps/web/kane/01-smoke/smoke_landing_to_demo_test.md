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

# Session: smoke_landing_to_demo

## Step 1
Go to {{base_url}}/ . Verify the headline 'Feedback that ships itself.' is visible. Click 'Try the live demo' and verify a feedback board with a list of requests and a 'Post idea' button loads.
