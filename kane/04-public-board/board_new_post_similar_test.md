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

# Session: board_new_post_similar

## Step 1
Go to {{base_url}}/acme . Click 'Post idea'. Type the title 'Dark mode for the board' and verify a 'Similar requests' box lists 'Dark mode toggle'. Replace the title with 'Kane check {{smart.random_string_8}}', add details 'Created by the Kane suite.', click 'Post', and verify the post page opens with that title and the text 'Not verified yet'.
