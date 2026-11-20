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

# Session: org_slug_follows_name

## Step 1
Go to {{base_url}}/ . Click 'Sign in' in the header and sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Then go to {{base_url}}/new . On 'Name your board', type 'Hello' in Board name and verify the Address field shows 'hello'. Clear the Board name completely and verify the Address field is empty. Type 'Second Team' in Board name and verify the Address field shows 'second-team'. Do not create the board. Click 'Back' and verify you leave the 'Name your board' page and do not see a sign-in form.
