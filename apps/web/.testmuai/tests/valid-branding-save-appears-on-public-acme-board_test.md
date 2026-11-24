---
assurance:
  id: t-22
  base: sha256:bd562fa4ea5f95f905dbb5a0cff2dc96c6adbcfa2602e9056b27143bb9baa64d
---
# Valid Branding save appears on public Acme board

> A member saves a valid accent colour, HTTPS image-link logo, selected theme and Powered by hearloop attribution state and observes the saved change on the public board.

## Step 1

At {{base_url}}/acme/dashboard, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open Settings > Branding and note the currently selected theme and Powered by hearloop attribution state.

## Step 2 @verifies ac-51, ac-52, ac-53, ac-54

On the Acme dashboard's Settings > Branding page, set accent colour to '#6e8bff', set logo to the HTTPS image link {{branding_logo_url}}, select the opposite dark-or-light theme to the one noted, toggle Powered by hearloop attribution to the opposite on-or-off state, and save; then assert Branding retains '#6e8bff', {{branding_logo_url}}, the chosen theme and the chosen attribution state.

## Step 3 @verifies ac-47

From the saved Branding settings, open the public Acme board at {{base_url}}/acme, then assert the saved accent, image-link logo, chosen dark-or-light theme and chosen Powered by hearloop attribution state are reflected there.
