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

# Session: access_hide_roadmap

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Turn off 'Public roadmap' and click 'Save changes'. Open the address /acme and verify the header has no 'Roadmap' link. Go back to /acme/dashboard/settings, turn 'Public roadmap' on again, save, open /acme and verify the 'Roadmap' link is back.
