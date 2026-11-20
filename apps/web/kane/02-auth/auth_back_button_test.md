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

# Session: auth_back_button

## Step 1
Go to {{base_url}}/ . Click 'Sign in' in the header. Verify the sign-in page shows a 'Back' button and no 'How it works' link. Click 'Back' and verify the headline 'Feedback that ships itself.' is visible. Then go to {{base_url}}/acme , click 'Sign in' in the board header, click 'Back', and verify the Acme board with its list of requests is shown, not the landing page.
