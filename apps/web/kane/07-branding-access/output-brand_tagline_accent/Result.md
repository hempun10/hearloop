---
test: ../brand_tagline_accent_test.md
status: passed
started: 2026-11-19T01:43:13.471Z
duration_s: 161
session_id: d2adbd8e-e551-47fe-b988-daabb000569c
---

# Session: brand_tagline_accent — Result

## Step 1 ✓ passed (142.6s)
md5: a857a790aee4f50febe47df8821ab3b4
Go to {{base_url}}/login?next=/acme/dashboard/settings . Sign in with email '{{e2e_email}}' and password '{{e2e_password}}'. Set the Tagline to 'Built with Kane {{smart.random_string_8}}', click 'Save changes' and verify 'Saved' appears. Store the tagline you typed as 'tagline'. Click 'Branding' in the settings menu, click the green accent swatch, click 'Save changes' and verify 'Saved' appears. Click 'View public board' and verify the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name.
