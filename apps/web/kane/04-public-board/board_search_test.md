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

# Session: board_search

## Step 1
Go to {{base_url}}/acme . Type 'export' in the 'Search requests' box. Verify 'Export posts to CSV' is listed and 'Dark mode toggle' is not. Replace the search with 'zzqxnomatch' and verify the message 'No requests match' is shown.
