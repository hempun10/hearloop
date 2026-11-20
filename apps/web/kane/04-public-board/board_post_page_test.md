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

# Session: board_post_page

## Step 1
Go to {{base_url}}/acme . Open the request 'Search the board'. Verify the post page shows its title, a status timeline where 'Shipped' is reached, and a 'Kane CLI verifications' section with a 'Passed' entry.
