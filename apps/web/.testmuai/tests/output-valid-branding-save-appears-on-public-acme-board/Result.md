---
test: ../valid-branding-save-appears-on-public-acme-board_test.md
status: passed
started: 2026-11-23T05:00:15.070Z
duration_s: 295
session_id: 250961a2-ecb7-448f-991d-8d629fc2ba6c
---

# Valid Branding save appears on public Acme board — Result

## Step 1 ✓ passed (81.3s)
md5: ea9a54a4e0819c9b61260da0f32739b1
At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > Branding and note the currently selected theme and Powered by hearloop attribution state.

## Step 2 ✓ passed (93s)
md5: e7783cfc6df2fb812297ea898806a20d
On the Acme dashboard's Settings > Branding page, set accent colour to '#6e8bff', set logo to the HTTPS image link {{branding_logo_url}}, select the opposite dark-or-light theme to the one noted, toggle Powered by hearloop attribution to the opposite on-or-off state, and save; then assert Branding retains '#6e8bff', {{branding_logo_url}}, the chosen theme and the chosen attribution state.

## Step 3 ✓ passed (116.1s)
md5: 111e78c18454e5d54070f86de9c7c0b7
From the saved Branding settings, open the public Acme board at {{base_url}}/acme, then assert the saved accent, image-link logo, chosen dark-or-light theme and chosen Powered by hearloop attribution state are reflected there.
