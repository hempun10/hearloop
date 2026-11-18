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

# Session: org_create_board

## Step 1
Go to {{base_url}}/login?mode=signup . Create an account with name 'Org Tester', email '{{smart.random_email}}' and password 'correct-horse-9'. On 'Name your board', enter board name 'Team {{smart.random_string_8}}' and verify the Address field fills in with a lowercase version. Click 'Create board' and verify the settings page shows a message ending in 'is live.'
