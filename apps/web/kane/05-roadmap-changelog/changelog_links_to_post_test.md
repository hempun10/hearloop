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

# Session: changelog_links_to_post

## Step 1
Go to {{base_url}}/acme/changelog . Verify an entry titled 'Search the board' is shown with a 'Verified with Kane CLI' link. Click that link and verify the post page for 'Search the board' opens.
