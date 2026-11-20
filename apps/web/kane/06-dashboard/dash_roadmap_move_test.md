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

# Session: dash_roadmap_move

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard/roadmap . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Verify the Roadmap shows columns Open, Planned, In progress and Shipped. Using the dropdown on the 'Export posts to CSV' card, move it to 'In progress' and verify the card is now in the In progress column. Move it back to 'Open' and verify it is in the Open column.
