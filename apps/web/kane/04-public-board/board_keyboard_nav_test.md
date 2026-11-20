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

# Session: board_keyboard_nav

## Step 1
Go to {{base_url}}/acme . Press the j key three times, then press k once, and verify the board is still shown with its list of requests and no error page. Then press Enter and verify the page of the selected request opens with its title.
