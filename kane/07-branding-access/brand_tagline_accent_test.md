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

# Session: brand_tagline_accent

## Step 1
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Set the Tagline to 'Built with Kane {{smart.random_string_8}}', click 'Save changes' and verify 'Saved' appears. Store the tagline you typed as 'tagline'. Click 'Branding' in the settings menu, click the green accent swatch, click 'Save changes' and verify 'Saved' appears. Click 'View public board' and verify the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name.
